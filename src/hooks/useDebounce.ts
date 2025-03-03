import { useEffect, useState } from 'react';

export const useDebounce = (value: string | undefined) => {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(
    value,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue ? debouncedValue.trim() : undefined;
};
