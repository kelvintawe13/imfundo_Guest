import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { GlobalOverlays } from './GlobalOverlays';
import { PageSkeleton } from '../ui/Skeleton';
import { useRouteLoading } from '../../hooks/useRouteLoading';

export function Layout() {
  const loading = useRouteLoading();

  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-slate-50">
      <Header />
      <main className="flex-1">{loading ? <PageSkeleton /> : <Outlet />}</main>
      <Footer />
      <GlobalOverlays />
    </div>);

}