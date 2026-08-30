import React, { createContext, useContext, useState, useMemo } from 'react';
import { INDIAN_HABITATIONS, INDIAN_SAFE_SITES } from '../data/backendIndiaData';
import { ANALYTICS_DATA } from '../data/analyticsData';

const GISContext = createContext();

export const GISProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [rainfall, setRainfall] = useState(150);
  const [selectedRegion, setSelectedRegion] = useState('All'); // 'All' | 'Uttarakhand' | 'Himachal Pradesh'
  
  const [riskPriorities, setRiskPriorities] = useState({
    immediate: true,
    shortTerm: true,
    mediumTerm: true,
  });

  const [hazardTypes, setHazardTypes] = useState({
    landslide: true,
    flood: false,
    erosion: true,
  });

  // Filter habitations according to selected Indian state/region
  const habitations = useMemo(() => {
    if (selectedRegion === 'All') return INDIAN_HABITATIONS;
    return INDIAN_HABITATIONS.filter((h) => h.region === selectedRegion);
  }, [selectedRegion]);

  const safeSites = useMemo(() => {
    if (selectedRegion === 'All') return INDIAN_SAFE_SITES;
    return INDIAN_SAFE_SITES.filter((s) => s.state === selectedRegion);
  }, [selectedRegion]);

  // Selected Habitation for details drawer & relocation planning
  const [selectedHabitation, setSelectedHabitation] = useState(INDIAN_HABITATIONS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeRouteHabitationId, setActiveRouteHabitationId] = useState(null);
  const [isGeneratingRoute, setIsGeneratingRoute] = useState(false);

  // Relocation wizard step (1 to 6)
  const [relocationStep, setRelocationStep] = useState(4);
  const [sourceHabitation, setSourceHabitation] = useState(INDIAN_HABITATIONS[5]); // Joshimath
  const [destSafeSite, setDestSafeSite] = useState(INDIAN_SAFE_SITES[0]); // Pipalkoti Safe Zone

  const toggleRiskPriority = (key) => {
    setRiskPriorities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleHazardType = (key) => {
    setHazardTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectHabitation = (hab) => {
    setSelectedHabitation(hab);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setActiveRouteHabitationId(null);
  };

  const triggerPlanRoute = (habId) => {
    setIsGeneratingRoute(true);
    setActiveRouteHabitationId(habId);
    setTimeout(() => {
      setIsGeneratingRoute(false);
    }, 2500);
  };

  const navigateToRelocationWithHabitation = (hab) => {
    setSourceHabitation(hab);
    const targetSite =
      INDIAN_SAFE_SITES.find((s) => s.id === hab.targetSafeSiteId) || INDIAN_SAFE_SITES[0];
    setDestSafeSite(targetSite);
    setCurrentTab('relocation');
    setIsDrawerOpen(false);
  };

  return (
    <GISContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        rainfall,
        setRainfall,
        selectedRegion,
        setSelectedRegion,
        riskPriorities,
        toggleRiskPriority,
        hazardTypes,
        toggleHazardType,
        selectedHabitation,
        setSelectedHabitation,
        isDrawerOpen,
        setIsDrawerOpen,
        handleSelectHabitation,
        closeDrawer,
        activeRouteHabitationId,
        isGeneratingRoute,
        triggerPlanRoute,
        relocationStep,
        setRelocationStep,
        sourceHabitation,
        setSourceHabitation,
        destSafeSite,
        setDestSafeSite,
        navigateToRelocationWithHabitation,
        habitations,
        safeSites,
        analytics: ANALYTICS_DATA,
      }}
    >
      {children}
    </GISContext.Provider>
  );
};

export const useGIS = () => {
  const context = useContext(GISContext);
  if (!context) {
    throw new Error('useGIS must be used within a GISProvider');
  }
  return context;
};
