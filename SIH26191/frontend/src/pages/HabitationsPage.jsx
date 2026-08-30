import React, { useState } from 'react';
import { useGIS } from '../context/GISContext';

export const HabitationsPage = () => {
  const { habitations, handleSelectHabitation, setCurrentTab, navigateToRelocationWithHabitation } = useGIS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');

  const filtered = habitations.filter((hab) => {
    const matchesSearch =
      hab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hab.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'All' || hab.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const handleInspect = (hab) => {
    handleSelectHabitation(hab);
    setCurrentTab('dashboard');
  };

  return (
    <div className="flex flex-col w-full p-xl gap-lg min-h-screen">
      {/* Header and Search Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-primary tracking-tight font-bold">Vulnerable Habitations Directory</h2>
          <p className="font-body-md text-on-surface-variant mt-xs">
            Multi-Hazard Vulnerability &amp; Risk Ranking Index for Chamoli District
          </p>
        </div>

        <div className="flex items-center gap-md w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search settlement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-md py-sm bg-surface-container-low rounded-lg border border-outline-variant/40 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Priority Filters */}
          <div className="flex bg-surface-container p-1 rounded-lg border border-outline-variant/30">
            {['All', 'Immediate', 'Short-Term', 'Medium-Term'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-sm py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedPriority === p
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Habitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {filtered.map((hab) => {
          const isImmediate = hab.priority === 'Immediate';
          const isShortTerm = hab.priority === 'Short-Term';

          return (
            <div
              key={hab.id}
              className="bg-surface-container-lowest rounded-xl shadow-md p-md flex flex-col justify-between border border-outline-variant/30 hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-sm">
                  <span
                    className={`px-sm py-xs font-label-md rounded uppercase font-bold text-[11px] ${
                      isImmediate
                        ? 'bg-error-container text-on-error-container animate-pulse'
                        : isShortTerm
                        ? 'bg-secondary/10 text-secondary'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {hab.priority} Priority
                  </span>
                  <span className="text-mono-data text-outline text-xs font-bold">{hab.rank}</span>
                </div>

                <h3 className="font-title-lg text-on-surface font-bold mt-1">{hab.name}</h3>
                <p className="text-xs font-mono-data text-on-surface-variant mt-0.5">
                  ID: {hab.id} | {hab.district}
                </p>
                <p className="text-body-sm text-on-surface-variant mt-sm leading-relaxed">{hab.description}</p>

                <div className="grid grid-cols-2 gap-sm mt-md">
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
                    <span className="text-[11px] font-label-md text-on-surface-variant uppercase block">Population</span>
                    <span className="font-title-md text-on-surface font-bold">{hab.families} Families</span>
                  </div>
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
                    <span className="text-[11px] font-label-md text-on-surface-variant uppercase block">Hazard Index</span>
                    <span
                      className={`font-title-md font-mono-data font-bold ${
                        isImmediate ? 'text-error' : isShortTerm ? 'text-secondary' : 'text-primary'
                      }`}
                    >
                      {hab.hazardIndex.toFixed(2)}
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
                    <span className="text-[11px] font-label-md text-on-surface-variant uppercase block">Slope Gradient</span>
                    <span className="font-title-md text-error font-bold">{hab.slopeAngle}°</span>
                  </div>
                  <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/20">
                    <span className="text-[11px] font-label-md text-on-surface-variant uppercase block">Relocation Cost</span>
                    <span className="font-mono-data text-on-surface font-bold text-sm">{hab.estRelocationCost}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-sm mt-lg">
                <button
                  onClick={() => handleInspect(hab)}
                  className="flex-1 py-2 bg-surface-container text-primary hover:bg-surface-variant font-label-md rounded-lg transition-colors font-semibold flex items-center justify-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  Inspect Map
                </button>
                <button
                  onClick={() => navigateToRelocationWithHabitation(hab)}
                  className="flex-1 py-2 bg-primary text-on-primary hover:bg-primary-container font-label-md rounded-lg transition-colors font-semibold flex items-center justify-center gap-xs shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">route</span>
                  Plan Route
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
