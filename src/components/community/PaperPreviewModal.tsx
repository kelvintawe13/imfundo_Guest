import { DownloadIcon, FileTextIcon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import type { PastPaper } from '../../types/community';

type PaperPreviewModalProps = {
  paper: PastPaper | null;
  onClose: () => void;
};

function isImageName(name?: string): boolean {
  return Boolean(name && /\.(png|jpe?g|gif|webp)$/i.test(name));
}

export function PaperPreviewModal({ paper, onClose }: PaperPreviewModalProps) {
  if (!paper) return null;
  const hasFile = Boolean(paper.fileUrl);
  const image = hasFile && isImageName(paper.fileName);

  return (
    <Modal
      open
      onClose={onClose}
      title={paper.title}
      description={`${paper.subject} · ${paper.grade} · ${paper.year}`}
      icon={<FileTextIcon className="h-4 w-4" />}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn-secondary !py-1.5 text-xs">
            Close
          </button>
          {paper.fileUrl && (
            <a
              href={paper.fileUrl}
              download={paper.fileName ?? `${paper.title}.pdf`}
              className="btn-primary !py-1.5 text-xs">
              <DownloadIcon className="h-3.5 w-3.5" /> Download
            </a>
          )}
        </>
      }>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full border-2 border-ink bg-sun-light px-2 py-0.5 font-bold text-ink">{paper.kind}</span>
          <span className="rounded-full border border-ink/20 px-2 py-0.5 text-slate-400">{paper.size}</span>
          <span className="rounded-full border border-ink/20 px-2 py-0.5 text-slate-400">Shared by {paper.uploadedBy}</span>
        </div>

        {image && paper.fileUrl && (
          <img
            src={paper.fileUrl}
            alt={`Preview of ${paper.title}`}
            className="max-h-72 w-full rounded-xl border-2 border-ink object-contain bg-slate-950/60"
          />
        )}

        {hasFile && !image && (
          <a
            href={paper.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border-2 border-ink bg-slate-950/40 p-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-sun-light hover:text-ink">
            <FileTextIcon className="h-5 w-5 text-sky" />
            <span className="min-w-0 flex-1 truncate">{paper.fileName ?? paper.title}</span>
            <span className="text-[11px] font-bold text-coral">Open file</span>
          </a>
        )}

        {paper.sampleQuestions && paper.sampleQuestions.length > 0 && (
          <div>
            <h3 className="font-display text-sm font-extrabold text-slate-100">
              {hasFile ? 'What is inside' : 'Sample questions'}
            </h3>
            <ol className="mt-1.5 space-y-1.5">
              {paper.sampleQuestions.map((question, index) => (
                <li key={question} className="flex gap-2 rounded-lg border border-ink/15 bg-slate-950/30 p-2 text-xs leading-relaxed text-slate-300">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-ink/30 bg-slate-900 text-[10px] font-bold text-slate-400">
                    {index + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          </div>
        )}

        {!hasFile && (!paper.sampleQuestions || paper.sampleQuestions.length === 0) && (
          <p className="rounded-xl border-2 border-dashed border-ink/20 p-3 text-xs text-slate-500">
            This sample card does not have a file attached.
          </p>
        )}

        <p className="text-[11px] leading-snug text-slate-500">
          Only share papers you are allowed to circulate. Credit the school or teacher who created them.
        </p>
      </div>
    </Modal>
  );
}
