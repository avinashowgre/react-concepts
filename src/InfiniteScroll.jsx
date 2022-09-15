import React, { useEffect, useCallback, useRef, useState } from 'react';

import { useDebounce, useFetch } from './hooks';

const DEBOUNCE_DELAY = 1000;

export function InfiniteScroll() {
  const [query, setQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const debounceSearchQuery = useDebounce(query, DEBOUNCE_DELAY);
  const { data, error, loading } = useFetch(
    `https://openlibrary.org/search.json?q=${debounceSearchQuery}&page=${pageNum}`
  );
  const loader = useRef(null);

  const handleChange = ({ target }) => {
    const { value } = target;
    setQuery(value);
    setPageNum(1);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPageNum((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className="container">
      <h1>Search Book</h1>
      <input type="text" onChange={handleChange} value={query} />
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>
      <div ref={loader} />
    </div>
  );
}
