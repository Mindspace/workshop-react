import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { StoreApi, createStore } from 'zustand/vanilla';
import { StoreState } from './store.state';
import { UpdateState } from './store.computed';

const requests$: Record<string, Promise<unknown> | undefined> = {};

export type AsyncFunction<T> = () => Promise<T>;

export const waitFor = async <T, U = T>(id: string, makeRequest: AsyncFunction<U>): Promise<U> => {
  if (requests$[id]) return requests$[id] as Promise<U>;

  requests$[id] = makeRequest();
  const results = await requests$[id];

  delete requests$[id];

  return results as U;
};

export const isWaitingFor = (id: string) => !!requests$[id];

export function upsert<T extends { id: string }>(item: T, target: T[]) {
  const existing = target.find((it) => it.id === item.id);
  return existing ? target.map((it) => (it.id === item.id ? item : it)) : [...target, item];
}

// *******************************************************************
// Store Factory to automatically add devtools and immer middleware
// *******************************************************************

export type ConfigureStore<State extends StoreState, VM> = (
  set: UpdateState<State>,
  get: () => State,
  store: StoreApi<VM>,
) => VM;

/**
 * Enable the ReactiveStore with Redux DevTools, and persistence to localStorage,
 * and ensure the ViewModel is immutable using Immer
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeStore = <VM>(configureStore: ConfigureStore<any, VM>, name: string): StoreApi<VM> => {
  // prettier-ignore
  return  createStore<StoreState>()(
    devtools(
        immer(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          configureStore as any
        ), 
        { name }
      )
  ) as unknown as StoreApi<VM>
};
