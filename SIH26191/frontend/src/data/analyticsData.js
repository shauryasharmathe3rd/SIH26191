export const ANALYTICS_DATA = {
  kpis: {
    activeRedZones: 2370,
    safeSites: 106,
    habitationsEvaluated: 18,
    rainfallMm: 150
  },
  priorityCounts: {
    immediate: { count: 1245, percentage: "95%" },
    shortTerm: { count: 3892, percentage: "60%" },
    mediumTerm: { count: 8431, percentage: "40%" }
  },
  cciDistribution: [
    { name: "Optimal", percentage: 25, color: "#003909", fill: "#003909", badgeClass: "bg-tertiary-container" },
    { name: "Suitable", percentage: 35, color: "#1a237e", fill: "#1a237e", badgeClass: "bg-primary-container" },
    { name: "Moderate", percentage: 40, color: "#000666", fill: "#000666", badgeClass: "bg-primary" }
  ],
  redZoneSeverity: [
    { name: "Critical", percentage: 15, color: "#410003", fill: "#410003" },
    { name: "High", percentage: 30, color: "#b6171e", fill: "#b6171e" },
    { name: "Medium", percentage: 30, color: "#da3433", fill: "#da3433" },
    { name: "Low", percentage: 25, color: "#ffdad6", fill: "#ffdad6" }
  ]
};
