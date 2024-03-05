import { DependencyInjector, makeInjector } from '@mindspace/di';
import { API_ENDPOINT, API_KEY, ContactsService } from '../api';

/**
 * Dependency injector with registered Contacts services
 */
export const buildInjector = (): DependencyInjector => {
  return makeInjector([
    { provide: API_ENDPOINT, useValue: 'https://uifaces.co/api?limit=25;' },
    { provide: API_KEY, useValue: '873771d7760b846d51d025ac5804ab' },
    { provide: ContactsService, useClass: ContactsService, deps: [API_ENDPOINT, API_KEY] },
  ]);
};