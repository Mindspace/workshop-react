import { FC, ReactNode } from 'react';

import { InjectorContext } from './injector.context';
import { DependencyInjector } from './injector.interfaces';

/**s
 * Allows the injector instance to be 'passed' to the DIProvider HOC
 */
export interface DIProviderProps {
  injector: DependencyInjector;
  children?: ReactNode;
}

/**
 * Dependency Injection is the fundamental mechanism for management of non-UI
 * entities (services, constants, facades, etc). Great DI provides:
 *
 * - Configure of dependencies between entities
 * - On-Demand construction/instantiation of entities
 * - Caching
 * - Singleton or Factory Access
 * - Easy lookups from the View Hierarchy
 * - Easy lookups for the Business Layers
 *
 */
export const DependencyInjectionProvider: FC<DIProviderProps> = ({ injector, children }) => {
  return <InjectorContext.Provider value={injector}>{children}</InjectorContext.Provider>;
};
