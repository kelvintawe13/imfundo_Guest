import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/layout/Layout';
import { BottomNav } from './components/layout/BottomNav';
import { AppShell } from './components/shell/AppShell';
import { AuthLayout } from './components/auth/AuthLayout';
import { PageSkeleton } from './components/ui/Skeleton';
import { useApp } from './contexts/AppContext';
import type { AppRole } from './types/app';

const Home = lazy(() => import('./pages/Home').then(({ Home }) => ({ default: Home })));
const About = lazy(() => import('./pages/About').then(({ About }) => ({ default: About })));
const Programmes = lazy(() => import('./pages/Programmes').then(({ Programmes }) => ({ default: Programmes })));
const Contact = lazy(() => import('./pages/Contact').then(({ Contact }) => ({ default: Contact })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(({ Dashboard }) => ({ default: Dashboard })));
const LessonPlayer = lazy(() => import('./pages/LessonPlayer').then(({ LessonPlayer }) => ({ default: LessonPlayer })));
const TeacherCorner = lazy(() => import('./pages/TeacherCorner').then(({ TeacherCorner }) => ({ default: TeacherCorner })));
const ClassManagement = lazy(() => import('./pages/teacher/ClassManagement').then(({ ClassManagement }) => ({ default: ClassManagement })));
const TeachingResources = lazy(() => import('./pages/teacher/TeachingResources').then(({ TeachingResources }) => ({ default: TeachingResources })));
const LearnerSupport = lazy(() => import('./pages/teacher/LearnerSupport').then(({ LearnerSupport }) => ({ default: LearnerSupport })));
const Profile = lazy(() => import('./pages/Profile').then(({ Profile }) => ({ default: Profile })));
const Login = lazy(() => import('./pages/auth/Login').then(({ Login }) => ({ default: Login })));
const Signup = lazy(() => import('./pages/auth/Signup').then(({ Signup }) => ({ default: Signup })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(({ ForgotPassword }) => ({ default: ForgotPassword })));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword').then(({ ResetPassword }) => ({ default: ResetPassword })));

function RoleGate({ role }: { role: AppRole }) {
  const { role: activeRole } = useApp();
  if (activeRole === role) return <Outlet />;
  return <Navigate to={activeRole === 'staff' ? '/teachers' : '/dashboard'} replace />;
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <AppProvider>
            <BrowserRouter>
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/programmes" element={<Programmes />} />
                    <Route path="/contact" element={<Contact />} />
                  </Route>
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                  </Route>
                  <Route element={<AppShell />}>
                    <Route element={<RoleGate role="learner" />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/lesson" element={<LessonPlayer />} />
                      <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route element={<RoleGate role="staff" />}>
                      <Route path="/teachers" element={<TeacherCorner />} />
                      <Route path="/teachers/classes" element={<ClassManagement />} />
                      <Route path="/teachers/resources" element={<TeachingResources />} />
                      <Route path="/teachers/support" element={<LearnerSupport />} />
                    </Route>
                  </Route>
                  <Route element={<Layout />}>
                    <Route path="*" element={<Home />} />
                  </Route>
                </Routes>
              </Suspense>
              {/* Bottom navigation renders on every layout: public, auth and app shell */}
              <BottomNav />
            </BrowserRouter>
          </AppProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>);

}