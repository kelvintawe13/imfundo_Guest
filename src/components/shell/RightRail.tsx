import { useLocation } from 'react-router-dom';
import { DashboardRail } from './rails/DashboardRail';
import { LessonRail } from './rails/LessonRail';
import { TeacherRail } from './rails/TeacherRail';
import { ProfileRail } from './rails/ProfileRail';

export function RightRail() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/lesson')) return <LessonRail />;
  if (pathname.startsWith('/teachers')) return <TeacherRail />;
  if (pathname.startsWith('/profile')) return <ProfileRail />;
  return <DashboardRail />;
}