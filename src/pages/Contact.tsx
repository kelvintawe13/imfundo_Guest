import { MailIcon, MapPinIcon, SchoolIcon } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ContactForm } from '../components/ContactForm';
import { images } from '../data/images';

const details = [
  { icon: MailIcon, label: 'Email', value: 'hello@imfundoquest.co.za', color: 'bg-teal-light' },
  { icon: MapPinIcon, label: 'Based in', value: 'Idutywa, Eastern Cape', color: 'bg-sun-light' },
  {
    icon: SchoolIcon,
    label: 'Who we work with',
    value: 'High schools, teachers and community partners',
    color: 'bg-sky-light',
  },
];

export function Contact() {
  return (
    <>
      <PageHero
        tone="Contact"
        title="Get in touch"
        subtitle="Questions, partnerships or a school that wants to join the pilot? We'd love to hear from you."
        image={images.group}
        imageAlt="Cartoon teacher sharing a phone with excited learners"
      />
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.2fr] lg:py-12">
          <div>
            <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">Contact details</h2>
            <p className="mt-3 max-w-sm text-sm text-ink-soft">
              We are a small team prototyping in the Eastern Cape. Email is the fastest way to reach us.
            </p>
            <ul className="mt-6 space-y-4">
              {details.map(({ icon: Icon, label, value, color }) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-white p-4">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink ${color}`}>
                    <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</p>
                    <p className="font-display text-sm font-bold text-ink">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
