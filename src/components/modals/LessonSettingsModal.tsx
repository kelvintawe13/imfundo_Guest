import { useEffect, useState } from 'react';
import { Settings2Icon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Toggle } from '../ui/Toggle';
import { Segmented } from '../ui/Segmented';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import type { LessonSettings } from '../../types/app';

export function LessonSettingsModal() {
  const { modal, closeModal, settings, setSettings } = useApp();
  const { t } = useLanguage();
  const [draft, setDraft] = useState<LessonSettings>(settings);
  const open = modal === 'settings';

  useEffect(() => {
    if (open) setDraft(settings);
  }, [open, settings]);

  const update = <K extends keyof LessonSettings,>(k: K, v: LessonSettings[K]) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <Modal
      open={open}
      onClose={closeModal}
      title={t('lesson.settings')}
      description="Applies to every micro-lesson on this device."
      icon={<Settings2Icon className="h-4 w-4" />}
      footer={
      <>
          <button type="button" onClick={closeModal} className="btn-secondary">
            {t('common.cancel')}
          </button>
          <button
          type="button"
          onClick={() => {
            setSettings(draft);
            closeModal();
          }}
          className="btn-primary">
          
            {t('common.save')}
          </button>
        </>
      }>
      
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-100">Explanation language</p>
            <p className="mt-0.5 text-xs text-slate-400">Shown after each answer</p>
          </div>
          <Segmented
            label="Explanation language"
            value={draft.explanationLanguage}
            onChange={(v) => update('explanationLanguage', v)}
            options={[
            { value: 'en', label: 'English' },
            { value: 'xh', label: 'isiXhosa' },
            { value: 'both', label: 'Both' }]
            } />
          
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-100">Difficulty</p>
            <p className="mt-0.5 text-xs text-slate-400">Challenge doubles XP and removes hints</p>
          </div>
          <Segmented
            label="Difficulty"
            value={draft.difficulty}
            onChange={(v) => update('difficulty', v)}
            options={[
            { value: 'standard', label: 'Standard' },
            { value: 'challenge', label: 'Challenge' }]
            } />
          
        </div>
        <div className="divide-y divide-slate-800 border-t border-slate-800">
          <Toggle label="Sound effects" description="Play a tone on correct answers" checked={draft.sound} onChange={(v) => update('sound', v)} />
          <Toggle
            label="Show hints automatically"
            description="Reveal the hint before you answer"
            checked={draft.autoHints}
            onChange={(v) => update('autoHints', v)} />
          
          <Toggle label="Question timer" description="30 seconds; unanswered questions advance automatically" checked={draft.timer} onChange={(v) => update('timer', v)} />
          <Toggle label="Auto-advance after answering" description="Move on after 4 seconds; choose Next to move sooner" checked={draft.autoAdvance} onChange={(v) => update('autoAdvance', v)} />
        </div>
      </div>
    </Modal>);

}