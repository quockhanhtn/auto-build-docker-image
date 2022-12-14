import type { Dispatch, SetStateAction } from 'react';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

// Hook
export default function useLocalStorage<S>(key: string, defaultValue: S): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(defaultValue);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
