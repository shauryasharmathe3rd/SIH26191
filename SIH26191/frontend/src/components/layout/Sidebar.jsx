import React from 'react';
import { useGIS } from '../../context/GISContext';

export const Sidebar = () => {
  const { rainfall, setRainfall, riskPriorities, toggleRiskPriority, hazardTypes, toggleHazardType } = useGIS();

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col shadow-[4px_0_12px_rgba(0,0,0,0.03)] border-r border-outline-variant/30">
      {/* Sidebar Header */}
      <div className="px-md py-xl mb-md border-b border-outline-variant">
        <h2 className="font-title-md text-primary font-semibold">Risk &amp; Relocation Control</h2>
        <p className="text-label-md text-on-surface-variant uppercase mt-xs tracking-wider">GIS Parameters</p>
      </div>

      {/* Control Sections */}
      <div className="flex-1 overflow-y-auto px-md py-md space-y-xl">
        {/* Risk Priority Section */}
        <section>
          <h3 className="font-label-md text-on-surface-variant mb-md tracking-wider">RISK PRIORITY</h3>
          <div className="space-y-sm text-body-sm">
            <label className="flex items-center gap-sm cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4 rounded cursor-pointer"
                checked={riskPriorities.immediate}
                onChange={() => toggleRiskPriority('immediate')}
              />
              <span className="font-medium text-error">Immediate</span>
            </label>
            <label className="flex items-center gap-sm cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4 rounded cursor-pointer"
                checked={riskPriorities.shortTerm}
                onChange={() => toggleRiskPriority('shortTerm')}
              />
              <span className="font-medium text-secondary">Short-Term</span>
            </label>
            <label className="flex items-center gap-sm cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4 rounded cursor-pointer"
                checked={riskPriorities.mediumTerm}
                onChange={() => toggleRiskPriority('mediumTerm')}
              />
              <span className="font-medium text-primary">Medium-Term</span>
            </label>
          </div>
        </section>

        {/* Hazard Type Section */}
        <section>
          <h3 className="font-label-md text-on-surface-variant mb-md tracking-wider">HAZARD TYPE</h3>
          <div className="space-y-sm text-body-sm">
            <label className="flex items-center gap-sm cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4 rounded cursor-pointer"
                checked={hazardTypes.landslide}
                onChange={() => toggleHazardType('landslide')}
              />
              <span>Landslide</span>
            </label>
            <label className="flex items-center gap-sm cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4 rounded cursor-pointer"
                checked={hazardTypes.flood}
                onChange={() => toggleHazardType('flood')}
              />
              <span>Flash Flood</span>
            </label>
            <label className="flex items-center gap-sm cursor-pointer select-none hover:text-primary transition-colors">
              <input
                type="checkbox"
                className="accent-primary w-4 h-4 rounded cursor-pointer"
                checked={hazardTypes.erosion}
                onChange={() => toggleHazardType('erosion')}
              />
              <span>Erosion</span>
            </label>
          </div>
        </section>

        {/* Rainfall Simulation Section */}
        <section>
          <div className="flex items-center justify-between mb-md">
            <h3 className="font-label-md text-on-surface-variant tracking-wider">RAINFALL SIMULATION</h3>
            <span className="text-xs font-mono-data px-sm py-xs bg-primary/10 text-primary font-bold rounded">
              {rainfall} mm
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="300"
            step="5"
            value={rainfall}
            onChange={(e) => setRainfall(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-label-md mt-xs text-on-surface-variant">
            <span>0mm</span>
            <span className="font-mono-data text-primary font-semibold">{rainfall}mm</span>
            <span>300mm</span>
          </div>
          {rainfall > 200 && (
            <div className="mt-sm p-sm bg-error-container/40 border border-error/30 rounded text-xs text-error font-medium flex items-center gap-xs animate-pulse">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              Critical Flash Flood Threshold
            </div>
          )}
        </section>
      </div>

      {/* Sidebar Footer */}
      <footer className="p-md text-center border-t border-outline-variant bg-surface-container-lowest">
        <p className="text-label-md text-outline">Official Gov Portal © 2024</p>
      </footer>
    </aside>
  );
};
