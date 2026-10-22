import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { GridPattern } from '../ui/GridPattern';

export function FounderCta() {
  const { openModal } = useApp();
  const { t } = useLanguage();

  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="relative mx-auto grid max-w-7xl gap-4 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60 p-3 sm:p-5 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <GridPattern className="text-slate-800/40" size={28} />
        <figure className="relative">
          <blockquote className="text-base font-medium leading-relaxed text-slate-100 sm:text-lg">
            “I ran holiday classes in the Eastern Cape with no internet for homework. This is the tutor I wish I’d had.”
          </blockquote>
          <figcaption className="mt-2.5 flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/20 text-[11px] font-semibold text-primary-soft">S</span>
            <span className="text-xs">
              <span className="block font-semibold text-slate-100">Siphelele</span>
              <span className="text-slate-400">Founder · African Leadership University</span>
            </span>
          </figcaption>
        </figure>
        <div className="relative lg:justify-self-end">
          <p className="text-xs text-slate-400">The Idutywa pilot is open to Grade 10–12 schools.</p>
          <button type="button" onClick={() => openModal('partner')} className="btn-primary mt-2">
            {t('cta.partner')}
          </button>
        </div>
      </div>
    </section>);
}
