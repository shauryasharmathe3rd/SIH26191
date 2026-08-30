import React, { useState } from 'react';
import { useGIS } from '../context/GISContext';

export const AnalyticsPage = () => {
  const { habitations, handleSelectHabitation, setCurrentTab } = useGIS();
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 7 Days (Simulated)');

  const handleGoToMap = (hab) => {
    handleSelectHabitation(hab);
    setCurrentTab('dashboard');
  };

  const handleExportCSV = () => {
    const headers = 'Rank,Habitation Name,District,Population,Hazard Index,Priority,Target Safe Site\n';
    const rows = habitations
      .map(
        (h) =>
          `"${h.rank}","${h.name}","${h.district}",${h.population},${h.hazardIndex},"${h.priority}","${h.targetSafeSite}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `RESITE_Habitations_Risk_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full p-xl gap-lg min-h-screen">
      {/* Header and Filter */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-headline-lg text-primary tracking-tight font-bold">Spatial &amp; Statistical Analytics</h2>
          <p className="font-body-md text-on-surface-variant mt-xs">Chamoli District Risk Assessment</p>
        </div>
        <div className="flex items-center gap-sm bg-surface-container px-md py-sm rounded-full shadow-sm border border-outline-variant/30">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">calendar_today</span>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-transparent font-mono-data text-on-surface focus:outline-none appearance-none pr-md cursor-pointer font-medium"
          >
            <option>Last 7 Days (Simulated)</option>
            <option>Last 30 Days</option>
            <option>Year to Date</option>
          </select>
          <span className="material-symbols-outlined text-on-surface-variant text-[16px] -ml-sm pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Habitations by Priority Bar Chart */}
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-md flex flex-col border border-outline-variant/20">
          <div className="flex items-center justify-between mb-lg">
            <h3 className="font-title-md text-on-surface font-semibold">Habitations by Priority</h3>
            <span className="material-symbols-outlined text-outline cursor-pointer hover:text-on-surface">more_vert</span>
          </div>
          <div className="flex-1 min-h-[240px] flex items-end gap-md pb-xs">
            <div className="flex flex-col items-center gap-sm w-1/3 group">
              <div className="text-mono-data text-error font-semibold">1,245</div>
              <div className="w-full bg-error rounded-t-sm hover:opacity-80 transition-all cursor-pointer h-[228px]"></div>
              <div className="font-label-md text-on-surface-variant text-center">Immediate</div>
            </div>
            <div className="flex flex-col items-center gap-sm w-1/3 group">
              <div className="text-mono-data text-secondary font-semibold">3,892</div>
              <div className="w-full bg-secondary rounded-t-sm hover:opacity-80 transition-all cursor-pointer h-[144px]"></div>
              <div className="font-label-md text-on-surface-variant text-center">Short-Term</div>
            </div>
            <div className="flex flex-col items-center gap-sm w-1/3 group">
              <div className="text-mono-data text-primary font-semibold">8,431</div>
              <div className="w-full bg-primary rounded-t-sm hover:opacity-80 transition-all cursor-pointer h-[96px]"></div>
              <div className="font-label-md text-on-surface-variant text-center">Medium-Term</div>
            </div>
          </div>
        </div>

        {/* Hazard Index Distribution Curve Chart */}
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-md flex flex-col relative overflow-hidden border border-outline-variant/20">
          <div className="flex items-center justify-between mb-lg z-10">
            <h3 className="font-title-md text-on-surface font-semibold">Hazard Index Distribution</h3>
            <span className="material-symbols-outlined text-outline cursor-pointer hover:text-on-surface">more_vert</span>
          </div>
          <div className="flex-1 w-full h-[240px] relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#b6171e" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#b6171e" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,100 L0,90 Q20,85 40,80 T70,30 T100,5 L100,100 Z" fill="url(#areaGrad)"></path>
              <path
                d="M0,90 Q20,85 40,80 T70,30 T100,5"
                fill="none"
                stroke="#b6171e"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              ></path>
              <g className="text-[4px] fill-outline font-mono-data" transform="translate(10, 95)">
                <text x="0">0.0</text>
                <text x="40">0.5</text>
                <text x="80">1.0</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        {/* Safe Sites by CCI Category Donut Chart */}
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-md flex flex-col items-center border border-outline-variant/20">
          <div className="w-full flex items-center justify-between mb-md">
            <h3 className="font-title-md text-on-surface font-semibold">Safe Sites by CCI Category</h3>
            <span className="material-symbols-outlined text-outline cursor-pointer hover:text-on-surface">more_vert</span>
          </div>
          <div className="relative w-48 h-48 my-md">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
              <circle
                className="stroke-primary"
                cx="16"
                cy="16"
                fill="#a3f69c"
                r="16"
                strokeDasharray="100 100"
                strokeWidth="32"
              ></circle>
              <circle
                cx="16"
                cy="16"
                fill="transparent"
                r="16"
                stroke="#1a237e"
                strokeDasharray="60 100"
                strokeWidth="32"
              ></circle>
              <circle
                cx="16"
                cy="16"
                fill="transparent"
                r="16"
                stroke="#003909"
                strokeDasharray="25 100"
                strokeWidth="32"
              ></circle>
            </svg>
          </div>
          <div className="flex justify-center gap-md w-full mt-auto">
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
              <span className="font-label-md text-on-surface">Optimal (25%)</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-primary-container"></div>
              <span className="font-label-md text-on-surface">Suitable (35%)</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="font-label-md text-on-surface">Moderate (40%)</span>
            </div>
          </div>
        </div>

        {/* Red Zone Severity Donut Chart */}
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-md flex flex-col items-center border border-outline-variant/20">
          <div className="w-full flex items-center justify-between mb-md">
            <h3 className="font-title-md text-on-surface font-semibold">Red Zone Severity</h3>
            <span className="material-symbols-outlined text-outline cursor-pointer hover:text-on-surface">more_vert</span>
          </div>
          <div className="relative w-48 h-48 my-md">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                fill="transparent"
                r="12"
                stroke="#ffdad6"
                strokeDasharray="100 100"
                strokeWidth="8"
              ></circle>
              <circle
                cx="16"
                cy="16"
                fill="transparent"
                r="12"
                stroke="#da3433"
                strokeDasharray="75 100"
                strokeWidth="8"
              ></circle>
              <circle
                cx="16"
                cy="16"
                fill="transparent"
                r="12"
                stroke="#b6171e"
                strokeDasharray="45 100"
                strokeWidth="8"
              ></circle>
              <circle
                cx="16"
                cy="16"
                fill="transparent"
                r="12"
                stroke="#410003"
                strokeDasharray="15 100"
                strokeWidth="8"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="font-headline-md text-on-surface font-bold">1.2k</span>
              <span className="font-label-md text-on-surface-variant">Zones</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-sm w-full mt-auto">
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-on-secondary-fixed"></div>
              <span className="font-label-md text-on-surface">Critical (15%)</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="font-label-md text-on-surface">High (30%)</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
              <span className="font-label-md text-on-surface">Medium (30%)</span>
            </div>
            <div className="flex items-center gap-xs">
              <div className="w-3 h-3 rounded-full bg-error-container"></div>
              <span className="font-label-md text-on-surface">Low (25%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Habitation Priority Queue Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col border border-outline-variant/20">
        <div className="p-md bg-surface-container-low flex items-center justify-between border-b border-surface-variant">
          <h3 className="font-title-md text-on-surface font-semibold">Habitation Priority Queue</h3>
          <button
            onClick={handleExportCSV}
            className="font-label-md text-primary hover:text-primary-container transition-colors flex items-center gap-xs font-semibold focus:outline-none"
          >
            <span className="material-symbols-outlined text-[18px]">download</span> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest font-label-md text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20">
                <th className="p-md font-semibold w-16">Rank</th>
                <th className="p-md font-semibold">Habitation Name</th>
                <th className="p-md font-semibold text-right">Population</th>
                <th className="p-md font-semibold text-center">Hazard Index</th>
                <th className="p-md font-semibold text-center">Priority</th>
                <th className="p-md font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-on-surface">
              {habitations.map((hab) => {
                const isImmediate = hab.priority === 'Immediate';
                const isShortTerm = hab.priority === 'Short-Term';
                return (
                  <tr
                    key={hab.id}
                    className="border-b border-surface-container hover:bg-surface transition-colors cursor-pointer"
                    onClick={() => handleGoToMap(hab)}
                  >
                    <td className="p-md text-mono-data font-semibold text-on-surface-variant">{hab.rank}</td>
                    <td className="p-md font-mono-data text-primary font-bold">{hab.shortName}</td>
                    <td className="p-md text-right text-mono-data font-medium">{hab.population.toLocaleString()}</td>
                    <td className="p-md text-center">
                      <span
                        className={`inline-block w-full max-w-[80px] font-mono-data py-xs px-sm rounded-full text-[12px] font-bold ${
                          isImmediate
                            ? 'bg-error/10 text-error'
                            : isShortTerm
                            ? 'bg-secondary/10 text-secondary'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {hab.hazardIndex.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-md text-center">
                      <span
                        className={`inline-flex items-center gap-xs font-semibold text-[12px] uppercase ${
                          isImmediate ? 'text-error' : isShortTerm ? 'text-secondary' : 'text-primary'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isImmediate ? 'bg-error animate-pulse' : isShortTerm ? 'bg-secondary' : 'bg-primary'
                          }`}
                        ></div>
                        {hab.priority}
                      </span>
                    </td>
                    <td className="p-md text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleGoToMap(hab)}
                        className={`font-label-md py-xs px-sm rounded transition-colors inline-flex items-center gap-xs font-semibold ${
                          isImmediate
                            ? 'bg-primary text-on-primary hover:bg-primary-container'
                            : 'bg-surface-container text-primary hover:bg-surface-variant'
                        }`}
                      >
                        Map <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
