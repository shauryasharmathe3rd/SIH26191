import React from 'react';
import { useGIS } from '../../context/GISContext';

export const HabitationDrawer = () => {
  const {
    isDrawerOpen,
    closeDrawer,
    selectedHabitation,
    isGeneratingRoute,
    triggerPlanRoute,
    navigateToRelocationWithHabitation,
  } = useGIS();

  if (!selectedHabitation) return null;

  const hab = selectedHabitation;

  return (
    <div
      id="details-panel"
      className={`col-span-12 lg:col-span-4 xl:col-span-3 bg-surface-container rounded-xl shadow-lg flex flex-col h-full transition-all duration-300 border border-outline-variant/30 ${
        isDrawerOpen ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-4 pointer-events-none'
      }`}
    >
      {/* Drawer Header */}
      <div className="p-md bg-surface border-b border-outline-variant flex items-center justify-between rounded-t-xl">
        <h2 className="font-title-md text-on-surface font-semibold">Habitation Details</h2>
        <button
          onClick={closeDrawer}
          className="p-xs hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant focus:outline-none"
          id="close-panel"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Drawer Body */}
      <div className="p-md flex-1 overflow-y-auto space-y-lg bg-surface">
        {/* Title & Priority */}
        <div>
          <div className="flex items-center gap-sm mb-xs">
            <span
              className={`px-sm py-xs font-label-md rounded uppercase font-bold text-[11px] ${
                hab.priority === 'Immediate'
                  ? 'bg-error-container text-on-error-container'
                  : hab.priority === 'Short-Term'
                  ? 'bg-secondary/10 text-secondary'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              {hab.priority} Priority
            </span>
            <span className="font-mono-data text-outline text-xs font-semibold">ID: {hab.id}</span>
          </div>
          <h3 className="font-headline-md text-primary mt-sm font-bold">{hab.name}</h3>
          <p className="font-body-sm text-on-surface-variant mt-xs leading-relaxed">{hab.description}</p>
        </div>

        {/* 2x2 Key Parameters Grid */}
        <div className="grid grid-cols-2 gap-sm">
          <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
            <span className="font-label-md text-on-surface-variant uppercase block mb-xs text-[11px]">Population</span>
            <span className="font-title-md text-on-surface font-bold">{hab.families} Families</span>
            <p className="text-xs text-on-surface-variant font-mono-data mt-0.5">({hab.population} people)</p>
          </div>
          <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
            <span className="font-label-md text-on-surface-variant uppercase block mb-xs text-[11px]">Slope Angle</span>
            <span className="font-title-md text-error font-bold">{hab.slopeAngle}°</span>
            <p className="text-xs text-error font-mono-data mt-0.5">Critical Gradient</p>
          </div>
          <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
            <span className="font-label-md text-on-surface-variant uppercase block mb-xs text-[11px]">Est. Relocation Cost</span>
            <span className="font-mono-data text-on-surface font-bold text-base">{hab.estRelocationCost}</span>
            <p className="text-xs text-on-surface-variant mt-0.5">Gov Relief Fund</p>
          </div>
          <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
            <span className="font-label-md text-on-surface-variant uppercase block mb-xs text-[11px]">Target Safe Site</span>
            <span className="font-title-md text-on-tertiary-container font-bold truncate block">{hab.targetSafeSite}</span>
            <p className="text-xs text-on-tertiary-container font-mono-data mt-0.5">CCI: 94.5 (High)</p>
          </div>
        </div>

        {/* Risk Assessment Chart */}
        <div>
          <h4 className="font-label-md text-on-surface-variant uppercase mb-sm tracking-wider font-semibold">
            Risk Assessment Chart
          </h4>
          <div className="w-full h-32 bg-surface-container-low rounded-lg relative overflow-hidden flex items-end px-sm pb-sm gap-xs border border-outline-variant/20">
            <div className="w-1/4 flex flex-col items-center gap-1 group/bar h-full justify-end">
              <div
                className="w-full bg-primary/30 rounded-t-sm hover:bg-primary transition-colors cursor-pointer"
                style={{ height: '35%' }}
                title="Historical Subsidence: 35%"
              ></div>
              <span className="text-[10px] font-mono-data text-on-surface-variant">Subsid.</span>
            </div>
            <div className="w-1/4 flex flex-col items-center gap-1 group/bar h-full justify-end">
              <div
                className="w-full bg-primary/50 rounded-t-sm hover:bg-primary transition-colors cursor-pointer"
                style={{ height: '55%' }}
                title="Hydro Runoff: 55%"
              ></div>
              <span className="text-[10px] font-mono-data text-on-surface-variant">Hydro</span>
            </div>
            <div className="w-1/4 flex flex-col items-center gap-1 group/bar h-full justify-end">
              <div
                className="w-full bg-secondary/80 rounded-t-sm hover:bg-secondary transition-colors cursor-pointer"
                style={{ height: '80%' }}
                title="Slope Instability: 80%"
              ></div>
              <span className="text-[10px] font-mono-data text-on-surface-variant">Slope</span>
            </div>
            <div className="w-1/4 flex flex-col items-center gap-1 group/bar h-full justify-end">
              <div
                className="w-full bg-error rounded-t-sm hover:bg-error/80 transition-colors cursor-pointer"
                style={{ height: '100%' }}
                title="Precipitation Vulnerability: 100%"
              ></div>
              <span className="text-[10px] font-mono-data text-error font-bold">Precip</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Action Footer */}
      <div className="p-md bg-surface border-t border-outline-variant rounded-b-xl space-y-sm">
        <button
          onClick={() => triggerPlanRoute(hab.id)}
          className={`w-full py-sm px-md font-title-md rounded-lg shadow-md transition-all flex items-center justify-center gap-sm font-semibold ${
            isGeneratingRoute
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'
          }`}
          id="plan-relocation-btn"
        >
          {isGeneratingRoute ? (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              Route Generated
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">route</span>
              Plan Relocation Route
            </>
          )}
        </button>

        <button
          onClick={() => navigateToRelocationWithHabitation(hab)}
          className="w-full py-2 px-md font-label-md text-primary bg-surface-container-low hover:bg-surface-container-high rounded-lg transition-colors border border-outline-variant/40 flex items-center justify-center gap-xs"
        >
          <span>Open Full Relocation Plan</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
