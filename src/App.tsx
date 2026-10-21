import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/layout/Layout';
import { AppShell } from './components/shell/AppShell';
import { AuthLayout } from './components/auth/AuthLayout';
import { PageSkeleton } from './components/ui/Skeleton';

const Landing = lazy(() => import('./pages/Landing').then(({ Landing }) => ({ default: Landing })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(({ Dashboard }) => ({ default: Dashboard })));
const LessonPlayer = lazy(() => import('./pages/LessonPlayer').then(({ LessonPlayer }) => ({ default: LessonPlayer })));
const TeacherCorner = lazy(() => import('./pages/TeacherCorner').then(({ TeacherCorner }) => ({ default: TeacherCorner })));
const Profile = lazy(() => import('./pages/Profile').then(({ Profile }) => ({ default: Profile })));
const Login = lazy(() => import('./pages/auth/Login').then(({ Login }) => ({ default: Login })));
const Signup = lazy(() => import('./pages/auth/Signup').then(({ Signup }) => ({ default: Signup })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(({ ForgotPassword }) => ({ default: ForgotPassword })));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword').then(({ ResetPassword }) => ({ default: ResetPassword })));

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
                    <Route path="/" element={<Landing />} />
                  </Route>
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                  </Route>
                  <Route element={<AppShell />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/lesson" element={<LessonPlayer />} />
                    <Route path="/teachers" element={<TeacherCorner />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                  <Route element={<Layout />}>
                    <Route path="*" element={<Landing />} />
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AppProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>);

}