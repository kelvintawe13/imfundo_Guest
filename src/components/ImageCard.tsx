export function ImageCard({ title, text, image, alt }: { title: string; text: string; image: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-pop">
      <img src={image} alt={alt} className="aspect-[4/3] w-full object-cover" />
      <div className="p-4">
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <p className="mt-1 text-sm text-ink-soft line-clamp-2">{text}</p>
      </div>
    </div>
  );
}
