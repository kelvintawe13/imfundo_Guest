import { useState } from 'react';
import { CircleCheckIcon, SendIcon } from 'lucide-react';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card-pop flex flex-col items-center justify-center p-8 text-center" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-teal-light">
          <CircleCheckIcon className="h-7 w-7 text-ink" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-display text-xl font-extrabold">Message sent</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Thanks for reaching out. We usually reply within five school days.
        </p>
        <button type="button" onClick={() => setSent(false)} className="btn-pop-ghost mt-6">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="card-pop p-5 sm:p-6">
      <h2 className="font-display text-xl font-extrabold sm:text-2xl">Send us a message</h2>
      <p className="mt-1 text-sm text-ink-soft">Tell us about your school or ask us anything.</p>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="field-label-pop" htmlFor="name">
            Name
          </label>
          <input id="name" name="name" type="text" className="field-pop" placeholder="Your name" required />
        </div>
        <div>
          <label className="field-label-pop" htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" className="field-pop" placeholder="your@email.com" required />
        </div>
        <div>
          <label className="field-label-pop" htmlFor="subject">
            Subject
          </label>
          <input id="subject" name="subject" type="text" className="field-pop" placeholder="How can we help?" />
        </div>
        <div>
          <label className="field-label-pop" htmlFor="message">
            Message
          </label>
          <textarea id="message" name="message" rows={4} className="field-pop" placeholder="Tell us more..." required />
        </div>
        <button type="submit" className="btn-pop w-full">
          Send message <SendIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
