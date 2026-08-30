import React from 'react';
import { GISProvider, useGIS } from './context/GISContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { RiskMapPage } from './pages/RiskMapPage';
import { RelocationPage } from './pages/RelocationPage';
import { SafeSitesPage } from './pages/SafeSitesPage';
import { HabitationsPage } from './pages/HabitationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

const AppContent = () => {
  const { currentTab } = useGIS();

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface">
      {/* Sidebar: Fixed Left (288px / w-72) */}
      <Sidebar />

      {/* Main App Container */}
      <div className="pl-72">
        {/* Header: Fixed Top */}
        <Header />

        {/* Dynamic Route Content */}
        <main className="pt-20 min-h-screen bg-surface">
          {currentTab === 'dashboard' && <DashboardPage />}
          {currentTab === 'risk-map' && <RiskMapPage />}
          {currentTab === 'relocation' && <RelocationPage />}
          {currentTab === 'safe-sites' && <SafeSitesPage />}
          {currentTab === 'habitations' && <HabitationsPage />}
          {currentTab === 'analytics' && <AnalyticsPage />}
        </main>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <GISProvider>
      <AppContent />
    </GISProvider>
  );
};

export default App;
