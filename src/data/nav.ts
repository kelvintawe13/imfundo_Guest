import { CirclePlayIcon, HouseIcon, LayoutDashboardIcon, PresentationIcon, UserIcon } from 'lucide-react';

export const navItems = [
{ key: 'nav.home', to: '/', icon: HouseIcon },
{ key: 'nav.dashboard', to: '/dashboard', icon: LayoutDashboardIcon },
{ key: 'nav.lesson', to: '/lesson', icon: CirclePlayIcon },
{ key: 'nav.teachers', to: '/teachers', icon: PresentationIcon },
{ key: 'nav.profile', to: '/profile', icon: UserIcon }] as
const;

export const publicNav = [
{ key: 'nav.home', to: '/' },
{ key: 'nav.dashboard', to: '/dashboard' },
{ key: 'nav.teachers', to: '/teachers' }] as
const;

export const appNav = navItems.filter((n) => n.to !== '/');