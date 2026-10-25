import { useState } from 'react';
import { FileUpIcon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { subjectFilters } from '../../data/lessons';
import { addCommunityPaper, sendCommunityMessage } from '../../utils/community';
import { fileToDataUrl, validateCommunityFile } from '../../utils/fileAttachment';
import { formatBytes } from '../../utils/localStorageStats';
import type { PastPaper, PastPaperKind } from '../../types/community';

type UploadPaperModalProps = {
  open: boolean;
  onClose: () => void;
  onUploaded: (paper: PastPaper) => void;
};

const kinds: PastPaperKind[] = ['Exam paper', 'Memo', 'Practice paper', 'Study notes'];
const grades = ['Grade 10', 'Grade 11', 'Grade 12'];

export function UploadPaperModal({ open, onClose, onUploaded }: UploadPaperModalProps) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState('Grade 11');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [kind, setKind] = useState<PastPaperKind>('Exam paper');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const close = () => {
    setError('');
    onClose();
  };

  const handleFile = (selected: File | null) => {
    setFile(null);
    if (!selected) return;
    const message = validateCommunityFile(selected);
    if (message) {
      setError(message);
      return;
    }
    setError('');
    setFile(selected);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      setError('Add a title for the paper.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const fileUrl = file ? await fileToDataUrl(file) : undefined;
      const paper = addCommunityPaper({
        title,
        subject,
        grade,
        year,
        kind,
        size: file ? formatBytes(file.size) : 'Sample',
        fileName: file?.name,
        fileUrl,
        sampleQuestions: file
          ? undefined
          : [
              'No file is attached to this sample card.',
              'Upload a PDF or photo next time to make the paper available for download.'
            ]
      });
      if (!paper) {
        setError('Could not save this paper. Check the title and try again.');
        return;
      }
      sendCommunityMessage({
        roomId: 'exam-prep',
        text: `📄 Shared “${paper.title}” (${paper.subject}, ${paper.grade}) in the past papers tab.`
      });
      setTitle('');
      setFile(null);
      setError('');
      onUploaded(paper);
      onClose();
    } catch (readError) {
      console.warn('Unable to read the shared paper.', readError);
      setError('The file could not be read on this device. Try a smaller PDF or photo.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Share a past paper"
      description="Add a paper or memo so other learners can revise from it."
      icon={<FileUpIcon className="h-4 w-4" />}
      footer={
        <>
          <button type="button" onClick={close} className="btn-secondary !py-1.5 text-xs">
            Cancel
          </button>
          <button
            type="submit"
            form="upload-paper-form"
            disabled={busy || !title.trim()}
            className="btn-primary !py-1.5 text-xs">
            {busy ? 'Saving…' : 'Add to library'}
          </button>
        </>
      }>
      <form id="upload-paper-form" onSubmit={submit} className="space-y-3">
        <div>
          <label htmlFor="paper-title" className="field-label">
            Paper title
          </label>
          <input
            id="paper-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="field"
            placeholder="Mathematics Paper 2"
            maxLength={120}
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label htmlFor="paper-subject" className="field-label">
              Subject
            </label>
            <select id="paper-subject" value={subject} onChange={(event) => setSubject(event.target.value)} className="field">
              {subjectFilters.filter((item) => item !== 'All').map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="paper-grade" className="field-label">
              Grade
            </label>
            <select id="paper-grade" value={grade} onChange={(event) => setGrade(event.target.value)} className="field">
              {grades.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label htmlFor="paper-year" className="field-label">
              Year / term
            </label>
            <input
              id="paper-year"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="field"
              placeholder="November 2026"
              maxLength={40}
            />
          </div>
          <div>
            <label htmlFor="paper-kind" className="field-label">
              Type
            </label>
            <select id="paper-kind" value={kind} onChange={(event) => setKind(event.target.value as PastPaperKind)} className="field">
              {kinds.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="paper-file" className="field-label">
            File <span className="font-normal text-slate-400">(optional, max 1.2 MB)</span>
          </label>
          <input
            id="paper-file"
            type="file"
            accept=".pdf,.doc,.docx,.txt,image/*"
            onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
            className="field file:mr-3 file:rounded-full file:border-2 file:border-ink file:bg-sun file:px-3 file:py-1 file:font-display file:text-xs file:font-bold file:text-ink"
          />
          {file && (
            <p className="mt-1 text-[11px] font-semibold text-teal">
              {file.name} · {formatBytes(file.size)}
            </p>
          )}
          <p className="mt-1 text-[11px] leading-snug text-slate-500">
            Files stay on this device in the prototype. Without a file, the paper is saved as a sample card.
          </p>
        </div>

        {error && (
          <p role="alert" className="rounded-xl border-2 border-danger/40 bg-coral/10 px-3 py-2 text-xs font-semibold text-danger">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}
