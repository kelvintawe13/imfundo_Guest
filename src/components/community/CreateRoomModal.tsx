import { useState } from 'react';
import { MessagesSquareIcon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { interestCatalog, interestById, MAX_ROOM_INTERESTS } from '../../data/interests';
import { createCommunityRoom } from '../../utils/community';
import type { CommunityRoom } from '../../types/community';

type CreateRoomModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (room: CommunityRoom) => void;
};

const emojiChoices = ['💬', '☀️', '➗', '⚗️', '💻', '⌨️', '🤖', '🎤', '💡', '🎓', '⚽', '🎨', '📄'];

const emptyForm = {
  name: '',
  description: '',
  emoji: '💬',
  interests: [] as string[]
};

export function CreateRoomModal({ open, onClose, onCreated }: CreateRoomModalProps) {
  const [name, setName] = useState(emptyForm.name);
  const [description, setDescription] = useState(emptyForm.description);
  const [emoji, setEmoji] = useState(emptyForm.emoji);
  const [interests, setInterests] = useState<string[]>(emptyForm.interests);
  const [error, setError] = useState('');

  const reset = () => {
    setName(emptyForm.name);
    setDescription(emptyForm.description);
    setEmoji(emptyForm.emoji);
    setInterests([]);
    setError('');
  };

  const close = () => {
    reset();
    onClose();
  };

  const toggleInterest = (id: string) => {
    setError('');
    setInterests((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= MAX_ROOM_INTERESTS) return current;
      return [...current, id];
    });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = createCommunityRoom({
      name,
      description,
      emoji,
      interests,
      accent: interestById(interests[0])?.accent ?? 'teal'
    });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    reset();
    onCreated(result.room);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Create a study room"
      description="Start a space for learners who share your interests."
      icon={<MessagesSquareIcon className="h-4 w-4" />}
      footer={
        <>
          <button type="button" onClick={close} className="btn-secondary !py-1.5 text-xs">
            Cancel
          </button>
          <button
            type="submit"
            form="create-room-form"
            disabled={!name.trim() || interests.length === 0}
            className="btn-primary !py-1.5 text-xs">
            Create room
          </button>
        </>
      }>
      <form id="create-room-form" onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="room-name" className="field-label">
            Room name
          </label>
          <input
            id="room-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="field"
            placeholder="Grade 12 maths sprint"
            maxLength={48}
          />
        </div>

        <div>
          <label htmlFor="room-description" className="field-label">
            What is it for? <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            id="room-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={2}
            maxLength={160}
            className="field !mt-0 resize-none"
            placeholder="A quiet space to work through past papers together."
          />
        </div>

        <fieldset>
          <legend className="field-label">Room icon</legend>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {emojiChoices.map((choice) => (
              <button
                key={choice}
                type="button"
                aria-pressed={emoji === choice}
                aria-label={`Use ${choice} as the room icon`}
                onClick={() => setEmoji(choice)}
                className={`grid h-8 w-8 place-items-center rounded-lg border-2 text-base transition-colors ${
                  emoji === choice
                    ? 'border-ink bg-sun text-ink shadow-pop-sm'
                    : 'border-ink/20 bg-slate-950/40 hover:border-ink hover:bg-sun-light'
                }`}>
                <span aria-hidden="true">{choice}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="field-label">
            Interests <span className="font-normal text-slate-400">(pick 1–{MAX_ROOM_INTERESTS})</span>
          </legend>
          <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
            Learners who choose these interests see the room first.
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {interestCatalog.map((interest) => {
              const active = interests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleInterest(interest.id)}
                  className={`inline-flex items-center gap-1 rounded-full border-2 px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    active
                      ? 'border-ink bg-sun text-ink shadow-pop-sm'
                      : 'border-ink/20 bg-slate-950/40 text-slate-400 hover:border-ink hover:bg-sun-light hover:text-ink'
                  }`}>
                  <span aria-hidden="true">{interest.emoji}</span>
                  {interest.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="rounded-xl border-2 border-danger/40 bg-coral/10 px-3 py-2 text-xs font-semibold text-danger">
            {error}
          </p>
        )}

        <p className="rounded-xl border-2 border-dashed border-ink/15 px-2.5 py-2 text-[11px] leading-snug text-slate-500">
          Rooms are visible to learners in this browser. Never share phone numbers, addresses or photos. A teacher can
          review rooms that learners report.
        </p>
      </form>
    </Modal>
  );
}
