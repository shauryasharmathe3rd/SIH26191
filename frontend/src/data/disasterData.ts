import { DistrictData, IncidentAlert, DataSourceTelemetry, AuditLogEntry, NationalStats } from '../types';

export const DEFAULT_NATIONAL_STATS: NationalStats = {
  activeIncidents: 0,
  criticalDistrictsCount: 0,
  highRiskDistrictsCount: 0,
  totalPopulationAtRisk: 0,
  evacuationRequiredCount: 0,
  evacuatedSoFar: 0,
  shelterCapacityTotal: 0,
  shelterCapacityOccupied: 0,
  criticalInfrastructureAtRisk: 0,
  ndrfBattalionsDeployed: 0,
  sdrfTeamsActive: 0,
  helicoptersOnStandby: 0,
  lastSyncTime: new Date().toISOString(),
  systemStatus: 'OPERATIONAL',
  connectedDataSourcesCount: 0,
};

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUDIT-INIT-001',
    timestamp: '10:00:00 IST',
    officerName: 'National EOC Controller',
    designation: 'NDMA EOC Incident Commander',
    actionType: 'ORDER_ISSUED',
    targetDistrict: 'National Grid',
    details: 'System initialized. Connected to FastAPI Spatial Relocation Engine & Live Telemetry Stream.',
    authorizationHash: 'SHA256:7f8a9b1c2d3e4f5a'
  }
];
