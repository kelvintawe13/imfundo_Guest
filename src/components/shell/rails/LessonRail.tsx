import { CheckIcon, FlameIcon, LightbulbIcon, LockIcon, Settings2Icon, ZapIcon } from 'lucide-react';
import { RailSection } from '../RailSection';
import { lessonPath, lessonTips } from '../../../data/rail';
import { useApp } from '../../../contexts/AppContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { quizMeta, quizQuestions } from '../../../data/quiz';

const langLabel = { en: 'English', xh: 'isiXhosa', both: 'English + isiXhosa' };

export function LessonRail() {
  const { lessonStats: s, settings, openModal, quizProgress } = useApp();
  const { t } = useLanguage();
  const progress = quizProgress[quizMeta.lessonId];
  const answered = s.finished ? s.total : progress
    ? Math.min(quizQuestions.length, progress.index + (progress.checked ? 1 : 0))
    : s.index;

  return (
    <>
      <RailSection title={t('shell.progress')}>
        <p className="text-sm text-slate-300">
          {s.finished ? 'Lesson complete' : `Question ${s.index + 1} of ${s.total}`}
        </p>
        <div className="mt-2 flex gap-1" aria-hidden="true">
          {Array.from({ length: s.total }).map((_, i) =>
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i < answered ? 'bg-success' : 'bg-slate-800'}`} />
          )}
        </div>
        <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-slate-800/60 py-2">
            <dd className="flex items-center justify-center gap-1 font-semibold text-success-soft">
              <ZapIcon className="h-3.5 w-3.5" />
              {s.xp}
            </dd>
            <dt className="text-[11px] text-slate-500">XP</dt>
          </div>
          <div className="rounded-lg bg-slate-800/60 py-2">
            <dd className="flex items-center justify-center gap-1 font-semibold">
              <FlameIcon className="h-3.5 w-3.5 text-warn" />
              {s.combo}
            </dd>
            <dt className="text-[11px] text-slate-500">Combo</dt>
          </div>
          <div className="rounded-lg bg-slate-800/60 py-2">
            <dd className="font-semibold">{s.correct}</dd>
            <dt className="text-[11px] text-slate-500">Correct</dt>
          </div>
        </dl>
      </RailSection>

      <RailSection title="Lesson details">
        <p className="text-sm font-semibold leading-snug text-slate-100">{quizMeta.title}</p>
        <dl className="mt-3 space-y-2 text-xs">
          {[
            ['Lesson ID', quizMeta.lessonId.toUpperCase()],
            ['Subject', quizMeta.subject],
            ['Grade', quizMeta.grade],
            ['Unit', quizMeta.unit],
            ['Est. time', `${quizMeta.estimatedMinutes} min`]
          ].map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-3">
              <dt className="shrink-0 text-slate-500">{label}</dt>
              <dd className={`text-right text-slate-300 ${label === 'Lesson ID' ? 'font-mono' : ''}`}>{value}</dd>
            </div>
          ))}
        </dl>
      </RailSection>

      <RailSection title="Unit path · Quadratics">
        <ol className="space-y-2.5">
          {lessonPath.map((step) =>
          <li key={step.title} className="flex items-center gap-3">
              <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
              step.state === 'done' ?
              'border-success bg-success text-white' :
              step.state === 'current' ?
              'border-primary bg-primary/15 text-primary-soft' :
              'border-slate-700 text-slate-500'}`
              }>
              
                {step.state === 'done' ?
              <CheckIcon className="h-3.5 w-3.5" /> :
              step.state === 'locked' ?
              <LockIcon className="h-3 w-3" /> :

              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              }
              </span>
              <span className={`text-sm ${step.state === 'locked' ? 'text-slate-500' : 'text-slate-200'}`}>{step.title}</span>
            </li>
          )}
        </ol>
      </RailSection>

      <RailSection
        title="Settings"
        action={
        <button type="button" onClick={() => openModal('settings')} className="flex items-center gap-1 text-xs font-medium text-primary-soft hover:underline">
            <Settings2Icon className="h-3.5 w-3.5" /> Edit
          </button>
        }>
        
        <dl className="space-y-1.5 text-sm">
          {[
          ['Explanations', langLabel[settings.explanationLanguage]],
          ['Difficulty', settings.difficulty === 'challenge' ? 'Challenge (2× XP)' : 'Standard'],
          ['Timer', settings.timer ? '30s per question' : 'Off'],
          ['Auto-advance', settings.autoAdvance ? 'On' : 'Off']].
          map(([k, v]) =>
          <div key={k} className="flex justify-between gap-2">
              <dt className="text-slate-400">{k}</dt>
              <dd className="text-right text-slate-200">{v}</dd>
            </div>
          )}
        </dl>
      </RailSection>

      <RailSection title="Tips">
        <ul className="space-y-3">
          {lessonTips.map((tip) =>
          <li key={tip} className="flex gap-2 text-xs text-slate-400">
              <LightbulbIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warn" /> {tip}
            </li>
          )}
        </ul>
      </RailSection>
    </>);

}