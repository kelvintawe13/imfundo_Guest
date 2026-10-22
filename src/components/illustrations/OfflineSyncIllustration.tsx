import { SiteImage } from '../ui/SiteImage';

/**
 * Scene: the one-time sync moment (school hotspot, signal trail, alive
 * phone, dormant cloud). Drop public/images/offline-sync.png in when the
 * real art arrives; falls back to connectivity.png until then.
 */
export function OfflineSyncIllustration() {
  return (
    <SiteImage
      src="/images/offline-sync.png"
      alt="A school hotspot sends lessons once to a phone, which then works offline while the cloud is unavailable"
      className="h-auto w-full" />);

}
