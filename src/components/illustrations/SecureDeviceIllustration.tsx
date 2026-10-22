import { SiteImage } from '../ui/SiteImage';

/**
 * Scene: the learner's safety net, phone at center with orbiting nodes.
 * Drop public/images/secure-device.png in when the real art arrives;
 * falls back to connectivity.png until then.
 */
export function SecureDeviceIllustration() {
  return (
    <SiteImage
      src="/images/secure-device.png"
      alt="A phone protected by a shield, surrounded by learning progress, badges and offline lessons"
      className="h-auto w-full max-w-sm" />);

}
