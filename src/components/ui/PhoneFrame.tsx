import { BatteryFullIcon, SignalIcon, WifiOffIcon } from 'lucide-react';

type PhoneFrameProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
};

export function PhoneFrame({ children, label, className = '' }: PhoneFrameProps) {
  return (
    <figure
      aria-label={label}
      className={`theme-dark relative w-[248px] shrink-0 rounded-[2.75rem] border border-slate-700 bg-slate-950 p-[9px] shadow-2xl shadow-black/60 ring-1 ring-black ${className}`}>
      
      <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-slate-700" />
      <span className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-slate-700" />
      <span className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-slate-700" />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem] bg-device">
        <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative z-10 flex items-center justify-between px-4 pt-3 text-[10px] font-semibold text-slate-200">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <SignalIcon className="h-3 w-3" />
            <WifiOffIcon className="h-3 w-3" />
            <BatteryFullIcon className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 top-9">{children}</div>
        <div className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-slate-500" />
      </div>
    </figure>);

}