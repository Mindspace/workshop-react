import { Observable, defer, timer } from 'rxjs';
import { delayWhen } from 'rxjs/operators';

/**
 * Delay emission by maximum 'delayBy' milliseconds.
 *
 * If the source emission takes too long (> 'delayBy' milliseconds),then
 * do NOT delay the subsequent emission.
 */
export function delayAtLeast<T>(delayBy: number) {
  return function (source: Observable<T>) {
    return defer(() => {
      const start = Date.now(); // at the time of subscription

      return source.pipe(
        delayWhen<T>(() => {
          // allow millisecond values between 0 - delayBy
          const calculatedDelay = Math.max(delayBy - (Date.now() - start), 0);

          return timer(calculatedDelay);
        })
      );
    });
  };
}
