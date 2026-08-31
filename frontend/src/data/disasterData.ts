import { DistrictData, IncidentAlert, DataSourceTelemetry, AuditLogEntry, NationalStats, GeoJSONFeatureCollection } from '../types';

export const DEFAULT_NATIONAL_STATS: NationalStats = {
  "activeIncidents": 4,
  "criticalDistrictsCount": 2,
  "highRiskDistrictsCount": 4,
  "totalPopulationAtRisk": 58077,
  "evacuationRequiredCount": 49365,
  "evacuatedSoFar": 27876,
  "shelterCapacityTotal": 169848,
  "shelterCapacityOccupied": 24391,
  "criticalInfrastructureAtRisk": 42,
  "ndrfBattalionsDeployed": 24,
  "sdrfTeamsActive": 46,
  "helicoptersOnStandby": 18,
  "lastSyncTime": "2026-08-30T11:00:00Z",
  "systemStatus": "OPERATIONAL",
  "connectedDataSourcesCount": 8
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

export const DEFAULT_DISTRICTS: DistrictData[] = [
  {
    "id": "chamoli-uk",
    "name": "Chamoli (Joshimath Sector)",
    "state": "Uttarakhand",
    "code": "UK-CHM",
    "coordinates": [
      30.5583,
      79.5667
    ],
    "center": [
      30.5583,
      79.5667
    ],
    "bounds": [
      [
        30.4083,
        79.41669999999999
      ],
      [
        30.708299999999998,
        79.7167
      ]
    ],
    "zoom": 12,
    "riskScore": 92,
    "riskLevel": "CRITICAL",
    "primaryHazard": "Landslide & InSAR Subsidence",
    "secondaryHazard": "Flash Floods & Slope Failure",
    "totalPopulation": 84200,
    "exposedPopulation": 6844,
    "vulnerableDemographics": {
      "elderly": 10104,
      "children": 13472,
      "differentlyAbled": 2947,
      "livestockCount": 23576
    },
    "carryingCapacity": {
      "compositeCapacityRatio": 95.0,
      "shelterBeds": {
        "name": "Emergency Shelter Bed Capacity",
        "current": 2874,
        "max": 29469,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "potableWater": {
        "name": "WHO Safe Drinking Water",
        "current": 123192,
        "max": 1684000,
        "unit": "Liters/Day",
        "status": "SURPLUS"
      },
      "medicalIcuBeds": {
        "name": "Critical ICU & Triage Beds",
        "current": 5,
        "max": 105,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "foodRations": {
        "name": "7-Day Buffer Rations",
        "current": 8212,
        "max": 50520,
        "unit": "Packs",
        "status": "SURPLUS"
      },
      "roadEvacuationFlow": {
        "name": "Corridor Transit Throughput",
        "current": 420,
        "max": 850,
        "unit": "Vehicles/Hour",
        "status": "DEFICIT"
      },
      "emergencyResponders": {
        "name": "Deployed NDRF/SDRF Strength",
        "current": 380,
        "max": 500,
        "unit": "Personnel",
        "status": "SURPLUS"
      },
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "vulnerability": {
      "compositeIndex": 77,
      "populationVulnerability": 38,
      "infrastructureVulnerability": 87,
      "socioEconomicVulnerability": 64,
      "accessibilityVulnerability": 94,
      "environmentalVulnerability": 97,
      "historicalExposure": 81,
      "keyRiskDrivers": [
        "InSAR deformation rate >0.4 mm/day along Alaknanda fault axis",
        "Steep slope angle (>35 deg) on fractured moraine overburden",
        "Pore-water pressure exceeding structural threshold (148.2 kPa)",
        "Single-corridor egress bottleneck along NH-7 Joshimath axis"
      ]
    },
    "aiRecommendation": {
      "id": "REC-UK-CHM-2026",
      "districtId": "chamoli-uk",
      "priority": "PRIORITY_1",
      "priorityLabel": "STAGE-1 MANDATORY RELOCATION",
      "actionTitle": "Immediate Relocation Protocol: Chamoli (Joshimath Sector)",
      "executiveSummary": "AI model detects hazard index HI=0.92 exceeding safe threshold. Mandatory relocation of 6,844 exposed residents to identified high-capacity relocation sites.",
      "confidenceScore": 99.2,
      "populationToRelocate": 6844,
      "recommendedEvacuationWindow": "6 Hours (Pre-Landfall/Crest)",
      "designatedShelterIds": [
        "SHELTER-01",
        "SHELTER-02",
        "SHELTER-03"
      ],
      "designatedShelterNames": [
        "Chamoli Govt College Safe Complex",
        "Chamoli Transit High-Ground Camp",
        "District Emergency Multipurpose Center"
      ],
      "explainableFactors": [
        {
          "factor": "DEM Slope Geomorphology",
          "weightPercent": 35,
          "indicatorValue": "Slope >32 deg",
          "description": "High shear stress on moraine soil over fractured bedrock"
        },
        {
          "factor": "Live Monsoon Rainfall Rate",
          "weightPercent": 30,
          "indicatorValue": "142.5 mm/24h",
          "description": "Exceeds 72h saturation threshold for rapid slope failure"
        },
        {
          "factor": "Single Egress Vulnerability",
          "weightPercent": 20,
          "indicatorValue": "1 Arterial Corridor",
          "description": "Single-route dependency vulnerable to structural landslide blockage"
        },
        {
          "factor": "Structural Building Density",
          "weightPercent": 15,
          "indicatorValue": "High Masonry Ratio",
          "description": "High unreinforced masonry building exposure in red zone"
        }
      ],
      "requiredTransportUnits": {
        "buses": 137,
        "ambulances": 23,
        "reliefTrucks": 46,
        "ndrfPersonnel": 115,
        "boats": 0
      },
      "orderNumber": "DMA/2026/SEC34/UK-CHM",
      "approved": false
    },
    "weatherTelemetry": {
      "rainfall24hMm": 142.5,
      "rainfallForecastNext6hMm": 48.0,
      "riverDischargeCusecs": 14500,
      "soilMoisturePercent": 88.4,
      "windSpeedKmh": 28.5,
      "temperatureCelsius": 18.2,
      "cloudCoverPercent": 95,
      "weatherCondition": "Torrential Downpour / Monsoon Surge",
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "historicalEventsCount": 8,
    "hazardZones": [
      {
        "id": "HZ-UK-CHM-01",
        "name": "Chamoli (Joshimath Sector) Core Red Zone",
        "hazardType": "Landslide & InSAR Subsidence",
        "severity": "CRITICAL",
        "coordinates": [
          [
            30.5983,
            79.52669999999999
          ],
          [
            30.5983,
            79.6067
          ],
          [
            30.5183,
            79.6067
          ],
          [
            30.5183,
            79.52669999999999
          ],
          [
            30.5983,
            79.52669999999999
          ]
        ],
        "areaSqKm": 18.5,
        "populationAtRisk": 6844,
        "returnPeriodYears": 50
      }
    ],
    "infrastructure": [
      {
        "id": "INF-UK-CHM-01",
        "name": "Chamoli (Joshimath Sector) District Hospital & Trauma Center",
        "type": "HOSPITAL",
        "coordinates": [
          30.5683,
          79.5767
        ],
        "status": "OPERATIONAL",
        "capacity": 250,
        "currentOccupancy": 190
      },
      {
        "id": "INF-UK-CHM-02",
        "name": "Chamoli (Joshimath Sector) High-Ground Relocation Shelter Hub",
        "type": "SHELTER",
        "coordinates": [
          30.5383,
          79.5967
        ],
        "status": "OPERATIONAL",
        "capacity": 3500,
        "currentOccupancy": 450
      },
      {
        "id": "INF-UK-CHM-03",
        "name": "Chamoli (Joshimath Sector) Main Arterial River Bridge",
        "type": "BRIDGE",
        "coordinates": [
          30.5733,
          79.5467
        ],
        "status": "COMPROMISED"
      },
      {
        "id": "INF-UK-CHM-04",
        "name": "Chamoli (Joshimath Sector) Tactical Helipad / Air Triage Base",
        "type": "HELIPAD",
        "coordinates": [
          30.528299999999998,
          79.55669999999999
        ],
        "status": "OPERATIONAL"
      }
    ],
    "evacuationRoutes": [
      {
        "id": "ROUTER-UK-CHM-01",
        "code": "CORRIDOR-UK-CHM-ALPHA",
        "name": "NH-7 / Badrinath High-Terrace Convoy Arterial",
        "fromZone": "Joshimath Central Slump Ward (Core Red Zone)",
        "toShelter": "Helang High-Ground Relief Complex (CCI 93.8)",
        "coordinates": [
          [
            30.5583,
            79.5667
          ],
          [
            30.5583,
            79.5667
          ],
          [
            30.555,
            79.571
          ],
          [
            30.551,
            79.5775
          ],
          [
            30.546,
            79.583
          ],
          [
            30.539,
            79.591
          ],
          [
            30.531,
            79.602
          ],
          [
            30.522,
            79.615
          ],
          [
            30.514,
            79.629
          ],
          [
            30.505,
            79.642
          ],
          [
            30.496,
            79.658
          ],
          [
            30.485,
            79.673
          ],
          [
            30.485,
            79.673
          ]
        ],
        "distanceKm": 13.08,
        "euclideanDistanceKm": 13.04,
        "detourRatio": 1.0,
        "estimatedTransitMins": 20,
        "clearanceStatus": "CONGESTED",
        "status": "CONGESTED",
        "osmHighwayClass": "trunk",
        "roadCapacityVehiclesPerHour": 600,
        "transitCapacityPerHour": 600,
        "currentFlowPerHour": 480,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": true,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              30.5583,
              79.5667
            ],
            "to_coord": [
              30.5583,
              79.5667
            ],
            "distance_km": 0.0,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              30.5583,
              79.5667
            ],
            "to_coord": [
              30.555,
              79.571
            ],
            "distance_km": 0.55,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              30.555,
              79.571
            ],
            "to_coord": [
              30.551,
              79.5775
            ],
            "distance_km": 0.77,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 4,
            "from_coord": [
              30.551,
              79.5775
            ],
            "to_coord": [
              30.546,
              79.583
            ],
            "distance_km": 0.77,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 5,
            "from_coord": [
              30.546,
              79.583
            ],
            "to_coord": [
              30.539,
              79.591
            ],
            "distance_km": 1.09,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 6,
            "from_coord": [
              30.539,
              79.591
            ],
            "to_coord": [
              30.531,
              79.602
            ],
            "distance_km": 1.38,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 7,
            "from_coord": [
              30.531,
              79.602
            ],
            "to_coord": [
              30.522,
              79.615
            ],
            "distance_km": 1.6,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 8,
            "from_coord": [
              30.522,
              79.615
            ],
            "to_coord": [
              30.514,
              79.629
            ],
            "distance_km": 1.61,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 9,
            "from_coord": [
              30.514,
              79.629
            ],
            "to_coord": [
              30.505,
              79.642
            ],
            "distance_km": 1.6,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 10,
            "from_coord": [
              30.505,
              79.642
            ],
            "to_coord": [
              30.496,
              79.658
            ],
            "distance_km": 1.83,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 11,
            "from_coord": [
              30.496,
              79.658
            ],
            "to_coord": [
              30.485,
              79.673
            ],
            "distance_km": 1.89,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 12,
            "from_coord": [
              30.485,
              79.673
            ],
            "to_coord": [
              30.485,
              79.673
            ],
            "distance_km": 0.0,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 14 Terrain Narrows, Chamoli (Joshimath Sector)"
      },
      {
        "id": "ROUTER-UK-CHM-02",
        "code": "CORRIDOR-UK-CHM-BETA",
        "name": "SH-45 Helang-Urgam Valley High-Ground Egress",
        "fromZone": "Parvati Gorge Vulnerable Habitation Cluster",
        "toShelter": "Pipalkoti Safe Transit Relocation Hub (CCI 88.5)",
        "coordinates": [
          [
            30.5583,
            79.5667
          ],
          [
            30.5583,
            79.5667
          ],
          [
            30.635,
            79.492
          ]
        ],
        "distanceKm": 11.13,
        "euclideanDistanceKm": 11.13,
        "detourRatio": 1.0,
        "estimatedTransitMins": 17,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "trunk",
        "roadCapacityVehiclesPerHour": 400,
        "transitCapacityPerHour": 400,
        "currentFlowPerHour": 150,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": true,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              30.5583,
              79.5667
            ],
            "to_coord": [
              30.5583,
              79.5667
            ],
            "distance_km": 0.0,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              30.5583,
              79.5667
            ],
            "to_coord": [
              30.635,
              79.492
            ],
            "distance_km": 11.13,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 20 Terrain Narrows, Chamoli (Joshimath Sector)"
      },
      {
        "id": "ROUTER-UK-CHM-03",
        "code": "CORRIDOR-UK-CHM-GAMMA",
        "name": "Joshimath-Auli Strategic Mountain Bypass Route",
        "fromZone": "Downstream Alaknanda Fluvial Pocket",
        "toShelter": "Auli High-Altitude Safe Reception Center",
        "coordinates": [
          [
            30.5583,
            79.5667
          ],
          [
            30.5583,
            79.5667
          ],
          [
            30.555,
            79.571
          ],
          [
            30.51,
            79.525
          ]
        ],
        "distanceKm": 7.22,
        "euclideanDistanceKm": 6.69,
        "detourRatio": 1.08,
        "estimatedTransitMins": 11,
        "clearanceStatus": "CAUTION",
        "status": "CAUTION",
        "osmHighwayClass": "trunk",
        "roadCapacityVehiclesPerHour": 280,
        "transitCapacityPerHour": 280,
        "currentFlowPerHour": 90,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": false,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              30.5583,
              79.5667
            ],
            "to_coord": [
              30.5583,
              79.5667
            ],
            "distance_km": 0.0,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              30.5583,
              79.5667
            ],
            "to_coord": [
              30.555,
              79.571
            ],
            "distance_km": 0.55,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              30.555,
              79.571
            ],
            "to_coord": [
              30.51,
              79.525
            ],
            "distance_km": 6.67,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 26 Terrain Narrows, Chamoli (Joshimath Sector)"
      }
    ],
    "dataSources": [
      "ISRO Cartosat-3 InSAR",
      "Copernicus Sentinel-1 SAR",
      "Copernicus Sentinel-2 Optical",
      "IMD Doppler Weather Radar",
      "CWC Hydrological Telemetry",
      "OpenStreetMap Vector Layer"
    ],
    "lastUpdated": "2026-08-30T11:00:00Z",
    "operationalStatus": "EMERGENCY_RED_ALERT"
  },
  {
    "id": "wayanad-kl",
    "name": "Wayanad (Meppadi-Chooralmala)",
    "state": "Kerala",
    "code": "KL-WYD",
    "coordinates": [
      11.6854,
      76.132
    ],
    "center": [
      11.6854,
      76.132
    ],
    "bounds": [
      [
        11.5354,
        75.982
      ],
      [
        11.8354,
        76.28200000000001
      ]
    ],
    "zoom": 12,
    "riskScore": 88,
    "riskLevel": "CRITICAL",
    "primaryHazard": "Debris Flow & Torrential Runoff",
    "secondaryHazard": "Flash Flood & Stream Breach",
    "totalPopulation": 64800,
    "exposedPopulation": 12200,
    "vulnerableDemographics": {
      "elderly": 7776,
      "children": 10368,
      "differentlyAbled": 2268,
      "livestockCount": 18144
    },
    "carryingCapacity": {
      "compositeCapacityRatio": 95.6,
      "shelterBeds": {
        "name": "Emergency Shelter Bed Capacity",
        "current": 5124,
        "max": 22680,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "potableWater": {
        "name": "WHO Safe Drinking Water",
        "current": 219600,
        "max": 1296000,
        "unit": "Liters/Day",
        "status": "SURPLUS"
      },
      "medicalIcuBeds": {
        "name": "Critical ICU & Triage Beds",
        "current": 10,
        "max": 81,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "foodRations": {
        "name": "7-Day Buffer Rations",
        "current": 14640,
        "max": 38880,
        "unit": "Packs",
        "status": "SURPLUS"
      },
      "roadEvacuationFlow": {
        "name": "Corridor Transit Throughput",
        "current": 420,
        "max": 850,
        "unit": "Vehicles/Hour",
        "status": "DEFICIT"
      },
      "emergencyResponders": {
        "name": "Deployed NDRF/SDRF Strength",
        "current": 380,
        "max": 500,
        "unit": "Personnel",
        "status": "SURPLUS"
      },
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "vulnerability": {
      "compositeIndex": 78,
      "populationVulnerability": 61,
      "infrastructureVulnerability": 84,
      "socioEconomicVulnerability": 64,
      "accessibilityVulnerability": 90,
      "environmentalVulnerability": 92,
      "historicalExposure": 77,
      "keyRiskDrivers": [
        "Continuous cloudburst rainfall (>200 mm/24h) across Western Ghats ridge",
        "Severe slope saturation triggering rapid debris-flow mobilization",
        "Severed arterial bridge at Meppadi riverbank corridor",
        "High demographic vulnerability in tea plantation settlements"
      ]
    },
    "aiRecommendation": {
      "id": "REC-KL-WYD-2026",
      "districtId": "wayanad-kl",
      "priority": "PRIORITY_1",
      "priorityLabel": "STAGE-1 MANDATORY RELOCATION",
      "actionTitle": "Immediate Relocation Protocol: Wayanad (Meppadi-Chooralmala)",
      "executiveSummary": "AI model detects hazard index HI=0.88 exceeding safe threshold. Mandatory relocation of 12,200 exposed residents to identified high-capacity relocation sites.",
      "confidenceScore": 99.2,
      "populationToRelocate": 12200,
      "recommendedEvacuationWindow": "6 Hours (Pre-Landfall/Crest)",
      "designatedShelterIds": [
        "SHELTER-01",
        "SHELTER-02",
        "SHELTER-03"
      ],
      "designatedShelterNames": [
        "Wayanad Govt College Safe Complex",
        "Wayanad Transit High-Ground Camp",
        "District Emergency Multipurpose Center"
      ],
      "explainableFactors": [
        {
          "factor": "DEM Slope Geomorphology",
          "weightPercent": 35,
          "indicatorValue": "Slope >32 deg",
          "description": "High shear stress on moraine soil over fractured bedrock"
        },
        {
          "factor": "Live Monsoon Rainfall Rate",
          "weightPercent": 30,
          "indicatorValue": "210.0 mm/24h",
          "description": "Exceeds 72h saturation threshold for rapid slope failure"
        },
        {
          "factor": "Single Egress Vulnerability",
          "weightPercent": 20,
          "indicatorValue": "1 Arterial Corridor",
          "description": "Single-route dependency vulnerable to structural landslide blockage"
        },
        {
          "factor": "Structural Building Density",
          "weightPercent": 15,
          "indicatorValue": "High Masonry Ratio",
          "description": "High unreinforced masonry building exposure in red zone"
        }
      ],
      "requiredTransportUnits": {
        "buses": 244,
        "ambulances": 41,
        "reliefTrucks": 82,
        "ndrfPersonnel": 204,
        "boats": 0
      },
      "orderNumber": "DMA/2026/SEC34/KL-WYD",
      "approved": false
    },
    "weatherTelemetry": {
      "rainfall24hMm": 210.0,
      "rainfallForecastNext6hMm": 65.0,
      "riverDischargeCusecs": 18200,
      "soilMoisturePercent": 94.2,
      "windSpeedKmh": 28.5,
      "temperatureCelsius": 18.2,
      "cloudCoverPercent": 95,
      "weatherCondition": "Torrential Downpour / Monsoon Surge",
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "historicalEventsCount": 8,
    "hazardZones": [
      {
        "id": "HZ-KL-WYD-01",
        "name": "Wayanad (Meppadi-Chooralmala) Core Red Zone",
        "hazardType": "Debris Flow & Torrential Runoff",
        "severity": "CRITICAL",
        "coordinates": [
          [
            11.725399999999999,
            76.092
          ],
          [
            11.725399999999999,
            76.17200000000001
          ],
          [
            11.6454,
            76.17200000000001
          ],
          [
            11.6454,
            76.092
          ],
          [
            11.725399999999999,
            76.092
          ]
        ],
        "areaSqKm": 18.5,
        "populationAtRisk": 12200,
        "returnPeriodYears": 50
      }
    ],
    "infrastructure": [
      {
        "id": "INF-KL-WYD-01",
        "name": "Wayanad (Meppadi-Chooralmala) District Hospital & Trauma Center",
        "type": "HOSPITAL",
        "coordinates": [
          11.6954,
          76.14200000000001
        ],
        "status": "OPERATIONAL",
        "capacity": 250,
        "currentOccupancy": 190
      },
      {
        "id": "INF-KL-WYD-02",
        "name": "Wayanad (Meppadi-Chooralmala) High-Ground Relocation Shelter Hub",
        "type": "SHELTER",
        "coordinates": [
          11.6654,
          76.162
        ],
        "status": "OPERATIONAL",
        "capacity": 3500,
        "currentOccupancy": 450
      },
      {
        "id": "INF-KL-WYD-03",
        "name": "Wayanad (Meppadi-Chooralmala) Main Arterial River Bridge",
        "type": "BRIDGE",
        "coordinates": [
          11.7004,
          76.11200000000001
        ],
        "status": "COMPROMISED"
      },
      {
        "id": "INF-KL-WYD-04",
        "name": "Wayanad (Meppadi-Chooralmala) Tactical Helipad / Air Triage Base",
        "type": "HELIPAD",
        "coordinates": [
          11.6554,
          76.122
        ],
        "status": "OPERATIONAL"
      }
    ],
    "evacuationRoutes": [
      {
        "id": "ROUTER-KL-WYD-01",
        "code": "CORRIDOR-KL-WYD-ALPHA",
        "name": "SH-59 Meppadi-Kalpetta Primary Transit Highway",
        "fromZone": "Chooralmala Debris Flow Core Red Zone",
        "toShelter": "Kalpetta Municipal High-Ground Safe Center",
        "coordinates": [
          [
            11.6854,
            76.132
          ],
          [
            11.6854,
            76.132
          ],
          [
            11.678,
            76.139
          ],
          [
            11.669,
            76.148
          ],
          [
            11.658,
            76.16
          ],
          [
            11.645,
            76.175
          ],
          [
            11.632,
            76.192
          ],
          [
            11.62,
            76.21
          ],
          [
            11.62,
            76.21
          ]
        ],
        "distanceKm": 11.21,
        "euclideanDistanceKm": 11.18,
        "detourRatio": 1.0,
        "estimatedTransitMins": 17,
        "clearanceStatus": "CONGESTED",
        "status": "CONGESTED",
        "osmHighwayClass": "primary",
        "roadCapacityVehiclesPerHour": 600,
        "transitCapacityPerHour": 600,
        "currentFlowPerHour": 480,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": true,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              11.6854,
              76.132
            ],
            "to_coord": [
              11.6854,
              76.132
            ],
            "distance_km": 0.0,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              11.6854,
              76.132
            ],
            "to_coord": [
              11.678,
              76.139
            ],
            "distance_km": 1.12,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              11.678,
              76.139
            ],
            "to_coord": [
              11.669,
              76.148
            ],
            "distance_km": 1.4,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 4,
            "from_coord": [
              11.669,
              76.148
            ],
            "to_coord": [
              11.658,
              76.16
            ],
            "distance_km": 1.79,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 5,
            "from_coord": [
              11.658,
              76.16
            ],
            "to_coord": [
              11.645,
              76.175
            ],
            "distance_km": 2.18,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 6,
            "from_coord": [
              11.645,
              76.175
            ],
            "to_coord": [
              11.632,
              76.192
            ],
            "distance_km": 2.35,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 7,
            "from_coord": [
              11.632,
              76.192
            ],
            "to_coord": [
              11.62,
              76.21
            ],
            "distance_km": 2.37,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 8,
            "from_coord": [
              11.62,
              76.21
            ],
            "to_coord": [
              11.62,
              76.21
            ],
            "distance_km": 0.0,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 14 Terrain Narrows, Wayanad (Meppadi-Chooralmala)"
      },
      {
        "id": "ROUTER-KL-WYD-02",
        "code": "CORRIDOR-KL-WYD-BETA",
        "name": "Nedumpala Mountain Evacuation Bypass Road",
        "fromZone": "Mundakkai Riverbank Settlement Cluster",
        "toShelter": "Meppadi High School Relocation Shelter Hub",
        "coordinates": [
          [
            11.6854,
            76.132
          ],
          [
            11.6854,
            76.132
          ],
          [
            11.745,
            76.065
          ]
        ],
        "distanceKm": 9.86,
        "euclideanDistanceKm": 9.86,
        "detourRatio": 1.0,
        "estimatedTransitMins": 15,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "primary",
        "roadCapacityVehiclesPerHour": 400,
        "transitCapacityPerHour": 400,
        "currentFlowPerHour": 150,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": false,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              11.6854,
              76.132
            ],
            "to_coord": [
              11.6854,
              76.132
            ],
            "distance_km": 0.0,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              11.6854,
              76.132
            ],
            "to_coord": [
              11.745,
              76.065
            ],
            "distance_km": 9.86,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 20 Terrain Narrows, Wayanad (Meppadi-Chooralmala)"
      }
    ],
    "dataSources": [
      "ISRO Cartosat-3 InSAR",
      "Copernicus Sentinel-1 SAR",
      "Copernicus Sentinel-2 Optical",
      "IMD Doppler Weather Radar",
      "CWC Hydrological Telemetry",
      "OpenStreetMap Vector Layer"
    ],
    "lastUpdated": "2026-08-30T11:00:00Z",
    "operationalStatus": "EMERGENCY_RED_ALERT"
  },
  {
    "id": "mandi-hp",
    "name": "Mandi (Beas River Valley)",
    "state": "Himachal Pradesh",
    "code": "HP-MND",
    "coordinates": [
      31.5892,
      76.9182
    ],
    "center": [
      31.5892,
      76.9182
    ],
    "bounds": [
      [
        31.439200000000003,
        76.7682
      ],
      [
        31.7392,
        77.0682
      ]
    ],
    "zoom": 11,
    "riskScore": 79,
    "riskLevel": "HIGH",
    "primaryHazard": "Riverine Surge & Flash Flooding",
    "secondaryHazard": "Cut-Slope Road Failure",
    "totalPopulation": 92000,
    "exposedPopulation": 4123,
    "vulnerableDemographics": {
      "elderly": 11040,
      "children": 14720,
      "differentlyAbled": 3220,
      "livestockCount": 25760
    },
    "carryingCapacity": {
      "compositeCapacityRatio": 97.0,
      "shelterBeds": {
        "name": "Emergency Shelter Bed Capacity",
        "current": 1731,
        "max": 32199,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "potableWater": {
        "name": "WHO Safe Drinking Water",
        "current": 74214,
        "max": 1840000,
        "unit": "Liters/Day",
        "status": "SURPLUS"
      },
      "medicalIcuBeds": {
        "name": "Critical ICU & Triage Beds",
        "current": 3,
        "max": 115,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "foodRations": {
        "name": "7-Day Buffer Rations",
        "current": 4947,
        "max": 55200,
        "unit": "Packs",
        "status": "SURPLUS"
      },
      "roadEvacuationFlow": {
        "name": "Corridor Transit Throughput",
        "current": 420,
        "max": 850,
        "unit": "Vehicles/Hour",
        "status": "ADEQUATE"
      },
      "emergencyResponders": {
        "name": "Deployed NDRF/SDRF Strength",
        "current": 380,
        "max": 500,
        "unit": "Personnel",
        "status": "SURPLUS"
      },
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "vulnerability": {
      "compositeIndex": 67,
      "populationVulnerability": 30,
      "infrastructureVulnerability": 75,
      "socioEconomicVulnerability": 64,
      "accessibilityVulnerability": 81,
      "environmentalVulnerability": 83,
      "historicalExposure": 70,
      "keyRiskDrivers": [
        "Extreme Beas river stage at +2.1m above high flood level (HFL)",
        "Active cut-slope scouring along Chandigarh-Manali national highway",
        "Saturated terrace embankments in fluvial zones",
        "Heavy tourist transit volume complicating evacuation logistics"
      ]
    },
    "aiRecommendation": {
      "id": "REC-HP-MND-2026",
      "districtId": "mandi-hp",
      "priority": "PRIORITY_2",
      "priorityLabel": "STAGE-2 PRE-EMPTIVE ADVISORY",
      "actionTitle": "Immediate Relocation Protocol: Mandi (Beas River Valley)",
      "executiveSummary": "AI model detects hazard index HI=0.79 exceeding safe threshold. Mandatory relocation of 4,123 exposed residents to identified high-capacity relocation sites.",
      "confidenceScore": 96.5,
      "populationToRelocate": 4123,
      "recommendedEvacuationWindow": "18 Hours",
      "designatedShelterIds": [
        "SHELTER-01",
        "SHELTER-02",
        "SHELTER-03"
      ],
      "designatedShelterNames": [
        "Mandi Govt College Safe Complex",
        "Mandi Transit High-Ground Camp",
        "District Emergency Multipurpose Center"
      ],
      "explainableFactors": [
        {
          "factor": "DEM Slope Geomorphology",
          "weightPercent": 35,
          "indicatorValue": "Slope >32 deg",
          "description": "High shear stress on moraine soil over fractured bedrock"
        },
        {
          "factor": "Live Monsoon Rainfall Rate",
          "weightPercent": 30,
          "indicatorValue": "115.0 mm/24h",
          "description": "Exceeds 72h saturation threshold for rapid slope failure"
        },
        {
          "factor": "Single Egress Vulnerability",
          "weightPercent": 20,
          "indicatorValue": "1 Arterial Corridor",
          "description": "Single-route dependency vulnerable to structural landslide blockage"
        },
        {
          "factor": "Structural Building Density",
          "weightPercent": 15,
          "indicatorValue": "High Masonry Ratio",
          "description": "High unreinforced masonry building exposure in red zone"
        }
      ],
      "requiredTransportUnits": {
        "buses": 83,
        "ambulances": 14,
        "reliefTrucks": 28,
        "ndrfPersonnel": 69,
        "boats": 0
      },
      "orderNumber": "DMA/2026/SEC34/HP-MND",
      "approved": false
    },
    "weatherTelemetry": {
      "rainfall24hMm": 115.0,
      "rainfallForecastNext6hMm": 32.0,
      "riverDischargeCusecs": 22400,
      "soilMoisturePercent": 78.5,
      "windSpeedKmh": 28.5,
      "temperatureCelsius": 18.2,
      "cloudCoverPercent": 95,
      "weatherCondition": "Torrential Downpour / Monsoon Surge",
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "historicalEventsCount": 8,
    "hazardZones": [
      {
        "id": "HZ-HP-MND-01",
        "name": "Mandi (Beas River Valley) Core Red Zone",
        "hazardType": "Riverine Surge & Flash Flooding",
        "severity": "HIGH",
        "coordinates": [
          [
            31.6292,
            76.87819999999999
          ],
          [
            31.6292,
            76.9582
          ],
          [
            31.549200000000003,
            76.9582
          ],
          [
            31.549200000000003,
            76.87819999999999
          ],
          [
            31.6292,
            76.87819999999999
          ]
        ],
        "areaSqKm": 18.5,
        "populationAtRisk": 4123,
        "returnPeriodYears": 50
      }
    ],
    "infrastructure": [
      {
        "id": "INF-HP-MND-01",
        "name": "Mandi (Beas River Valley) District Hospital & Trauma Center",
        "type": "HOSPITAL",
        "coordinates": [
          31.599200000000003,
          76.9282
        ],
        "status": "OPERATIONAL",
        "capacity": 250,
        "currentOccupancy": 190
      },
      {
        "id": "INF-HP-MND-02",
        "name": "Mandi (Beas River Valley) High-Ground Relocation Shelter Hub",
        "type": "SHELTER",
        "coordinates": [
          31.569200000000002,
          76.9482
        ],
        "status": "OPERATIONAL",
        "capacity": 3500,
        "currentOccupancy": 450
      },
      {
        "id": "INF-HP-MND-03",
        "name": "Mandi (Beas River Valley) Main Arterial River Bridge",
        "type": "BRIDGE",
        "coordinates": [
          31.604200000000002,
          76.8982
        ],
        "status": "OPERATIONAL"
      },
      {
        "id": "INF-HP-MND-04",
        "name": "Mandi (Beas River Valley) Tactical Helipad / Air Triage Base",
        "type": "HELIPAD",
        "coordinates": [
          31.5592,
          76.9082
        ],
        "status": "OPERATIONAL"
      }
    ],
    "evacuationRoutes": [
      {
        "id": "ROUTER-HP-MND-01",
        "code": "CORRIDOR-HP-MND-ALPHA",
        "name": "NH-21 Beas Valley Elevated Highway Corridor",
        "fromZone": "Pandoh Surge Inundation Red Sector",
        "toShelter": "Sundernagar Multi-Purpose Relief Base",
        "coordinates": [
          [
            31.5892,
            76.9182
          ],
          [
            31.5892,
            76.9182
          ],
          [
            31.581,
            76.927
          ],
          [
            31.571,
            76.939
          ],
          [
            31.559,
            76.953
          ],
          [
            31.545,
            76.971
          ],
          [
            31.53,
            76.992
          ],
          [
            31.515,
            77.015
          ],
          [
            31.515,
            77.015
          ]
        ],
        "distanceKm": 12.36,
        "euclideanDistanceKm": 12.34,
        "detourRatio": 1.0,
        "estimatedTransitMins": 19,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "trunk",
        "roadCapacityVehiclesPerHour": 600,
        "transitCapacityPerHour": 600,
        "currentFlowPerHour": 480,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": true,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              31.5892,
              76.9182
            ],
            "to_coord": [
              31.5892,
              76.9182
            ],
            "distance_km": 0.0,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              31.5892,
              76.9182
            ],
            "to_coord": [
              31.581,
              76.927
            ],
            "distance_km": 1.24,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              31.581,
              76.927
            ],
            "to_coord": [
              31.571,
              76.939
            ],
            "distance_km": 1.59,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 4,
            "from_coord": [
              31.571,
              76.939
            ],
            "to_coord": [
              31.559,
              76.953
            ],
            "distance_km": 1.88,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 5,
            "from_coord": [
              31.559,
              76.953
            ],
            "to_coord": [
              31.545,
              76.971
            ],
            "distance_km": 2.31,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 6,
            "from_coord": [
              31.545,
              76.971
            ],
            "to_coord": [
              31.53,
              76.992
            ],
            "distance_km": 2.6,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 7,
            "from_coord": [
              31.53,
              76.992
            ],
            "to_coord": [
              31.515,
              77.015
            ],
            "distance_km": 2.74,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 8,
            "from_coord": [
              31.515,
              77.015
            ],
            "to_coord": [
              31.515,
              77.015
            ],
            "distance_km": 0.0,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 14 Terrain Narrows, Mandi (Beas River Valley)"
      },
      {
        "id": "ROUTER-HP-MND-02",
        "code": "CORRIDOR-HP-MND-BETA",
        "name": "Mandi-Kotli Ridge Evacuation Bypass Road",
        "fromZone": "Beas Cut-Slope Active Slump Ward",
        "toShelter": "Kotli High-Ground Safe Resettlement Depot",
        "coordinates": [
          [
            31.5892,
            76.9182
          ],
          [
            31.5892,
            76.9182
          ],
          [
            31.638,
            76.852
          ]
        ],
        "distanceKm": 8.29,
        "euclideanDistanceKm": 8.29,
        "detourRatio": 1.0,
        "estimatedTransitMins": 13,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "trunk",
        "roadCapacityVehiclesPerHour": 400,
        "transitCapacityPerHour": 400,
        "currentFlowPerHour": 150,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": false,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              31.5892,
              76.9182
            ],
            "to_coord": [
              31.5892,
              76.9182
            ],
            "distance_km": 0.0,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              31.5892,
              76.9182
            ],
            "to_coord": [
              31.638,
              76.852
            ],
            "distance_km": 8.29,
            "highway_type": "trunk",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 20 Terrain Narrows, Mandi (Beas River Valley)"
      }
    ],
    "dataSources": [
      "ISRO Cartosat-3 InSAR",
      "Copernicus Sentinel-1 SAR",
      "Copernicus Sentinel-2 Optical",
      "IMD Doppler Weather Radar",
      "CWC Hydrological Telemetry",
      "OpenStreetMap Vector Layer"
    ],
    "lastUpdated": "2026-08-30T11:00:00Z",
    "operationalStatus": "STAGE_2_WARNING"
  },
  {
    "id": "cuttack-od",
    "name": "Cuttack (Mahanadi River Basin)",
    "state": "Odisha",
    "code": "OD-CTC",
    "coordinates": [
      20.4625,
      85.8828
    ],
    "center": [
      20.4625,
      85.8828
    ],
    "bounds": [
      [
        20.3125,
        85.7328
      ],
      [
        20.612499999999997,
        86.03280000000001
      ]
    ],
    "zoom": 11,
    "riskScore": 74,
    "riskLevel": "HIGH",
    "primaryHazard": "Riverine Flood & Coastal Surge",
    "secondaryHazard": "Embankment Breach",
    "totalPopulation": 110000,
    "exposedPopulation": 16800,
    "vulnerableDemographics": {
      "elderly": 13200,
      "children": 17600,
      "differentlyAbled": 3850,
      "livestockCount": 30800
    },
    "carryingCapacity": {
      "compositeCapacityRatio": 97.7,
      "shelterBeds": {
        "name": "Emergency Shelter Bed Capacity",
        "current": 7056,
        "max": 38500,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "potableWater": {
        "name": "WHO Safe Drinking Water",
        "current": 302400,
        "max": 2200000,
        "unit": "Liters/Day",
        "status": "SURPLUS"
      },
      "medicalIcuBeds": {
        "name": "Critical ICU & Triage Beds",
        "current": 14,
        "max": 137,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "foodRations": {
        "name": "7-Day Buffer Rations",
        "current": 20160,
        "max": 66000,
        "unit": "Packs",
        "status": "SURPLUS"
      },
      "roadEvacuationFlow": {
        "name": "Corridor Transit Throughput",
        "current": 420,
        "max": 850,
        "unit": "Vehicles/Hour",
        "status": "ADEQUATE"
      },
      "emergencyResponders": {
        "name": "Deployed NDRF/SDRF Strength",
        "current": 380,
        "max": 500,
        "unit": "Personnel",
        "status": "SURPLUS"
      },
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "vulnerability": {
      "compositeIndex": 68,
      "populationVulnerability": 54,
      "infrastructureVulnerability": 70,
      "socioEconomicVulnerability": 64,
      "accessibilityVulnerability": 75,
      "environmentalVulnerability": 78,
      "historicalExposure": 65,
      "keyRiskDrivers": [
        "Mahanadi river discharge exceeding 800,000 cusecs at Naraj barrage",
        "Low-lying delta topography with limited natural gravity drainage",
        "Critical embankment pressure in vulnerable rural wards",
        "High density of livestock and kutchha dwelling structures"
      ]
    },
    "aiRecommendation": {
      "id": "REC-OD-CTC-2026",
      "districtId": "cuttack-od",
      "priority": "PRIORITY_2",
      "priorityLabel": "STAGE-2 PRE-EMPTIVE ADVISORY",
      "actionTitle": "Immediate Relocation Protocol: Cuttack (Mahanadi River Basin)",
      "executiveSummary": "AI model detects hazard index HI=0.74 exceeding safe threshold. Mandatory relocation of 16,800 exposed residents to identified high-capacity relocation sites.",
      "confidenceScore": 96.5,
      "populationToRelocate": 16800,
      "recommendedEvacuationWindow": "18 Hours",
      "designatedShelterIds": [
        "SHELTER-01",
        "SHELTER-02",
        "SHELTER-03"
      ],
      "designatedShelterNames": [
        "Cuttack Govt College Safe Complex",
        "Cuttack Transit High-Ground Camp",
        "District Emergency Multipurpose Center"
      ],
      "explainableFactors": [
        {
          "factor": "DEM Slope Geomorphology",
          "weightPercent": 35,
          "indicatorValue": "Slope >32 deg",
          "description": "High shear stress on moraine soil over fractured bedrock"
        },
        {
          "factor": "Live Monsoon Rainfall Rate",
          "weightPercent": 30,
          "indicatorValue": "95.0 mm/24h",
          "description": "Exceeds 72h saturation threshold for rapid slope failure"
        },
        {
          "factor": "Single Egress Vulnerability",
          "weightPercent": 20,
          "indicatorValue": "1 Arterial Corridor",
          "description": "Single-route dependency vulnerable to structural landslide blockage"
        },
        {
          "factor": "Structural Building Density",
          "weightPercent": 15,
          "indicatorValue": "High Masonry Ratio",
          "description": "High unreinforced masonry building exposure in red zone"
        }
      ],
      "requiredTransportUnits": {
        "buses": 336,
        "ambulances": 56,
        "reliefTrucks": 112,
        "ndrfPersonnel": 280,
        "boats": 8
      },
      "orderNumber": "DMA/2026/SEC34/OD-CTC",
      "approved": false
    },
    "weatherTelemetry": {
      "rainfall24hMm": 95.0,
      "rainfallForecastNext6hMm": 28.0,
      "riverDischargeCusecs": 38000,
      "soilMoisturePercent": 82.0,
      "windSpeedKmh": 28.5,
      "temperatureCelsius": 18.2,
      "cloudCoverPercent": 95,
      "weatherCondition": "Torrential Downpour / Monsoon Surge",
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "historicalEventsCount": 8,
    "hazardZones": [
      {
        "id": "HZ-OD-CTC-01",
        "name": "Cuttack (Mahanadi River Basin) Core Red Zone",
        "hazardType": "Riverine Flood & Coastal Surge",
        "severity": "HIGH",
        "coordinates": [
          [
            20.502499999999998,
            85.8428
          ],
          [
            20.502499999999998,
            85.92280000000001
          ],
          [
            20.4225,
            85.92280000000001
          ],
          [
            20.4225,
            85.8428
          ],
          [
            20.502499999999998,
            85.8428
          ]
        ],
        "areaSqKm": 18.5,
        "populationAtRisk": 16800,
        "returnPeriodYears": 50
      }
    ],
    "infrastructure": [
      {
        "id": "INF-OD-CTC-01",
        "name": "Cuttack (Mahanadi River Basin) District Hospital & Trauma Center",
        "type": "HOSPITAL",
        "coordinates": [
          20.4725,
          85.89280000000001
        ],
        "status": "OPERATIONAL",
        "capacity": 250,
        "currentOccupancy": 190
      },
      {
        "id": "INF-OD-CTC-02",
        "name": "Cuttack (Mahanadi River Basin) High-Ground Relocation Shelter Hub",
        "type": "SHELTER",
        "coordinates": [
          20.4425,
          85.9128
        ],
        "status": "OPERATIONAL",
        "capacity": 3500,
        "currentOccupancy": 450
      },
      {
        "id": "INF-OD-CTC-03",
        "name": "Cuttack (Mahanadi River Basin) Main Arterial River Bridge",
        "type": "BRIDGE",
        "coordinates": [
          20.4775,
          85.86280000000001
        ],
        "status": "OPERATIONAL"
      },
      {
        "id": "INF-OD-CTC-04",
        "name": "Cuttack (Mahanadi River Basin) Tactical Helipad / Air Triage Base",
        "type": "HELIPAD",
        "coordinates": [
          20.432499999999997,
          85.8728
        ],
        "status": "OPERATIONAL"
      }
    ],
    "evacuationRoutes": [
      {
        "id": "ROUTER-OD-CTC-01",
        "code": "CORRIDOR-OD-CTC-ALPHA",
        "name": "NH-16 Mahanadi Elevated Expressway Corridor",
        "fromZone": "Mahanadi Delta Inundation Sector",
        "toShelter": "Choudwar High-Ground Logistics Depot",
        "coordinates": [
          [
            20.4625,
            85.8828
          ],
          [
            20.4625,
            85.8828
          ],
          [
            20.454,
            85.895
          ],
          [
            20.443,
            85.912
          ],
          [
            20.43,
            85.932
          ],
          [
            20.415,
            85.955
          ],
          [
            20.398,
            85.982
          ],
          [
            20.398,
            85.982
          ]
        ],
        "distanceKm": 12.58,
        "euclideanDistanceKm": 12.58,
        "detourRatio": 1.0,
        "estimatedTransitMins": 13,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "motorway",
        "roadCapacityVehiclesPerHour": 600,
        "transitCapacityPerHour": 600,
        "currentFlowPerHour": 480,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": false,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              20.4625,
              85.8828
            ],
            "to_coord": [
              20.4625,
              85.8828
            ],
            "distance_km": 0.0,
            "highway_type": "motorway",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              20.4625,
              85.8828
            ],
            "to_coord": [
              20.454,
              85.895
            ],
            "distance_km": 1.58,
            "highway_type": "motorway",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              20.454,
              85.895
            ],
            "to_coord": [
              20.443,
              85.912
            ],
            "distance_km": 2.15,
            "highway_type": "motorway",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 4,
            "from_coord": [
              20.443,
              85.912
            ],
            "to_coord": [
              20.43,
              85.932
            ],
            "distance_km": 2.54,
            "highway_type": "motorway",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 5,
            "from_coord": [
              20.43,
              85.932
            ],
            "to_coord": [
              20.415,
              85.955
            ],
            "distance_km": 2.92,
            "highway_type": "motorway",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 6,
            "from_coord": [
              20.415,
              85.955
            ],
            "to_coord": [
              20.398,
              85.982
            ],
            "distance_km": 3.39,
            "highway_type": "motorway",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 7,
            "from_coord": [
              20.398,
              85.982
            ],
            "to_coord": [
              20.398,
              85.982
            ],
            "distance_km": 0.0,
            "highway_type": "motorway",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 14 Terrain Narrows, Cuttack (Mahanadi River Basin)"
      }
    ],
    "dataSources": [
      "ISRO Cartosat-3 InSAR",
      "Copernicus Sentinel-1 SAR",
      "Copernicus Sentinel-2 Optical",
      "IMD Doppler Weather Radar",
      "CWC Hydrological Telemetry",
      "OpenStreetMap Vector Layer"
    ],
    "lastUpdated": "2026-08-30T11:00:00Z",
    "operationalStatus": "STAGE_2_WARNING"
  },
  {
    "id": "majuli-as",
    "name": "Majuli Island (Brahmaputra Basin)",
    "state": "Assam",
    "code": "AS-MJL",
    "coordinates": [
      26.95,
      94.2
    ],
    "center": [
      26.95,
      94.2
    ],
    "bounds": [
      [
        26.8,
        94.05
      ],
      [
        27.099999999999998,
        94.35000000000001
      ]
    ],
    "zoom": 11,
    "riskScore": 68,
    "riskLevel": "HIGH",
    "primaryHazard": "River Island Inundation",
    "secondaryHazard": "Bank Erosion & Island Cleavage",
    "totalPopulation": 48000,
    "exposedPopulation": 9400,
    "vulnerableDemographics": {
      "elderly": 5760,
      "children": 7680,
      "differentlyAbled": 1680,
      "livestockCount": 13440
    },
    "carryingCapacity": {
      "compositeCapacityRatio": 98.0,
      "shelterBeds": {
        "name": "Emergency Shelter Bed Capacity",
        "current": 3948,
        "max": 16800,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "potableWater": {
        "name": "WHO Safe Drinking Water",
        "current": 169200,
        "max": 960000,
        "unit": "Liters/Day",
        "status": "SURPLUS"
      },
      "medicalIcuBeds": {
        "name": "Critical ICU & Triage Beds",
        "current": 7,
        "max": 80,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "foodRations": {
        "name": "7-Day Buffer Rations",
        "current": 11280,
        "max": 28800,
        "unit": "Packs",
        "status": "SURPLUS"
      },
      "roadEvacuationFlow": {
        "name": "Corridor Transit Throughput",
        "current": 420,
        "max": 850,
        "unit": "Vehicles/Hour",
        "status": "ADEQUATE"
      },
      "emergencyResponders": {
        "name": "Deployed NDRF/SDRF Strength",
        "current": 380,
        "max": 500,
        "unit": "Personnel",
        "status": "SURPLUS"
      },
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "vulnerability": {
      "compositeIndex": 65,
      "populationVulnerability": 63,
      "infrastructureVulnerability": 65,
      "socioEconomicVulnerability": 64,
      "accessibilityVulnerability": 69,
      "environmentalVulnerability": 71,
      "historicalExposure": 60,
      "keyRiskDrivers": [
        "Brahmaputra water level 0.45m above severe danger threshold",
        "Active erosion along Kamalabari and Salmora river embankments",
        "Riverine isolation requiring dedicated boat convoy mobilization",
        "Agricultural land submerged with crop loss exposure"
      ]
    },
    "aiRecommendation": {
      "id": "REC-AS-MJL-2026",
      "districtId": "majuli-as",
      "priority": "PRIORITY_2",
      "priorityLabel": "STAGE-2 PRE-EMPTIVE ADVISORY",
      "actionTitle": "Immediate Relocation Protocol: Majuli Island (Brahmaputra Basin)",
      "executiveSummary": "AI model detects hazard index HI=0.68 exceeding safe threshold. Mandatory relocation of 9,400 exposed residents to identified high-capacity relocation sites.",
      "confidenceScore": 96.5,
      "populationToRelocate": 9400,
      "recommendedEvacuationWindow": "18 Hours",
      "designatedShelterIds": [
        "SHELTER-01",
        "SHELTER-02",
        "SHELTER-03"
      ],
      "designatedShelterNames": [
        "Majuli Govt College Safe Complex",
        "Majuli Transit High-Ground Camp",
        "District Emergency Multipurpose Center"
      ],
      "explainableFactors": [
        {
          "factor": "DEM Slope Geomorphology",
          "weightPercent": 35,
          "indicatorValue": "Slope >32 deg",
          "description": "High shear stress on moraine soil over fractured bedrock"
        },
        {
          "factor": "Live Monsoon Rainfall Rate",
          "weightPercent": 30,
          "indicatorValue": "85.0 mm/24h",
          "description": "Exceeds 72h saturation threshold for rapid slope failure"
        },
        {
          "factor": "Single Egress Vulnerability",
          "weightPercent": 20,
          "indicatorValue": "1 Arterial Corridor",
          "description": "Single-route dependency vulnerable to structural landslide blockage"
        },
        {
          "factor": "Structural Building Density",
          "weightPercent": 15,
          "indicatorValue": "High Masonry Ratio",
          "description": "High unreinforced masonry building exposure in red zone"
        }
      ],
      "requiredTransportUnits": {
        "buses": 188,
        "ambulances": 32,
        "reliefTrucks": 63,
        "ndrfPersonnel": 157,
        "boats": 8
      },
      "orderNumber": "DMA/2026/SEC34/AS-MJL",
      "approved": false
    },
    "weatherTelemetry": {
      "rainfall24hMm": 85.0,
      "rainfallForecastNext6hMm": 22.0,
      "riverDischargeCusecs": 45000,
      "soilMoisturePercent": 86.0,
      "windSpeedKmh": 28.5,
      "temperatureCelsius": 18.2,
      "cloudCoverPercent": 95,
      "weatherCondition": "Torrential Downpour / Monsoon Surge",
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "historicalEventsCount": 8,
    "hazardZones": [
      {
        "id": "HZ-AS-MJL-01",
        "name": "Majuli Island (Brahmaputra Basin) Core Red Zone",
        "hazardType": "River Island Inundation",
        "severity": "HIGH",
        "coordinates": [
          [
            26.99,
            94.16
          ],
          [
            26.99,
            94.24000000000001
          ],
          [
            26.91,
            94.24000000000001
          ],
          [
            26.91,
            94.16
          ],
          [
            26.99,
            94.16
          ]
        ],
        "areaSqKm": 18.5,
        "populationAtRisk": 9400,
        "returnPeriodYears": 50
      }
    ],
    "infrastructure": [
      {
        "id": "INF-AS-MJL-01",
        "name": "Majuli Island (Brahmaputra Basin) District Hospital & Trauma Center",
        "type": "HOSPITAL",
        "coordinates": [
          26.96,
          94.21000000000001
        ],
        "status": "OPERATIONAL",
        "capacity": 250,
        "currentOccupancy": 190
      },
      {
        "id": "INF-AS-MJL-02",
        "name": "Majuli Island (Brahmaputra Basin) High-Ground Relocation Shelter Hub",
        "type": "SHELTER",
        "coordinates": [
          26.93,
          94.23
        ],
        "status": "OPERATIONAL",
        "capacity": 3500,
        "currentOccupancy": 450
      },
      {
        "id": "INF-AS-MJL-03",
        "name": "Majuli Island (Brahmaputra Basin) Main Arterial River Bridge",
        "type": "BRIDGE",
        "coordinates": [
          26.965,
          94.18
        ],
        "status": "OPERATIONAL"
      },
      {
        "id": "INF-AS-MJL-04",
        "name": "Majuli Island (Brahmaputra Basin) Tactical Helipad / Air Triage Base",
        "type": "HELIPAD",
        "coordinates": [
          26.919999999999998,
          94.19
        ],
        "status": "OPERATIONAL"
      }
    ],
    "evacuationRoutes": [
      {
        "id": "ROUTER-AS-MJL-01",
        "code": "CORRIDOR-AS-MJL-ALPHA",
        "name": "Arterial Primary Highway Bypass Corridor (AS-MJL)",
        "fromZone": "Core Hazard Sector (AS-MJL)",
        "toShelter": "High-Ground Multi-Purpose Shelter Hub (AS-MJL)",
        "coordinates": [
          [
            26.955,
            94.195
          ],
          [
            26.95,
            94.2
          ],
          [
            26.942,
            94.212
          ],
          [
            26.932,
            94.228
          ],
          [
            26.92,
            94.246
          ],
          [
            26.906,
            94.268
          ],
          [
            26.895,
            94.275
          ]
        ],
        "distanceKm": 10.48,
        "euclideanDistanceKm": 10.36,
        "detourRatio": 1.01,
        "estimatedTransitMins": 16,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "primary",
        "roadCapacityVehiclesPerHour": 600,
        "transitCapacityPerHour": 600,
        "currentFlowPerHour": 480,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": true,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              26.955,
              94.195
            ],
            "to_coord": [
              26.95,
              94.2
            ],
            "distance_km": 0.74,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              26.95,
              94.2
            ],
            "to_coord": [
              26.942,
              94.212
            ],
            "distance_km": 1.49,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              26.942,
              94.212
            ],
            "to_coord": [
              26.932,
              94.228
            ],
            "distance_km": 1.94,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 4,
            "from_coord": [
              26.932,
              94.228
            ],
            "to_coord": [
              26.92,
              94.246
            ],
            "distance_km": 2.23,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 5,
            "from_coord": [
              26.92,
              94.246
            ],
            "to_coord": [
              26.906,
              94.268
            ],
            "distance_km": 2.68,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 6,
            "from_coord": [
              26.906,
              94.268
            ],
            "to_coord": [
              26.895,
              94.275
            ],
            "distance_km": 1.41,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 14 Terrain Narrows, Majuli Island (Brahmaputra Basin)"
      },
      {
        "id": "ROUTER-AS-MJL-02",
        "code": "CORRIDOR-AS-MJL-BETA",
        "name": "State Highway Ridge Evacuation Route (AS-MJL)",
        "fromZone": "Perimeter Vulnerable Cluster (AS-MJL)",
        "toShelter": "Safe Reception Center (AS-MJL)",
        "coordinates": [
          [
            26.938,
            94.182
          ],
          [
            26.95,
            94.2
          ],
          [
            26.942,
            94.212
          ],
          [
            26.932,
            94.228
          ],
          [
            27.015,
            94.285
          ]
        ],
        "distanceKm": 16.47,
        "euclideanDistanceKm": 13.32,
        "detourRatio": 1.24,
        "estimatedTransitMins": 26,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "primary",
        "roadCapacityVehiclesPerHour": 400,
        "transitCapacityPerHour": 400,
        "currentFlowPerHour": 150,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": false,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              26.938,
              94.182
            ],
            "to_coord": [
              26.95,
              94.2
            ],
            "distance_km": 2.23,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              26.95,
              94.2
            ],
            "to_coord": [
              26.942,
              94.212
            ],
            "distance_km": 1.49,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              26.942,
              94.212
            ],
            "to_coord": [
              26.932,
              94.228
            ],
            "distance_km": 1.94,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 4,
            "from_coord": [
              26.932,
              94.228
            ],
            "to_coord": [
              27.015,
              94.285
            ],
            "distance_km": 10.82,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 20 Terrain Narrows, Majuli Island (Brahmaputra Basin)"
      }
    ],
    "dataSources": [
      "ISRO Cartosat-3 InSAR",
      "Copernicus Sentinel-1 SAR",
      "Copernicus Sentinel-2 Optical",
      "IMD Doppler Weather Radar",
      "CWC Hydrological Telemetry",
      "OpenStreetMap Vector Layer"
    ],
    "lastUpdated": "2026-08-30T11:00:00Z",
    "operationalStatus": "STAGE_2_WARNING"
  },
  {
    "id": "uttarkashi-uk",
    "name": "Uttarkashi & Bhagirathi Valley",
    "state": "Uttarakhand",
    "code": "UK-UTK",
    "coordinates": [
      30.7268,
      78.4354
    ],
    "center": [
      30.7268,
      78.4354
    ],
    "bounds": [
      [
        30.576800000000002,
        78.2854
      ],
      [
        30.8768,
        78.5854
      ]
    ],
    "zoom": 11,
    "riskScore": 76,
    "riskLevel": "HIGH",
    "primaryHazard": "Glacial Lake Outburst & Landslide",
    "secondaryHazard": "Debris Jamming",
    "totalPopulation": 52000,
    "exposedPopulation": 4681,
    "vulnerableDemographics": {
      "elderly": 6240,
      "children": 8320,
      "differentlyAbled": 1820,
      "livestockCount": 14560
    },
    "carryingCapacity": {
      "compositeCapacityRatio": 97.4,
      "shelterBeds": {
        "name": "Emergency Shelter Bed Capacity",
        "current": 1966,
        "max": 18200,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "potableWater": {
        "name": "WHO Safe Drinking Water",
        "current": 84258,
        "max": 1040000,
        "unit": "Liters/Day",
        "status": "SURPLUS"
      },
      "medicalIcuBeds": {
        "name": "Critical ICU & Triage Beds",
        "current": 3,
        "max": 80,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "foodRations": {
        "name": "7-Day Buffer Rations",
        "current": 5617,
        "max": 31200,
        "unit": "Packs",
        "status": "SURPLUS"
      },
      "roadEvacuationFlow": {
        "name": "Corridor Transit Throughput",
        "current": 420,
        "max": 850,
        "unit": "Vehicles/Hour",
        "status": "ADEQUATE"
      },
      "emergencyResponders": {
        "name": "Deployed NDRF/SDRF Strength",
        "current": 380,
        "max": 500,
        "unit": "Personnel",
        "status": "SURPLUS"
      },
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "vulnerability": {
      "compositeIndex": 67,
      "populationVulnerability": 40,
      "infrastructureVulnerability": 72,
      "socioEconomicVulnerability": 64,
      "accessibilityVulnerability": 78,
      "environmentalVulnerability": 80,
      "historicalExposure": 67,
      "keyRiskDrivers": [
        "High-altitude glacial melt coupled with localized cloudburst triggers",
        "Steep gorge geomorphology susceptible to landslide dam formations",
        "Narrow road infrastructure vulnerable to rockfalls",
        "Pilgrimage route corridor density"
      ]
    },
    "aiRecommendation": {
      "id": "REC-UK-UTK-2026",
      "districtId": "uttarkashi-uk",
      "priority": "PRIORITY_2",
      "priorityLabel": "STAGE-2 PRE-EMPTIVE ADVISORY",
      "actionTitle": "Immediate Relocation Protocol: Uttarkashi & Bhagirathi Valley",
      "executiveSummary": "AI model detects hazard index HI=0.76 exceeding safe threshold. Mandatory relocation of 4,681 exposed residents to identified high-capacity relocation sites.",
      "confidenceScore": 96.5,
      "populationToRelocate": 4681,
      "recommendedEvacuationWindow": "18 Hours",
      "designatedShelterIds": [
        "SHELTER-01",
        "SHELTER-02",
        "SHELTER-03"
      ],
      "designatedShelterNames": [
        "Uttarkashi Govt College Safe Complex",
        "Uttarkashi Transit High-Ground Camp",
        "District Emergency Multipurpose Center"
      ],
      "explainableFactors": [
        {
          "factor": "DEM Slope Geomorphology",
          "weightPercent": 35,
          "indicatorValue": "Slope >32 deg",
          "description": "High shear stress on moraine soil over fractured bedrock"
        },
        {
          "factor": "Live Monsoon Rainfall Rate",
          "weightPercent": 30,
          "indicatorValue": "105.0 mm/24h",
          "description": "Exceeds 72h saturation threshold for rapid slope failure"
        },
        {
          "factor": "Single Egress Vulnerability",
          "weightPercent": 20,
          "indicatorValue": "1 Arterial Corridor",
          "description": "Single-route dependency vulnerable to structural landslide blockage"
        },
        {
          "factor": "Structural Building Density",
          "weightPercent": 15,
          "indicatorValue": "High Masonry Ratio",
          "description": "High unreinforced masonry building exposure in red zone"
        }
      ],
      "requiredTransportUnits": {
        "buses": 94,
        "ambulances": 16,
        "reliefTrucks": 32,
        "ndrfPersonnel": 79,
        "boats": 0
      },
      "orderNumber": "DMA/2026/SEC34/UK-UTK",
      "approved": false
    },
    "weatherTelemetry": {
      "rainfall24hMm": 105.0,
      "rainfallForecastNext6hMm": 36.0,
      "riverDischargeCusecs": 11200,
      "soilMoisturePercent": 79.0,
      "windSpeedKmh": 28.5,
      "temperatureCelsius": 18.2,
      "cloudCoverPercent": 95,
      "weatherCondition": "Torrential Downpour / Monsoon Surge",
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "historicalEventsCount": 8,
    "hazardZones": [
      {
        "id": "HZ-UK-UTK-01",
        "name": "Uttarkashi & Bhagirathi Valley Core Red Zone",
        "hazardType": "Glacial Lake Outburst & Landslide",
        "severity": "HIGH",
        "coordinates": [
          [
            30.7668,
            78.3954
          ],
          [
            30.7668,
            78.47540000000001
          ],
          [
            30.6868,
            78.47540000000001
          ],
          [
            30.6868,
            78.3954
          ],
          [
            30.7668,
            78.3954
          ]
        ],
        "areaSqKm": 18.5,
        "populationAtRisk": 4681,
        "returnPeriodYears": 50
      }
    ],
    "infrastructure": [
      {
        "id": "INF-UK-UTK-01",
        "name": "Uttarkashi & Bhagirathi Valley District Hospital & Trauma Center",
        "type": "HOSPITAL",
        "coordinates": [
          30.736800000000002,
          78.4454
        ],
        "status": "OPERATIONAL",
        "capacity": 250,
        "currentOccupancy": 190
      },
      {
        "id": "INF-UK-UTK-02",
        "name": "Uttarkashi & Bhagirathi Valley High-Ground Relocation Shelter Hub",
        "type": "SHELTER",
        "coordinates": [
          30.7068,
          78.4654
        ],
        "status": "OPERATIONAL",
        "capacity": 3500,
        "currentOccupancy": 450
      },
      {
        "id": "INF-UK-UTK-03",
        "name": "Uttarkashi & Bhagirathi Valley Main Arterial River Bridge",
        "type": "BRIDGE",
        "coordinates": [
          30.7418,
          78.4154
        ],
        "status": "OPERATIONAL"
      },
      {
        "id": "INF-UK-UTK-04",
        "name": "Uttarkashi & Bhagirathi Valley Tactical Helipad / Air Triage Base",
        "type": "HELIPAD",
        "coordinates": [
          30.6968,
          78.4254
        ],
        "status": "OPERATIONAL"
      }
    ],
    "evacuationRoutes": [
      {
        "id": "ROUTER-UK-UTK-01",
        "code": "CORRIDOR-UK-UTK-ALPHA",
        "name": "Arterial Primary Highway Bypass Corridor (UK-UTK)",
        "fromZone": "Core Hazard Sector (UK-UTK)",
        "toShelter": "High-Ground Multi-Purpose Shelter Hub (UK-UTK)",
        "coordinates": [
          [
            30.7318,
            78.4304
          ],
          [
            30.7268,
            78.4354
          ],
          [
            30.719,
            78.446
          ],
          [
            30.708,
            78.461
          ],
          [
            30.695,
            78.48
          ],
          [
            30.68,
            78.502
          ],
          [
            30.6718,
            78.5104
          ]
        ],
        "distanceKm": 10.17,
        "euclideanDistanceKm": 10.15,
        "detourRatio": 1.0,
        "estimatedTransitMins": 16,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "primary",
        "roadCapacityVehiclesPerHour": 600,
        "transitCapacityPerHour": 600,
        "currentFlowPerHour": 480,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": true,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              30.7318,
              78.4304
            ],
            "to_coord": [
              30.7268,
              78.4354
            ],
            "distance_km": 0.73,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              30.7268,
              78.4354
            ],
            "to_coord": [
              30.719,
              78.446
            ],
            "distance_km": 1.33,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              30.719,
              78.446
            ],
            "to_coord": [
              30.708,
              78.461
            ],
            "distance_km": 1.88,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 4,
            "from_coord": [
              30.708,
              78.461
            ],
            "to_coord": [
              30.695,
              78.48
            ],
            "distance_km": 2.32,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 5,
            "from_coord": [
              30.695,
              78.48
            ],
            "to_coord": [
              30.68,
              78.502
            ],
            "distance_km": 2.68,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 6,
            "from_coord": [
              30.68,
              78.502
            ],
            "to_coord": [
              30.6718,
              78.5104
            ],
            "distance_km": 1.22,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 14 Terrain Narrows, Uttarkashi & Bhagirathi Valley"
      },
      {
        "id": "ROUTER-UK-UTK-02",
        "code": "CORRIDOR-UK-UTK-BETA",
        "name": "State Highway Ridge Evacuation Route (UK-UTK)",
        "fromZone": "Perimeter Vulnerable Cluster (UK-UTK)",
        "toShelter": "Safe Reception Center (UK-UTK)",
        "coordinates": [
          [
            30.7148,
            78.4174
          ],
          [
            30.7268,
            78.4354
          ],
          [
            30.719,
            78.446
          ],
          [
            30.7918,
            78.5204
          ]
        ],
        "distanceKm": 14.28,
        "euclideanDistanceKm": 13.05,
        "detourRatio": 1.09,
        "estimatedTransitMins": 22,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "primary",
        "roadCapacityVehiclesPerHour": 400,
        "transitCapacityPerHour": 400,
        "currentFlowPerHour": 150,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": false,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              30.7148,
              78.4174
            ],
            "to_coord": [
              30.7268,
              78.4354
            ],
            "distance_km": 2.18,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              30.7268,
              78.4354
            ],
            "to_coord": [
              30.719,
              78.446
            ],
            "distance_km": 1.33,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              30.719,
              78.446
            ],
            "to_coord": [
              30.7918,
              78.5204
            ],
            "distance_km": 10.77,
            "highway_type": "primary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 20 Terrain Narrows, Uttarkashi & Bhagirathi Valley"
      }
    ],
    "dataSources": [
      "ISRO Cartosat-3 InSAR",
      "Copernicus Sentinel-1 SAR",
      "Copernicus Sentinel-2 Optical",
      "IMD Doppler Weather Radar",
      "CWC Hydrological Telemetry",
      "OpenStreetMap Vector Layer"
    ],
    "lastUpdated": "2026-08-30T11:00:00Z",
    "operationalStatus": "STAGE_2_WARNING"
  },
  {
    "id": "spiti-hp",
    "name": "Spiti & Kinnaur Trans-Himalayan",
    "state": "Himachal Pradesh",
    "code": "HP-SPT",
    "coordinates": [
      31.6247,
      78.4729
    ],
    "center": [
      31.6247,
      78.4729
    ],
    "bounds": [
      [
        31.474700000000002,
        78.32289999999999
      ],
      [
        31.7747,
        78.6229
      ]
    ],
    "zoom": 10,
    "riskScore": 70,
    "riskLevel": "WARNING",
    "primaryHazard": "Flash Flood & Scree Slope Failure",
    "secondaryHazard": "Cold Wave Isolation",
    "totalPopulation": 34000,
    "exposedPopulation": 4029,
    "vulnerableDemographics": {
      "elderly": 4080,
      "children": 5440,
      "differentlyAbled": 1190,
      "livestockCount": 9520
    },
    "carryingCapacity": {
      "compositeCapacityRatio": 98.0,
      "shelterBeds": {
        "name": "Emergency Shelter Bed Capacity",
        "current": 1692,
        "max": 12000,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "potableWater": {
        "name": "WHO Safe Drinking Water",
        "current": 72522,
        "max": 680000,
        "unit": "Liters/Day",
        "status": "SURPLUS"
      },
      "medicalIcuBeds": {
        "name": "Critical ICU & Triage Beds",
        "current": 3,
        "max": 80,
        "unit": "Beds",
        "status": "ADEQUATE"
      },
      "foodRations": {
        "name": "7-Day Buffer Rations",
        "current": 4834,
        "max": 20400,
        "unit": "Packs",
        "status": "SURPLUS"
      },
      "roadEvacuationFlow": {
        "name": "Corridor Transit Throughput",
        "current": 420,
        "max": 850,
        "unit": "Vehicles/Hour",
        "status": "ADEQUATE"
      },
      "emergencyResponders": {
        "name": "Deployed NDRF/SDRF Strength",
        "current": 380,
        "max": 500,
        "unit": "Personnel",
        "status": "SURPLUS"
      },
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "vulnerability": {
      "compositeIndex": 64,
      "populationVulnerability": 46,
      "infrastructureVulnerability": 66,
      "socioEconomicVulnerability": 64,
      "accessibilityVulnerability": 71,
      "environmentalVulnerability": 74,
      "historicalExposure": 62,
      "keyRiskDrivers": [
        "High-altitude permafrost degradation and scree slope movement",
        "Remote trans-Himalayan connectivity with extended transit times",
        "Extreme elevation terrain limiting rapid mechanized evacuation",
        "Scattered population across isolated valley pockets"
      ]
    },
    "aiRecommendation": {
      "id": "REC-HP-SPT-2026",
      "districtId": "spiti-hp",
      "priority": "PRIORITY_2",
      "priorityLabel": "STAGE-2 PRE-EMPTIVE ADVISORY",
      "actionTitle": "Immediate Relocation Protocol: Spiti & Kinnaur Trans-Himalayan",
      "executiveSummary": "AI model detects hazard index HI=0.70 exceeding safe threshold. Mandatory relocation of 4,029 exposed residents to identified high-capacity relocation sites.",
      "confidenceScore": 96.5,
      "populationToRelocate": 4029,
      "recommendedEvacuationWindow": "18 Hours",
      "designatedShelterIds": [
        "SHELTER-01",
        "SHELTER-02",
        "SHELTER-03"
      ],
      "designatedShelterNames": [
        "Spiti Govt College Safe Complex",
        "Spiti Transit High-Ground Camp",
        "District Emergency Multipurpose Center"
      ],
      "explainableFactors": [
        {
          "factor": "DEM Slope Geomorphology",
          "weightPercent": 35,
          "indicatorValue": "Slope >32 deg",
          "description": "High shear stress on moraine soil over fractured bedrock"
        },
        {
          "factor": "Live Monsoon Rainfall Rate",
          "weightPercent": 30,
          "indicatorValue": "45.0 mm/24h",
          "description": "Exceeds 72h saturation threshold for rapid slope failure"
        },
        {
          "factor": "Single Egress Vulnerability",
          "weightPercent": 20,
          "indicatorValue": "1 Arterial Corridor",
          "description": "Single-route dependency vulnerable to structural landslide blockage"
        },
        {
          "factor": "Structural Building Density",
          "weightPercent": 15,
          "indicatorValue": "High Masonry Ratio",
          "description": "High unreinforced masonry building exposure in red zone"
        }
      ],
      "requiredTransportUnits": {
        "buses": 81,
        "ambulances": 14,
        "reliefTrucks": 27,
        "ndrfPersonnel": 68,
        "boats": 0
      },
      "orderNumber": "DMA/2026/SEC34/HP-SPT",
      "approved": false
    },
    "weatherTelemetry": {
      "rainfall24hMm": 45.0,
      "rainfallForecastNext6hMm": 15.0,
      "riverDischargeCusecs": 6500,
      "soilMoisturePercent": 62.0,
      "windSpeedKmh": 28.5,
      "temperatureCelsius": 18.2,
      "cloudCoverPercent": 95,
      "weatherCondition": "Torrential Downpour / Monsoon Surge",
      "lastUpdated": "2026-08-30T11:00:00Z"
    },
    "historicalEventsCount": 8,
    "hazardZones": [
      {
        "id": "HZ-HP-SPT-01",
        "name": "Spiti & Kinnaur Trans-Himalayan Core Red Zone",
        "hazardType": "Flash Flood & Scree Slope Failure",
        "severity": "WARNING",
        "coordinates": [
          [
            31.6647,
            78.43289999999999
          ],
          [
            31.6647,
            78.5129
          ],
          [
            31.5847,
            78.5129
          ],
          [
            31.5847,
            78.43289999999999
          ],
          [
            31.6647,
            78.43289999999999
          ]
        ],
        "areaSqKm": 18.5,
        "populationAtRisk": 4029,
        "returnPeriodYears": 50
      }
    ],
    "infrastructure": [
      {
        "id": "INF-HP-SPT-01",
        "name": "Spiti & Kinnaur Trans-Himalayan District Hospital & Trauma Center",
        "type": "HOSPITAL",
        "coordinates": [
          31.634700000000002,
          78.4829
        ],
        "status": "OPERATIONAL",
        "capacity": 250,
        "currentOccupancy": 190
      },
      {
        "id": "INF-HP-SPT-02",
        "name": "Spiti & Kinnaur Trans-Himalayan High-Ground Relocation Shelter Hub",
        "type": "SHELTER",
        "coordinates": [
          31.6047,
          78.5029
        ],
        "status": "OPERATIONAL",
        "capacity": 3500,
        "currentOccupancy": 450
      },
      {
        "id": "INF-HP-SPT-03",
        "name": "Spiti & Kinnaur Trans-Himalayan Main Arterial River Bridge",
        "type": "BRIDGE",
        "coordinates": [
          31.6397,
          78.4529
        ],
        "status": "OPERATIONAL"
      },
      {
        "id": "INF-HP-SPT-04",
        "name": "Spiti & Kinnaur Trans-Himalayan Tactical Helipad / Air Triage Base",
        "type": "HELIPAD",
        "coordinates": [
          31.5947,
          78.46289999999999
        ],
        "status": "OPERATIONAL"
      }
    ],
    "evacuationRoutes": [
      {
        "id": "ROUTER-HP-SPT-01",
        "code": "CORRIDOR-HP-SPT-ALPHA",
        "name": "Arterial Primary Highway Bypass Corridor (HP-SPT)",
        "fromZone": "Core Hazard Sector (HP-SPT)",
        "toShelter": "High-Ground Multi-Purpose Shelter Hub (HP-SPT)",
        "coordinates": [
          [
            31.6297,
            78.4679
          ],
          [
            31.6247,
            78.4729
          ],
          [
            31.615,
            78.484
          ],
          [
            31.602,
            78.499
          ],
          [
            31.587,
            78.518
          ],
          [
            31.57,
            78.541
          ],
          [
            31.5697,
            78.5479
          ]
        ],
        "distanceKm": 10.26,
        "euclideanDistanceKm": 10.1,
        "detourRatio": 1.02,
        "estimatedTransitMins": 21,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "secondary",
        "roadCapacityVehiclesPerHour": 600,
        "transitCapacityPerHour": 600,
        "currentFlowPerHour": 480,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": true,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              31.6297,
              78.4679
            ],
            "to_coord": [
              31.6247,
              78.4729
            ],
            "distance_km": 0.73,
            "highway_type": "secondary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              31.6247,
              78.4729
            ],
            "to_coord": [
              31.615,
              78.484
            ],
            "distance_km": 1.51,
            "highway_type": "secondary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 3,
            "from_coord": [
              31.615,
              78.484
            ],
            "to_coord": [
              31.602,
              78.499
            ],
            "distance_km": 2.03,
            "highway_type": "secondary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 4,
            "from_coord": [
              31.602,
              78.499
            ],
            "to_coord": [
              31.587,
              78.518
            ],
            "distance_km": 2.45,
            "highway_type": "secondary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 5,
            "from_coord": [
              31.587,
              78.518
            ],
            "to_coord": [
              31.57,
              78.541
            ],
            "distance_km": 2.88,
            "highway_type": "secondary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 6,
            "from_coord": [
              31.57,
              78.541
            ],
            "to_coord": [
              31.5697,
              78.5479
            ],
            "distance_km": 0.65,
            "highway_type": "secondary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 14 Terrain Narrows, Spiti & Kinnaur Trans-Himalayan"
      },
      {
        "id": "ROUTER-HP-SPT-02",
        "code": "CORRIDOR-HP-SPT-BETA",
        "name": "State Highway Ridge Evacuation Route (HP-SPT)",
        "fromZone": "Perimeter Vulnerable Cluster (HP-SPT)",
        "toShelter": "Safe Reception Center (HP-SPT)",
        "coordinates": [
          [
            31.6127,
            78.4549
          ],
          [
            31.6247,
            78.4729
          ],
          [
            31.6897,
            78.5579
          ]
        ],
        "distanceKm": 12.98,
        "euclideanDistanceKm": 12.98,
        "detourRatio": 1.0,
        "estimatedTransitMins": 27,
        "clearanceStatus": "CLEAR",
        "status": "CLEAR",
        "osmHighwayClass": "secondary",
        "roadCapacityVehiclesPerHour": 400,
        "transitCapacityPerHour": 400,
        "currentFlowPerHour": 150,
        "ndrfEscortAssigned": true,
        "alternativeRouteAvailable": false,
        "hazardAvoidance": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "roadSegments": [
          {
            "segment_index": 1,
            "from_coord": [
              31.6127,
              78.4549
            ],
            "to_coord": [
              31.6247,
              78.4729
            ],
            "distance_km": 2.16,
            "highway_type": "secondary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          },
          {
            "segment_index": 2,
            "from_coord": [
              31.6247,
              78.4729
            ],
            "to_coord": [
              31.6897,
              78.5579
            ],
            "distance_km": 10.82,
            "highway_type": "secondary",
            "surface": "asphalt_paved",
            "hazard_status": "SAFE_BYPASS"
          }
        ],
        "bottleneckLocation": "Km 20 Terrain Narrows, Spiti & Kinnaur Trans-Himalayan"
      }
    ],
    "dataSources": [
      "ISRO Cartosat-3 InSAR",
      "Copernicus Sentinel-1 SAR",
      "Copernicus Sentinel-2 Optical",
      "IMD Doppler Weather Radar",
      "CWC Hydrological Telemetry",
      "OpenStreetMap Vector Layer"
    ],
    "lastUpdated": "2026-08-30T11:00:00Z",
    "operationalStatus": "STAGE_1_ALERT"
  }
];

export const DEFAULT_RELOCATION_CORRIDORS: GeoJSONFeatureCollection = {
  "type": "FeatureCollection",
  "name": "OSM_Road_Relocation_Corridors",
  "total_corridors": 15,
  "features": [
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-001",
        "habitation_id": "HAB-001",
        "habitation_name": "Manali Valley Hamlet",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 796,
        "destination_site_id": "SAFE-SITE-082",
        "destination_cci": 93.8,
        "destination_capacity_families": 1309,
        "road_name": "OSM Relocation Corridor: Manali Valley Hamlet \u2192 SAFE-SITE-082",
        "osm_highway_class": "secondary",
        "road_distance_km": 22.9,
        "euclidean_distance_km": 18.3,
        "detour_ratio": 1.25,
        "estimated_transit_mins": 49,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CLEAR",
        "coordinates_leaflet": [
          [
            31.233618,
            76.99816
          ],
          [
            31.239868,
            76.996389
          ],
          [
            31.245961,
            76.994561
          ],
          [
            31.251752,
            76.992625
          ],
          [
            31.25711,
            76.990535
          ],
          [
            31.261932,
            76.988252
          ],
          [
            31.266146,
            76.985752
          ],
          [
            31.269713,
            76.983021
          ],
          [
            31.272634,
            76.980058
          ],
          [
            31.274944,
            76.976877
          ],
          [
            31.276714,
            76.973502
          ],
          [
            31.27804,
            76.969969
          ],
          [
            31.279045,
            76.966321
          ],
          [
            31.279862,
            76.962605
          ],
          [
            31.28063,
            76.958872
          ],
          [
            31.281485,
            76.95517
          ],
          [
            31.282549,
            76.951543
          ],
          [
            31.283924,
            76.948027
          ],
          [
            31.285681,
            76.944648
          ],
          [
            31.287863,
            76.941421
          ],
          [
            31.290473,
            76.938347
          ],
          [
            31.293482,
            76.935416
          ],
          [
            31.296823,
            76.932604
          ],
          [
            31.300401,
            76.929876
          ],
          [
            31.304095,
            76.92719
          ],
          [
            31.307768,
            76.924496
          ],
          [
            31.311274,
            76.921743
          ],
          [
            31.314467,
            76.918878
          ],
          [
            31.317212,
            76.915852
          ],
          [
            31.319392,
            76.912624
          ],
          [
            31.320916,
            76.909161
          ],
          [
            31.321723,
            76.905443
          ],
          [
            31.321791,
            76.901459
          ],
          [
            31.321132,
            76.897215
          ],
          [
            31.319796,
            76.89273
          ],
          [
            31.317868,
            76.888032
          ],
          [
            31.31546,
            76.883163
          ],
          [
            31.312708,
            76.87817
          ],
          [
            31.30976,
            76.873108
          ],
          [
            31.306772,
            76.868031
          ],
          [
            31.303893,
            76.862993
          ],
          [
            31.301259,
            76.858043
          ],
          [
            31.298987,
            76.853222
          ],
          [
            31.297165,
            76.848562
          ],
          [
            31.295846,
            76.844083
          ],
          [
            31.295051,
            76.83979
          ],
          [
            31.294761,
            76.835679
          ],
          [
            31.294924,
            76.831729
          ],
          [
            31.295457,
            76.827912
          ],
          [
            31.296251,
            76.824188
          ],
          [
            31.297179,
            76.820513
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            76.99816,
            31.233618
          ],
          [
            76.996389,
            31.239868
          ],
          [
            76.994561,
            31.245961
          ],
          [
            76.992625,
            31.251752
          ],
          [
            76.990535,
            31.25711
          ],
          [
            76.988252,
            31.261932
          ],
          [
            76.985752,
            31.266146
          ],
          [
            76.983021,
            31.269713
          ],
          [
            76.980058,
            31.272634
          ],
          [
            76.976877,
            31.274944
          ],
          [
            76.973502,
            31.276714
          ],
          [
            76.969969,
            31.27804
          ],
          [
            76.966321,
            31.279045
          ],
          [
            76.962605,
            31.279862
          ],
          [
            76.958872,
            31.28063
          ],
          [
            76.95517,
            31.281485
          ],
          [
            76.951543,
            31.282549
          ],
          [
            76.948027,
            31.283924
          ],
          [
            76.944648,
            31.285681
          ],
          [
            76.941421,
            31.287863
          ],
          [
            76.938347,
            31.290473
          ],
          [
            76.935416,
            31.293482
          ],
          [
            76.932604,
            31.296823
          ],
          [
            76.929876,
            31.300401
          ],
          [
            76.92719,
            31.304095
          ],
          [
            76.924496,
            31.307768
          ],
          [
            76.921743,
            31.311274
          ],
          [
            76.918878,
            31.314467
          ],
          [
            76.915852,
            31.317212
          ],
          [
            76.912624,
            31.319392
          ],
          [
            76.909161,
            31.320916
          ],
          [
            76.905443,
            31.321723
          ],
          [
            76.901459,
            31.321791
          ],
          [
            76.897215,
            31.321132
          ],
          [
            76.89273,
            31.319796
          ],
          [
            76.888032,
            31.317868
          ],
          [
            76.883163,
            31.31546
          ],
          [
            76.87817,
            31.312708
          ],
          [
            76.873108,
            31.30976
          ],
          [
            76.868031,
            31.306772
          ],
          [
            76.862993,
            31.303893
          ],
          [
            76.858043,
            31.301259
          ],
          [
            76.853222,
            31.298987
          ],
          [
            76.848562,
            31.297165
          ],
          [
            76.844083,
            31.295846
          ],
          [
            76.83979,
            31.295051
          ],
          [
            76.835679,
            31.294761
          ],
          [
            76.831729,
            31.294924
          ],
          [
            76.827912,
            31.295457
          ],
          [
            76.824188,
            31.296251
          ],
          [
            76.820513,
            31.297179
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-002",
        "habitation_id": "HAB-002",
        "habitation_name": "Kullu Riverside Basti",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 2218,
        "destination_site_id": "SAFE-SITE-070",
        "destination_cci": 93.8,
        "destination_capacity_families": 3344,
        "road_name": "OSM Relocation Corridor: Kullu Riverside Basti \u2192 SAFE-SITE-070",
        "osm_highway_class": "secondary",
        "road_distance_km": 27.18,
        "euclidean_distance_km": 23.21,
        "detour_ratio": 1.17,
        "estimated_transit_mins": 58,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CLEAR",
        "coordinates_leaflet": [
          [
            31.716969,
            79.302857
          ],
          [
            31.712449,
            79.308463
          ],
          [
            31.708092,
            79.314044
          ],
          [
            31.704055,
            79.319579
          ],
          [
            31.700471,
            79.325047
          ],
          [
            31.697451,
            79.330432
          ],
          [
            31.695071,
            79.335723
          ],
          [
            31.693369,
            79.340915
          ],
          [
            31.692347,
            79.346006
          ],
          [
            31.691966,
            79.351003
          ],
          [
            31.692153,
            79.355917
          ],
          [
            31.692806,
            79.360762
          ],
          [
            31.693797,
            79.365557
          ],
          [
            31.694986,
            79.370323
          ],
          [
            31.696225,
            79.375082
          ],
          [
            31.697374,
            79.379855
          ],
          [
            31.698302,
            79.384659
          ],
          [
            31.698905,
            79.389512
          ],
          [
            31.699105,
            79.394423
          ],
          [
            31.69886,
            79.3994
          ],
          [
            31.698163,
            79.404444
          ],
          [
            31.697049,
            79.409549
          ],
          [
            31.695585,
            79.414705
          ],
          [
            31.693872,
            79.419898
          ],
          [
            31.692037,
            79.425109
          ],
          [
            31.690224,
            79.430317
          ],
          [
            31.688587,
            79.435498
          ],
          [
            31.687279,
            79.440632
          ],
          [
            31.686441,
            79.445696
          ],
          [
            31.686197,
            79.450673
          ],
          [
            31.686643,
            79.455548
          ],
          [
            31.687842,
            79.460313
          ],
          [
            31.689818,
            79.464964
          ],
          [
            31.692557,
            79.469502
          ],
          [
            31.696008,
            79.473936
          ],
          [
            31.700081,
            79.478278
          ],
          [
            31.704658,
            79.482547
          ],
          [
            31.709596,
            79.486762
          ],
          [
            31.71474,
            79.490946
          ],
          [
            31.719927,
            79.495125
          ],
          [
            31.725,
            79.49932
          ],
          [
            31.729814,
            79.503553
          ],
          [
            31.734248,
            79.507843
          ],
          [
            31.73821,
            79.512201
          ],
          [
            31.741642,
            79.516638
          ],
          [
            31.744525,
            79.521155
          ],
          [
            31.746876,
            79.52575
          ],
          [
            31.748752,
            79.530416
          ],
          [
            31.750239,
            79.535138
          ],
          [
            31.751452,
            79.539901
          ],
          [
            31.752523,
            79.544685
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            79.302857,
            31.716969
          ],
          [
            79.308463,
            31.712449
          ],
          [
            79.314044,
            31.708092
          ],
          [
            79.319579,
            31.704055
          ],
          [
            79.325047,
            31.700471
          ],
          [
            79.330432,
            31.697451
          ],
          [
            79.335723,
            31.695071
          ],
          [
            79.340915,
            31.693369
          ],
          [
            79.346006,
            31.692347
          ],
          [
            79.351003,
            31.691966
          ],
          [
            79.355917,
            31.692153
          ],
          [
            79.360762,
            31.692806
          ],
          [
            79.365557,
            31.693797
          ],
          [
            79.370323,
            31.694986
          ],
          [
            79.375082,
            31.696225
          ],
          [
            79.379855,
            31.697374
          ],
          [
            79.384659,
            31.698302
          ],
          [
            79.389512,
            31.698905
          ],
          [
            79.394423,
            31.699105
          ],
          [
            79.3994,
            31.69886
          ],
          [
            79.404444,
            31.698163
          ],
          [
            79.409549,
            31.697049
          ],
          [
            79.414705,
            31.695585
          ],
          [
            79.419898,
            31.693872
          ],
          [
            79.425109,
            31.692037
          ],
          [
            79.430317,
            31.690224
          ],
          [
            79.435498,
            31.688587
          ],
          [
            79.440632,
            31.687279
          ],
          [
            79.445696,
            31.686441
          ],
          [
            79.450673,
            31.686197
          ],
          [
            79.455548,
            31.686643
          ],
          [
            79.460313,
            31.687842
          ],
          [
            79.464964,
            31.689818
          ],
          [
            79.469502,
            31.692557
          ],
          [
            79.473936,
            31.696008
          ],
          [
            79.478278,
            31.700081
          ],
          [
            79.482547,
            31.704658
          ],
          [
            79.486762,
            31.709596
          ],
          [
            79.490946,
            31.71474
          ],
          [
            79.495125,
            31.719927
          ],
          [
            79.49932,
            31.725
          ],
          [
            79.503553,
            31.729814
          ],
          [
            79.507843,
            31.734248
          ],
          [
            79.512201,
            31.73821
          ],
          [
            79.516638,
            31.741642
          ],
          [
            79.521155,
            31.744525
          ],
          [
            79.52575,
            31.746876
          ],
          [
            79.530416,
            31.748752
          ],
          [
            79.535138,
            31.750239
          ],
          [
            79.539901,
            31.751452
          ],
          [
            79.544685,
            31.752523
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-003",
        "habitation_id": "HAB-003",
        "habitation_name": "Parvati Gorge Settlement",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 2364,
        "destination_site_id": "SAFE-SITE-055",
        "destination_cci": 93.8,
        "destination_capacity_families": 5532,
        "road_name": "OSM Relocation Corridor: Parvati Gorge Settlement \u2192 SAFE-SITE-055",
        "osm_highway_class": "secondary",
        "road_distance_km": 21.75,
        "euclidean_distance_km": 17.72,
        "detour_ratio": 1.23,
        "estimated_transit_mins": 46,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CLEAR",
        "coordinates_leaflet": [
          [
            32.599026,
            78.427976
          ],
          [
            32.598416,
            78.434222
          ],
          [
            32.597908,
            78.440339
          ],
          [
            32.5976,
            78.446202
          ],
          [
            32.597575,
            78.451704
          ],
          [
            32.597902,
            78.456759
          ],
          [
            32.598629,
            78.461306
          ],
          [
            32.59978,
            78.465313
          ],
          [
            32.601355,
            78.46878
          ],
          [
            32.603332,
            78.471738
          ],
          [
            32.605663,
            78.474244
          ],
          [
            32.608284,
            78.47638
          ],
          [
            32.611118,
            78.478248
          ],
          [
            32.614074,
            78.479959
          ],
          [
            32.617063,
            78.481629
          ],
          [
            32.619994,
            78.483372
          ],
          [
            32.622788,
            78.485289
          ],
          [
            32.625379,
            78.487465
          ],
          [
            32.627718,
            78.489961
          ],
          [
            32.629779,
            78.492811
          ],
          [
            32.631557,
            78.49602
          ],
          [
            32.633075,
            78.49956
          ],
          [
            32.634374,
            78.503379
          ],
          [
            32.635518,
            78.507395
          ],
          [
            32.636586,
            78.511508
          ],
          [
            32.637668,
            78.515603
          ],
          [
            32.638859,
            78.519559
          ],
          [
            32.640256,
            78.523253
          ],
          [
            32.641946,
            78.526574
          ],
          [
            32.644008,
            78.529423
          ],
          [
            32.646501,
            78.531724
          ],
          [
            32.649463,
            78.533427
          ],
          [
            32.652912,
            78.534512
          ],
          [
            32.656837,
            78.53499
          ],
          [
            32.661207,
            78.534903
          ],
          [
            32.665965,
            78.534322
          ],
          [
            32.671039,
            78.533341
          ],
          [
            32.676338,
            78.532072
          ],
          [
            32.681766,
            78.53064
          ],
          [
            32.68722,
            78.529173
          ],
          [
            32.692604,
            78.527798
          ],
          [
            32.697825,
            78.526628
          ],
          [
            32.702809,
            78.52576
          ],
          [
            32.707498,
            78.525267
          ],
          [
            32.711856,
            78.525195
          ],
          [
            32.715871,
            78.52556
          ],
          [
            32.719554,
            78.526347
          ],
          [
            32.72294,
            78.527511
          ],
          [
            32.726083,
            78.528985
          ],
          [
            32.729055,
            78.530676
          ],
          [
            32.731938,
            78.532481
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            78.427976,
            32.599026
          ],
          [
            78.434222,
            32.598416
          ],
          [
            78.440339,
            32.597908
          ],
          [
            78.446202,
            32.5976
          ],
          [
            78.451704,
            32.597575
          ],
          [
            78.456759,
            32.597902
          ],
          [
            78.461306,
            32.598629
          ],
          [
            78.465313,
            32.59978
          ],
          [
            78.46878,
            32.601355
          ],
          [
            78.471738,
            32.603332
          ],
          [
            78.474244,
            32.605663
          ],
          [
            78.47638,
            32.608284
          ],
          [
            78.478248,
            32.611118
          ],
          [
            78.479959,
            32.614074
          ],
          [
            78.481629,
            32.617063
          ],
          [
            78.483372,
            32.619994
          ],
          [
            78.485289,
            32.622788
          ],
          [
            78.487465,
            32.625379
          ],
          [
            78.489961,
            32.627718
          ],
          [
            78.492811,
            32.629779
          ],
          [
            78.49602,
            32.631557
          ],
          [
            78.49956,
            32.633075
          ],
          [
            78.503379,
            32.634374
          ],
          [
            78.507395,
            32.635518
          ],
          [
            78.511508,
            32.636586
          ],
          [
            78.515603,
            32.637668
          ],
          [
            78.519559,
            32.638859
          ],
          [
            78.523253,
            32.640256
          ],
          [
            78.526574,
            32.641946
          ],
          [
            78.529423,
            32.644008
          ],
          [
            78.531724,
            32.646501
          ],
          [
            78.533427,
            32.649463
          ],
          [
            78.534512,
            32.652912
          ],
          [
            78.53499,
            32.656837
          ],
          [
            78.534903,
            32.661207
          ],
          [
            78.534322,
            32.665965
          ],
          [
            78.533341,
            32.671039
          ],
          [
            78.532072,
            32.676338
          ],
          [
            78.53064,
            32.681766
          ],
          [
            78.529173,
            32.68722
          ],
          [
            78.527798,
            32.692604
          ],
          [
            78.526628,
            32.697825
          ],
          [
            78.52576,
            32.702809
          ],
          [
            78.525267,
            32.707498
          ],
          [
            78.525195,
            32.711856
          ],
          [
            78.52556,
            32.715871
          ],
          [
            78.526347,
            32.719554
          ],
          [
            78.527511,
            32.72294
          ],
          [
            78.528985,
            32.726083
          ],
          [
            78.530676,
            32.729055
          ],
          [
            78.532481,
            32.731938
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-004",
        "habitation_id": "HAB-004",
        "habitation_name": "Chamba Ridge Village",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 1447,
        "destination_site_id": "SAFE-SITE-052",
        "destination_cci": 93.8,
        "destination_capacity_families": 5518,
        "road_name": "OSM Relocation Corridor: Chamba Ridge Village \u2192 SAFE-SITE-052",
        "osm_highway_class": "secondary",
        "road_distance_km": 69.1,
        "euclidean_distance_km": 64.01,
        "detour_ratio": 1.08,
        "estimated_transit_mins": 148,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CAUTION",
        "coordinates_leaflet": [
          [
            32.22778,
            77.894634
          ],
          [
            32.238267,
            77.90182
          ],
          [
            32.248783,
            77.908843
          ],
          [
            32.259354,
            77.915549
          ],
          [
            32.270003,
            77.921803
          ],
          [
            32.278185,
            77.942274
          ],
          [
            32.289042,
            77.94733
          ],
          [
            32.300016,
            77.951709
          ],
          [
            32.311108,
            77.955412
          ],
          [
            32.324875,
            77.943697
          ],
          [
            32.336176,
            77.946195
          ],
          [
            32.347558,
            77.94823
          ],
          [
            32.358997,
            77.949928
          ],
          [
            32.370471,
            77.951429
          ],
          [
            32.381954,
            77.95288
          ],
          [
            32.393421,
            77.954421
          ],
          [
            32.402285,
            77.97096
          ],
          [
            32.416222,
            77.958265
          ],
          [
            32.427525,
            77.960751
          ],
          [
            32.436187,
            77.978459
          ],
          [
            32.449899,
            77.967059
          ],
          [
            32.460975,
            77.970854
          ],
          [
            32.471991,
            77.974996
          ],
          [
            32.482963,
            77.979387
          ],
          [
            32.493915,
            77.983899
          ],
          [
            32.50487,
            77.988389
          ],
          [
            32.515855,
            77.992704
          ],
          [
            32.526898,
            77.996692
          ],
          [
            32.538021,
            78.000211
          ],
          [
            32.549248,
            78.003139
          ],
          [
            32.560593,
            78.005379
          ],
          [
            32.572069,
            78.006871
          ],
          [
            32.583679,
            78.007588
          ],
          [
            32.595421,
            78.007544
          ],
          [
            32.607285,
            78.006793
          ],
          [
            32.619258,
            78.005422
          ],
          [
            32.631317,
            78.003549
          ],
          [
            32.643439,
            78.001315
          ],
          [
            32.655596,
            77.998877
          ],
          [
            32.667761,
            77.996397
          ],
          [
            32.679906,
            77.99403
          ],
          [
            32.692007,
            77.99192
          ],
          [
            32.704041,
            77.99019
          ],
          [
            32.715994,
            77.988929
          ],
          [
            32.727856,
            77.988196
          ],
          [
            32.739623,
            77.98801
          ],
          [
            32.751297,
            77.988353
          ],
          [
            32.76289,
            77.98917
          ],
          [
            32.774415,
            77.990374
          ],
          [
            32.785893,
            77.991851
          ],
          [
            32.797347,
            77.993469
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.894634,
            32.22778
          ],
          [
            77.90182,
            32.238267
          ],
          [
            77.908843,
            32.248783
          ],
          [
            77.915549,
            32.259354
          ],
          [
            77.921803,
            32.270003
          ],
          [
            77.942274,
            32.278185
          ],
          [
            77.94733,
            32.289042
          ],
          [
            77.951709,
            32.300016
          ],
          [
            77.955412,
            32.311108
          ],
          [
            77.943697,
            32.324875
          ],
          [
            77.946195,
            32.336176
          ],
          [
            77.94823,
            32.347558
          ],
          [
            77.949928,
            32.358997
          ],
          [
            77.951429,
            32.370471
          ],
          [
            77.95288,
            32.381954
          ],
          [
            77.954421,
            32.393421
          ],
          [
            77.97096,
            32.402285
          ],
          [
            77.958265,
            32.416222
          ],
          [
            77.960751,
            32.427525
          ],
          [
            77.978459,
            32.436187
          ],
          [
            77.967059,
            32.449899
          ],
          [
            77.970854,
            32.460975
          ],
          [
            77.974996,
            32.471991
          ],
          [
            77.979387,
            32.482963
          ],
          [
            77.983899,
            32.493915
          ],
          [
            77.988389,
            32.50487
          ],
          [
            77.992704,
            32.515855
          ],
          [
            77.996692,
            32.526898
          ],
          [
            78.000211,
            32.538021
          ],
          [
            78.003139,
            32.549248
          ],
          [
            78.005379,
            32.560593
          ],
          [
            78.006871,
            32.572069
          ],
          [
            78.007588,
            32.583679
          ],
          [
            78.007544,
            32.595421
          ],
          [
            78.006793,
            32.607285
          ],
          [
            78.005422,
            32.619258
          ],
          [
            78.003549,
            32.631317
          ],
          [
            78.001315,
            32.643439
          ],
          [
            77.998877,
            32.655596
          ],
          [
            77.996397,
            32.667761
          ],
          [
            77.99403,
            32.679906
          ],
          [
            77.99192,
            32.692007
          ],
          [
            77.99019,
            32.704041
          ],
          [
            77.988929,
            32.715994
          ],
          [
            77.988196,
            32.727856
          ],
          [
            77.98801,
            32.739623
          ],
          [
            77.988353,
            32.751297
          ],
          [
            77.98917,
            32.76289
          ],
          [
            77.990374,
            32.774415
          ],
          [
            77.991851,
            32.785893
          ],
          [
            77.993469,
            32.797347
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-005",
        "habitation_id": "HAB-005",
        "habitation_name": "Dharamshala Hill Colony",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 750,
        "destination_site_id": "SAFE-SITE-088",
        "destination_cci": 93.8,
        "destination_capacity_families": 6136715,
        "road_name": "OSM Relocation Corridor: Dharamshala Hill Colony \u2192 SAFE-SITE-088",
        "osm_highway_class": "secondary",
        "road_distance_km": 47.99,
        "euclidean_distance_km": 45.76,
        "detour_ratio": 1.05,
        "estimated_transit_mins": 102,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CAUTION",
        "coordinates_leaflet": [
          [
            31.664917,
            76.124075
          ],
          [
            31.657379,
            76.131968
          ],
          [
            31.650001,
            76.139904
          ],
          [
            31.642935,
            76.147922
          ],
          [
            31.636313,
            76.156056
          ],
          [
            31.630242,
            76.164335
          ],
          [
            31.624796,
            76.172778
          ],
          [
            31.620014,
            76.181395
          ],
          [
            31.615895,
            76.190186
          ],
          [
            31.612405,
            76.199141
          ],
          [
            31.609469,
            76.208243
          ],
          [
            31.606989,
            76.217464
          ],
          [
            31.604839,
            76.226772
          ],
          [
            31.602882,
            76.23613
          ],
          [
            31.600976,
            76.245501
          ],
          [
            31.59898,
            76.254849
          ],
          [
            31.596769,
            76.264141
          ],
          [
            31.59424,
            76.273349
          ],
          [
            31.591317,
            76.282454
          ],
          [
            31.587958,
            76.291444
          ],
          [
            31.584159,
            76.300319
          ],
          [
            31.57995,
            76.309087
          ],
          [
            31.5754,
            76.317765
          ],
          [
            31.570607,
            76.326379
          ],
          [
            31.565695,
            76.334961
          ],
          [
            31.560804,
            76.34355
          ],
          [
            31.556085,
            76.352183
          ],
          [
            31.551687,
            76.360901
          ],
          [
            31.547749,
            76.36974
          ],
          [
            31.544392,
            76.378731
          ],
          [
            31.54171,
            76.387898
          ],
          [
            31.539763,
            76.397259
          ],
          [
            31.538576,
            76.40682
          ],
          [
            31.538136,
            76.416576
          ],
          [
            31.53839,
            76.426514
          ],
          [
            31.539254,
            76.436613
          ],
          [
            31.54061,
            76.44684
          ],
          [
            31.542319,
            76.457161
          ],
          [
            31.54423,
            76.467534
          ],
          [
            31.546182,
            76.477918
          ],
          [
            31.548023,
            76.488273
          ],
          [
            31.549611,
            76.498561
          ],
          [
            31.550827,
            76.508752
          ],
          [
            31.551582,
            76.518822
          ],
          [
            31.551819,
            76.528756
          ],
          [
            31.551518,
            76.538548
          ],
          [
            31.550699,
            76.548205
          ],
          [
            31.549414,
            76.55774
          ],
          [
            31.547749,
            76.567175
          ],
          [
            31.545816,
            76.576539
          ],
          [
            31.543744,
            76.585867
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            76.124075,
            31.664917
          ],
          [
            76.131968,
            31.657379
          ],
          [
            76.139904,
            31.650001
          ],
          [
            76.147922,
            31.642935
          ],
          [
            76.156056,
            31.636313
          ],
          [
            76.164335,
            31.630242
          ],
          [
            76.172778,
            31.624796
          ],
          [
            76.181395,
            31.620014
          ],
          [
            76.190186,
            31.615895
          ],
          [
            76.199141,
            31.612405
          ],
          [
            76.208243,
            31.609469
          ],
          [
            76.217464,
            31.606989
          ],
          [
            76.226772,
            31.604839
          ],
          [
            76.23613,
            31.602882
          ],
          [
            76.245501,
            31.600976
          ],
          [
            76.254849,
            31.59898
          ],
          [
            76.264141,
            31.596769
          ],
          [
            76.273349,
            31.59424
          ],
          [
            76.282454,
            31.591317
          ],
          [
            76.291444,
            31.587958
          ],
          [
            76.300319,
            31.584159
          ],
          [
            76.309087,
            31.57995
          ],
          [
            76.317765,
            31.5754
          ],
          [
            76.326379,
            31.570607
          ],
          [
            76.334961,
            31.565695
          ],
          [
            76.34355,
            31.560804
          ],
          [
            76.352183,
            31.556085
          ],
          [
            76.360901,
            31.551687
          ],
          [
            76.36974,
            31.547749
          ],
          [
            76.378731,
            31.544392
          ],
          [
            76.387898,
            31.54171
          ],
          [
            76.397259,
            31.539763
          ],
          [
            76.40682,
            31.538576
          ],
          [
            76.416576,
            31.538136
          ],
          [
            76.426514,
            31.53839
          ],
          [
            76.436613,
            31.539254
          ],
          [
            76.44684,
            31.54061
          ],
          [
            76.457161,
            31.542319
          ],
          [
            76.467534,
            31.54423
          ],
          [
            76.477918,
            31.546182
          ],
          [
            76.488273,
            31.548023
          ],
          [
            76.498561,
            31.549611
          ],
          [
            76.508752,
            31.550827
          ],
          [
            76.518822,
            31.551582
          ],
          [
            76.528756,
            31.551819
          ],
          [
            76.538548,
            31.551518
          ],
          [
            76.548205,
            31.550699
          ],
          [
            76.55774,
            31.549414
          ],
          [
            76.567175,
            31.547749
          ],
          [
            76.576539,
            31.545816
          ],
          [
            76.585867,
            31.543744
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-006",
        "habitation_id": "HAB-006",
        "habitation_name": "Shimla Slope Habitation",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 2211,
        "destination_site_id": "SAFE-SITE-051",
        "destination_cci": 93.8,
        "destination_capacity_families": 1254,
        "road_name": "OSM Relocation Corridor: Shimla Slope Habitation \u2192 SAFE-SITE-051",
        "osm_highway_class": "secondary",
        "road_distance_km": 81.6,
        "euclidean_distance_km": 77.47,
        "detour_ratio": 1.05,
        "estimated_transit_mins": 174,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CAUTION",
        "coordinates_leaflet": [
          [
            32.947412,
            76.123978
          ],
          [
            32.9493,
            76.1068
          ],
          [
            32.965724,
            76.086653
          ],
          [
            32.952438,
            76.072573
          ],
          [
            32.953399,
            76.055584
          ],
          [
            32.953802,
            76.038709
          ],
          [
            32.953572,
            76.021963
          ],
          [
            32.95267,
            76.005355
          ],
          [
            32.951094,
            75.988884
          ],
          [
            32.948884,
            75.972542
          ],
          [
            32.94611,
            75.956316
          ],
          [
            32.942876,
            75.940184
          ],
          [
            32.939307,
            75.92412
          ],
          [
            32.935543,
            75.908096
          ],
          [
            32.931727,
            75.892082
          ],
          [
            32.928003,
            75.87605
          ],
          [
            32.924495,
            75.859973
          ],
          [
            32.92131,
            75.843831
          ],
          [
            32.918525,
            75.827607
          ],
          [
            32.91618,
            75.811293
          ],
          [
            32.914282,
            75.794888
          ],
          [
            32.927495,
            75.775397
          ],
          [
            32.911661,
            75.761837
          ],
          [
            32.910769,
            75.745227
          ],
          [
            32.909999,
            75.728591
          ],
          [
            32.909206,
            75.71196
          ],
          [
            32.90824,
            75.695365
          ],
          [
            32.906948,
            75.678836
          ],
          [
            32.90519,
            75.662402
          ],
          [
            32.902844,
            75.646088
          ],
          [
            32.899814,
            75.629914
          ],
          [
            32.89604,
            75.613892
          ],
          [
            32.891495,
            75.598027
          ],
          [
            32.886195,
            75.582317
          ],
          [
            32.88019,
            75.56675
          ],
          [
            32.873569,
            75.55131
          ],
          [
            32.866449,
            75.535971
          ],
          [
            32.85897,
            75.520705
          ],
          [
            32.851288,
            75.505481
          ],
          [
            32.843564,
            75.490265
          ],
          [
            32.835953,
            75.475027
          ],
          [
            32.828598,
            75.459736
          ],
          [
            32.821619,
            75.444368
          ],
          [
            32.815108,
            75.428905
          ],
          [
            32.809121,
            75.413335
          ],
          [
            32.803679,
            75.397653
          ],
          [
            32.798763,
            75.381864
          ],
          [
            32.794318,
            75.365979
          ],
          [
            32.790257,
            75.350016
          ],
          [
            32.786469,
            75.333997
          ],
          [
            32.782821,
            75.317949
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            76.123978,
            32.947412
          ],
          [
            76.1068,
            32.9493
          ],
          [
            76.086653,
            32.965724
          ],
          [
            76.072573,
            32.952438
          ],
          [
            76.055584,
            32.953399
          ],
          [
            76.038709,
            32.953802
          ],
          [
            76.021963,
            32.953572
          ],
          [
            76.005355,
            32.95267
          ],
          [
            75.988884,
            32.951094
          ],
          [
            75.972542,
            32.948884
          ],
          [
            75.956316,
            32.94611
          ],
          [
            75.940184,
            32.942876
          ],
          [
            75.92412,
            32.939307
          ],
          [
            75.908096,
            32.935543
          ],
          [
            75.892082,
            32.931727
          ],
          [
            75.87605,
            32.928003
          ],
          [
            75.859973,
            32.924495
          ],
          [
            75.843831,
            32.92131
          ],
          [
            75.827607,
            32.918525
          ],
          [
            75.811293,
            32.91618
          ],
          [
            75.794888,
            32.914282
          ],
          [
            75.775397,
            32.927495
          ],
          [
            75.761837,
            32.911661
          ],
          [
            75.745227,
            32.910769
          ],
          [
            75.728591,
            32.909999
          ],
          [
            75.71196,
            32.909206
          ],
          [
            75.695365,
            32.90824
          ],
          [
            75.678836,
            32.906948
          ],
          [
            75.662402,
            32.90519
          ],
          [
            75.646088,
            32.902844
          ],
          [
            75.629914,
            32.899814
          ],
          [
            75.613892,
            32.89604
          ],
          [
            75.598027,
            32.891495
          ],
          [
            75.582317,
            32.886195
          ],
          [
            75.56675,
            32.88019
          ],
          [
            75.55131,
            32.873569
          ],
          [
            75.535971,
            32.866449
          ],
          [
            75.520705,
            32.85897
          ],
          [
            75.505481,
            32.851288
          ],
          [
            75.490265,
            32.843564
          ],
          [
            75.475027,
            32.835953
          ],
          [
            75.459736,
            32.828598
          ],
          [
            75.444368,
            32.821619
          ],
          [
            75.428905,
            32.815108
          ],
          [
            75.413335,
            32.809121
          ],
          [
            75.397653,
            32.803679
          ],
          [
            75.381864,
            32.798763
          ],
          [
            75.365979,
            32.794318
          ],
          [
            75.350016,
            32.790257
          ],
          [
            75.333997,
            32.786469
          ],
          [
            75.317949,
            32.782821
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-007",
        "habitation_id": "HAB-007",
        "habitation_name": "Kinnaur Terraces",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 391,
        "destination_site_id": "SAFE-SITE-088",
        "destination_cci": 93.8,
        "destination_capacity_families": 6136715,
        "road_name": "OSM Relocation Corridor: Kinnaur Terraces \u2192 SAFE-SITE-088",
        "osm_highway_class": "secondary",
        "road_distance_km": 98.49,
        "euclidean_distance_km": 97.44,
        "detour_ratio": 1.01,
        "estimated_transit_mins": 211,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CAUTION",
        "coordinates_leaflet": [
          [
            31.057975,
            75.732334
          ],
          [
            31.063095,
            75.752021
          ],
          [
            31.068359,
            75.771625
          ],
          [
            31.073903,
            75.791069
          ],
          [
            31.079846,
            75.810287
          ],
          [
            31.086284,
            75.829223
          ],
          [
            31.093283,
            75.847839
          ],
          [
            31.100879,
            75.866116
          ],
          [
            31.109072,
            75.884054
          ],
          [
            31.117828,
            75.90167
          ],
          [
            31.127084,
            75.919002
          ],
          [
            31.136748,
            75.936102
          ],
          [
            31.146709,
            75.953033
          ],
          [
            31.156844,
            75.969865
          ],
          [
            31.167024,
            75.986671
          ],
          [
            31.177123,
            76.003523
          ],
          [
            31.18703,
            76.020485
          ],
          [
            31.19665,
            76.03761
          ],
          [
            31.205916,
            76.054936
          ],
          [
            31.214791,
            76.072485
          ],
          [
            31.22327,
            76.090259
          ],
          [
            31.231382,
            76.108243
          ],
          [
            31.239187,
            76.126401
          ],
          [
            31.246773,
            76.144683
          ],
          [
            31.254252,
            76.163027
          ],
          [
            31.26175,
            76.181359
          ],
          [
            31.269403,
            76.199604
          ],
          [
            31.277344,
            76.217684
          ],
          [
            31.285699,
            76.235529
          ],
          [
            31.294576,
            76.253077
          ],
          [
            31.304058,
            76.27028
          ],
          [
            31.314202,
            76.287107
          ],
          [
            31.325028,
            76.303546
          ],
          [
            31.336526,
            76.319602
          ],
          [
            31.348647,
            76.335303
          ],
          [
            31.361316,
            76.350693
          ],
          [
            31.374427,
            76.365831
          ],
          [
            31.387856,
            76.380788
          ],
          [
            31.401466,
            76.395643
          ],
          [
            31.415113,
            76.410476
          ],
          [
            31.42866,
            76.425366
          ],
          [
            31.441979,
            76.440385
          ],
          [
            31.454965,
            76.455594
          ],
          [
            31.467536,
            76.47104
          ],
          [
            31.479642,
            76.48675
          ],
          [
            31.491265,
            76.502735
          ],
          [
            31.502421,
            76.518986
          ],
          [
            31.51316,
            76.535474
          ],
          [
            31.523557,
            76.552157
          ],
          [
            31.533713,
            76.568977
          ],
          [
            31.543744,
            76.585867
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            75.732334,
            31.057975
          ],
          [
            75.752021,
            31.063095
          ],
          [
            75.771625,
            31.068359
          ],
          [
            75.791069,
            31.073903
          ],
          [
            75.810287,
            31.079846
          ],
          [
            75.829223,
            31.086284
          ],
          [
            75.847839,
            31.093283
          ],
          [
            75.866116,
            31.100879
          ],
          [
            75.884054,
            31.109072
          ],
          [
            75.90167,
            31.117828
          ],
          [
            75.919002,
            31.127084
          ],
          [
            75.936102,
            31.136748
          ],
          [
            75.953033,
            31.146709
          ],
          [
            75.969865,
            31.156844
          ],
          [
            75.986671,
            31.167024
          ],
          [
            76.003523,
            31.177123
          ],
          [
            76.020485,
            31.18703
          ],
          [
            76.03761,
            31.19665
          ],
          [
            76.054936,
            31.205916
          ],
          [
            76.072485,
            31.214791
          ],
          [
            76.090259,
            31.22327
          ],
          [
            76.108243,
            31.231382
          ],
          [
            76.126401,
            31.239187
          ],
          [
            76.144683,
            31.246773
          ],
          [
            76.163027,
            31.254252
          ],
          [
            76.181359,
            31.26175
          ],
          [
            76.199604,
            31.269403
          ],
          [
            76.217684,
            31.277344
          ],
          [
            76.235529,
            31.285699
          ],
          [
            76.253077,
            31.294576
          ],
          [
            76.27028,
            31.304058
          ],
          [
            76.287107,
            31.314202
          ],
          [
            76.303546,
            31.325028
          ],
          [
            76.319602,
            31.336526
          ],
          [
            76.335303,
            31.348647
          ],
          [
            76.350693,
            31.361316
          ],
          [
            76.365831,
            31.374427
          ],
          [
            76.380788,
            31.387856
          ],
          [
            76.395643,
            31.401466
          ],
          [
            76.410476,
            31.415113
          ],
          [
            76.425366,
            31.42866
          ],
          [
            76.440385,
            31.441979
          ],
          [
            76.455594,
            31.454965
          ],
          [
            76.47104,
            31.467536
          ],
          [
            76.48675,
            31.479642
          ],
          [
            76.502735,
            31.491265
          ],
          [
            76.518986,
            31.502421
          ],
          [
            76.535474,
            31.51316
          ],
          [
            76.552157,
            31.523557
          ],
          [
            76.568977,
            31.533713
          ],
          [
            76.585867,
            31.543744
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-008",
        "habitation_id": "HAB-008",
        "habitation_name": "Spiti Riverbank Ward",
        "priority_tier": "Immediate (0-30 Days)",
        "population": 2191,
        "destination_site_id": "SAFE-SITE-066",
        "destination_cci": 93.8,
        "destination_capacity_families": 1505,
        "road_name": "OSM Relocation Corridor: Spiti Riverbank Ward \u2192 SAFE-SITE-066",
        "osm_highway_class": "primary",
        "road_distance_km": 61.83,
        "euclidean_distance_km": 55.0,
        "detour_ratio": 1.12,
        "estimated_transit_mins": 97,
        "convoy_speed_kmh": 38.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#DC2626",
        "clearance_status": "CLEAR",
        "coordinates_leaflet": [
          [
            31.668579,
            78.964705
          ],
          [
            31.657225,
            78.98483
          ],
          [
            31.671461,
            78.988982
          ],
          [
            31.660521,
            79.008849
          ],
          [
            31.67542,
            79.012588
          ],
          [
            31.678077,
            79.023968
          ],
          [
            31.681283,
            79.035006
          ],
          [
            31.685071,
            79.04568
          ],
          [
            31.689441,
            79.055991
          ],
          [
            31.681636,
            79.073901
          ],
          [
            31.687044,
            79.083564
          ],
          [
            31.69285,
            79.092978
          ],
          [
            31.698947,
            79.102212
          ],
          [
            31.705213,
            79.111339
          ],
          [
            31.724247,
            79.112497
          ],
          [
            31.730479,
            79.121646
          ],
          [
            31.736522,
            79.130913
          ],
          [
            31.742286,
            79.140354
          ],
          [
            31.747704,
            79.15001
          ],
          [
            31.75274,
            79.159905
          ],
          [
            31.75739,
            79.170042
          ],
          [
            31.761681,
            79.180402
          ],
          [
            31.765672,
            79.190949
          ],
          [
            31.769451,
            79.201629
          ],
          [
            31.773124,
            79.212375
          ],
          [
            31.776817,
            79.223109
          ],
          [
            31.78066,
            79.233749
          ],
          [
            31.784785,
            79.244212
          ],
          [
            31.789313,
            79.254424
          ],
          [
            31.794351,
            79.264319
          ],
          [
            31.79998,
            79.273844
          ],
          [
            31.806255,
            79.282966
          ],
          [
            31.813196,
            79.291672
          ],
          [
            31.820791,
            79.299969
          ],
          [
            31.828997,
            79.307887
          ],
          [
            31.837736,
            79.31547
          ],
          [
            31.846907,
            79.322785
          ],
          [
            31.856388,
            79.329905
          ],
          [
            31.866046,
            79.336916
          ],
          [
            31.87574,
            79.343904
          ],
          [
            31.885337,
            79.350953
          ],
          [
            31.894711,
            79.35814
          ],
          [
            31.90376,
            79.36553
          ],
          [
            31.912404,
            79.373174
          ],
          [
            31.920593,
            79.381101
          ],
          [
            31.928312,
            79.389322
          ],
          [
            31.935575,
            79.397827
          ],
          [
            31.94243,
            79.406587
          ],
          [
            31.948952,
            79.415554
          ],
          [
            31.955239,
            79.424669
          ],
          [
            31.961404,
            79.43386
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            78.964705,
            31.668579
          ],
          [
            78.98483,
            31.657225
          ],
          [
            78.988982,
            31.671461
          ],
          [
            79.008849,
            31.660521
          ],
          [
            79.012588,
            31.67542
          ],
          [
            79.023968,
            31.678077
          ],
          [
            79.035006,
            31.681283
          ],
          [
            79.04568,
            31.685071
          ],
          [
            79.055991,
            31.689441
          ],
          [
            79.073901,
            31.681636
          ],
          [
            79.083564,
            31.687044
          ],
          [
            79.092978,
            31.69285
          ],
          [
            79.102212,
            31.698947
          ],
          [
            79.111339,
            31.705213
          ],
          [
            79.112497,
            31.724247
          ],
          [
            79.121646,
            31.730479
          ],
          [
            79.130913,
            31.736522
          ],
          [
            79.140354,
            31.742286
          ],
          [
            79.15001,
            31.747704
          ],
          [
            79.159905,
            31.75274
          ],
          [
            79.170042,
            31.75739
          ],
          [
            79.180402,
            31.761681
          ],
          [
            79.190949,
            31.765672
          ],
          [
            79.201629,
            31.769451
          ],
          [
            79.212375,
            31.773124
          ],
          [
            79.223109,
            31.776817
          ],
          [
            79.233749,
            31.78066
          ],
          [
            79.244212,
            31.784785
          ],
          [
            79.254424,
            31.789313
          ],
          [
            79.264319,
            31.794351
          ],
          [
            79.273844,
            31.79998
          ],
          [
            79.282966,
            31.806255
          ],
          [
            79.291672,
            31.813196
          ],
          [
            79.299969,
            31.820791
          ],
          [
            79.307887,
            31.828997
          ],
          [
            79.31547,
            31.837736
          ],
          [
            79.322785,
            31.846907
          ],
          [
            79.329905,
            31.856388
          ],
          [
            79.336916,
            31.866046
          ],
          [
            79.343904,
            31.87574
          ],
          [
            79.350953,
            31.885337
          ],
          [
            79.35814,
            31.894711
          ],
          [
            79.36553,
            31.90376
          ],
          [
            79.373174,
            31.912404
          ],
          [
            79.381101,
            31.920593
          ],
          [
            79.389322,
            31.928312
          ],
          [
            79.397827,
            31.935575
          ],
          [
            79.406587,
            31.94243
          ],
          [
            79.415554,
            31.948952
          ],
          [
            79.424669,
            31.955239
          ],
          [
            79.43386,
            31.961404
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-009",
        "habitation_id": "HAB-009",
        "habitation_name": "Uttarkashi Fluvial Cluster",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 1513,
        "destination_site_id": "SAFE-SITE-052",
        "destination_cci": 93.8,
        "destination_capacity_families": 5518,
        "road_name": "OSM Relocation Corridor: Uttarkashi Fluvial Cluster \u2192 SAFE-SITE-052",
        "osm_highway_class": "secondary",
        "road_distance_km": 97.59,
        "euclidean_distance_km": 92.88,
        "detour_ratio": 1.05,
        "estimated_transit_mins": 209,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CAUTION",
        "coordinates_leaflet": [
          [
            31.965447,
            77.90446
          ],
          [
            31.981523,
            77.911498
          ],
          [
            31.997616,
            77.918371
          ],
          [
            32.012147,
            77.939838
          ],
          [
            32.028324,
            77.945935
          ],
          [
            32.04456,
            77.951465
          ],
          [
            32.060866,
            77.956352
          ],
          [
            32.07884,
            77.945642
          ],
          [
            32.095292,
            77.949164
          ],
          [
            32.111813,
            77.952042
          ],
          [
            32.128394,
            77.954348
          ],
          [
            32.145026,
            77.956187
          ],
          [
            32.161694,
            77.957686
          ],
          [
            32.178383,
            77.958986
          ],
          [
            32.195078,
            77.960235
          ],
          [
            32.210167,
            77.976491
          ],
          [
            32.228425,
            77.963137
          ],
          [
            32.245051,
            77.965026
          ],
          [
            32.261634,
            77.96732
          ],
          [
            32.276573,
            77.984977
          ],
          [
            32.294656,
            77.973256
          ],
          [
            32.311097,
            77.976871
          ],
          [
            32.325906,
            77.995753
          ],
          [
            32.343879,
            77.985054
          ],
          [
            32.360243,
            77.989393
          ],
          [
            32.37661,
            77.993709
          ],
          [
            32.392995,
            77.997849
          ],
          [
            32.409416,
            78.001659
          ],
          [
            32.425887,
            78.004996
          ],
          [
            32.442423,
            78.007736
          ],
          [
            32.459032,
            78.009782
          ],
          [
            32.475723,
            78.011073
          ],
          [
            32.492497,
            78.011582
          ],
          [
            32.509353,
            78.011323
          ],
          [
            32.526285,
            78.01035
          ],
          [
            32.543285,
            78.008752
          ],
          [
            32.560339,
            78.006647
          ],
          [
            32.577431,
            78.004178
          ],
          [
            32.594546,
            78.001503
          ],
          [
            32.611665,
            77.998785
          ],
          [
            32.628772,
            77.996182
          ],
          [
            32.645851,
            77.993838
          ],
          [
            32.66289,
            77.991877
          ],
          [
            32.679877,
            77.99039
          ],
          [
            32.696808,
            77.989435
          ],
          [
            32.713679,
            77.989033
          ],
          [
            32.730494,
            77.989165
          ],
          [
            32.747257,
            77.989775
          ],
          [
            32.763978,
            77.990775
          ],
          [
            32.78067,
            77.992051
          ],
          [
            32.797347,
            77.993469
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            77.90446,
            31.965447
          ],
          [
            77.911498,
            31.981523
          ],
          [
            77.918371,
            31.997616
          ],
          [
            77.939838,
            32.012147
          ],
          [
            77.945935,
            32.028324
          ],
          [
            77.951465,
            32.04456
          ],
          [
            77.956352,
            32.060866
          ],
          [
            77.945642,
            32.07884
          ],
          [
            77.949164,
            32.095292
          ],
          [
            77.952042,
            32.111813
          ],
          [
            77.954348,
            32.128394
          ],
          [
            77.956187,
            32.145026
          ],
          [
            77.957686,
            32.161694
          ],
          [
            77.958986,
            32.178383
          ],
          [
            77.960235,
            32.195078
          ],
          [
            77.976491,
            32.210167
          ],
          [
            77.963137,
            32.228425
          ],
          [
            77.965026,
            32.245051
          ],
          [
            77.96732,
            32.261634
          ],
          [
            77.984977,
            32.276573
          ],
          [
            77.973256,
            32.294656
          ],
          [
            77.976871,
            32.311097
          ],
          [
            77.995753,
            32.325906
          ],
          [
            77.985054,
            32.343879
          ],
          [
            77.989393,
            32.360243
          ],
          [
            77.993709,
            32.37661
          ],
          [
            77.997849,
            32.392995
          ],
          [
            78.001659,
            32.409416
          ],
          [
            78.004996,
            32.425887
          ],
          [
            78.007736,
            32.442423
          ],
          [
            78.009782,
            32.459032
          ],
          [
            78.011073,
            32.475723
          ],
          [
            78.011582,
            32.492497
          ],
          [
            78.011323,
            32.509353
          ],
          [
            78.01035,
            32.526285
          ],
          [
            78.008752,
            32.543285
          ],
          [
            78.006647,
            32.560339
          ],
          [
            78.004178,
            32.577431
          ],
          [
            78.001503,
            32.594546
          ],
          [
            77.998785,
            32.611665
          ],
          [
            77.996182,
            32.628772
          ],
          [
            77.993838,
            32.645851
          ],
          [
            77.991877,
            32.66289
          ],
          [
            77.99039,
            32.679877
          ],
          [
            77.989435,
            32.696808
          ],
          [
            77.989033,
            32.713679
          ],
          [
            77.989165,
            32.730494
          ],
          [
            77.989775,
            32.747257
          ],
          [
            77.990775,
            32.763978
          ],
          [
            77.992051,
            32.78067
          ],
          [
            77.993469,
            32.797347
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-010",
        "habitation_id": "HAB-010",
        "habitation_name": "Joshimath Slump Ward",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 2289,
        "destination_site_id": "SAFE-SITE-055",
        "destination_cci": 93.8,
        "destination_capacity_families": 5532,
        "road_name": "OSM Relocation Corridor: Joshimath Slump Ward \u2192 SAFE-SITE-055",
        "osm_highway_class": "secondary",
        "road_distance_km": 55.36,
        "euclidean_distance_km": 49.06,
        "detour_ratio": 1.13,
        "estimated_transit_mins": 118,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CLEAR",
        "coordinates_leaflet": [
          [
            32.32428,
            78.33229
          ],
          [
            32.330102,
            78.34104
          ],
          [
            32.335998,
            78.349641
          ],
          [
            32.342035,
            78.357954
          ],
          [
            32.348275,
            78.365854
          ],
          [
            32.348154,
            78.386707
          ],
          [
            32.35493,
            78.393516
          ],
          [
            32.36862,
            78.386244
          ],
          [
            32.376001,
            78.391821
          ],
          [
            32.383668,
            78.396815
          ],
          [
            32.391587,
            78.401294
          ],
          [
            32.399715,
            78.405351
          ],
          [
            32.407992,
            78.4091
          ],
          [
            32.416358,
            78.412671
          ],
          [
            32.424747,
            78.416195
          ],
          [
            32.433095,
            78.419802
          ],
          [
            32.441345,
            78.423609
          ],
          [
            32.442838,
            78.441175
          ],
          [
            32.450764,
            78.445642
          ],
          [
            32.458491,
            78.450514
          ],
          [
            32.466017,
            78.455795
          ],
          [
            32.479968,
            78.447991
          ],
          [
            32.487152,
            78.453968
          ],
          [
            32.494226,
            78.460171
          ],
          [
            32.501245,
            78.466484
          ],
          [
            32.501661,
            78.486242
          ],
          [
            32.508768,
            78.492376
          ],
          [
            32.522634,
            78.484748
          ],
          [
            32.530097,
            78.490157
          ],
          [
            32.537825,
            78.495027
          ],
          [
            32.54586,
            78.499271
          ],
          [
            32.55423,
            78.502833
          ],
          [
            32.562947,
            78.505689
          ],
          [
            32.572004,
            78.507853
          ],
          [
            32.581377,
            78.509371
          ],
          [
            32.591028,
            78.510325
          ],
          [
            32.600904,
            78.510821
          ],
          [
            32.61094,
            78.51099
          ],
          [
            32.621069,
            78.510972
          ],
          [
            32.631216,
            78.510915
          ],
          [
            32.641312,
            78.510961
          ],
          [
            32.651293,
            78.511243
          ],
          [
            32.661105,
            78.511869
          ],
          [
            32.670707,
            78.512923
          ],
          [
            32.680072,
            78.514458
          ],
          [
            32.689193,
            78.516492
          ],
          [
            32.698077,
            78.519008
          ],
          [
            32.706749,
            78.521955
          ],
          [
            32.715248,
            78.525254
          ],
          [
            32.723625,
            78.528803
          ],
          [
            32.731938,
            78.532481
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            78.33229,
            32.32428
          ],
          [
            78.34104,
            32.330102
          ],
          [
            78.349641,
            32.335998
          ],
          [
            78.357954,
            32.342035
          ],
          [
            78.365854,
            32.348275
          ],
          [
            78.386707,
            32.348154
          ],
          [
            78.393516,
            32.35493
          ],
          [
            78.386244,
            32.36862
          ],
          [
            78.391821,
            32.376001
          ],
          [
            78.396815,
            32.383668
          ],
          [
            78.401294,
            32.391587
          ],
          [
            78.405351,
            32.399715
          ],
          [
            78.4091,
            32.407992
          ],
          [
            78.412671,
            32.416358
          ],
          [
            78.416195,
            32.424747
          ],
          [
            78.419802,
            32.433095
          ],
          [
            78.423609,
            32.441345
          ],
          [
            78.441175,
            32.442838
          ],
          [
            78.445642,
            32.450764
          ],
          [
            78.450514,
            32.458491
          ],
          [
            78.455795,
            32.466017
          ],
          [
            78.447991,
            32.479968
          ],
          [
            78.453968,
            32.487152
          ],
          [
            78.460171,
            32.494226
          ],
          [
            78.466484,
            32.501245
          ],
          [
            78.486242,
            32.501661
          ],
          [
            78.492376,
            32.508768
          ],
          [
            78.484748,
            32.522634
          ],
          [
            78.490157,
            32.530097
          ],
          [
            78.495027,
            32.537825
          ],
          [
            78.499271,
            32.54586
          ],
          [
            78.502833,
            32.55423
          ],
          [
            78.505689,
            32.562947
          ],
          [
            78.507853,
            32.572004
          ],
          [
            78.509371,
            32.581377
          ],
          [
            78.510325,
            32.591028
          ],
          [
            78.510821,
            32.600904
          ],
          [
            78.51099,
            32.61094
          ],
          [
            78.510972,
            32.621069
          ],
          [
            78.510915,
            32.631216
          ],
          [
            78.510961,
            32.641312
          ],
          [
            78.511243,
            32.651293
          ],
          [
            78.511869,
            32.661105
          ],
          [
            78.512923,
            32.670707
          ],
          [
            78.514458,
            32.680072
          ],
          [
            78.516492,
            32.689193
          ],
          [
            78.519008,
            32.698077
          ],
          [
            78.521955,
            32.706749
          ],
          [
            78.525254,
            32.715248
          ],
          [
            78.528803,
            32.723625
          ],
          [
            78.532481,
            32.731938
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-011",
        "habitation_id": "HAB-011",
        "habitation_name": "Rudraprayag Confluence Basti",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 1540,
        "destination_site_id": "SAFE-SITE-028",
        "destination_cci": 93.8,
        "destination_capacity_families": 114199,
        "road_name": "OSM Relocation Corridor: Rudraprayag Confluence Basti \u2192 SAFE-SITE-028",
        "osm_highway_class": "secondary",
        "road_distance_km": 40.83,
        "euclidean_distance_km": 38.26,
        "detour_ratio": 1.07,
        "estimated_transit_mins": 87,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CAUTION",
        "coordinates_leaflet": [
          [
            33.640704,
            75.582338
          ],
          [
            33.64804,
            75.57599
          ],
          [
            33.655217,
            75.569596
          ],
          [
            33.662084,
            75.563112
          ],
          [
            33.668511,
            75.556501
          ],
          [
            33.67439,
            75.549733
          ],
          [
            33.679648,
            75.542785
          ],
          [
            33.684247,
            75.535646
          ],
          [
            33.688187,
            75.528318
          ],
          [
            33.691503,
            75.520809
          ],
          [
            33.694267,
            75.513141
          ],
          [
            33.69658,
            75.505343
          ],
          [
            33.698564,
            75.497449
          ],
          [
            33.700356,
            75.489501
          ],
          [
            33.702099,
            75.481538
          ],
          [
            33.703931,
            75.4736
          ],
          [
            33.705975,
            75.465725
          ],
          [
            33.708336,
            75.45794
          ],
          [
            33.711089,
            75.450269
          ],
          [
            33.714274,
            75.442722
          ],
          [
            33.717896,
            75.435302
          ],
          [
            33.721925,
            75.427999
          ],
          [
            33.726294,
            75.420794
          ],
          [
            33.730903,
            75.413659
          ],
          [
            33.735632,
            75.406558
          ],
          [
            33.740339,
            75.399451
          ],
          [
            33.744875,
            75.392294
          ],
          [
            33.749092,
            75.385046
          ],
          [
            33.752852,
            75.377665
          ],
          [
            33.756035,
            75.370118
          ],
          [
            33.758549,
            75.362378
          ],
          [
            33.760331,
            75.354426
          ],
          [
            33.761359,
            75.346257
          ],
          [
            33.761645,
            75.337874
          ],
          [
            33.761241,
            75.329291
          ],
          [
            33.760233,
            75.320534
          ],
          [
            33.758735,
            75.311635
          ],
          [
            33.756885,
            75.302635
          ],
          [
            33.754836,
            75.293578
          ],
          [
            33.752746,
            75.284508
          ],
          [
            33.750766,
            75.275471
          ],
          [
            33.749038,
            75.266506
          ],
          [
            33.747678,
            75.257647
          ],
          [
            33.746778,
            75.248921
          ],
          [
            33.746391,
            75.240344
          ],
          [
            33.746539,
            75.23192
          ],
          [
            33.747202,
            75.223646
          ],
          [
            33.748327,
            75.215504
          ],
          [
            33.749829,
            75.207472
          ],
          [
            33.751598,
            75.199517
          ],
          [
            33.753505,
            75.191601
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            75.582338,
            33.640704
          ],
          [
            75.57599,
            33.64804
          ],
          [
            75.569596,
            33.655217
          ],
          [
            75.563112,
            33.662084
          ],
          [
            75.556501,
            33.668511
          ],
          [
            75.549733,
            33.67439
          ],
          [
            75.542785,
            33.679648
          ],
          [
            75.535646,
            33.684247
          ],
          [
            75.528318,
            33.688187
          ],
          [
            75.520809,
            33.691503
          ],
          [
            75.513141,
            33.694267
          ],
          [
            75.505343,
            33.69658
          ],
          [
            75.497449,
            33.698564
          ],
          [
            75.489501,
            33.700356
          ],
          [
            75.481538,
            33.702099
          ],
          [
            75.4736,
            33.703931
          ],
          [
            75.465725,
            33.705975
          ],
          [
            75.45794,
            33.708336
          ],
          [
            75.450269,
            33.711089
          ],
          [
            75.442722,
            33.714274
          ],
          [
            75.435302,
            33.717896
          ],
          [
            75.427999,
            33.721925
          ],
          [
            75.420794,
            33.726294
          ],
          [
            75.413659,
            33.730903
          ],
          [
            75.406558,
            33.735632
          ],
          [
            75.399451,
            33.740339
          ],
          [
            75.392294,
            33.744875
          ],
          [
            75.385046,
            33.749092
          ],
          [
            75.377665,
            33.752852
          ],
          [
            75.370118,
            33.756035
          ],
          [
            75.362378,
            33.758549
          ],
          [
            75.354426,
            33.760331
          ],
          [
            75.346257,
            33.761359
          ],
          [
            75.337874,
            33.761645
          ],
          [
            75.329291,
            33.761241
          ],
          [
            75.320534,
            33.760233
          ],
          [
            75.311635,
            33.758735
          ],
          [
            75.302635,
            33.756885
          ],
          [
            75.293578,
            33.754836
          ],
          [
            75.284508,
            33.752746
          ],
          [
            75.275471,
            33.750766
          ],
          [
            75.266506,
            33.749038
          ],
          [
            75.257647,
            33.747678
          ],
          [
            75.248921,
            33.746778
          ],
          [
            75.240344,
            33.746391
          ],
          [
            75.23192,
            33.746539
          ],
          [
            75.223646,
            33.747202
          ],
          [
            75.215504,
            33.748327
          ],
          [
            75.207472,
            33.749829
          ],
          [
            75.199517,
            33.751598
          ],
          [
            75.191601,
            33.753505
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-012",
        "habitation_id": "HAB-012",
        "habitation_name": "Tehri Foothill Hamlet",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 1628,
        "destination_site_id": "SAFE-SITE-083",
        "destination_cci": 93.8,
        "destination_capacity_families": 1658,
        "road_name": "OSM Relocation Corridor: Tehri Foothill Hamlet \u2192 SAFE-SITE-083",
        "osm_highway_class": "secondary",
        "road_distance_km": 24.1,
        "euclidean_distance_km": 19.67,
        "detour_ratio": 1.23,
        "estimated_transit_mins": 51,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CLEAR",
        "coordinates_leaflet": [
          [
            31.298695,
            79.379639
          ],
          [
            31.292528,
            79.382217
          ],
          [
            31.286522,
            79.384837
          ],
          [
            31.280826,
            79.38754
          ],
          [
            31.275573,
            79.390363
          ],
          [
            31.270871,
            79.393334
          ],
          [
            31.266793,
            79.396472
          ],
          [
            31.263377,
            79.399788
          ],
          [
            31.260625,
            79.403282
          ],
          [
            31.258499,
            79.406944
          ],
          [
            31.256928,
            79.410755
          ],
          [
            31.255811,
            79.414688
          ],
          [
            31.255024,
            79.41871
          ],
          [
            31.25443,
            79.422783
          ],
          [
            31.253885,
            79.42687
          ],
          [
            31.253252,
            79.430933
          ],
          [
            31.252404,
            79.434939
          ],
          [
            31.251239,
            79.438859
          ],
          [
            31.24968,
            79.442673
          ],
          [
            31.247686,
            79.446371
          ],
          [
            31.245251,
            79.44995
          ],
          [
            31.242409,
            79.45342
          ],
          [
            31.239226,
            79.456799
          ],
          [
            31.235799,
            79.460112
          ],
          [
            31.232254,
            79.463393
          ],
          [
            31.22873,
            79.46668
          ],
          [
            31.225378,
            79.470013
          ],
          [
            31.222346,
            79.473432
          ],
          [
            31.219774,
            79.476974
          ],
          [
            31.217782,
            79.480672
          ],
          [
            31.216463,
            79.484551
          ],
          [
            31.215879,
            79.488627
          ],
          [
            31.216053,
            79.492907
          ],
          [
            31.216973,
            79.497387
          ],
          [
            31.218587,
            79.502054
          ],
          [
            31.220809,
            79.506883
          ],
          [
            31.223522,
            79.511845
          ],
          [
            31.226589,
            79.516901
          ],
          [
            31.229856,
            79.522012
          ],
          [
            31.233165,
            79.527133
          ],
          [
            31.236363,
            79.532225
          ],
          [
            31.239308,
            79.537249
          ],
          [
            31.241882,
            79.542173
          ],
          [
            31.243995,
            79.546973
          ],
          [
            31.245591,
            79.551635
          ],
          [
            31.24665,
            79.556152
          ],
          [
            31.247192,
            79.560531
          ],
          [
            31.247268,
            79.564784
          ],
          [
            31.246966,
            79.568936
          ],
          [
            31.246395,
            79.573016
          ],
          [
            31.245686,
            79.577059
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            79.379639,
            31.298695
          ],
          [
            79.382217,
            31.292528
          ],
          [
            79.384837,
            31.286522
          ],
          [
            79.38754,
            31.280826
          ],
          [
            79.390363,
            31.275573
          ],
          [
            79.393334,
            31.270871
          ],
          [
            79.396472,
            31.266793
          ],
          [
            79.399788,
            31.263377
          ],
          [
            79.403282,
            31.260625
          ],
          [
            79.406944,
            31.258499
          ],
          [
            79.410755,
            31.256928
          ],
          [
            79.414688,
            31.255811
          ],
          [
            79.41871,
            31.255024
          ],
          [
            79.422783,
            31.25443
          ],
          [
            79.42687,
            31.253885
          ],
          [
            79.430933,
            31.253252
          ],
          [
            79.434939,
            31.252404
          ],
          [
            79.438859,
            31.251239
          ],
          [
            79.442673,
            31.24968
          ],
          [
            79.446371,
            31.247686
          ],
          [
            79.44995,
            31.245251
          ],
          [
            79.45342,
            31.242409
          ],
          [
            79.456799,
            31.239226
          ],
          [
            79.460112,
            31.235799
          ],
          [
            79.463393,
            31.232254
          ],
          [
            79.46668,
            31.22873
          ],
          [
            79.470013,
            31.225378
          ],
          [
            79.473432,
            31.222346
          ],
          [
            79.476974,
            31.219774
          ],
          [
            79.480672,
            31.217782
          ],
          [
            79.484551,
            31.216463
          ],
          [
            79.488627,
            31.215879
          ],
          [
            79.492907,
            31.216053
          ],
          [
            79.497387,
            31.216973
          ],
          [
            79.502054,
            31.218587
          ],
          [
            79.506883,
            31.220809
          ],
          [
            79.511845,
            31.223522
          ],
          [
            79.516901,
            31.226589
          ],
          [
            79.522012,
            31.229856
          ],
          [
            79.527133,
            31.233165
          ],
          [
            79.532225,
            31.236363
          ],
          [
            79.537249,
            31.239308
          ],
          [
            79.542173,
            31.241882
          ],
          [
            79.546973,
            31.243995
          ],
          [
            79.551635,
            31.245591
          ],
          [
            79.556152,
            31.24665
          ],
          [
            79.560531,
            31.247192
          ],
          [
            79.564784,
            31.247268
          ],
          [
            79.568936,
            31.246966
          ],
          [
            79.573016,
            31.246395
          ],
          [
            79.577059,
            31.245686
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-013",
        "habitation_id": "HAB-013",
        "habitation_name": "Mandi Basin Settlement",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 925,
        "destination_site_id": "SAFE-SITE-056",
        "destination_cci": 93.8,
        "destination_capacity_families": 2201,
        "road_name": "OSM Relocation Corridor: Mandi Basin Settlement \u2192 SAFE-SITE-056",
        "osm_highway_class": "secondary",
        "road_distance_km": 16.71,
        "euclidean_distance_km": 11.58,
        "detour_ratio": 1.44,
        "estimated_transit_mins": 35,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CLEAR",
        "coordinates_leaflet": [
          [
            32.556938,
            78.829771
          ],
          [
            32.553211,
            78.833596
          ],
          [
            32.549625,
            78.837372
          ],
          [
            32.546314,
            78.841056
          ],
          [
            32.543394,
            78.844606
          ],
          [
            32.540959,
            78.847991
          ],
          [
            32.539075,
            78.851189
          ],
          [
            32.537777,
            78.854187
          ],
          [
            32.537063,
            78.856986
          ],
          [
            32.536902,
            78.859597
          ],
          [
            32.537231,
            78.862042
          ],
          [
            32.53796,
            78.86435
          ],
          [
            32.538981,
            78.866559
          ],
          [
            32.540173,
            78.86871
          ],
          [
            32.541408,
            78.870846
          ],
          [
            32.542564,
            78.873009
          ],
          [
            32.543531,
            78.875236
          ],
          [
            32.544218,
            78.877559
          ],
          [
            32.544557,
            78.88
          ],
          [
            32.544513,
            78.882571
          ],
          [
            32.54408,
            78.885275
          ],
          [
            32.543287,
            78.888101
          ],
          [
            32.542193,
            78.89103
          ],
          [
            32.540885,
            78.894032
          ],
          [
            32.539471,
            78.897069
          ],
          [
            32.538077,
            78.9001
          ],
          [
            32.536834,
            78.90308
          ],
          [
            32.535874,
            78.905963
          ],
          [
            32.535319,
            78.908708
          ],
          [
            32.535276,
            78.911279
          ],
          [
            32.535828,
            78.913648
          ],
          [
            32.537027,
            78.915796
          ],
          [
            32.538897,
            78.917716
          ],
          [
            32.541424,
            78.919412
          ],
          [
            32.544564,
            78.9209
          ],
          [
            32.54824,
            78.922205
          ],
          [
            32.55235,
            78.923363
          ],
          [
            32.556772,
            78.924414
          ],
          [
            32.56137,
            78.925405
          ],
          [
            32.566006,
            78.926384
          ],
          [
            32.570544,
            78.927396
          ],
          [
            32.574858,
            78.928484
          ],
          [
            32.578845,
            78.929683
          ],
          [
            32.582425,
            78.931021
          ],
          [
            32.585549,
            78.932514
          ],
          [
            32.5882,
            78.934169
          ],
          [
            32.590393,
            78.935979
          ],
          [
            32.592176,
            78.937928
          ],
          [
            32.593624,
            78.939992
          ],
          [
            32.594836,
            78.942135
          ],
          [
            32.595926,
            78.944321
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            78.829771,
            32.556938
          ],
          [
            78.833596,
            32.553211
          ],
          [
            78.837372,
            32.549625
          ],
          [
            78.841056,
            32.546314
          ],
          [
            78.844606,
            32.543394
          ],
          [
            78.847991,
            32.540959
          ],
          [
            78.851189,
            32.539075
          ],
          [
            78.854187,
            32.537777
          ],
          [
            78.856986,
            32.537063
          ],
          [
            78.859597,
            32.536902
          ],
          [
            78.862042,
            32.537231
          ],
          [
            78.86435,
            32.53796
          ],
          [
            78.866559,
            32.538981
          ],
          [
            78.86871,
            32.540173
          ],
          [
            78.870846,
            32.541408
          ],
          [
            78.873009,
            32.542564
          ],
          [
            78.875236,
            32.543531
          ],
          [
            78.877559,
            32.544218
          ],
          [
            78.88,
            32.544557
          ],
          [
            78.882571,
            32.544513
          ],
          [
            78.885275,
            32.54408
          ],
          [
            78.888101,
            32.543287
          ],
          [
            78.89103,
            32.542193
          ],
          [
            78.894032,
            32.540885
          ],
          [
            78.897069,
            32.539471
          ],
          [
            78.9001,
            32.538077
          ],
          [
            78.90308,
            32.536834
          ],
          [
            78.905963,
            32.535874
          ],
          [
            78.908708,
            32.535319
          ],
          [
            78.911279,
            32.535276
          ],
          [
            78.913648,
            32.535828
          ],
          [
            78.915796,
            32.537027
          ],
          [
            78.917716,
            32.538897
          ],
          [
            78.919412,
            32.541424
          ],
          [
            78.9209,
            32.544564
          ],
          [
            78.922205,
            32.54824
          ],
          [
            78.923363,
            32.55235
          ],
          [
            78.924414,
            32.556772
          ],
          [
            78.925405,
            32.56137
          ],
          [
            78.926384,
            32.566006
          ],
          [
            78.927396,
            32.570544
          ],
          [
            78.928484,
            32.574858
          ],
          [
            78.929683,
            32.578845
          ],
          [
            78.931021,
            32.582425
          ],
          [
            78.932514,
            32.585549
          ],
          [
            78.934169,
            32.5882
          ],
          [
            78.935979,
            32.590393
          ],
          [
            78.937928,
            32.592176
          ],
          [
            78.939992,
            32.593624
          ],
          [
            78.942135,
            32.594836
          ],
          [
            78.944321,
            32.595926
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-014",
        "habitation_id": "HAB-014",
        "habitation_name": "Solan Terraced Village",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 184,
        "destination_site_id": "SAFE-SITE-032",
        "destination_cci": 93.8,
        "destination_capacity_families": 4013,
        "road_name": "OSM Relocation Corridor: Solan Terraced Village \u2192 SAFE-SITE-032",
        "osm_highway_class": "secondary",
        "road_distance_km": 90.53,
        "euclidean_distance_km": 85.99,
        "detour_ratio": 1.05,
        "estimated_transit_mins": 193,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CAUTION",
        "coordinates_leaflet": [
          [
            32.869658,
            76.349356
          ],
          [
            32.878824,
            76.36411
          ],
          [
            32.888097,
            76.378737
          ],
          [
            32.897578,
            76.393119
          ],
          [
            32.907358,
            76.407152
          ],
          [
            32.917507,
            76.420751
          ],
          [
            32.928074,
            76.433858
          ],
          [
            32.939087,
            76.446442
          ],
          [
            32.950545,
            76.458504
          ],
          [
            32.962424,
            76.470072
          ],
          [
            32.964948,
            76.492622
          ],
          [
            32.977504,
            76.503395
          ],
          [
            32.990282,
            76.513908
          ],
          [
            33.003189,
            76.524269
          ],
          [
            33.01613,
            76.53459
          ],
          [
            33.029011,
            76.544982
          ],
          [
            33.041747,
            76.555543
          ],
          [
            33.063998,
            76.554935
          ],
          [
            33.076257,
            76.566057
          ],
          [
            33.088224,
            76.577521
          ],
          [
            33.090169,
            76.600751
          ],
          [
            33.101567,
            76.612884
          ],
          [
            33.112735,
            76.625286
          ],
          [
            33.123741,
            76.637879
          ],
          [
            33.144393,
            76.639147
          ],
          [
            33.155333,
            76.651817
          ],
          [
            33.166388,
            76.664352
          ],
          [
            33.167932,
            76.688053
          ],
          [
            33.179511,
            76.699973
          ],
          [
            33.19148,
            76.711436
          ],
          [
            33.213627,
            76.710949
          ],
          [
            33.226541,
            76.721302
          ],
          [
            33.239964,
            76.731057
          ],
          [
            33.253888,
            76.740225
          ],
          [
            33.268277,
            76.748845
          ],
          [
            33.283075,
            76.756987
          ],
          [
            33.298203,
            76.76474
          ],
          [
            33.313568,
            76.772216
          ],
          [
            33.329068,
            76.779533
          ],
          [
            33.344596,
            76.786817
          ],
          [
            33.360049,
            76.794189
          ],
          [
            33.375332,
            76.801761
          ],
          [
            33.390366,
            76.809624
          ],
          [
            33.405091,
            76.817851
          ],
          [
            33.419469,
            76.826486
          ],
          [
            33.433486,
            76.835543
          ],
          [
            33.447156,
            76.845009
          ],
          [
            33.460513,
            76.854841
          ],
          [
            33.473616,
            76.864972
          ],
          [
            33.486539,
            76.875314
          ],
          [
            33.499369,
            76.885766
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            76.349356,
            32.869658
          ],
          [
            76.36411,
            32.878824
          ],
          [
            76.378737,
            32.888097
          ],
          [
            76.393119,
            32.897578
          ],
          [
            76.407152,
            32.907358
          ],
          [
            76.420751,
            32.917507
          ],
          [
            76.433858,
            32.928074
          ],
          [
            76.446442,
            32.939087
          ],
          [
            76.458504,
            32.950545
          ],
          [
            76.470072,
            32.962424
          ],
          [
            76.492622,
            32.964948
          ],
          [
            76.503395,
            32.977504
          ],
          [
            76.513908,
            32.990282
          ],
          [
            76.524269,
            33.003189
          ],
          [
            76.53459,
            33.01613
          ],
          [
            76.544982,
            33.029011
          ],
          [
            76.555543,
            33.041747
          ],
          [
            76.554935,
            33.063998
          ],
          [
            76.566057,
            33.076257
          ],
          [
            76.577521,
            33.088224
          ],
          [
            76.600751,
            33.090169
          ],
          [
            76.612884,
            33.101567
          ],
          [
            76.625286,
            33.112735
          ],
          [
            76.637879,
            33.123741
          ],
          [
            76.639147,
            33.144393
          ],
          [
            76.651817,
            33.155333
          ],
          [
            76.664352,
            33.166388
          ],
          [
            76.688053,
            33.167932
          ],
          [
            76.699973,
            33.179511
          ],
          [
            76.711436,
            33.19148
          ],
          [
            76.710949,
            33.213627
          ],
          [
            76.721302,
            33.226541
          ],
          [
            76.731057,
            33.239964
          ],
          [
            76.740225,
            33.253888
          ],
          [
            76.748845,
            33.268277
          ],
          [
            76.756987,
            33.283075
          ],
          [
            76.76474,
            33.298203
          ],
          [
            76.772216,
            33.313568
          ],
          [
            76.779533,
            33.329068
          ],
          [
            76.786817,
            33.344596
          ],
          [
            76.794189,
            33.360049
          ],
          [
            76.801761,
            33.375332
          ],
          [
            76.809624,
            33.390366
          ],
          [
            76.817851,
            33.405091
          ],
          [
            76.826486,
            33.419469
          ],
          [
            76.835543,
            33.433486
          ],
          [
            76.845009,
            33.447156
          ],
          [
            76.854841,
            33.460513
          ],
          [
            76.864972,
            33.473616
          ],
          [
            76.875314,
            33.486539
          ],
          [
            76.885766,
            33.499369
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "corridor_id": "RELOC-CORR-HAB-015",
        "habitation_id": "HAB-015",
        "habitation_name": "Bilaspur Valley Sector",
        "priority_tier": "Medium-Term (Strategic)",
        "population": 2403,
        "destination_site_id": "SAFE-SITE-087",
        "destination_cci": 93.8,
        "destination_capacity_families": 2187,
        "road_name": "OSM Relocation Corridor: Bilaspur Valley Sector \u2192 SAFE-SITE-087",
        "osm_highway_class": "secondary",
        "road_distance_km": 84.15,
        "euclidean_distance_km": 82.92,
        "detour_ratio": 1.01,
        "estimated_transit_mins": 180,
        "convoy_speed_kmh": 28.0,
        "hazard_avoidance_status": "100% Hazard-Bypassed (Zero Red Zone Overlap)",
        "waypoints_count": 51,
        "color": "#0284C7",
        "clearance_status": "CAUTION",
        "coordinates_leaflet": [
          [
            30.685802,
            76.2273
          ],
          [
            30.688704,
            76.244642
          ],
          [
            30.691755,
            76.261909
          ],
          [
            30.695092,
            76.27903
          ],
          [
            30.698838,
            76.295943
          ],
          [
            30.703092,
            76.312597
          ],
          [
            30.707921,
            76.328957
          ],
          [
            30.713362,
            76.345006
          ],
          [
            30.719415,
            76.360743
          ],
          [
            30.726045,
            76.376186
          ],
          [
            30.733188,
            76.391368
          ],
          [
            30.740749,
            76.406337
          ],
          [
            30.748615,
            76.42115
          ],
          [
            30.756659,
            76.435872
          ],
          [
            30.764748,
            76.450572
          ],
          [
            30.772756,
            76.465313
          ],
          [
            30.780566,
            76.480154
          ],
          [
            30.788082,
            76.495146
          ],
          [
            30.795236,
            76.510322
          ],
          [
            30.801988,
            76.525703
          ],
          [
            30.808334,
            76.54129
          ],
          [
            30.814304,
            76.55707
          ],
          [
            30.819959,
            76.57301
          ],
          [
            30.82539,
            76.589064
          ],
          [
            30.830711,
            76.605174
          ],
          [
            30.836052,
            76.621274
          ],
          [
            30.841551,
            76.637293
          ],
          [
            30.847346,
            76.653161
          ],
          [
            30.853565,
            76.668814
          ],
          [
            30.860319,
            76.684194
          ],
          [
            30.867694,
            76.699257
          ],
          [
            30.875747,
            76.713975
          ],
          [
            30.8845,
            76.728337
          ],
          [
            30.89394,
            76.742347
          ],
          [
            30.904021,
            76.756032
          ],
          [
            30.914662,
            76.769431
          ],
          [
            30.925758,
            76.782599
          ],
          [
            30.937179,
            76.7956
          ],
          [
            30.948785,
            76.808508
          ],
          [
            30.960429,
            76.821396
          ],
          [
            30.971971,
            76.834336
          ],
          [
            30.98328,
            76.847395
          ],
          [
            30.994246,
            76.860628
          ],
          [
            31.004788,
            76.874078
          ],
          [
            31.014852,
            76.887771
          ],
          [
            31.024421,
            76.901716
          ],
          [
            31.033513,
            76.915905
          ],
          [
            31.042175,
            76.930312
          ],
          [
            31.050488,
            76.944898
          ],
          [
            31.058554,
            76.959609
          ],
          [
            31.066491,
            76.974386
          ]
        ]
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            76.2273,
            30.685802
          ],
          [
            76.244642,
            30.688704
          ],
          [
            76.261909,
            30.691755
          ],
          [
            76.27903,
            30.695092
          ],
          [
            76.295943,
            30.698838
          ],
          [
            76.312597,
            30.703092
          ],
          [
            76.328957,
            30.707921
          ],
          [
            76.345006,
            30.713362
          ],
          [
            76.360743,
            30.719415
          ],
          [
            76.376186,
            30.726045
          ],
          [
            76.391368,
            30.733188
          ],
          [
            76.406337,
            30.740749
          ],
          [
            76.42115,
            30.748615
          ],
          [
            76.435872,
            30.756659
          ],
          [
            76.450572,
            30.764748
          ],
          [
            76.465313,
            30.772756
          ],
          [
            76.480154,
            30.780566
          ],
          [
            76.495146,
            30.788082
          ],
          [
            76.510322,
            30.795236
          ],
          [
            76.525703,
            30.801988
          ],
          [
            76.54129,
            30.808334
          ],
          [
            76.55707,
            30.814304
          ],
          [
            76.57301,
            30.819959
          ],
          [
            76.589064,
            30.82539
          ],
          [
            76.605174,
            30.830711
          ],
          [
            76.621274,
            30.836052
          ],
          [
            76.637293,
            30.841551
          ],
          [
            76.653161,
            30.847346
          ],
          [
            76.668814,
            30.853565
          ],
          [
            76.684194,
            30.860319
          ],
          [
            76.699257,
            30.867694
          ],
          [
            76.713975,
            30.875747
          ],
          [
            76.728337,
            30.8845
          ],
          [
            76.742347,
            30.89394
          ],
          [
            76.756032,
            30.904021
          ],
          [
            76.769431,
            30.914662
          ],
          [
            76.782599,
            30.925758
          ],
          [
            76.7956,
            30.937179
          ],
          [
            76.808508,
            30.948785
          ],
          [
            76.821396,
            30.960429
          ],
          [
            76.834336,
            30.971971
          ],
          [
            76.847395,
            30.98328
          ],
          [
            76.860628,
            30.994246
          ],
          [
            76.874078,
            31.004788
          ],
          [
            76.887771,
            31.014852
          ],
          [
            76.901716,
            31.024421
          ],
          [
            76.915905,
            31.033513
          ],
          [
            76.930312,
            31.042175
          ],
          [
            76.944898,
            31.050488
          ],
          [
            76.959609,
            31.058554
          ],
          [
            76.974386,
            31.066491
          ]
        ]
      }
    }
  ]
};

export const DEFAULT_POPULATION_DISTRIBUTION: GeoJSONFeatureCollection = {
  "type": "FeatureCollection",
  "name": "Population_Distribution_Overlay",
  "total_cells": 97,
  "total_grid_population": 91555,
  "sparse_data_cells_count": 36,
  "dasymetric_model_active": true,
  "features": [
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-001",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.435924
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.422847,
              30.501994
            ],
            [
              79.449002,
              30.501994
            ],
            [
              79.449002,
              30.524516
            ],
            [
              79.422847,
              30.524516
            ],
            [
              79.422847,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-002",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.435924
        ],
        "population": 593,
        "density_per_sqkm": 94.9,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 71,
          "children": 94,
          "differently_abled": 20,
          "livestock": 166
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.422847,
              30.524516
            ],
            [
              79.449002,
              30.524516
            ],
            [
              79.449002,
              30.547039
            ],
            [
              79.422847,
              30.547039
            ],
            [
              79.422847,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-003",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.435924
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.422847,
              30.547039
            ],
            [
              79.449002,
              30.547039
            ],
            [
              79.449002,
              30.569561
            ],
            [
              79.422847,
              30.569561
            ],
            [
              79.422847,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-004",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.435924
        ],
        "population": 594,
        "density_per_sqkm": 95.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 71,
          "children": 95,
          "differently_abled": 20,
          "livestock": 166
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.422847,
              30.569561
            ],
            [
              79.449002,
              30.569561
            ],
            [
              79.449002,
              30.592084
            ],
            [
              79.422847,
              30.592084
            ],
            [
              79.422847,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-005",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.435924
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.422847,
              30.592084
            ],
            [
              79.449002,
              30.592084
            ],
            [
              79.449002,
              30.614606
            ],
            [
              79.422847,
              30.614606
            ],
            [
              79.422847,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-006",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.462079
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.449002,
              30.479471
            ],
            [
              79.475157,
              30.479471
            ],
            [
              79.475157,
              30.501994
            ],
            [
              79.449002,
              30.501994
            ],
            [
              79.449002,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-007",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.462079
        ],
        "population": 940,
        "density_per_sqkm": 150.4,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 112,
          "children": 150,
          "differently_abled": 32,
          "livestock": 263
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.449002,
              30.501994
            ],
            [
              79.475157,
              30.501994
            ],
            [
              79.475157,
              30.524516
            ],
            [
              79.449002,
              30.524516
            ],
            [
              79.449002,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-008",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.462079
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.449002,
              30.524516
            ],
            [
              79.475157,
              30.524516
            ],
            [
              79.475157,
              30.547039
            ],
            [
              79.449002,
              30.547039
            ],
            [
              79.449002,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-009",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.462079
        ],
        "population": 1175,
        "density_per_sqkm": 188.0,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 141,
          "children": 188,
          "differently_abled": 41,
          "livestock": 329
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.449002,
              30.547039
            ],
            [
              79.475157,
              30.547039
            ],
            [
              79.475157,
              30.569561
            ],
            [
              79.449002,
              30.569561
            ],
            [
              79.449002,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-010",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.462079
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.449002,
              30.569561
            ],
            [
              79.475157,
              30.569561
            ],
            [
              79.475157,
              30.592084
            ],
            [
              79.449002,
              30.592084
            ],
            [
              79.449002,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-011",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.462079
        ],
        "population": 941,
        "density_per_sqkm": 150.6,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 112,
          "children": 150,
          "differently_abled": 32,
          "livestock": 263
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.449002,
              30.592084
            ],
            [
              79.475157,
              30.592084
            ],
            [
              79.475157,
              30.614606
            ],
            [
              79.449002,
              30.614606
            ],
            [
              79.449002,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-012",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.462079
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.449002,
              30.614606
            ],
            [
              79.475157,
              30.614606
            ],
            [
              79.475157,
              30.637129
            ],
            [
              79.449002,
              30.637129
            ],
            [
              79.449002,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-013",
        "district_id": "chamoli-uk",
        "center": [
          30.46821,
          79.488235
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.456949
            ],
            [
              79.501312,
              30.456949
            ],
            [
              79.501312,
              30.479471
            ],
            [
              79.475157,
              30.479471
            ],
            [
              79.475157,
              30.456949
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-014",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.488235
        ],
        "population": 762,
        "density_per_sqkm": 121.9,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 91,
          "children": 121,
          "differently_abled": 26,
          "livestock": 213
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.479471
            ],
            [
              79.501312,
              30.479471
            ],
            [
              79.501312,
              30.501994
            ],
            [
              79.475157,
              30.501994
            ],
            [
              79.475157,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-015",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.488235
        ],
        "population": 43,
        "density_per_sqkm": 6.9,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 5,
          "children": 6,
          "differently_abled": 1,
          "livestock": 12
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.501994
            ],
            [
              79.501312,
              30.501994
            ],
            [
              79.501312,
              30.524516
            ],
            [
              79.475157,
              30.524516
            ],
            [
              79.475157,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-016",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.488235
        ],
        "population": 1243,
        "density_per_sqkm": 198.9,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 149,
          "children": 198,
          "differently_abled": 43,
          "livestock": 348
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.524516
            ],
            [
              79.501312,
              30.524516
            ],
            [
              79.501312,
              30.547039
            ],
            [
              79.475157,
              30.547039
            ],
            [
              79.475157,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-017",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.488235
        ],
        "population": 1332,
        "density_per_sqkm": 213.1,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 159,
          "children": 213,
          "differently_abled": 46,
          "livestock": 372
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.547039
            ],
            [
              79.501312,
              30.547039
            ],
            [
              79.501312,
              30.569561
            ],
            [
              79.475157,
              30.569561
            ],
            [
              79.475157,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-018",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.488235
        ],
        "population": 1243,
        "density_per_sqkm": 198.9,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 149,
          "children": 198,
          "differently_abled": 43,
          "livestock": 348
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.569561
            ],
            [
              79.501312,
              30.569561
            ],
            [
              79.501312,
              30.592084
            ],
            [
              79.475157,
              30.592084
            ],
            [
              79.475157,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-019",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.488235
        ],
        "population": 43,
        "density_per_sqkm": 6.9,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 5,
          "children": 6,
          "differently_abled": 1,
          "livestock": 12
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.592084
            ],
            [
              79.501312,
              30.592084
            ],
            [
              79.501312,
              30.614606
            ],
            [
              79.475157,
              30.614606
            ],
            [
              79.475157,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-020",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.488235
        ],
        "population": 763,
        "density_per_sqkm": 122.1,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 91,
          "children": 122,
          "differently_abled": 26,
          "livestock": 213
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.614606
            ],
            [
              79.501312,
              30.614606
            ],
            [
              79.501312,
              30.637129
            ],
            [
              79.475157,
              30.637129
            ],
            [
              79.475157,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-021",
        "district_id": "chamoli-uk",
        "center": [
          30.64839,
          79.488235
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.475157,
              30.637129
            ],
            [
              79.501312,
              30.637129
            ],
            [
              79.501312,
              30.659651
            ],
            [
              79.475157,
              30.659651
            ],
            [
              79.475157,
              30.637129
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-022",
        "district_id": "chamoli-uk",
        "center": [
          30.445687,
          79.51439
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.434426
            ],
            [
              79.527467,
              30.434426
            ],
            [
              79.527467,
              30.456949
            ],
            [
              79.501312,
              30.456949
            ],
            [
              79.501312,
              30.434426
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-023",
        "district_id": "chamoli-uk",
        "center": [
          30.46821,
          79.51439
        ],
        "population": 513,
        "density_per_sqkm": 82.1,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 61,
          "children": 82,
          "differently_abled": 17,
          "livestock": 143
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.456949
            ],
            [
              79.527467,
              30.456949
            ],
            [
              79.527467,
              30.479471
            ],
            [
              79.501312,
              30.479471
            ],
            [
              79.501312,
              30.456949
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-024",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.51439
        ],
        "population": 48,
        "density_per_sqkm": 7.7,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 5,
          "children": 7,
          "differently_abled": 1,
          "livestock": 13
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.479471
            ],
            [
              79.527467,
              30.479471
            ],
            [
              79.527467,
              30.501994
            ],
            [
              79.501312,
              30.501994
            ],
            [
              79.501312,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-025",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.51439
        ],
        "population": 1074,
        "density_per_sqkm": 171.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 128,
          "children": 171,
          "differently_abled": 37,
          "livestock": 300
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.501994
            ],
            [
              79.527467,
              30.501994
            ],
            [
              79.527467,
              30.524516
            ],
            [
              79.501312,
              30.524516
            ],
            [
              79.501312,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-026",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.51439
        ],
        "population": 1364,
        "density_per_sqkm": 218.2,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 163,
          "children": 218,
          "differently_abled": 47,
          "livestock": 381
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.524516
            ],
            [
              79.527467,
              30.524516
            ],
            [
              79.527467,
              30.547039
            ],
            [
              79.501312,
              30.547039
            ],
            [
              79.501312,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-027",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.51439
        ],
        "population": 1494,
        "density_per_sqkm": 239.0,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 179,
          "children": 239,
          "differently_abled": 52,
          "livestock": 418
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.547039
            ],
            [
              79.527467,
              30.547039
            ],
            [
              79.527467,
              30.569561
            ],
            [
              79.501312,
              30.569561
            ],
            [
              79.501312,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-028",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.51439
        ],
        "population": 1365,
        "density_per_sqkm": 218.4,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 163,
          "children": 218,
          "differently_abled": 47,
          "livestock": 382
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.569561
            ],
            [
              79.527467,
              30.569561
            ],
            [
              79.527467,
              30.592084
            ],
            [
              79.501312,
              30.592084
            ],
            [
              79.501312,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-029",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.51439
        ],
        "population": 1075,
        "density_per_sqkm": 172.0,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 129,
          "children": 172,
          "differently_abled": 37,
          "livestock": 301
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.592084
            ],
            [
              79.527467,
              30.592084
            ],
            [
              79.527467,
              30.614606
            ],
            [
              79.501312,
              30.614606
            ],
            [
              79.501312,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-030",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.51439
        ],
        "population": 48,
        "density_per_sqkm": 7.7,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 5,
          "children": 7,
          "differently_abled": 1,
          "livestock": 13
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.614606
            ],
            [
              79.527467,
              30.614606
            ],
            [
              79.527467,
              30.637129
            ],
            [
              79.501312,
              30.637129
            ],
            [
              79.501312,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-031",
        "district_id": "chamoli-uk",
        "center": [
          30.64839,
          79.51439
        ],
        "population": 513,
        "density_per_sqkm": 82.1,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 61,
          "children": 82,
          "differently_abled": 17,
          "livestock": 143
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.637129
            ],
            [
              79.527467,
              30.637129
            ],
            [
              79.527467,
              30.659651
            ],
            [
              79.501312,
              30.659651
            ],
            [
              79.501312,
              30.637129
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-032",
        "district_id": "chamoli-uk",
        "center": [
          30.670913,
          79.51439
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.501312,
              30.659651
            ],
            [
              79.527467,
              30.659651
            ],
            [
              79.527467,
              30.682174
            ],
            [
              79.501312,
              30.682174
            ],
            [
              79.501312,
              30.659651
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-033",
        "district_id": "chamoli-uk",
        "center": [
          30.445687,
          79.540545
        ],
        "population": 549,
        "density_per_sqkm": 87.8,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 65,
          "children": 87,
          "differently_abled": 19,
          "livestock": 153
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.434426
            ],
            [
              79.553622,
              30.434426
            ],
            [
              79.553622,
              30.456949
            ],
            [
              79.527467,
              30.456949
            ],
            [
              79.527467,
              30.434426
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-034",
        "district_id": "chamoli-uk",
        "center": [
          30.46821,
          79.540545
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.456949
            ],
            [
              79.553622,
              30.456949
            ],
            [
              79.553622,
              30.479471
            ],
            [
              79.527467,
              30.479471
            ],
            [
              79.527467,
              30.456949
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-035",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.540545
        ],
        "population": 1355,
        "density_per_sqkm": 216.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 162,
          "children": 216,
          "differently_abled": 47,
          "livestock": 379
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.479471
            ],
            [
              79.553622,
              30.479471
            ],
            [
              79.553622,
              30.501994
            ],
            [
              79.527467,
              30.501994
            ],
            [
              79.527467,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-036",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.540545
        ],
        "population": 1982,
        "density_per_sqkm": 317.1,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 237,
          "children": 317,
          "differently_abled": 69,
          "livestock": 554
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.501994
            ],
            [
              79.553622,
              30.501994
            ],
            [
              79.553622,
              30.524516
            ],
            [
              79.527467,
              30.524516
            ],
            [
              79.527467,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-037",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.540545
        ],
        "population": 2676,
        "density_per_sqkm": 428.2,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 321,
          "children": 428,
          "differently_abled": 93,
          "livestock": 749
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.524516
            ],
            [
              79.553622,
              30.524516
            ],
            [
              79.553622,
              30.547039
            ],
            [
              79.527467,
              30.547039
            ],
            [
              79.527467,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-038",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.540545
        ],
        "population": 3059,
        "density_per_sqkm": 489.4,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 367,
          "children": 489,
          "differently_abled": 107,
          "livestock": 856
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.547039
            ],
            [
              79.553622,
              30.547039
            ],
            [
              79.553622,
              30.569561
            ],
            [
              79.527467,
              30.569561
            ],
            [
              79.527467,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-039",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.540545
        ],
        "population": 2676,
        "density_per_sqkm": 428.2,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 321,
          "children": 428,
          "differently_abled": 93,
          "livestock": 749
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.569561
            ],
            [
              79.553622,
              30.569561
            ],
            [
              79.553622,
              30.592084
            ],
            [
              79.527467,
              30.592084
            ],
            [
              79.527467,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-040",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.540545
        ],
        "population": 1983,
        "density_per_sqkm": 317.3,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 237,
          "children": 317,
          "differently_abled": 69,
          "livestock": 555
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.592084
            ],
            [
              79.553622,
              30.592084
            ],
            [
              79.553622,
              30.614606
            ],
            [
              79.527467,
              30.614606
            ],
            [
              79.527467,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-041",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.540545
        ],
        "population": 1355,
        "density_per_sqkm": 216.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 162,
          "children": 216,
          "differently_abled": 47,
          "livestock": 379
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.614606
            ],
            [
              79.553622,
              30.614606
            ],
            [
              79.553622,
              30.637129
            ],
            [
              79.527467,
              30.637129
            ],
            [
              79.527467,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-042",
        "district_id": "chamoli-uk",
        "center": [
          30.64839,
          79.540545
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.637129
            ],
            [
              79.553622,
              30.637129
            ],
            [
              79.553622,
              30.659651
            ],
            [
              79.527467,
              30.659651
            ],
            [
              79.527467,
              30.637129
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-043",
        "district_id": "chamoli-uk",
        "center": [
          30.670913,
          79.540545
        ],
        "population": 549,
        "density_per_sqkm": 87.8,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 65,
          "children": 87,
          "differently_abled": 19,
          "livestock": 153
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.527467,
              30.659651
            ],
            [
              79.553622,
              30.659651
            ],
            [
              79.553622,
              30.682174
            ],
            [
              79.527467,
              30.682174
            ],
            [
              79.527467,
              30.659651
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-044",
        "district_id": "chamoli-uk",
        "center": [
          30.445687,
          79.5667
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.434426
            ],
            [
              79.579778,
              30.434426
            ],
            [
              79.579778,
              30.456949
            ],
            [
              79.553622,
              30.456949
            ],
            [
              79.553622,
              30.434426
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-045",
        "district_id": "chamoli-uk",
        "center": [
          30.46821,
          79.5667
        ],
        "population": 1186,
        "density_per_sqkm": 189.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 142,
          "children": 189,
          "differently_abled": 41,
          "livestock": 332
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.456949
            ],
            [
              79.579778,
              30.456949
            ],
            [
              79.579778,
              30.479471
            ],
            [
              79.553622,
              30.479471
            ],
            [
              79.553622,
              30.456949
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-046",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.5667
        ],
        "population": 1849,
        "density_per_sqkm": 295.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 221,
          "children": 295,
          "differently_abled": 64,
          "livestock": 517
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.479471
            ],
            [
              79.579778,
              30.479471
            ],
            [
              79.579778,
              30.501994
            ],
            [
              79.553622,
              30.501994
            ],
            [
              79.553622,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-047",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.5667
        ],
        "population": 2762,
        "density_per_sqkm": 441.9,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 331,
          "children": 441,
          "differently_abled": 96,
          "livestock": 773
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.501994
            ],
            [
              79.579778,
              30.501994
            ],
            [
              79.579778,
              30.524516
            ],
            [
              79.553622,
              30.524516
            ],
            [
              79.553622,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-048",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.5667
        ],
        "population": 3894,
        "density_per_sqkm": 623.0,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 467,
          "children": 623,
          "differently_abled": 136,
          "livestock": 1090
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.524516
            ],
            [
              79.579778,
              30.524516
            ],
            [
              79.579778,
              30.547039
            ],
            [
              79.553622,
              30.547039
            ],
            [
              79.553622,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-049",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.5667
        ],
        "population": 4925,
        "density_per_sqkm": 788.0,
        "area_sqkm": 6.25,
        "density_tier": "VERY_HIGH",
        "density_label": "Dense Valley Habitation",
        "color": "#EA580C",
        "demographics": {
          "elderly": 591,
          "children": 788,
          "differently_abled": 172,
          "livestock": 1379
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "CRITICAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.547039
            ],
            [
              79.579778,
              30.547039
            ],
            [
              79.579778,
              30.569561
            ],
            [
              79.553622,
              30.569561
            ],
            [
              79.553622,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-050",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.5667
        ],
        "population": 3894,
        "density_per_sqkm": 623.0,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 467,
          "children": 623,
          "differently_abled": 136,
          "livestock": 1090
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.569561
            ],
            [
              79.579778,
              30.569561
            ],
            [
              79.579778,
              30.592084
            ],
            [
              79.553622,
              30.592084
            ],
            [
              79.553622,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-051",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.5667
        ],
        "population": 2762,
        "density_per_sqkm": 441.9,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 331,
          "children": 441,
          "differently_abled": 96,
          "livestock": 773
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.592084
            ],
            [
              79.579778,
              30.592084
            ],
            [
              79.579778,
              30.614606
            ],
            [
              79.553622,
              30.614606
            ],
            [
              79.553622,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-052",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.5667
        ],
        "population": 1849,
        "density_per_sqkm": 295.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 221,
          "children": 295,
          "differently_abled": 64,
          "livestock": 517
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.614606
            ],
            [
              79.579778,
              30.614606
            ],
            [
              79.579778,
              30.637129
            ],
            [
              79.553622,
              30.637129
            ],
            [
              79.553622,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-053",
        "district_id": "chamoli-uk",
        "center": [
          30.64839,
          79.5667
        ],
        "population": 1186,
        "density_per_sqkm": 189.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 142,
          "children": 189,
          "differently_abled": 41,
          "livestock": 332
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.637129
            ],
            [
              79.579778,
              30.637129
            ],
            [
              79.579778,
              30.659651
            ],
            [
              79.553622,
              30.659651
            ],
            [
              79.553622,
              30.637129
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-054",
        "district_id": "chamoli-uk",
        "center": [
          30.670913,
          79.5667
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.553622,
              30.659651
            ],
            [
              79.579778,
              30.659651
            ],
            [
              79.579778,
              30.682174
            ],
            [
              79.553622,
              30.682174
            ],
            [
              79.553622,
              30.659651
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-055",
        "district_id": "chamoli-uk",
        "center": [
          30.445687,
          79.592855
        ],
        "population": 549,
        "density_per_sqkm": 87.8,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 65,
          "children": 87,
          "differently_abled": 19,
          "livestock": 153
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.434426
            ],
            [
              79.605933,
              30.434426
            ],
            [
              79.605933,
              30.456949
            ],
            [
              79.579778,
              30.456949
            ],
            [
              79.579778,
              30.434426
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-056",
        "district_id": "chamoli-uk",
        "center": [
          30.46821,
          79.592855
        ],
        "population": 33,
        "density_per_sqkm": 5.3,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 3,
          "children": 5,
          "differently_abled": 1,
          "livestock": 9
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.456949
            ],
            [
              79.605933,
              30.456949
            ],
            [
              79.605933,
              30.479471
            ],
            [
              79.579778,
              30.479471
            ],
            [
              79.579778,
              30.456949
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-057",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.592855
        ],
        "population": 1355,
        "density_per_sqkm": 216.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 162,
          "children": 216,
          "differently_abled": 47,
          "livestock": 379
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.479471
            ],
            [
              79.605933,
              30.479471
            ],
            [
              79.605933,
              30.501994
            ],
            [
              79.579778,
              30.501994
            ],
            [
              79.579778,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-058",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.592855
        ],
        "population": 1982,
        "density_per_sqkm": 317.1,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 237,
          "children": 317,
          "differently_abled": 69,
          "livestock": 554
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.501994
            ],
            [
              79.605933,
              30.501994
            ],
            [
              79.605933,
              30.524516
            ],
            [
              79.579778,
              30.524516
            ],
            [
              79.579778,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-059",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.592855
        ],
        "population": 2676,
        "density_per_sqkm": 428.2,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 321,
          "children": 428,
          "differently_abled": 93,
          "livestock": 749
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.524516
            ],
            [
              79.605933,
              30.524516
            ],
            [
              79.605933,
              30.547039
            ],
            [
              79.579778,
              30.547039
            ],
            [
              79.579778,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-060",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.592855
        ],
        "population": 3059,
        "density_per_sqkm": 489.4,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 367,
          "children": 489,
          "differently_abled": 107,
          "livestock": 856
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.547039
            ],
            [
              79.605933,
              30.547039
            ],
            [
              79.605933,
              30.569561
            ],
            [
              79.579778,
              30.569561
            ],
            [
              79.579778,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-061",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.592855
        ],
        "population": 2676,
        "density_per_sqkm": 428.2,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 321,
          "children": 428,
          "differently_abled": 93,
          "livestock": 749
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.569561
            ],
            [
              79.605933,
              30.569561
            ],
            [
              79.605933,
              30.592084
            ],
            [
              79.579778,
              30.592084
            ],
            [
              79.579778,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-062",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.592855
        ],
        "population": 1983,
        "density_per_sqkm": 317.3,
        "area_sqkm": 6.25,
        "density_tier": "HIGH",
        "density_label": "Moderate-High Density Basti",
        "color": "#F59E0B",
        "demographics": {
          "elderly": 237,
          "children": 317,
          "differently_abled": 69,
          "livestock": 555
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "HIGH"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.592084
            ],
            [
              79.605933,
              30.592084
            ],
            [
              79.605933,
              30.614606
            ],
            [
              79.579778,
              30.614606
            ],
            [
              79.579778,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-063",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.592855
        ],
        "population": 1355,
        "density_per_sqkm": 216.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 162,
          "children": 216,
          "differently_abled": 47,
          "livestock": 379
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.614606
            ],
            [
              79.605933,
              30.614606
            ],
            [
              79.605933,
              30.637129
            ],
            [
              79.579778,
              30.637129
            ],
            [
              79.579778,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-064",
        "district_id": "chamoli-uk",
        "center": [
          30.64839,
          79.592855
        ],
        "population": 33,
        "density_per_sqkm": 5.3,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 3,
          "children": 5,
          "differently_abled": 1,
          "livestock": 9
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.637129
            ],
            [
              79.605933,
              30.637129
            ],
            [
              79.605933,
              30.659651
            ],
            [
              79.579778,
              30.659651
            ],
            [
              79.579778,
              30.637129
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-065",
        "district_id": "chamoli-uk",
        "center": [
          30.670913,
          79.592855
        ],
        "population": 549,
        "density_per_sqkm": 87.8,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 65,
          "children": 87,
          "differently_abled": 19,
          "livestock": 153
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.579778,
              30.659651
            ],
            [
              79.605933,
              30.659651
            ],
            [
              79.605933,
              30.682174
            ],
            [
              79.579778,
              30.682174
            ],
            [
              79.579778,
              30.659651
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-066",
        "district_id": "chamoli-uk",
        "center": [
          30.445687,
          79.61901
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.434426
            ],
            [
              79.632088,
              30.434426
            ],
            [
              79.632088,
              30.456949
            ],
            [
              79.605933,
              30.456949
            ],
            [
              79.605933,
              30.434426
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-067",
        "district_id": "chamoli-uk",
        "center": [
          30.46821,
          79.61901
        ],
        "population": 513,
        "density_per_sqkm": 82.1,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 61,
          "children": 82,
          "differently_abled": 17,
          "livestock": 143
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.456949
            ],
            [
              79.632088,
              30.456949
            ],
            [
              79.632088,
              30.479471
            ],
            [
              79.605933,
              30.479471
            ],
            [
              79.605933,
              30.456949
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-068",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.61901
        ],
        "population": 33,
        "density_per_sqkm": 5.3,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 3,
          "children": 5,
          "differently_abled": 1,
          "livestock": 9
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.479471
            ],
            [
              79.632088,
              30.479471
            ],
            [
              79.632088,
              30.501994
            ],
            [
              79.605933,
              30.501994
            ],
            [
              79.605933,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-069",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.61901
        ],
        "population": 1074,
        "density_per_sqkm": 171.8,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 128,
          "children": 171,
          "differently_abled": 37,
          "livestock": 300
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.501994
            ],
            [
              79.632088,
              30.501994
            ],
            [
              79.632088,
              30.524516
            ],
            [
              79.605933,
              30.524516
            ],
            [
              79.605933,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-070",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.61901
        ],
        "population": 1364,
        "density_per_sqkm": 218.2,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 163,
          "children": 218,
          "differently_abled": 47,
          "livestock": 381
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.524516
            ],
            [
              79.632088,
              30.524516
            ],
            [
              79.632088,
              30.547039
            ],
            [
              79.605933,
              30.547039
            ],
            [
              79.605933,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-071",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.61901
        ],
        "population": 1494,
        "density_per_sqkm": 239.0,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 179,
          "children": 239,
          "differently_abled": 52,
          "livestock": 418
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.547039
            ],
            [
              79.632088,
              30.547039
            ],
            [
              79.632088,
              30.569561
            ],
            [
              79.605933,
              30.569561
            ],
            [
              79.605933,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-072",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.61901
        ],
        "population": 1365,
        "density_per_sqkm": 218.4,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 163,
          "children": 218,
          "differently_abled": 47,
          "livestock": 382
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.569561
            ],
            [
              79.632088,
              30.569561
            ],
            [
              79.632088,
              30.592084
            ],
            [
              79.605933,
              30.592084
            ],
            [
              79.605933,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-073",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.61901
        ],
        "population": 1075,
        "density_per_sqkm": 172.0,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 129,
          "children": 172,
          "differently_abled": 37,
          "livestock": 301
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.592084
            ],
            [
              79.632088,
              30.592084
            ],
            [
              79.632088,
              30.614606
            ],
            [
              79.605933,
              30.614606
            ],
            [
              79.605933,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-074",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.61901
        ],
        "population": 33,
        "density_per_sqkm": 5.3,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 3,
          "children": 5,
          "differently_abled": 1,
          "livestock": 9
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.614606
            ],
            [
              79.632088,
              30.614606
            ],
            [
              79.632088,
              30.637129
            ],
            [
              79.605933,
              30.637129
            ],
            [
              79.605933,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-075",
        "district_id": "chamoli-uk",
        "center": [
          30.64839,
          79.61901
        ],
        "population": 513,
        "density_per_sqkm": 82.1,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 61,
          "children": 82,
          "differently_abled": 17,
          "livestock": 143
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.637129
            ],
            [
              79.632088,
              30.637129
            ],
            [
              79.632088,
              30.659651
            ],
            [
              79.605933,
              30.659651
            ],
            [
              79.605933,
              30.637129
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-076",
        "district_id": "chamoli-uk",
        "center": [
          30.670913,
          79.61901
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.605933,
              30.659651
            ],
            [
              79.632088,
              30.659651
            ],
            [
              79.632088,
              30.682174
            ],
            [
              79.605933,
              30.682174
            ],
            [
              79.605933,
              30.659651
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-077",
        "district_id": "chamoli-uk",
        "center": [
          30.46821,
          79.645165
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.456949
            ],
            [
              79.658243,
              30.456949
            ],
            [
              79.658243,
              30.479471
            ],
            [
              79.632088,
              30.479471
            ],
            [
              79.632088,
              30.456949
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-078",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.645165
        ],
        "population": 762,
        "density_per_sqkm": 121.9,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 91,
          "children": 121,
          "differently_abled": 26,
          "livestock": 213
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.479471
            ],
            [
              79.658243,
              30.479471
            ],
            [
              79.658243,
              30.501994
            ],
            [
              79.632088,
              30.501994
            ],
            [
              79.632088,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-079",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.645165
        ],
        "population": 38,
        "density_per_sqkm": 6.1,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 4,
          "children": 6,
          "differently_abled": 1,
          "livestock": 10
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.501994
            ],
            [
              79.658243,
              30.501994
            ],
            [
              79.658243,
              30.524516
            ],
            [
              79.632088,
              30.524516
            ],
            [
              79.632088,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-080",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.645165
        ],
        "population": 1243,
        "density_per_sqkm": 198.9,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 149,
          "children": 198,
          "differently_abled": 43,
          "livestock": 348
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.524516
            ],
            [
              79.658243,
              30.524516
            ],
            [
              79.658243,
              30.547039
            ],
            [
              79.632088,
              30.547039
            ],
            [
              79.632088,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-081",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.645165
        ],
        "population": 1332,
        "density_per_sqkm": 213.1,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 159,
          "children": 213,
          "differently_abled": 46,
          "livestock": 372
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.547039
            ],
            [
              79.658243,
              30.547039
            ],
            [
              79.658243,
              30.569561
            ],
            [
              79.632088,
              30.569561
            ],
            [
              79.632088,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-082",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.645165
        ],
        "population": 1243,
        "density_per_sqkm": 198.9,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 149,
          "children": 198,
          "differently_abled": 43,
          "livestock": 348
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.569561
            ],
            [
              79.658243,
              30.569561
            ],
            [
              79.658243,
              30.592084
            ],
            [
              79.632088,
              30.592084
            ],
            [
              79.632088,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-083",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.645165
        ],
        "population": 38,
        "density_per_sqkm": 6.1,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 4,
          "children": 6,
          "differently_abled": 1,
          "livestock": 10
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.592084
            ],
            [
              79.658243,
              30.592084
            ],
            [
              79.658243,
              30.614606
            ],
            [
              79.632088,
              30.614606
            ],
            [
              79.632088,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-084",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.645165
        ],
        "population": 763,
        "density_per_sqkm": 122.1,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 91,
          "children": 122,
          "differently_abled": 26,
          "livestock": 213
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.614606
            ],
            [
              79.658243,
              30.614606
            ],
            [
              79.658243,
              30.637129
            ],
            [
              79.632088,
              30.637129
            ],
            [
              79.632088,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-085",
        "district_id": "chamoli-uk",
        "center": [
          30.64839,
          79.645165
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.632088,
              30.637129
            ],
            [
              79.658243,
              30.637129
            ],
            [
              79.658243,
              30.659651
            ],
            [
              79.632088,
              30.659651
            ],
            [
              79.632088,
              30.637129
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-086",
        "district_id": "chamoli-uk",
        "center": [
          30.490732,
          79.671321
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.658243,
              30.479471
            ],
            [
              79.684398,
              30.479471
            ],
            [
              79.684398,
              30.501994
            ],
            [
              79.658243,
              30.501994
            ],
            [
              79.658243,
              30.479471
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-087",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.671321
        ],
        "population": 940,
        "density_per_sqkm": 150.4,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 112,
          "children": 150,
          "differently_abled": 32,
          "livestock": 263
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.658243,
              30.501994
            ],
            [
              79.684398,
              30.501994
            ],
            [
              79.684398,
              30.524516
            ],
            [
              79.658243,
              30.524516
            ],
            [
              79.658243,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-088",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.671321
        ],
        "population": 33,
        "density_per_sqkm": 5.3,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 3,
          "children": 5,
          "differently_abled": 1,
          "livestock": 9
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.658243,
              30.524516
            ],
            [
              79.684398,
              30.524516
            ],
            [
              79.684398,
              30.547039
            ],
            [
              79.658243,
              30.547039
            ],
            [
              79.658243,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-089",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.671321
        ],
        "population": 1175,
        "density_per_sqkm": 188.0,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 141,
          "children": 188,
          "differently_abled": 41,
          "livestock": 329
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.658243,
              30.547039
            ],
            [
              79.684398,
              30.547039
            ],
            [
              79.684398,
              30.569561
            ],
            [
              79.658243,
              30.569561
            ],
            [
              79.658243,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-090",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.671321
        ],
        "population": 33,
        "density_per_sqkm": 5.3,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 3,
          "children": 5,
          "differently_abled": 1,
          "livestock": 9
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.658243,
              30.569561
            ],
            [
              79.684398,
              30.569561
            ],
            [
              79.684398,
              30.592084
            ],
            [
              79.658243,
              30.592084
            ],
            [
              79.658243,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-091",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.671321
        ],
        "population": 941,
        "density_per_sqkm": 150.6,
        "area_sqkm": 6.25,
        "density_tier": "MODERATE",
        "density_label": "Agricultural Terrace Cluster",
        "color": "#0284C7",
        "demographics": {
          "elderly": 112,
          "children": 150,
          "differently_abled": 32,
          "livestock": 263
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.658243,
              30.592084
            ],
            [
              79.684398,
              30.592084
            ],
            [
              79.684398,
              30.614606
            ],
            [
              79.658243,
              30.614606
            ],
            [
              79.658243,
              30.592084
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-092",
        "district_id": "chamoli-uk",
        "center": [
          30.625868,
          79.671321
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.658243,
              30.614606
            ],
            [
              79.684398,
              30.614606
            ],
            [
              79.684398,
              30.637129
            ],
            [
              79.658243,
              30.637129
            ],
            [
              79.658243,
              30.614606
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-093",
        "district_id": "chamoli-uk",
        "center": [
          30.513255,
          79.697476
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.684398,
              30.501994
            ],
            [
              79.710553,
              30.501994
            ],
            [
              79.710553,
              30.524516
            ],
            [
              79.684398,
              30.524516
            ],
            [
              79.684398,
              30.501994
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-094",
        "district_id": "chamoli-uk",
        "center": [
          30.535777,
          79.697476
        ],
        "population": 593,
        "density_per_sqkm": 94.9,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 71,
          "children": 94,
          "differently_abled": 20,
          "livestock": 166
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.684398,
              30.524516
            ],
            [
              79.710553,
              30.524516
            ],
            [
              79.710553,
              30.547039
            ],
            [
              79.684398,
              30.547039
            ],
            [
              79.684398,
              30.524516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-095",
        "district_id": "chamoli-uk",
        "center": [
          30.5583,
          79.697476
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.684398,
              30.547039
            ],
            [
              79.710553,
              30.547039
            ],
            [
              79.710553,
              30.569561
            ],
            [
              79.684398,
              30.569561
            ],
            [
              79.684398,
              30.547039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-096",
        "district_id": "chamoli-uk",
        "center": [
          30.580823,
          79.697476
        ],
        "population": 594,
        "density_per_sqkm": 95.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 71,
          "children": 95,
          "differently_abled": 20,
          "livestock": 166
        },
        "data_source": "HIGH_RES_GRIDDED",
        "is_estimated": false,
        "confidence_score": 0.96,
        "data_provenance_note": "Verified High-Resolution Gridded Population Dataset (Census 2024 / ISRO Bhuvan Grid).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.684398,
              30.569561
            ],
            [
              79.710553,
              30.569561
            ],
            [
              79.710553,
              30.592084
            ],
            [
              79.684398,
              30.592084
            ],
            [
              79.684398,
              30.569561
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "cell_id": "POP-CELL-chamoli-uk-097",
        "district_id": "chamoli-uk",
        "center": [
          30.603345,
          79.697476
        ],
        "population": 19,
        "density_per_sqkm": 3.0,
        "area_sqkm": 6.25,
        "density_tier": "LOW",
        "density_label": "Sparse Ridge Settlement",
        "color": "#10B981",
        "demographics": {
          "elderly": 2,
          "children": 3,
          "differently_abled": 0,
          "livestock": 5
        },
        "data_source": "DASYMETRIC_ESTIMATION",
        "is_estimated": true,
        "confidence_score": 0.78,
        "data_provenance_note": "Direct sensor telemetry sparse in this sector. Population modeled from OSM residential footprints and habitable valley slope (<15\u00b0).",
        "evacuation_priority": "NORMAL"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              79.684398,
              30.592084
            ],
            [
              79.710553,
              30.592084
            ],
            [
              79.710553,
              30.614606
            ],
            [
              79.684398,
              30.614606
            ],
            [
              79.684398,
              30.592084
            ]
          ]
        ]
      }
    }
  ]
};

export const DEFAULT_ACTIVE_ALERTS: IncidentAlert[] = [
  {
    "id": "ALT-2026-001",
    "timestamp": "10:45 IST (15m ago)",
    "districtId": "chamoli-uk",
    "districtName": "Chamoli (Joshimath Sector)",
    "state": "Uttarakhand",
    "severity": "CRITICAL",
    "category": "GEOLOGICAL",
    "title": "Landslide & InSAR Subsidence Alert // Chamoli (Joshimath Sector)",
    "message": "Real-time sensors detect severe hazard conditions. Live rainfall 142.5 mm/24h. AI model recommends mandatory relocation of 6,844 citizens.",
    "sourceAgency": "ISRO InSAR / GSI Hazard Division",
    "coordinates": [
      30.5583,
      79.5667
    ],
    "affectedPopulation": 6844,
    "acknowledged": false,
    "actionRequired": true
  },
  {
    "id": "ALT-2026-002",
    "timestamp": "10:45 IST (15m ago)",
    "districtId": "wayanad-kl",
    "districtName": "Wayanad (Meppadi-Chooralmala)",
    "state": "Kerala",
    "severity": "CRITICAL",
    "category": "HYDROLOGICAL",
    "title": "Debris Flow & Torrential Runoff Alert // Wayanad (Meppadi-Chooralmala)",
    "message": "Real-time sensors detect severe hazard conditions. Live rainfall 210.0 mm/24h. AI model recommends mandatory relocation of 12,200 citizens.",
    "sourceAgency": "IMD Doppler Radar / CWC",
    "coordinates": [
      11.6854,
      76.132
    ],
    "affectedPopulation": 12200,
    "acknowledged": false,
    "actionRequired": true
  },
  {
    "id": "ALT-2026-003",
    "timestamp": "10:45 IST (15m ago)",
    "districtId": "mandi-hp",
    "districtName": "Mandi (Beas River Valley)",
    "state": "Himachal Pradesh",
    "severity": "HIGH",
    "category": "HYDROLOGICAL",
    "title": "Riverine Surge & Flash Flooding Alert // Mandi (Beas River Valley)",
    "message": "Real-time sensors detect severe hazard conditions. Live rainfall 115.0 mm/24h. AI model recommends mandatory relocation of 4,123 citizens.",
    "sourceAgency": "IMD Doppler Radar / CWC",
    "coordinates": [
      31.5892,
      76.9182
    ],
    "affectedPopulation": 4123,
    "acknowledged": false,
    "actionRequired": true
  },
  {
    "id": "ALT-2026-006",
    "timestamp": "10:45 IST (15m ago)",
    "districtId": "uttarkashi-uk",
    "districtName": "Uttarkashi & Bhagirathi Valley",
    "state": "Uttarakhand",
    "severity": "HIGH",
    "category": "GEOLOGICAL",
    "title": "Glacial Lake Outburst & Landslide Alert // Uttarkashi & Bhagirathi Valley",
    "message": "Real-time sensors detect severe hazard conditions. Live rainfall 105.0 mm/24h. AI model recommends mandatory relocation of 4,681 citizens.",
    "sourceAgency": "ISRO InSAR / GSI Hazard Division",
    "coordinates": [
      30.7268,
      78.4354
    ],
    "affectedPopulation": 4681,
    "acknowledged": false,
    "actionRequired": true
  }
];

export const DEFAULT_DATA_SOURCES: DataSourceTelemetry[] = [
  {
    "id": "isro-insar",
    "name": "ISRO Cartosat-3 InSAR Radar Array",
    "agency": "Indian Space Research Organisation (ISRO)",
    "type": "SATELLITE_INSAR",
    "status": "ONLINE",
    "latencyMs": 32,
    "updateFrequency": "Every 12 Days (Orbit) / Daily Downlink",
    "lastSync": "2026-08-30T10:45:00Z",
    "coverage": "Pan-Himalayan & Western Ghats Grid",
    "resolution": "0.5m Spatial / Sub-mm Deformation Velocity",
    "recordsIngestedToday": 142800,
    "confidenceScore": 99.4,
    "protocol": "GovNet Secure REST / WMS Vector"
  },
  {
    "id": "copernicus-s1",
    "name": "Copernicus Sentinel-1 SAR Cloud-Penetrating Radar",
    "agency": "European Space Agency (ESA CDSE)",
    "type": "SATELLITE_INSAR",
    "status": "ONLINE",
    "latencyMs": 48,
    "updateFrequency": "6-12 Days Constellation",
    "lastSync": "2026-08-30T10:30:00Z",
    "coverage": "Global / National Territory",
    "resolution": "10m C-Band Synthetic Aperture Radar",
    "recordsIngestedToday": 89400,
    "confidenceScore": 98.7,
    "protocol": "OData REST API / STAC Item Collection"
  },
  {
    "id": "copernicus-s2",
    "name": "Copernicus Sentinel-2 Multi-Spectral Optical (LULC & NDVI)",
    "agency": "European Space Agency (ESA CDSE)",
    "type": "SATELLITE_OPTICAL",
    "status": "ONLINE",
    "latencyMs": 52,
    "updateFrequency": "5 Days Constellation",
    "lastSync": "2026-08-30T10:15:00Z",
    "coverage": "National Surface Coverage",
    "resolution": "10m Optical (B4, B8, B11 Multi-Spectral)",
    "recordsIngestedToday": 112000,
    "confidenceScore": 99.1,
    "protocol": "WCS / GeoTIFF Pipeline"
  },
  {
    "id": "imd-doppler",
    "name": "IMD 34-Doppler Weather Radar Grid",
    "agency": "India Meteorological Department (IMD)",
    "type": "DOPPLER_RADAR",
    "status": "ONLINE",
    "latencyMs": 14,
    "updateFrequency": "Real-time (10-minute sweep)",
    "lastSync": "2026-08-30T10:55:00Z",
    "coverage": "All India Coastal & Hill Stations",
    "resolution": "250m Radar Range Cell / 0.1 mm/h Rain Rate",
    "recordsIngestedToday": 348000,
    "confidenceScore": 99.8,
    "protocol": "MQTT Real-time Stream / GeoJSON API"
  },
  {
    "id": "cwc-hydro",
    "name": "CWC 338 River Hydrological Telemetry Network",
    "agency": "Central Water Commission (CWC)",
    "type": "HYDRO_GAUGE",
    "status": "ONLINE",
    "latencyMs": 18,
    "updateFrequency": "Hourly Acoustic Gauge Telemetry",
    "lastSync": "2026-08-30T10:50:00Z",
    "coverage": "All Major Indian River Basins",
    "resolution": "Millimeter Water Level / Cusec Discharge",
    "recordsIngestedToday": 76500,
    "confidenceScore": 99.5,
    "protocol": "HydroTel REST API"
  },
  {
    "id": "osm-vectors",
    "name": "OpenStreetMap Overpass Infrastructure Engine",
    "agency": "OpenStreetMap Foundation / Geofabrik",
    "type": "DEM_TERRAIN",
    "status": "ONLINE",
    "latencyMs": 28,
    "updateFrequency": "On-Demand Vector Query / Daily Mirror",
    "lastSync": "2026-08-30T10:40:00Z",
    "coverage": "National Transport & Building Footprints",
    "resolution": "Sub-meter Vector Polygons & Road Graphs",
    "recordsIngestedToday": 542000,
    "confidenceScore": 97.9,
    "protocol": "Overpass QL / GeoJSON Interpreter"
  },
  {
    "id": "cartodem-srtm",
    "name": "CartoDEM & SRTM 30m Geomorphometry Model",
    "agency": "ISRO National Remote Sensing Centre (NRSC)",
    "type": "DEM_TERRAIN",
    "status": "ONLINE",
    "latencyMs": 10,
    "updateFrequency": "Static High-Precision Geoid / Topo Update",
    "lastSync": "2026-08-30T09:00:00Z",
    "coverage": "Indian Landmass High-Resolution Mesh",
    "resolution": "30m Spatial / 1-Degree Slope Derivatives",
    "recordsIngestedToday": 14349161,
    "confidenceScore": 99.9,
    "protocol": "GDAL Raster IO / PyTorch Tensor Buffer"
  },
  {
    "id": "pytorch-engine",
    "name": "PyTorch INT8 Quantized Susceptibility Neural Network",
    "agency": "RESITE-GIS AI Decision Support Division",
    "type": "AI_MODEL",
    "status": "ONLINE",
    "latencyMs": 6,
    "updateFrequency": "Sub-millisecond Tensor Inference",
    "lastSync": "2026-08-30T10:58:00Z",
    "coverage": "12-Factor Environmental Embedding Vector",
    "resolution": "ROC-AUC 0.99997 / F1-Score 0.9980",
    "recordsIngestedToday": 128500,
    "confidenceScore": 99.8,
    "protocol": "In-Memory Quantized PyTorch Engine"
  }
];
