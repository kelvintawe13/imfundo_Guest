import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BotIcon, CpuIcon, MessageCircleIcon, SendIcon, XIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { initialMessages, quickPrompts } from '../../data/chat';
import { getTutorReply } from '../../utils/tutor';
import type { ChatMessage } from '../../types/app';

export function ChatWidget() {
  const { chatOpen, setChatOpen } = useApp();
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, typing, chatOpen]);

  function send(text: string) {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, { id: `u${Date.now()}`, role: 'user', text: clean }]);
    setInput('');
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: `t${Date.now()}`, role: 'tutor', text: getTutorReply(clean, lang) }]);
      setTyping(false);
    }, 850);
  }

  return (
    <>
      <AnimatePresence>
        {chatOpen &&
        <motion.section
          aria-label={t('chat.title')}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: 'bottom right' }}
          className="fixed bottom-24 right-4 z-50 flex h-[min(520px,calc(100vh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:right-5">
          
            <header className="flex items-center gap-3 border-b border-slate-800 px-4 py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary-soft">
                <BotIcon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-50">{t('chat.title')}</p>
                <p className="flex items-center gap-1 text-[11px] text-success-soft">
                  <CpuIcon className="h-3 w-3" /> {t('chat.offlineNote')}
                </p>
              </div>
              <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="rounded-md p-1.5 text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-100"
              aria-label={t('common.close')}>
              
                <XIcon className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3" aria-live="polite">
              {messages.map((m) =>
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                m.role === 'user' ?
                'rounded-br-sm bg-primary text-white' :
                'rounded-bl-sm border border-slate-800 bg-slate-800/60 text-slate-200'}`
                }>
                
                    {m.text}
                  </p>
                </div>
            )}
              {typing &&
            <div className="flex gap-1 rounded-xl border border-slate-800 bg-slate-800/60 px-3 py-2.5 w-14" aria-label="Tutor is typing">
                  {[0, 1, 2].map((i) =>
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-slate-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />

              )}
                </div>
            }
              <div ref={endRef} />
            </div>

            <div className="flex gap-1.5 overflow-x-auto px-4 pb-2">
              {quickPrompts.map((p) =>
            <button
              key={p}
              type="button"
              onClick={() => send(p)}
              className="shrink-0 rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300 transition-colors duration-150 hover:bg-slate-800">
              
                  {p}
                </button>
            )}
            </div>
            <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-slate-800 p-3">
            
              <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.placeholder')}
              aria-label={t('chat.placeholder')}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none transition-colors duration-150 placeholder:text-slate-500 focus:border-primary" />
            
              <button type="submit" disabled={!input.trim() || typing} className="btn-primary !px-3" aria-label="Send">
                <SendIcon className="h-4 w-4" />
              </button>
            </form>
          </motion.section>
        }
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        aria-expanded={chatOpen}
        aria-label={chatOpen ? t('common.close') : t('chat.title')}
        className="fixed bottom-5 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-[transform,background-color] duration-150 hover:bg-primary-hover active:scale-95 sm:right-5">
        
        {chatOpen ? <XIcon className="h-5 w-5" /> : <MessageCircleIcon className="h-5 w-5" />}
      </button>
    </>);

}