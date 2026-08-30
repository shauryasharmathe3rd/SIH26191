export const HABITATIONS_DATA = [
  {
    id: "HAB-42",
    rank: "#01",
    name: "Joshimath Sector A",
    shortName: "Joshimath",
    district: "Chamoli, Uttarakhand",
    lat: 30.5564,
    lng: 79.5658,
    population: 4250,
    families: 24,
    hazardIndex: 0.92,
    priority: "Immediate",
    slopeAngle: 35,
    elevation: 1890,
    estRelocationCost: "$142,000",
    targetSafeSite: "Site Alpha",
    targetSafeSiteId: "SITE-01",
    targetCoords: [30.484, 79.432],
    structures: 142,
    description: "Located on a steep Himalayan slope with high seismic vulnerability. Immediate risk of subsidence and flash floods following heavy precipitation.",
    hazardBreakdown: {
      slopeInstability: 0.95,
      precipitationTrigger: 0.90,
      historicalSubsidence: 0.88,
      hydroRunoff: 0.94
    },
    elevationProfile: [
      { dist: 0, alt: 2400 },
      { dist: 8, alt: 2250 },
      { dist: 16, alt: 1980 },
      { dist: 24, alt: 1650 },
      { dist: 32, alt: 1350 },
      { dist: 42.8, alt: 1100 }
    ],
    routeTelemetry: {
      distanceKm: 42.8,
      estimatedTime: "1h 45m",
      delayNotice: "+15m delay (Debris)",
      clearPct: 68,
      cautionPct: 32
    }
  },
  {
    id: "HAB-19",
    rank: "#02",
    name: "Raini Village",
    shortName: "Raini",
    district: "Chamoli, Uttarakhand",
    lat: 30.4842,
    lng: 79.7341,
    population: 1820,
    families: 84,
    hazardIndex: 0.85,
    priority: "Short-Term",
    slopeAngle: 31,
    elevation: 2150,
    estRelocationCost: "$96,500",
    targetSafeSite: "Pipalkoti Safe Zone",
    targetSafeSiteId: "SITE-02",
    targetCoords: [30.431, 79.428],
    structures: 84,
    description: "Rishi Ganga gorge bottleneck prone to glacial lake outburst and catastrophic debris surge.",
    hazardBreakdown: {
      slopeInstability: 0.86,
      precipitationTrigger: 0.84,
      historicalSubsidence: 0.79,
      hydroRunoff: 0.91
    },
    elevationProfile: [
      { dist: 0, alt: 2150 },
      { dist: 6, alt: 1950 },
      { dist: 14, alt: 1720 },
      { dist: 22, alt: 1540 },
      { dist: 30, alt: 1380 },
      { dist: 36.4, alt: 1250 }
    ],
    routeTelemetry: {
      distanceKm: 36.4,
      estimatedTime: "1h 20m",
      delayNotice: "Clear Route",
      clearPct: 85,
      cautionPct: 15
    }
  },
  {
    id: "HAB-31",
    rank: "#03",
    name: "Tapovan Barrage Sector",
    shortName: "Tapovan",
    district: "Chamoli, Uttarakhand",
    lat: 30.4952,
    lng: 79.6248,
    population: 890,
    families: 42,
    hazardIndex: 0.78,
    priority: "Short-Term",
    slopeAngle: 28,
    elevation: 1920,
    estRelocationCost: "$68,000",
    targetSafeSite: "Gauchar Plateau Site",
    targetSafeSiteId: "SITE-03",
    targetCoords: [30.291, 79.155],
    structures: 52,
    description: "Downstream hydro project periphery susceptible to flash flood surge and mudflow deposition.",
    hazardBreakdown: {
      slopeInstability: 0.72,
      precipitationTrigger: 0.82,
      historicalSubsidence: 0.75,
      hydroRunoff: 0.85
    },
    elevationProfile: [
      { dist: 0, alt: 1920 },
      { dist: 10, alt: 1700 },
      { dist: 20, alt: 1450 },
      { dist: 35, alt: 1120 },
      { dist: 50, alt: 880 }
    ],
    routeTelemetry: {
      distanceKm: 52.1,
      estimatedTime: "2h 10m",
      delayNotice: "+25m delay (Roadworks)",
      clearPct: 55,
      cautionPct: 45
    }
  },
  {
    id: "HAB-08",
    rank: "#04",
    name: "Vishnugad Periphery",
    shortName: "Vishnugad",
    district: "Chamoli, Uttarakhand",
    lat: 30.5401,
    lng: 79.5209,
    population: 5100,
    families: 110,
    hazardIndex: 0.62,
    priority: "Medium-Term",
    slopeAngle: 22,
    elevation: 1460,
    estRelocationCost: "$210,000",
    targetSafeSite: "Chamoli South Ridge",
    targetSafeSiteId: "SITE-04",
    targetCoords: [30.405, 79.335],
    structures: 195,
    description: "Moderate slope toe-erosion with river cutbank aggression during high monsoon discharges.",
    hazardBreakdown: {
      slopeInstability: 0.58,
      precipitationTrigger: 0.65,
      historicalSubsidence: 0.54,
      hydroRunoff: 0.70
    },
    elevationProfile: [
      { dist: 0, alt: 1460 },
      { dist: 5, alt: 1380 },
      { dist: 12, alt: 1240 },
      { dist: 18, alt: 1150 },
      { dist: 25, alt: 1020 }
    ],
    routeTelemetry: {
      distanceKm: 25.3,
      estimatedTime: "55m",
      delayNotice: "Normal Traffic",
      clearPct: 92,
      cautionPct: 8
    }
  },
  {
    id: "HAB-14",
    rank: "#05",
    name: "Helang Valley Slopes",
    shortName: "Helang",
    district: "Chamoli, Uttarakhand",
    lat: 30.5218,
    lng: 79.5085,
    population: 1350,
    families: 38,
    hazardIndex: 0.58,
    priority: "Medium-Term",
    slopeAngle: 24,
    elevation: 1520,
    estRelocationCost: "$84,000",
    targetSafeSite: "Pipalkoti Safe Zone",
    targetSafeSiteId: "SITE-02",
    targetCoords: [30.431, 79.428],
    structures: 64,
    description: "Active road cut widening zone experiencing recurring rockfalls during continuous rains.",
    hazardBreakdown: {
      slopeInstability: 0.60,
      precipitationTrigger: 0.55,
      historicalSubsidence: 0.48,
      hydroRunoff: 0.62
    },
    elevationProfile: [
      { dist: 0, alt: 1520 },
      { dist: 4, alt: 1430 },
      { dist: 10, alt: 1320 },
      { dist: 16, alt: 1250 }
    ],
    routeTelemetry: {
      distanceKm: 16.2,
      estimatedTime: "38m",
      delayNotice: "Clear Route",
      clearPct: 90,
      cautionPct: 10
    }
  },
  {
    id: "HAB-27",
    rank: "#06",
    name: "Pandukeshwar Settlement",
    shortName: "Pandukeshwar",
    district: "Chamoli, Uttarakhand",
    lat: 30.6387,
    lng: 79.5492,
    population: 2900,
    families: 76,
    hazardIndex: 0.51,
    priority: "Medium-Term",
    slopeAngle: 21,
    elevation: 1820,
    estRelocationCost: "$175,000",
    targetSafeSite: "Site Alpha",
    targetSafeSiteId: "SITE-01",
    targetCoords: [30.484, 79.432],
    structures: 128,
    description: "Alaknanda alluvial fan terrace with seasonal debris deposition in monsoon peak.",
    hazardBreakdown: {
      slopeInstability: 0.49,
      precipitationTrigger: 0.54,
      historicalSubsidence: 0.45,
      hydroRunoff: 0.58
    },
    elevationProfile: [
      { dist: 0, alt: 1820 },
      { dist: 8, alt: 1650 },
      { dist: 18, alt: 1400 },
      { dist: 28, alt: 1100 }
    ],
    routeTelemetry: {
      distanceKm: 28.5,
      estimatedTime: "1h 05m",
      delayNotice: "Clear Route",
      clearPct: 88,
      cautionPct: 12
    }
  }
];
