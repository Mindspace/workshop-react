/*
 * Polyfill stable language features.
 * It's recommended to use @babel/preset-env and browserslist
 * to only include the polyfills necessary for the target browsers.
 */
import 'core-js/stable';

import 'regenerator-runtime/runtime';

/* eslint-disable  @typescript-eslint/no-explicit-any */

/**
 * This file contains polyfills loaded on all browsers
 **/
(window as any).process = {
  env: {}
};
