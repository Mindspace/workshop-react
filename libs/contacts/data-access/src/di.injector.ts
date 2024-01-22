import { DependencyInjector, makeInjector } from '@mindspace/di';
import { ContactsService } from './services';

/**
 * Dependency injector with registered Contacts services
 */
export const buildInjector = (): DependencyInjector => {
  return makeInjector([{ provide: ContactsService, useClass: ContactsService }]);
};
