import React from 'react';
import { MapView } from '../components/map/MapView';
import { HabitationDrawer } from '../components/map/HabitationDrawer';

export const RiskMapPage = () => {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] p-md">
      <div className="flex-1 grid grid-cols-12 gap-md relative h-full">
        {/* Full-width / Full-height Map */}
        <div className="col-span-12 lg:col-span-9 bg-surface-container rounded-xl shadow-lg relative overflow-hidden flex flex-col border border-outline-variant/30 h-full">
          <MapView fullHeight={true} />
        </div>

        {/* Habitation Drawer / Details */}
        <div className="col-span-12 lg:col-span-3 h-full">
          <HabitationDrawer />
        </div>
      </div>
    </div>
  );
};
