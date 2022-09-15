import React from 'react';

import { useDebounce } from './hooks/useDebounce';

export function Debounce() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  const apiCall = (searchTerm) => {
    console.log(searchTerm, Date.now());
  };

  React.useEffect(() => {
    apiCall(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Entered Text: {debounceSearchTerm}</p>
    </>
  );
}
