import React, { useEffect, useCallback, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await fetch(url).then((data) => data.json());
      await setData((prev) => {
        return [...new Set([...prev, ...res.docs.map((d) => d.title)])];
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    console.log(url);
    sendQuery(url);
  }, [url]);

  return { data, error, loading };
}
