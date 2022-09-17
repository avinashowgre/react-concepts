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
      await setData([...new Set([...res.docs.map((d) => d.title)])]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    sendQuery(url);
  }, [url]);

  return { data, error, loading };
}
