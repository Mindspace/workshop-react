import { useCallback } from 'react';
import { useZustandStore, inject } from '@mindspace/core';

import { Contact } from '../api';
import { ContactsStore, ContactsStoreToken } from './contacts.store';
import { ContactsViewModel, ContactsState } from './contacts.state';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type NullableContact = Contact | undefined;

/**
 * Subscribe to entire Contacts store ViewModel
 * @returns [ContactsViewModel, ContactsAPI]
 */
export function useContacts() {
  const store = inject<ContactsStore>(ContactsStoreToken);
  const vm = useZustandStore<ContactsViewModel>(store);

  const searchBy = useCallback(
    (e: InputChangeEvent) => {
      return vm.searchBy(e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vm.searchBy],
  );
  const selectById = vm.selectById;

  return [vm, { searchBy, selectById }] as const;
}

export function useSelectedContact() {
  const store = inject<ContactsStore>(ContactsStoreToken);
  const { selected } = useZustandStore<ContactsViewModel>(store);

  return selected;
}

/**
 * Custom React Hook useful to load Contact details
 */
export function useContactDetails(id: string) {
  const selector = useCallback(
    (state: ContactsState): NullableContact => {
      return state.people.find((it) => it.id === id);
    },
    [id],
  );
  const store = inject<ContactsStore>(ContactsStoreToken);
  const contact = useZustandStore<ContactsViewModel, NullableContact>(store, selector);

  return contact;
}
