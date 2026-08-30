import React, { useState } from 'react';
import { DisasterProvider, useDisaster } from './context/DisasterContext';
import { GovernmentHeader } from './components/layout/GovernmentHeader';
import { CommandSidebar } from './components/layout/CommandSidebar';
import { NationalOverview } from './components/operations/NationalOverview';
import { GISMap } from './components/gis/GISMap';
import { DistrictDossier } from './components/intelligence/DistrictDossier';
import { ProactiveRelocationModule } from './components/decision/ProactiveRelocationModule';
import { ScenarioSimulator } from './components/decision/ScenarioSimulator';
import { CarryingCapacityView } from './components/analytics/CarryingCapacityView';
import { VulnerabilityAssessmentView } from './components/analytics/VulnerabilityAssessmentView';
import { IncidentCommandCenter } from './components/command/IncidentCommandCenter';
import { ActiveAlertsView } from './components/operations/ActiveAlertsView';
import { DataSourcesView } from './components/system/DataSourcesView';
import { OfficialSITREPReport } from './components/system/OfficialSITREPReport';
import { AuditLogView } from './components/system/AuditLogView';
import { LandingPage } from './components/landing/LandingPage';
import { PanelRightClose, PanelRightOpen, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardContent: React.FC = () => {
  const {
    activeTab,
    incidentCommandMode,
  } = useDisaster();

  const [dossierOpen, setDossierOpen] = useState(true);

  // If on Landing Page, render the dedicated full-screen public landing page with smooth transition
  if (activeTab === 'landing_page') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="landing_page"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="min-h-screen w-full"
        >
          <LandingPage />
        </motion.div>
      </AnimatePresence>
    );
  }

  // Render internal command view based on activeTab
  const renderMainView = () => {
    // If Incident Command Mode is active and tab is incident_command or national_overview, give priority to EOC
    if (incidentCommandMode && (activeTab === 'incident_command' || activeTab === 'national_overview')) {
      return <IncidentCommandCenter />;
    }

    switch (activeTab) {
      case 'national_overview':
        return <NationalOverview />;
      case 'district_intelligence':
        return (
          <div className="space-y-4">
            <div className="h-[580px] rounded overflow-hidden">
              <GISMap height="100%" />
            </div>
            <DistrictDossier />
          </div>
        );
      case 'incident_command':
        return <IncidentCommandCenter />;
      case 'active_alerts':
        return <ActiveAlertsView />;
      case 'risk_map':
      case 'red_zones':
        return (
          <div className="h-[calc(100vh-140px)] min-h-[580px] rounded overflow-hidden">
            <GISMap height="100%" />
          </div>
        );
      case 'carrying_capacity':
        return <CarryingCapacityView />;
      case 'vulnerability_assessment':
        return <VulnerabilityAssessmentView />;
      case 'relocation_intelligence':
        return <ProactiveRelocationModule />;
      case 'scenario_simulation':
        return <ScenarioSimulator />;
      case 'data_sources':
        return <DataSourcesView />;
      case 'reports_sitrep':
        return <OfficialSITREPReport />;
      case 'audit_logs':
        return <AuditLogView />;
      case 'settings':
        return (
          <div className="p-6 bg-[#0B192C] border border-slate-700 rounded shadow-gov space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white uppercase border-b border-slate-800 pb-2">
              National Platform Configuration
            </h3>
            <div className="space-y-3 text-slate-300">
              <div>GIS Rendering Engine: <strong className="text-white">Leaflet WFS/GeoJSON Vector Pipeline</strong></div>
              <div>Telemetry Refresh Rate: <strong className="text-emerald-400">10 Seconds (WebSocket / MQTT Active)</strong></div>
              <div>Security Protocol: <strong className="text-white">GovNet TLS 1.3 / PKI Digital Signature Module</strong></div>
              <div>Connected State Disaster Management Authorities: <strong className="text-amber-400">28 SDMAs / 8 UTs</strong></div>
            </div>
          </div>
        );
      default:
        return <NationalOverview />;
    }
  };

  // Determine if right dossier panel should be displayed in command center
  const shouldShowRightDossier =
    dossierOpen &&
    activeTab !== 'district_intelligence' &&
    activeTab !== 'reports_sitrep' &&
    activeTab !== 'audit_logs' &&
    activeTab !== 'data_sources' &&
    activeTab !== 'settings';

  return (
    <motion.div
      key="command_center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col h-screen w-screen overflow-hidden bg-[#070F1E] text-slate-100"
    >
      {/* Command Center Government Header */}
      <GovernmentHeader />

      {/* Incident Command Red Alert Border Indicator */}
      {incidentCommandMode && (
        <div className="bg-red-600 text-white font-mono text-[11px] font-bold px-4 py-1 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>INCIDENT COMMAND SYSTEM (EOC) ACTIVE • EMERGENCY DIRECTIVE RESTRICTED ACCESS</span>
          </div>
          <span>NEOC LEVEL-1 RED PROTOCOL</span>
        </div>
      )}

      {/* Main Command Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Command Sidebar Navigation */}
        <CommandSidebar />

        {/* Center Main Stage View with Animated Page Transition */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-[#070F1E] w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (incidentCommandMode ? '-eoc' : '')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full min-w-0 max-w-full"
            >
              {renderMainView()}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <DisasterProvider>
      <DashboardContent />
    </DisasterProvider>
  );
}
