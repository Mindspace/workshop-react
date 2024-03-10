import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Check localStorage for darkMode setting, fallback to OS prefers-dark-mode
 * Keep <html dark=""> synchronized with cached value or OS preferences
 */
export function useThemeMode(autoCache = true, cacheKey = 'theme-mode'): [ThemeMode, (mode: ThemeMode) => void] {
  const prefersDarkMode = usePrefersDarkTheme();
  const [modeInCache, saveModeToCache] = useLocalStorage(cacheKey, 'system');
  const [currentMode, setCurrentMode] = useState<ThemeMode>(modeInCache);

  const activateThemeMode = useCallback(
    (mode: ThemeMode) => {
      if (typeof window !== 'undefined') {
        const enableDark = mode === 'dark' || (mode === 'system' && prefersDarkMode);

        document.querySelector('html')?.classList.toggle('dark', enableDark);
        autoCache && saveModeToCache(mode);
      }
      setCurrentMode(mode);
    },
    [autoCache, prefersDarkMode, setCurrentMode, saveModeToCache]
  );

  useEffect(() => {
    // When prefersDarkMode changes, then activate correct theme mode
    activateThemeMode(currentMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDarkMode, activateThemeMode]);

  return [currentMode, activateThemeMode];
}

/**
 * Compose our useMedia hook to detect if OS dark mode is preferred/active
 */
function usePrefersDarkTheme(): boolean {
  return useMedia<boolean>(['(prefers-color-scheme: dark)'], [true], false);
}

/**
 * For 1..n mediaQueries, set specified value
 * when the matchquery actives
 */
export function useMedia<T>(queries: string[], values: T[], defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  const mediaQueryLists = queries ? queries.map((q) => window.matchMedia(q)) : [];
  const getQueryValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);

    return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState(getQueryValue);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    /**
     * Note: By defining getQueryValue outside of useEffect we ensure that it has
     * current values of hook args (as this hook callback is created once on mount).
     */

    const handler = () => setValue(getQueryValue);
    const stopAllListeners = () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));

    mediaQueryLists.forEach((mql) => mql.addListener(handler));

    return stopAllListeners;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
}
