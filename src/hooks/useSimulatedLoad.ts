import { useEffect, useRef, useState } from 'react';

export function useSimulatedLoad(key: unknown, ms = 450, skipInitial = false) {
  const [loading, setLoading] = useState(!skipInitial);
  const first = useRef(true);

  useEffect(() => {
    if (first.current && skipInitial) {
      first.current = false;
      return;
    }
    first.current = false;
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), ms);
    return () => window.clearTimeout(t);
  }, [key, ms, skipInitial]);

  return loading;
}