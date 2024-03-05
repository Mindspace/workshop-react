import { DependencyInjector, makeInjector } from '@mindspace/core';
import { API_ENDPOINT, API_KEY, ContactsService } from '../api';
import { ContactsStoreToken, buildContactsStore } from '../store/contacts.store';

/**
 * Dependency injector with registered Contacts services
 */
export const buildInjector = (): DependencyInjector => {
  return makeInjector([
    { provide: API_ENDPOINT, useValue: 'https://uifaces.co/api?limit=25;' },
    { provide: API_KEY, useValue: '873771d7760b846d51d025ac5804ab' },
    { provide: ContactsService, useClass: ContactsService, deps: [API_ENDPOINT, API_KEY] },
    { provide: ContactsStoreToken, useFactory: buildContactsStore, deps: [ContactsService] },
  ]);
};
