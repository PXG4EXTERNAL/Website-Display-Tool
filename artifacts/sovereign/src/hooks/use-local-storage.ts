import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new CustomEvent('local-storage', { detail: { key } }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleCustom = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string }>).detail;
      if (detail?.key !== key) return;
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? (JSON.parse(item) as T) : initialValue);
      } catch {
        setStoredValue(initialValue);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        setStoredValue(e.newValue ? (JSON.parse(e.newValue) as T) : initialValue);
      } catch {
        setStoredValue(initialValue);
      }
    };

    window.addEventListener('local-storage', handleCustom);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('local-storage', handleCustom);
      window.removeEventListener('storage', handleStorage);
    };
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}
