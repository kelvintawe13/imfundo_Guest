import { useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const ease = [0.23, 1, 0.32, 1] as const;

export function Modal({ open, onClose, title, description, icon, children, footer }: ModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-3" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose} />
        
          <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.22, ease }}
          className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border-2 border-ink bg-slate-900 shadow-pop sm:rounded-2xl">
          
            <div className="flex items-start gap-3 border-b-2 border-ink px-4 py-3">
              {icon &&
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sun text-ink">
                  {icon}
                </span>
            }
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="font-display text-base font-extrabold text-slate-50">
                  {title}
                </h2>
                {description && <p className="mt-0.5 text-sm text-slate-400">{description}</p>}
              </div>
              <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-lg border-2 border-transparent text-slate-400 transition-colors duration-150 hover:border-ink hover:bg-sun-light hover:text-ink"
              aria-label="Close dialog">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-3">{children}</div>
            {footer && <div className="flex justify-end gap-2 border-t-2 border-ink px-4 py-3.5">{footer}</div>}
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}