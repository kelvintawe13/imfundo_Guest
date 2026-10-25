import {
  CirclePlayIcon,
  HeartHandshakeIcon,
  HouseIcon,
  LayoutDashboardIcon,
  MessagesSquareIcon,
  PresentationIcon,
  UserIcon
} from 'lucide-react';

export const navItems = [
  { key: 'nav.home', to: '/', icon: HouseIcon },
  { key: 'nav.dashboard', to: '/dashboard', icon: LayoutDashboardIcon },
  { key: 'nav.lesson', to: '/lesson', icon: CirclePlayIcon },
  { key: 'nav.community', to: '/community', icon: MessagesSquareIcon },
  { key: 'nav.parents', to: '/parents', icon: HeartHandshakeIcon },
  { key: 'nav.teachers', to: '/teachers', icon: PresentationIcon },
  { key: 'nav.profile', to: '/profile', icon: UserIcon }
] as const;

export const publicNav = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.programmes', to: '/programmes' },
  { key: 'nav.parents', to: '/parents' },
  { key: 'nav.teachers', to: '/teachers' },
  { key: 'nav.contact', to: '/contact' }
] as const;

export const appNav = navItems.filter((item) => item.to !== '/');
