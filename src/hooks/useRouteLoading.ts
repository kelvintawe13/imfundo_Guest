import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useRouteLoading(ms = 320) {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), ms);
    return () => window.clearTimeout(t);
  }, [pathname, ms]);

  return loading;
}