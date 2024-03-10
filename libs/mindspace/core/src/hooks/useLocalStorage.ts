import { useCallback, useState } from 'react';

/**
 * Get cached value by 'key' and return setter function
 */
export function useLocalStorage(key: string, initialValue?: unknown) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        // Get and parse value from local storage by key
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
      }
    }
    return initialValue;
  });

  const setValue = useCallback(
    (value: (val: number) => number | number | string) => {
      try {
        const isFunction = value instanceof Function; // Allow value to be a function so we have same API as useState
        const valueToStore = isFunction ? value(storedValue) : value;

        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [key, storedValue, setStoredValue]
  );
  return [storedValue, setValue];
}
