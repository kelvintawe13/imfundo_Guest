export function Illustration({ src, alt, pop }: { src: string; alt: string; pop?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-2xl border-2 border-ink bg-white ${pop ? 'shadow-pop' : ''}`}>
      <img src={src} alt={alt} className="aspect-[4/3] w-full object-cover" />
    </div>
  );
}
