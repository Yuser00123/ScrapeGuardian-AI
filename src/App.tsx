import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/navigation/Sidebar';
import { Navbar } from './components/navigation/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { CommandPalette } from './components/common/CommandPalette';

import { LandingPageView } from './components/landing/LandingPageView';
import { DashboardView } from './components/dashboard/DashboardView';
import { SearchIntelligenceView } from './components/search/SearchIntelligenceView';
import { CollectorsView } from './components/collectors/CollectorsView';
import { IntelligenceView } from './components/intelligence/IntelligenceView';
import { HealingView } from './components/healing/HealingView';
import { DemoLabView } from './components/demo/DemoLabView';
import { SettingsView } from './components/settings/SettingsView';

const MainLayout: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPageView />;
      case 'dashboard':
        return <DashboardView />;
      case 'search-intelligence':
        return <SearchIntelligenceView />;
      case 'collectors':
        return <CollectorsView />;
      case 'intelligence':
        return <IntelligenceView />;
      case 'healing':
        return <HealingView />;
      case 'demolab':
        return <DemoLabView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#030712] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main View Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-mesh">
          <div className="mx-auto max-w-7xl">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Global Toast Notifications Container */}
      <ToastContainer />

      {/* Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
