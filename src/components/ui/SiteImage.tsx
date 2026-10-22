import { useState } from 'react';

const FALLBACK = '/images/connectivity.png'; // the one real image, shared until per-slot art is added

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Image slot component. Loads its PNG from public/images/<name>.png and,
 * while that file does not exist yet, falls back to connectivity.png.
 * Adding real art later needs no code change: drop the file in.
 */
export function SiteImage({ src, alt, className = '' }: SiteImageProps) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setCurrent(FALLBACK)} />);

}
