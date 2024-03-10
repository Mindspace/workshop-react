/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react';
import { InjectorContext } from './injector.context';
import { DependencyInjector, Token } from './injector.interfaces';

export type HookTuple<V, I extends DependencyInjector> = [V, I]; // Array of value + injector

/**
 * !! This is useful when a DependencyInjectionProvider is NOT available
 *
 * `useInjectorHook()` allows applications to build custom hooks that internally use
 * dependency injection to access singleton services, values, etc.
 *
 * A configured injector instance is required along with and a lookup token.
 * What is returned is a tuple containing the singleton instance and the injector.
 *
 * @code
 *   const injector: DependencyInjector = makeInjector([
 *     { provide: API_KEY, useValue: '873771d7760b846d51d5ac5804ab' },
 *     { provide: API_ENDPOINT, useValue: 'https://uifaces.co/api?limit=25' },
 *     { provide: ContactsService, useClass: ContactsService, deps: [API_ENDPOINT, API_KEY] }
 *   ]);
 *
 *   export function useContactsHook(token: any): HookTuple {
 *     return useInjectorHook(token, injector);
 *   }
 *
 * @param injector Custom DependencyInjector
 * @param token Token type of string, Class, or InjectionToken
 */
export function useInjectorHook<T extends Token>(
  token: T,
  injector: DependencyInjector,
): HookTuple<any, DependencyInjector>;
export function useInjectorHook<T extends Token, V>(
  token: T,
  injector: DependencyInjector,
): HookTuple<V, DependencyInjector> {
  return [injector.get(token) as V, injector];
}

/**
 * Return either the injector instance or the token lookup FROM the
 * injector.
 *
 * A configured injector instance is required along with and a lookup token.
 * What is returned is a tuple containing the singleton instance and the injector.
 *
 * @code
 *   const injector: DependencyInjector = makeInjector([
 *     { provide: API_KEY, useValue: '873771d7760b846d51d5ac5804ab' },
 *     { provide: API_ENDPOINT, useValue: 'https://uifaces.co/api?limit=25' },
 *     { provide: ContactsService, useClass: ContactsService, deps: [API_ENDPOINT, API_KEY] }
 *   ]);
 *
 *   // Hide how DI is used under the hood
 *   // NOTE: The requires a DependencyInjectionProvider to be used for DI lookups
 *
 *   export function useContactsHook(): ContactsService {
 *     return useDependencyInjector<ContactsService>(ContactsService)
 *   }
 *
 * @returns T is either the DependencyInjector or the injector token lookup.
 */
export const useDependencyInjector = <T>(token?: Token): T => {
  const injector = useContext(InjectorContext);

  return (!token ? injector : injector.get(token)) as T;
};

// Simple alias
export const useDI = <T>(token?: Token): T => useDependencyInjector<T>(token);
