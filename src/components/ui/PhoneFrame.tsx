import { BatteryFullIcon, SignalIcon, WifiOffIcon } from 'lucide-react';

type PhoneFrameProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
  widthClass?: string;
};

export function PhoneFrame({ children, label, className = '', widthClass = 'w-[248px]' }: PhoneFrameProps) {
  return (
    <figure
      aria-label={label}
      className={`theme-dark relative ${widthClass} shrink-0 rounded-[2.4rem] border border-slate-700 bg-slate-950 p-[8px] shadow-2xl shadow-black/60 ring-1 ring-black ${className}`}>

      <span className="absolute -left-[3px] top-20 h-7 w-[3px] rounded-l bg-slate-700" />
      <span className="absolute -left-[3px] top-32 h-10 w-[3px] rounded-l bg-slate-700" />
      <span className="absolute -right-[3px] top-28 h-14 w-[3px] rounded-r bg-slate-700" />
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.95rem] bg-device">
        <div className="absolute left-1/2 top-1.5 z-20 h-[19px] w-[70px] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative z-10 flex items-center justify-between px-3.5 pt-2.5 text-[10px] font-semibold text-slate-200">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <SignalIcon className="h-3 w-3" />
            <WifiOffIcon className="h-3 w-3" />
            <BatteryFullIcon className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 top-8">{children}</div>
        <div className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-slate-500" />
      </div>
    </figure>);
}
