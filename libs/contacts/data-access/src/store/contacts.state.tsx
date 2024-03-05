import { Contact } from '../api/contacts.model';
import { StoreState } from '@mindspace/core';

// *******************************************************************
// Types and initializers
// *******************************************************************

/**
 * This state is serializable
 */
export interface ContactsState extends StoreState {
  people: Contact[];
  criteria: string;
  selectedId: string;
}

/**
 * Read-only values computed from existing/updated state
 */
export interface ContactsComputedState {
  selected: Contact | undefined;
}

/**
 * This is a simple API meant for use within the
 * UI layer html templates
 */
export interface ContactsAPI {
  searchBy: (criteria: string) => Promise<boolean>;
  selectById: (id: string) => Promise<boolean>;
}

export type ContactsViewModel = ContactsState & ContactsAPI & ContactsComputedState;
