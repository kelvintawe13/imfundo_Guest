import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/layout/Layout';
import { AppShell } from './components/shell/AppShell';
import { AuthLayout } from './components/auth/AuthLayout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { LessonPlayer } from './pages/LessonPlayer';
import { TeacherCorner } from './pages/TeacherCorner';
import { Profile } from './pages/Profile';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <AppProvider>
            <BrowserRouter>
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
            </BrowserRouter>
          </AppProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>);

}