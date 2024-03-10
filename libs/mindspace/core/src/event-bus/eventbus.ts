/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, Subject, of, pipe } from 'rxjs';
import { delay, filter, map, startWith, takeUntil, tap } from 'rxjs/operators';

type Unsubscribe = () => void;
const DestroyEvent = '[EventBus] destroy';

export interface EmitEvent<K, U extends string = string> {
  type: U;
  data?: K;
}

export type EventRegistrations = Record<string, (data: any) => void>;
export const destroyEventBus = () => ({ type: DestroyEvent });

export interface EventBusOptions {
  enableLogs?: boolean; // enable console logs
  delayNotify?: number; // delay all emissions by this amount
}

/**
 * New RxJS operator that conditionally adds a 'delay' operation to the stream pipeline
 * NOTE: this will make ALL bus emssions asynchronous (instead of synchronous by default)
 */
const delayWhen = (val: number | undefined) => (val ? pipe(delay(val)) : pipe());

/**
 * Simply Pub/Sub mechanism that support decoupled communication between services
 * Note: This EventBus does cache the most recent event for EACH type...
 */
export class EventBus {
  private cache: Record<string, EmitEvent<any>>;
  private emitter: Subject<EmitEvent<any>>;
  private destroy$: Observable<EmitEvent<any>>;

  constructor(private options: EventBusOptions = {}) {
    this.cache = {};
    this.destroy$ = of({ type: 'waiting' });
    this.emitter = new Subject<EmitEvent<any>>();

    this.reset();
  }

  /**
   * Public API to stop all current subscriptions
   * and reset with clean EventBus
   */
  reset() {
    this.announce(destroyEventBus());

    this.listenForDestroy();
    this.captureEvents();
  }

  /**
   * Emit an event to all listeners on this messaging queue
   */
  announce(event: EmitEvent<any>) {
    this.options.enableLogs && console.log(`[EventBus] emit(${event.type})`);
    this.emitter.next(event);
  }

  /**
   * Easily listen to a collection of events
   * And provide single teardown to disconnect all
   * internal connections.
   */
  onMany(collection: EventRegistrations): Unsubscribe {
    const eventKeys = Object.keys(collection);
    const connections = eventKeys.map((key) => this.on(key, collection[key]));

    return () => {
      connections.map((teardown) => teardown());
    };
  }

  /**
   * Listen on a single event, extract data
   * Publish a teardown function to disconnect later
   * Will immediately emit the most recent event IF currently in the cache.
   */
  on<T>(event: string, notify: (data: T) => void): Unsubscribe {
    const watch$ = this.observableFor(event);
    // Debounce to enforce async behavior
    const subscription = watch$.subscribe((data) => {
      this.options.enableLogs && console.log(`[EventBus] on(${event})`);
      notify(data as T);
    });

    return subscription.unsubscribe.bind(subscription);
  }

  /**
   * Get an observable stream for a specific event
   * Note: the emissions are 'asynchronous' due to the debounceTime
   */
  observableFor<T>(event: string): Observable<T> {
    return this.emitter.pipe(
      startWith(this.cache[event]),
      takeUntil(this.destroy$),
      filter((e: EmitEvent<T>) => e?.type === event),
      map((e: EmitEvent<T>) => e.data),
      delayWhen(this.options.delayNotify)
    ) as Observable<T>;
  }

  /**
   * Enable events to stop ALL subscriptions
   * Create special stream that ONLY emits destroy events
   */
  private listenForDestroy() {
    const clearCache = () => (this.cache = {});
    const onlyDestroyEvents = ({ type }: EmitEvent<unknown>) => type === DestroyEvent;

    this.destroy$ = this.emitter.pipe(filter(onlyDestroyEvents), tap(clearCache));
  }

  /**
   * Activate event interceptor to record last emission for each event type.
   * This will record most-recent events regardless of any subscribers/listeners.
   *
   * NOTE: do not capture the 'destroy' event
   */
  private captureEvents() {
    const notDestroyEvents = ({ type }: EmitEvent<unknown>) => type !== DestroyEvent;
    const activity$ = this.emitter.pipe(takeUntil(this.destroy$), filter(notDestroyEvents));

    // Cache the event by its type
    activity$.subscribe((e: EmitEvent<unknown>) => {
      this.cache[e.type] = e;
    });
  }
}
