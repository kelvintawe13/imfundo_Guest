import { SiteImage } from '../ui/SiteImage';

/**
 * Scene: the quest line ascending left to right with done, current, locked
 * and reward stations. Drop public/images/learning-path.png in when the
 * real art arrives; falls back to connectivity.png until then.
 */
export function LearningPathIllustration() {
  return (
    <SiteImage
      src="/images/learning-path.png"
      alt="A learning quest path with three completed levels, one in progress and a reward ahead"
      className="h-auto w-full" />);

}
