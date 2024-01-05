import { InjectionToken } from '../injector.token';

export class A {
  constructor(
    public msg: string,
    public title = 'A'
  ) {}
}
export class B {
  constructor(
    public a: A,
    public title = 'B'
  ) {}
}
export class C {
  constructor(
    public a: A,
    public title = 'C'
  ) {}
}
export class D {
  constructor(
    public b: B,
    public c: C,
    public title = 'D'
  ) {}
}
export class E {
  constructor(
    public d: D,
    public title = 'E'
  ) {}
}
export class F {
  constructor(
    public e: E,
    public a: A
  ) {}
}
export class G {
  constructor(
    public b: B,
    public title = 'G'
  ) {}
}
export class H {
  constructor(public g: G) {}
}
export class J {
  constructor(public title = 'J') {}
}

export class Store {}
export class Query {
  constructor(public store: Store) {}
}
export class Facade {
  constructor(
    public store: Store,
    public query: Query
  ) {}
}

export class MockB {
  a = { title: 'MockA' };
  constructor(
    public msg: string,
    public title = 'MockB'
  ) {}
}

export const HookToken = new InjectionToken('[Hook] Test function requests');
