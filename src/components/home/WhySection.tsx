import { SectionHeading } from '../SectionHeading';
import { ImageCard } from '../ImageCard';
import { features } from '../../data/site';

export function WhySection() {
  return (
    <section className="bg-teal-light">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
        <SectionHeading
          title="Why Imfundo Quest"
          text="Learners have phones. What they often don't have is data, Wi-Fi or steady power. Imfundo Quest is built around that reality."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <ImageCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
