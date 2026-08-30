import React from 'react';
import { useGIS } from '../../context/GISContext';

export const Header = () => {
  const { currentTab, setCurrentTab } = useGIS();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'risk-map', label: 'Risk Map' },
    { id: 'relocation', label: 'Relocation' },
    { id: 'safe-sites', label: 'Safe Sites' },
    { id: 'habitations', label: 'Habitations' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface/80 backdrop-blur-md z-40 flex items-center justify-between px-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
      {/* Title and Navigation */}
      <div className="flex flex-col">
        <div className="flex items-center gap-md">
          <h1 className="font-headline-md text-primary tracking-tight font-bold">RESITE-GIS</h1>
          <span className="h-4 w-[1px] bg-outline-variant"></span>
          <p className="text-body-sm text-on-surface-variant font-medium">Intelligent Hazard Identification</p>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-lg mt-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`text-label-md uppercase tracking-wider transition-all relative py-1 ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Side Status & User Info */}
      <div className="flex items-center gap-lg">
        {/* Live System Indicator */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-xs">
            <div className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></div>
            <span className="text-label-md font-mono-data text-on-tertiary-container uppercase font-bold">Live</span>
          </div>
          <span className="text-label-md text-outline font-mono-data">UPDATED: 12:45 UTC</span>
        </div>

        {/* Weather Indicator */}
        <div className="flex items-center gap-sm bg-surface-container-low px-md py-xs rounded-full shadow-sm border border-outline-variant/40">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">partly_cloudy_day</span>
          <span className="text-label-md font-mono-data text-on-surface font-semibold">24°C</span>
        </div>

        {/* User Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm cursor-pointer hover:bg-primary-container transition-colors">
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
};
