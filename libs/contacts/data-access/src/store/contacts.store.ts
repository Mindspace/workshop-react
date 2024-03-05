/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreApi } from 'zustand/vanilla';
import { InjectionToken, UpdateState, computeWith, initStoreState, makeStore } from '@mindspace/core';

import { ContactsService } from '../api';
import { ContactsAPI, ContactsComputedState, ContactsState, ContactsViewModel } from './contacts.state';

// *******************************************************************
// initializers
// *******************************************************************

const initState = (): ContactsState => ({
  ...initStoreState(),
  people: [],
  criteria: '',
  selectedId: '',
});

// *******************************************************************
// Dependency Injection Tokens/Types
// *******************************************************************

export type ContactsStore = StoreApi<ContactsViewModel>;
export const ContactsStoreToken = new InjectionToken<ContactsStore>('ContactsStore');

// *******************************************************************
// ContactsStore Factory
// *******************************************************************

/**
 * Create an instance of the Zustand store engine for Contacts
 */
export function buildContactsStore(service: ContactsService): ContactsStore {
  // Recalculate our computed properties each time the state changes
  const buildComputedFn = ({ people, selectedId }: ContactsState): ContactsComputedState => {
    const selected = people.find((it) => it.id === selectedId);
    return {
      selected,
    };
  };

  /**
   * Factory to create a Zustand Reactive ContactsStore; which emits a ContactsViewModel
   * NOTE: the three (3) parameters (set, get, store) are provided by the
   *       Zustand library during createStore(...)
   */
  const configureStore = (
    _: UpdateState<ContactsState>, // not currently used...
    get: () => ContactsState, // not currently used... use `set((state) => {})` instead
    store: ContactsStore,
  ): ContactsViewModel => {
    const set = computeWith<ContactsState>(buildComputedFn, store);

    const data: ContactsState = initState(); // Manually build the initial state
    const computed = buildComputedFn(data); // Manually compute the initial computed state
    const api: ContactsAPI = {
      searchBy: async (criteria: string) => {
        const people = await service.searchBy(criteria);
        set((draft: ContactsState) => ({
          ...draft,
          people,
          criteria,
        }));
        return true;
      },
      selectById: async (selectedId: string) => {
        set((state) => ({ ...state, selectedId }));
        return true;
      },
    };

    // !!Make initial load...
    api.searchBy(data.criteria);

    // Publish the initial ContactsStore view model
    return {
      ...data,
      ...computed,
      ...api,
    };
  };

  return makeStore<ContactsViewModel>(configureStore, 'store:contacts');
}
