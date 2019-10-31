import { any } from 'prop-types';

export interface DependencyInjector {
  get: (token: any) => any;
  instanceOf: (token: any) => any;
  addProviders: (registry: Provider[]) => void;
}

export type Dep = any;

export interface Provider {
  provide: any;
  useClass?: any;
  useValue?: any;
  useFactory?: () => any;
  deps?: Dep[];
}
