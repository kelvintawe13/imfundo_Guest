import { DownloadIcon, EyeIcon, FileTextIcon } from 'lucide-react';
import type { PastPaper } from '../../types/community';
import { relativeTime } from '../../utils/learnerData';

const kindColor: Record<PastPaper['kind'], string> = {
  'Exam paper': 'bg-sun text-ink',
  Memo: 'bg-teal-light text-ink',
  'Practice paper': 'bg-sky text-ink',
  'Study notes': 'bg-coral/20 text-ink'
};

export function PaperCard({ paper, onPreview }: { paper: PastPaper; onPreview: () => void }) {
  return (
    <article className="flex flex-col rounded-xl border-2 border-ink/15 bg-slate-900/50 p-3 transition-colors hover:border-ink">
      <div className="flex items-start justify-between gap-2">
        <span className={`rounded-full border-2 border-ink px-2 py-0.5 text-[10px] font-bold ${kindColor[paper.kind]}`}>
          {paper.kind}
        </span>
        {!paper.fileUrl && (
          <span className="rounded-full border border-dashed border-ink/30 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
            Sample
          </span>
        )}
      </div>

      <div className="mt-2 flex items-start gap-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-ink bg-slate-950/60 text-sky">
          <FileTextIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-sm font-bold leading-tight text-slate-100">{paper.title}</h3>
          <p className="mt-0.5 text-[11px] text-slate-500">
            {paper.subject} · {paper.grade} · {paper.year}
          </p>
        </div>
      </div>

      <p className="mt-2 text-[10px] text-slate-500">
        {paper.uploadedBy} · {relativeTime(paper.uploadedAt)} · {paper.size}
      </p>

      <div className="mt-3 flex items-center gap-1.5">
        <button type="button" onClick={onPreview} className="btn-secondary flex-1 !py-1.5 text-xs">
          <EyeIcon className="h-3.5 w-3.5" /> {paper.fileUrl ? 'Open' : 'Preview sample'}
        </button>
        {paper.fileUrl && (
          <a
            href={paper.fileUrl}
            download={paper.fileName ?? `${paper.title}.pdf`}
            className="btn-primary !px-3 !py-1.5 text-xs"
            aria-label={`Download ${paper.title}`}>
            <DownloadIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
