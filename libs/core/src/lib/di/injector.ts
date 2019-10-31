import { Provider } from './injector.interfaces';
import { DependencyInjector } from './injector.interfaces';

/**
 * Utility function used to easily create 1..n injectors; each with thier
 * own singletons and provider registry.
 */
export function makeInjector(registry: Provider[]): DependencyInjector {
  return new Injector(registry);
}

/**
 * Injector class that manages a registry of Providers and a registry
 * of singleton instances [singletons for the instance of the injector]
 */
class Injector implements DependencyInjector {
  private singletons = new WeakMap();

  constructor(private providers: Provider[] = []) {
    this.addProviders(providers);
  }

  /**
   * Lookup singleton instance using token
   * Optionally create instance and save as singleton if needed
   */
  get(token: any): any {
    return this.findAndMakeInstance(token);
  }

  /**
   * Create an instance of the token based on the Provider configuration
   */
  instanceOf(token: any): any {
    const makeWithClazz = (clazz: any) => (clazz ? new clazz(...deps) : null);
    const makeWithFactory = (fn: () => any) => (fn ? fn.call(null, deps) : null);
    const provider = this.findLastRegistration(token, this.providers);
    const deps = provider && provider.deps ? provider.deps.map(it => this.instanceOf(it)) : [];

    return provider && (provider.useValue || makeWithClazz(provider.useClass) || makeWithFactory(provider.useFactory));
  }

  /**
   * Dynamically allow Provider registrations and singleton overwrites
   * @param registry
   */
  addProviders(registry: Provider[]) {
    this.providers = this.providers.concat(registry);
    registry.map(it => this.singletons.delete(it.provide));
  }

  // *************************************************
  // Private  Methods
  // *************************************************

  /**
   * Find last Provider registration (last one wins)
   */
  private findLastRegistration(token: any, list: Provider[]) {
    const registry = this.providers.filter(it => it.provide === token);
    return registry.length ? registry[registry.length - 1] : null;
  }

  /**
   * Based on provider registration, create instance of token and save
   * as singleton value.
   * @param token Class, value, or factory
   */
  private findAndMakeInstance(token: any): any {
    let result = this.singletons.get(token) || this.instanceOf(token);
    this.singletons.set(token, result);
    return result;
  }
}
