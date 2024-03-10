import { StoreApi } from 'zustand';
import { StoreState } from './store.state';

// *****************************************************
// Computed State Helpers
// *****************************************************

export type UpdateStateCallback<T> = (state: T) => T | Partial<T>;
export type UpdateState<T = unknown> = (state: T | Partial<T> | UpdateStateCallback<T>, replace?: boolean) => void;

export type ComputeState<S, CS> = (state: S) => CS;

/**
 * This is not middleware, but a utility function to add "derived property" functionality
 * to a a store. Derived properties are computed properties that are based on the state of the store.
 *
 * Anytime the state is set, we will automatically recompute the derived properties.
 */
export function computeWith<S extends StoreState, CS = unknown>(
  buildComputed: ComputeState<S, CS>,
  store: StoreApi<S>,
): UpdateState<S> {
  const origSetState = store.setState;

  // Set state updates & updated computed fields
  const setWithComputed = (update: S | Partial<S> | UpdateStateCallback<S>, replace?: boolean) => {
    origSetState((state: S) => {
      const updated = typeof update === 'object' ? update : update(state);
      const computedState = buildComputed({ ...state, ...(updated || {}) }); // tail hook original update() fn to add computed state
      return { ...updated, ...computedState };
    }, replace);
  };

  /**
   * Override store::set() method to tail-hook and compute properties
   *
   * Note: this override [on the store instance] is required to support external `store.setState()` calls
   *       and force re-calculations of computed properties.
   */
  store.setState = setWithComputed;

  return setWithComputed;
}
