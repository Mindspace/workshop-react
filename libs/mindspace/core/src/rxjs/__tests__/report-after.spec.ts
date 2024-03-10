import { lastValueFrom, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { reportAfter, reportBefore } from '../report-after.utils';

describe('Event Reporting', () => {
  const getTime = () => new Date().valueOf();

  describe('reportBefore()', () => {
    it('should NOT pass target emission to notifyBefore callback', async () => {
      const startTime = getTime().valueOf();
      const notifyBefore = jest.fn();
      const requestEmission = jest.fn();

      const request$ = of(startTime).pipe(tap(requestEmission));
      const value = await lastValueFrom(reportBefore(request$, notifyBefore));

      expect(requestEmission).toHaveBeenCalledWith(value);
      expect(notifyBefore).toHaveBeenCalledWith(); // no arguments
    });

    it('should trigger the notifyBefore BEFORE the stream value emits', (done) => {
      let callbackTime = 0;
      const stream$ = of(1).pipe(
        delay(250),
        map(() => getTime().valueOf())
      );
      const notifyBefore = () => (callbackTime = getTime().valueOf());

      lastValueFrom(reportBefore(stream$, notifyBefore)).then((streamTime) => {
        expect(streamTime).toBeGreaterThan(callbackTime);
        done();
      });
    });

    it('should trigger the notifyBefore BEFORE the stream emits', async () => {
      let value = 0;
      const stream$ = of(1).pipe(tap(() => ++value));
      const notifyCallback = () => ++value;

      const output = await lastValueFrom(reportBefore(stream$, notifyCallback));
      expect(output).toBe(1);
    });
  });

  describe('reportAfter()', () => {
    it('should pass target emission to notifyAfter callback', async () => {
      const startTime = getTime().valueOf();
      const notifyAfter = jest.fn();
      const requestEmission = jest.fn();

      const request$ = of(startTime).pipe(tap(requestEmission));
      const value = await lastValueFrom(reportAfter(request$, notifyAfter));

      expect(requestEmission).toHaveBeenCalledWith(value);
      expect(notifyAfter).toHaveBeenCalledWith(value);
    });

    it('should emit notifyCallback response if defined', async () => {
      const startTime = getTime().valueOf();
      const notifyCallback = jest.fn();
      await lastValueFrom(reportAfter(of(startTime), notifyCallback));

      expect(notifyCallback).toHaveBeenCalled();
    });

    it('should emit stream value if notifyCallback response is undefined', async () => {
      const startTime = getTime().valueOf();
      const notifyCallback = jest.fn();
      const notifyResponse = await lastValueFrom(reportAfter(of(startTime), notifyCallback));

      expect(notifyResponse).toBe(startTime);
    });

    it('should call the notifyCallback AFTER the stream value emits', (done) => {
      let notifyTime = 0;
      const startTime = getTime().valueOf();
      const stream$ = of(startTime).pipe(delay(250));
      const notifyCallback = () => (notifyTime = getTime().valueOf());

      lastValueFrom(reportAfter(stream$, notifyCallback)).then(() => {
        setTimeout(() => {
          expect(notifyTime).toBeGreaterThan(startTime);
          done();
        }, 300);
      });
    });

    it('should call the notifyCallback AFTER the stream completes', async () => {
      let value = 0;
      const stream$ = of(1).pipe(tap(() => ++value));
      const notifyCallback = () => ++value;

      const output = await lastValueFrom(reportAfter(stream$, notifyCallback));
      expect(output).toBe(1);
      expect(value).toBe(2);
    });
  });
});
