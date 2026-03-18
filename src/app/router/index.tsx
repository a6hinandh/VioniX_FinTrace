// FinTrace AI — Application Router

import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import AlertsPage from '../../pages/alerts/AlertsPage';
import InvestigationsPage from '../../pages/investigations/InvestigationsPage';
import ReportsPage from '../../pages/reports/ReportsPage';
import SettingsPage from '../../pages/settings/SettingsPage';
import ProfilePage from '../../pages/profile/ProfilePage';
import LandingPage from '../../pages/landing/LandingPage';
import IntelligencePage from '../../pages/intelligence/IntelligencePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'investigations', element: <InvestigationsPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'intelligence', element: <IntelligencePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
]);
