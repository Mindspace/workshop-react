import { useCallback } from 'react';
import { useZustandStore, inject } from 'libs/mindspace/core/src';

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

  const searchBy = useCallback((e: InputChangeEvent) => vm.searchBy(e.target.value), [vm]);
  const selectById = vm.selectById;

  return [vm, { searchBy, selectById }] as const;
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
