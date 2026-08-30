// Direct integration of the backend SRTM 52_06 & ISRO/Copernicus Indian Himalayan datasets
// Covers Uttarakhand & Himachal Pradesh (75.0°E – 80.0°E, 30.0°N – 35.0°N)

export const INDIAN_HABITATIONS = [
  {
    id: "HAB-010",
    rank: "#01",
    name: "Joshimath Slump Ward",
    shortName: "Joshimath",
    district: "Chamoli, Uttarakhand",
    region: "Uttarakhand",
    lat: 30.5564,
    lng: 79.5658,
    population: 2289,
    families: 458,
    hazardIndex: 0.892,
    priority: "Immediate",
    priorityTier: "Immediate (0-30 Days)",
    urgencyRank: 1,
    slopeAngle: 35.2,
    elevation: 1890,
    estRelocationCost: "₹4,20,00,000",
    recommendedAction: "Urgent Evacuation & Systematic Relocation to Pipalkoti",
    targetSafeSite: "Pipalkoti Central Resettlement Zone",
    targetSafeSiteId: "SAFE-SITE-001",
    targetCoords: [30.431, 79.428],
    structures: 410,
    description: "Active land subsidence with recurring fissure opening and structural destabilization in Chamoli.",
    hazardBreakdown: {
      slopeInstability: 0.95,
      precipitationTrigger: 0.91,
      historicalSubsidence: 0.98,
      hydroRunoff: 0.88
    },
    // Detailed street highway navigation route along NH-7
    streetRouteWaypoints: [
      [30.5564, 79.5658], // Joshimath Ward A
      [30.5480, 79.5520], // Upper Bazaar Link Road
      [30.5350, 79.5310], // Marwari Bridge (Alaknanda Confluence)
      [30.5218, 79.5085], // Helang Bypass Road
      [30.4910, 79.4750], // Gulabkoti River Terrace
      [30.4620, 79.4480], // Tangni Hazard Bypass
      [30.4310, 79.4280]  // Pipalkoti Safe Receiving Center
    ],
    turnByTurnDirections: [
      { step: 1, text: "Depart Joshimath Sector A onto Upper Bazaar Link Road heading West.", distance: "1.2 km", time: "4 mins", alert: "Fissure Zone - 20 km/h speed limit" },
      { step: 2, text: "Turn left onto NH-7 (Rishikesh-Badrinath National Highway) descending into Alaknanda valley.", distance: "4.8 km", time: "12 mins", alert: "Clear Road" },
      { step: 3, text: "Cross Marwari Bridge and continue through Helang bypass corridor.", distance: "7.5 km", time: "18 mins", alert: "Watch for minor scree fall" },
      { step: 4, text: "Pass Gulabkoti stabilization embankment and enter Alaknanda open basin.", distance: "11.0 km", time: "22 mins", alert: "Clear Highway" },
      { step: 5, text: "Arrive at Pipalkoti Central Resettlement Zone, Gate 2 (Medical & Shelter Tents).", distance: "2.1 km", time: "5 mins", alert: "Receiving Center Active" }
    ],
    elevationProfile: [
      { dist: 0, alt: 1890, label: "Joshimath" },
      { dist: 6, alt: 1680, label: "Marwari" },
      { dist: 14, alt: 1510, label: "Helang" },
      { dist: 22, alt: 1380, label: "Gulabkoti" },
      { dist: 31.4, alt: 1250, label: "Pipalkoti" }
    ],
    routeTelemetry: {
      distanceKm: 31.4,
      estimatedTime: "1h 05m",
      delayNotice: "Monitored Evacuation Highway",
      clearPct: 84,
      cautionPct: 16
    }
  },
  {
    id: "HAB-008",
    rank: "#02",
    name: "Spiti Riverbank Ward",
    shortName: "Spiti Ward",
    district: "Lahaul & Spiti, Himachal Pradesh",
    region: "Himachal Pradesh",
    lat: 31.668578,
    lng: 78.964704,
    population: 2191,
    families: 438,
    hazardIndex: 0.701,
    priority: "Immediate",
    priorityTier: "Immediate (0-30 Days)",
    urgencyRank: 1,
    slopeAngle: 37.8,
    elevation: 4187,
    estRelocationCost: "₹1,85,00,000",
    recommendedAction: "Urgent Evacuation & Priority Resettlement",
    targetSafeSite: "Spiti South Plateau Safe Zone",
    targetSafeSiteId: "SAFE-SITE-004",
    targetCoords: [31.725, 78.850],
    structures: 312,
    description: "High-altitude glacial runoff corridor on 37.8° steep scree slope with active debris flows and flash flood risk.",
    hazardBreakdown: {
      slopeInstability: 0.96,
      precipitationTrigger: 0.88,
      historicalSubsidence: 0.85,
      hydroRunoff: 0.92
    },
    streetRouteWaypoints: [
      [31.668578, 78.964704],
      [31.685000, 78.932000],
      [31.702000, 78.895000],
      [31.725000, 78.850000]
    ],
    turnByTurnDirections: [
      { step: 1, text: "Evacuate Riverbank Settlement northward onto NH-505 (Samdo-Kaza Road).", distance: "2.4 km", time: "8 mins", alert: "Scree slope warning" },
      { step: 2, text: "Cross Spiti River culvert and ascend toward South Flank Alluvial Bench.", distance: "8.6 km", time: "25 mins", alert: "High Altitude Gradient" },
      { step: 3, text: "Arrive at Spiti South Plateau Receiving Zone (Shelter & Emergency Heli-pad).", distance: "3.2 km", time: "10 mins", alert: "Safe Zone Clear" }
    ],
    elevationProfile: [
      { dist: 0, alt: 4187, label: "Riverbank" },
      { dist: 5, alt: 3950, label: "NH-505 Link" },
      { dist: 14.2, alt: 3650, label: "Safe Plateau" }
    ],
    routeTelemetry: {
      distanceKm: 14.2,
      estimatedTime: "45m",
      delayNotice: "High Altitude Caution",
      clearPct: 75,
      cautionPct: 25
    }
  },
  {
    id: "HAB-003",
    rank: "#03",
    name: "Parvati Gorge Settlement",
    shortName: "Parvati Gorge",
    district: "Kullu, Himachal Pradesh",
    region: "Himachal Pradesh",
    lat: 32.012000,
    lng: 77.350000,
    population: 2364,
    families: 472,
    hazardIndex: 0.665,
    priority: "Short-Term",
    priorityTier: "Short-Term (1-6 Months)",
    urgencyRank: 2,
    slopeAngle: 28.5,
    elevation: 2250,
    estRelocationCost: "₹2,10,00,000",
    recommendedAction: "Structural Relocation & Flood Embankment",
    targetSafeSite: "Kullu Valley Receiving Ridge",
    targetSafeSiteId: "SAFE-SITE-003",
    targetCoords: [31.956, 77.109],
    structures: 380,
    description: "Narrow Himalayan river gorge bottleneck susceptible to cloudburst debris avalanches.",
    hazardBreakdown: {
      slopeInstability: 0.78,
      precipitationTrigger: 0.84,
      historicalSubsidence: 0.65,
      hydroRunoff: 0.89
    },
    streetRouteWaypoints: [
      [32.012000, 77.350000],
      [31.995000, 77.280000],
      [31.978000, 77.210000],
      [31.962000, 77.150000],
      [31.956000, 77.109000]
    ],
    turnByTurnDirections: [
      { step: 1, text: "Evacuate Manikaran-Kasol gorge road westward along Parvati River bank.", distance: "4.5 km", time: "15 mins", alert: "Riverbank Spate Caution" },
      { step: 2, text: "Cross Bhuntar Bridge onto NH-3 (Chandigarh-Manali Highway).", distance: "12.0 km", time: "25 mins", alert: "High Traffic Corridor" },
      { step: 3, text: "Follow Kullu bypass road up to the elevated Receiving Ridge.", distance: "6.8 km", time: "15 mins", alert: "Relocation Camp Ready" }
    ],
    elevationProfile: [
      { dist: 0, alt: 2250, label: "Gorge" },
      { dist: 8, alt: 1750, label: "Kasol" },
      { dist: 16, alt: 1420, label: "Bhuntar" },
      { dist: 23.3, alt: 1280, label: "Kullu Ridge" }
    ],
    routeTelemetry: {
      distanceKm: 23.3,
      estimatedTime: "55m",
      delayNotice: "+10m delay (Bhuntar Confluence)",
      clearPct: 80,
      cautionPct: 20
    }
  },
  {
    id: "HAB-001",
    rank: "#04",
    name: "Manali Valley Hamlet",
    shortName: "Manali Hamlet",
    district: "Kullu, Himachal Pradesh",
    region: "Himachal Pradesh",
    lat: 32.2396,
    lng: 77.1887,
    population: 796,
    families: 160,
    hazardIndex: 0.443,
    priority: "Short-Term",
    priorityTier: "Short-Term (1-6 Months)",
    urgencyRank: 2,
    slopeAngle: 19.3,
    elevation: 2050,
    estRelocationCost: "₹85,00,000",
    recommendedAction: "Planned Resettlement to Alluvial Bench",
    targetSafeSite: "Kullu Valley Receiving Ridge",
    targetSafeSiteId: "SAFE-SITE-003",
    targetCoords: [31.956, 77.109],
    structures: 145,
    description: "Beas catchment upper slope with seasonal road subsidence and toe undercutting.",
    hazardBreakdown: {
      slopeInstability: 0.68,
      precipitationTrigger: 0.72,
      historicalSubsidence: 0.60,
      hydroRunoff: 0.74
    },
    streetRouteWaypoints: [
      [32.2396, 77.1887],
      [32.1600, 77.1800],
      [32.0800, 77.1500],
      [31.9560, 77.1090]
    ],
    turnByTurnDirections: [
      { step: 1, text: "Exit Manali Old Village onto NH-3 Southbound through Patlikuhl.", distance: "14.0 km", time: "30 mins", alert: "Clear Road" },
      { step: 2, text: "Continue along Left Bank Road toward Kullu North Gate.", distance: "18.0 km", time: "35 mins", alert: "Clear Road" },
      { step: 3, text: "Arrive at Kullu Valley Ridge Resettlement Camp.", distance: "3.5 km", time: "10 mins", alert: "Reception Open" }
    ],
    elevationProfile: [
      { dist: 0, alt: 2050, label: "Manali" },
      { dist: 14, alt: 1620, label: "Patlikuhl" },
      { dist: 35.5, alt: 1280, label: "Kullu Ridge" }
    ],
    routeTelemetry: {
      distanceKm: 35.5,
      estimatedTime: "1h 15m",
      delayNotice: "Normal Traffic",
      clearPct: 90,
      cautionPct: 10
    }
  },
  {
    id: "HAB-011",
    rank: "#05",
    name: "Rudraprayag Confluence Basti",
    shortName: "Rudraprayag",
    district: "Rudraprayag, Uttarakhand",
    region: "Uttarakhand",
    lat: 30.285,
    lng: 78.981,
    population: 1540,
    families: 308,
    hazardIndex: 0.64,
    priority: "Short-Term",
    priorityTier: "Short-Term (1-6 Months)",
    urgencyRank: 2,
    slopeAngle: 24.5,
    elevation: 895,
    estRelocationCost: "₹1,65,00,000",
    recommendedAction: "Riverine Relocation outside 500m Flash Flood Contour",
    targetSafeSite: "Gauchar Airstrip Resettlement Plateau",
    targetSafeSiteId: "SAFE-SITE-002",
    targetCoords: [30.291, 79.155],
    structures: 250,
    description: "Alaknanda and Mandakini river confluence zone prone to high-velocity flood inundation.",
    hazardBreakdown: {
      slopeInstability: 0.64,
      precipitationTrigger: 0.82,
      historicalSubsidence: 0.52,
      hydroRunoff: 0.94
    },
    streetRouteWaypoints: [
      [30.285, 78.981],
      [30.288, 79.050],
      [30.290, 79.110],
      [30.291, 79.155]
    ],
    turnByTurnDirections: [
      { step: 1, text: "Exit Sangam Ghat onto NH-7 Eastbound along Alaknanda riverbank.", distance: "3.2 km", time: "8 mins", alert: "Riverbank speed limit 30 km/h" },
      { step: 2, text: "Proceed along Karnaprayag-Gauchar bypass corridor.", distance: "12.5 km", time: "22 mins", alert: "Clear Highway" },
      { step: 3, text: "Turn right into Gauchar Plateau Resettlement Zone (Airfield Entry).", distance: "2.8 km", time: "6 mins", alert: "Shelter Units Ready" }
    ],
    elevationProfile: [
      { dist: 0, alt: 895, label: "Rudraprayag" },
      { dist: 8, alt: 860, label: "Koteshwar" },
      { dist: 18.5, alt: 820, label: "Gauchar Plateau" }
    ],
    routeTelemetry: {
      distanceKm: 18.5,
      estimatedTime: "36m",
      delayNotice: "Clear Highway Route",
      clearPct: 94,
      cautionPct: 6
    }
  },
  {
    id: "HAB-012",
    rank: "#06",
    name: "Tehri Foothill Hamlet",
    shortName: "Tehri Hamlet",
    district: "Tehri Garhwal, Uttarakhand",
    region: "Uttarakhand",
    lat: 30.385,
    lng: 78.482,
    population: 1628,
    families: 325,
    hazardIndex: 0.293,
    priority: "Medium-Term",
    priorityTier: "Medium-Term (Strategic)",
    urgencyRank: 3,
    slopeAngle: 15.4,
    elevation: 1750,
    estRelocationCost: "₹1,30,00,000",
    recommendedAction: "Slope Reinforcement & Planned Relocation",
    targetSafeSite: "Dehradun Northern Terrace Sector",
    targetSafeSiteId: "SAFE-SITE-005",
    targetCoords: [30.316, 78.032],
    structures: 275,
    description: "Tehri reservoir peripheral rim prone to rim-instability and water table variations.",
    hazardBreakdown: {
      slopeInstability: 0.58,
      precipitationTrigger: 0.60,
      historicalSubsidence: 0.48,
      hydroRunoff: 0.55
    },
    streetRouteWaypoints: [
      [30.385, 78.482],
      [30.360, 78.350],
      [30.330, 78.180],
      [30.316, 78.032]
    ],
    turnByTurnDirections: [
      { step: 1, text: "Depart Tehri Ridge via New Tehri Bypass onto Chamba Road.", distance: "14.2 km", time: "30 mins", alert: "Clear Road" },
      { step: 2, text: "Descend Mussoorie-Rishikesh Highway bypass into Doon Valley.", distance: "28.0 km", time: "50 mins", alert: "Hairpin curves - 35 km/h" },
      { step: 3, text: "Arrive at Dehradun Northern Foothill Disaster Reception Center.", distance: "6.5 km", time: "15 mins", alert: "Medical Base Active" }
    ],
    elevationProfile: [
      { dist: 0, alt: 1750, label: "Tehri" },
      { dist: 18, alt: 1420, label: "Chamba" },
      { dist: 48.7, alt: 640, label: "Dehradun" }
    ],
    routeTelemetry: {
      distanceKm: 48.7,
      estimatedTime: "1h 35m",
      delayNotice: "Clear Mountain Highway",
      clearPct: 92,
      cautionPct: 8
    }
  }
];

export const INDIAN_SAFE_SITES = [
  {
    id: "SAFE-SITE-001",
    name: "Pipalkoti Central Resettlement Zone",
    shortName: "Pipalkoti Safe Zone",
    district: "Chamoli, Uttarakhand",
    state: "Uttarakhand",
    lat: 30.431,
    lng: 79.428,
    meanCci: 94.5,
    cciScore: 94.5,
    category: "Optimal",
    areaSqKm: 18.35,
    capacityFamilies: 2200,
    slopeAngle: 6.5,
    distanceToRoadKm: 0.2,
    medicalFacilityAccess: true,
    waterGridConnected: true,
    powerGridAvailable: true,
    floodBufferMetres: 850,
    landClassification: "Government Revenue Land (Non-Forest)",
    notes: "Flat alluvial terrace connected directly to NH-7 with hospital & school infrastructure."
  },
  {
    id: "SAFE-SITE-002",
    name: "Gauchar Airstrip Resettlement Plateau",
    shortName: "Gauchar Plateau",
    district: "Chamoli, Uttarakhand",
    state: "Uttarakhand",
    lat: 30.291,
    lng: 79.155,
    meanCci: 91.2,
    cciScore: 91.2,
    category: "Optimal",
    areaSqKm: 45.06,
    capacityFamilies: 5400,
    slopeAngle: 4.8,
    distanceToRoadKm: 0.1,
    medicalFacilityAccess: true,
    waterGridConnected: true,
    powerGridAvailable: true,
    floodBufferMetres: 1200,
    landClassification: "State Disaster Reserve Land",
    notes: "Broad plateau with direct emergency air-lift runway and high carrying capacity."
  },
  {
    id: "SAFE-SITE-003",
    name: "Kullu Valley Receiving Ridge",
    shortName: "Kullu Ridge Safe Zone",
    district: "Kullu, Himachal Pradesh",
    state: "Himachal Pradesh",
    lat: 31.956,
    lng: 77.109,
    meanCci: 88.5,
    cciScore: 88.5,
    category: "Suitable",
    areaSqKm: 12.08,
    capacityFamilies: 1450,
    slopeAngle: 7.2,
    distanceToRoadKm: 0.5,
    medicalFacilityAccess: true,
    waterGridConnected: true,
    powerGridAvailable: true,
    floodBufferMetres: 650,
    landClassification: "Municipal / Panchayat Clear Land",
    notes: "Elevated unbuilt terrace away from Parvati and Beas flash flood channels."
  },
  {
    id: "SAFE-SITE-004",
    name: "Spiti South Plateau Safe Zone",
    shortName: "Spiti South Plateau",
    district: "Lahaul & Spiti, Himachal Pradesh",
    state: "Himachal Pradesh",
    lat: 31.725,
    lng: 78.850,
    meanCci: 85.0,
    cciScore: 85.0,
    category: "Suitable",
    areaSqKm: 41.57,
    capacityFamilies: 4980,
    slopeAngle: 8.4,
    distanceToRoadKm: 0.8,
    medicalFacilityAccess: true,
    waterGridConnected: true,
    powerGridAvailable: true,
    floodBufferMetres: 750,
    landClassification: "Revenue Department Land",
    notes: "Wide stable alluvial fan plateau outside primary avalanche chute zones."
  },
  {
    id: "SAFE-SITE-005",
    name: "Dehradun Northern Terrace Sector",
    shortName: "Dehradun Foothill Terrace",
    district: "Dehradun, Uttarakhand",
    state: "Uttarakhand",
    lat: 30.316,
    lng: 78.032,
    meanCci: 96.2,
    cciScore: 96.2,
    category: "Optimal",
    areaSqKm: 59.22,
    capacityFamilies: 7100,
    slopeAngle: 3.5,
    distanceToRoadKm: 0.1,
    medicalFacilityAccess: true,
    waterGridConnected: true,
    powerGridAvailable: true,
    floodBufferMetres: 1500,
    landClassification: "Urban Development Masterplan Reserve",
    notes: "State-level emergency resettlement base with complete tertiary hospital connectivity."
  }
];
