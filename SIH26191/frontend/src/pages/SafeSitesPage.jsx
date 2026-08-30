import React, { useState } from 'react';
import { useGIS } from '../context/GISContext';

export const SafeSitesPage = () => {
  const { safeSites, setDestSafeSite, setCurrentTab } = useGIS();
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredSites =
    filterCategory === 'All' ? safeSites : safeSites.filter((s) => s.category === filterCategory);

  const handleSelectSite = (site) => {
    setDestSafeSite(site);
    setCurrentTab('relocation');
  };

  return (
    <div className="flex flex-col w-full p-xl gap-lg min-h-screen">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-headline-lg text-primary tracking-tight font-bold">Safe Sites &amp; Carrying Capacity (CCI)</h2>
          <p className="font-body-md text-on-surface-variant mt-xs">
            Multi-Criteria Decision Analysis (MCDA) of Receiving Sites in Chamoli District
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-sm bg-surface-container p-1 rounded-lg border border-outline-variant/30">
          {['All', 'Optimal', 'Suitable', 'Moderate'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-md py-1 text-xs font-semibold rounded-md transition-colors ${
                filterCategory === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Safe Sites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {filteredSites.map((site) => {
          const isOptimal = site.category === 'Optimal';
          const isSuitable = site.category === 'Suitable';

          return (
            <div
              key={site.id}
              className="bg-surface-container-lowest rounded-xl shadow-md p-md flex flex-col justify-between border border-outline-variant/30 hover:shadow-xl transition-all"
            >
              <div>
                {/* Top Badge & Score */}
                <div className="flex items-start justify-between mb-sm">
                  <span
                    className={`px-sm py-xs font-label-md rounded uppercase font-bold text-[11px] ${
                      isOptimal
                        ? 'bg-tertiary-container text-on-tertiary-container'
                        : isSuitable
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {site.category} Category
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono-data text-on-surface-variant font-bold">CCI SCORE</span>
                    <span className="text-xl font-bold font-mono-data text-primary">{site.cciScore}</span>
                  </div>
                </div>

                <h3 className="font-title-lg text-on-surface font-bold mt-1">{site.name}</h3>
                <p className="text-xs font-mono-data text-on-surface-variant mt-0.5">
                  Coords: {site.lat.toFixed(3)}°N, {site.lng.toFixed(3)}°E
                </p>

                <p className="text-body-sm text-on-surface-variant mt-sm leading-relaxed">{site.notes}</p>

                {/* Parameters Matrix */}
                <div className="grid grid-cols-2 gap-sm mt-md">
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
                    <span className="text-[11px] font-label-md text-on-surface-variant uppercase block">Capacity</span>
                    <span className="font-title-md text-on-surface font-bold">{site.capacityFamilies} Families</span>
                  </div>
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
                    <span className="text-[11px] font-label-md text-on-surface-variant uppercase block">Slope Stability</span>
                    <span className="font-title-md text-on-tertiary-container font-bold">{site.slopeAngle}°</span>
                  </div>
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
                    <span className="text-[11px] font-label-md text-on-surface-variant uppercase block">Road Distance</span>
                    <span className="font-mono-data text-on-surface font-bold text-sm">{site.distanceToRoadKm} km</span>
                  </div>
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
                    <span className="text-[11px] font-label-md text-on-surface-variant uppercase block">Flood Buffer</span>
                    <span className="font-mono-data text-on-surface font-bold text-sm">{site.floodBufferMetres} m</span>
                  </div>
                </div>

                {/* Facilities Badges */}
                <div className="flex gap-xs flex-wrap mt-md">
                  <span
                    className={`px-sm py-1 rounded text-[11px] font-semibold flex items-center gap-1 ${
                      site.medicalFacilityAccess
                        ? 'bg-tertiary-container/20 text-on-tertiary-container'
                        : 'bg-outline-variant/30 text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">local_hospital</span> Medical Access
                  </span>
                  <span
                    className={`px-sm py-1 rounded text-[11px] font-semibold flex items-center gap-1 ${
                      site.waterGridConnected
                        ? 'bg-primary/10 text-primary'
                        : 'bg-outline-variant/30 text-outline'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">water_drop</span> Water Grid
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectSite(site)}
                className="mt-lg w-full py-sm bg-primary text-on-primary hover:bg-primary-container font-title-md rounded-lg shadow-sm transition-colors flex items-center justify-center gap-sm font-semibold"
              >
                <span>Select for Relocation Plan</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
