import { SiteImage } from '../ui/SiteImage';

const CONNECTED = 5; // ~10% fixed / in-home internet
const PHONES = 48; // ~96% own a mobile phone

/**
 * Scene: homes cluster with rare in-home connections, near-universal phone
 * dots. Drop public/images/connectivity.png in (real art already wired);
 * the data caption stays in code so the numbers stay accurate.
 */
export function ConnectivityGrid() {
  return (
    <figure className="mt-8">
      <SiteImage
        src="/images/connectivity.png"
        alt={`Of 50 households, about ${CONNECTED} have in-home internet while ${PHONES} own a mobile phone`}
        className="h-auto w-full max-w-md" />
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm border border-primary bg-primary/25" /> In-home internet
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success" /> Owns a mobile phone
        </span>
        <span>Each home ≈ 2% of households</span>
      </figcaption>
    </figure>);

}
