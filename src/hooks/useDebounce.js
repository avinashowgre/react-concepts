import React from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedVal, setDebouncedVal] = React.useState('');
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, value]);
  return debouncedVal;
};
