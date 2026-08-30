import React from 'react';
import { useGIS } from '../context/GISContext';
import { MapView } from '../components/map/MapView';
import { HabitationDrawer } from '../components/map/HabitationDrawer';

export const DashboardPage = () => {
  const { rainfall, analytics } = useGIS();

  return (
    <div className="flex flex-col w-full px-xl py-lg space-y-xl h-full">
      {/* Status Bar / KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
        {/* Active Red Zones */}
        <div className="bg-surface-container rounded-xl p-md shadow-md flex items-start gap-md border border-outline-variant/20 hover:shadow-lg transition-shadow">
          <div className="p-sm bg-error-container text-on-error-container rounded-full mt-xs shadow-sm">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant uppercase mb-xs tracking-wider">Active Red Zones</p>
            <p className="font-display-lg text-error leading-none">{analytics.kpis.activeRedZones.toLocaleString()}</p>
          </div>
        </div>

        {/* Safe Sites */}
        <div className="bg-surface-container rounded-xl p-md shadow-md flex items-start gap-md border border-outline-variant/20 hover:shadow-lg transition-shadow">
          <div className="p-sm bg-tertiary-container text-on-tertiary-container rounded-full mt-xs shadow-sm">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant uppercase mb-xs tracking-wider">Safe Sites</p>
            <p className="font-display-lg text-on-tertiary-container leading-none">{analytics.kpis.safeSites}</p>
          </div>
        </div>

        {/* Habitations Evaluated */}
        <div className="bg-surface-container rounded-xl p-md shadow-md flex items-start gap-md border border-outline-variant/20 hover:shadow-lg transition-shadow">
          <div className="p-sm bg-primary-fixed text-on-primary-fixed rounded-full mt-xs shadow-sm">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              home_work
            </span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant uppercase mb-xs tracking-wider">Habitations Evaluated</p>
            <p className="font-display-lg text-primary leading-none">{analytics.kpis.habitationsEvaluated}</p>
          </div>
        </div>

        {/* Current Rainfall */}
        <div className="bg-surface-container rounded-xl p-md shadow-md flex items-start gap-md border border-outline-variant/20 hover:shadow-lg transition-shadow">
          <div className="p-sm bg-inverse-primary text-on-primary-fixed rounded-full mt-xs shadow-sm">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              water_drop
            </span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant uppercase mb-xs tracking-wider">Current Rainfall</p>
            <p className="font-display-lg text-on-primary-fixed leading-none">
              {rainfall} <span className="font-body-md text-on-surface-variant font-normal">mm</span>
            </p>
          </div>
        </div>
      </div>

      {/* Relocation Status Banner */}
      <div className="bg-surface-container-high rounded-xl p-md shadow-sm flex items-center justify-between border border-outline-variant/30">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-on-surface-variant">timeline</span>
          <h3 className="font-title-md text-on-surface font-semibold">Relocation Status Pipeline</h3>
        </div>
        <div className="flex gap-xl items-center">
          <div className="flex items-center gap-sm">
            <div className="w-3 h-3 rounded-full bg-error animate-pulse"></div>
            <span className="font-label-md text-on-surface-variant font-medium">1 Immediate</span>
          </div>
          <div className="flex items-center gap-sm">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="font-label-md text-on-surface-variant font-medium">4 Short-Term</span>
          </div>
          <div className="flex items-center gap-sm">
            <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
            <span className="font-label-md text-on-surface-variant font-medium">14 Medium-Term</span>
          </div>
        </div>
      </div>

      {/* Main Map & Detail Layout */}
      <div className="flex-1 grid grid-cols-12 gap-lg relative min-h-[600px]">
        {/* Map Container */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 bg-surface-container rounded-xl shadow-lg relative overflow-hidden flex flex-col border border-outline-variant/30">
          <MapView />
        </div>

        {/* Details Panel / Habitation Drawer */}
        <HabitationDrawer />
      </div>
    </div>
  );
};
