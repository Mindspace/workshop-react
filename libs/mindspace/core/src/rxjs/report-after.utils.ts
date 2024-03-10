/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, defer, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

// ************************************************************************************************
// Analytic Reporting Utils
// ************************************************************************************************

/**
 * Report 1st and then trigger observable activity
 *
 * @CODE
 *
 *  public updateFilters(uiFilters: SearchFilter[]): Promise<boolean> {
 *    const appliedFacets = this._searchService.getAppliedFilters(uiFilters);
 *    const state = atFirstPage({ ...this._store.getState(), appliedFacets });
 *
 *    const onReport = () => this.reportPageFilterChanges(state);
 *    const request$ = this.searchLearnings(state);
 *
 *    return reportBefore<boolean>(request$, onReport);
 *  }
 *
 */
export const reportBefore = <T = any>(target$: Observable<T>, reportStarting: () => void): Observable<T> => {
  return defer(() => {
    reportStarting(); // when suscription starts
    return target$;
  });
};

/**
 * Trigger observable activity and report each value emitted from the stream
 */
export const reportEach = <T = any, K = any>(target$: Observable<T>, notifyCallback: (response?: T) => K | T): Observable<T | K> => {
  return target$.pipe(
    map((value) => {
      return notifyCallback(value) || value;
    })
  );
};

/**
 * Trigger observable activity 1st and register a finalize 'reportDone' function
 * to be called when observable completes or errors; report lastValue or Error
 *
 * @CODE
 * public updateOrganization(selectedOrg: OrganizationModelIdentifier): Promise<boolean> {
 *   const orgId = selectedOrg.organizationId || undefined;
 *   const isExternalCat = selectedOrg.organizationId === undefined || false;
 *   const state = atFirstPage({
 *     ...this._store.getState(),
 *     orgId,
 *     isExternalCat,
 *   });
 *   const onReport = () => this.reportCriteriaChanges(state);
 *   const request$ = this.searchLearnings(state);
 *
 *   return reportAfter<boolean>(request$, onReport);
 * }
 *
 */
export const reportAfter = <T = any, K = any>(target$: Observable<T>, reportDone: (lastValue?: T) => K | T): Observable<T | K> => {
  let lastValue: T;

  return target$.pipe(
    tap((value) => (lastValue = value)),
    catchError((error: any) => {
      lastValue = error;
      return of(error);
    }),
    finalize(() => reportDone(lastValue))
  );
};
