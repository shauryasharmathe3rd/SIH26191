  ### RESITE-GIS Project & Terrain Analysis Summary

  An end-to-end analysis of the SRTM 52_06 DEM dataset has been conducted, and the interactive Jupyter notebook analyser.ipynb has been constructed and executed with the two requested blocks.
  ──────
  ### 1. SRTM 52_06 Terrain Analysis Findings

   Metric / Parameter                          | Value / Specification                       | Context & Significance
  ---------------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------
   Coverage Area                               | 75.0°E – 80.0°E, 30.0°N – 35.0°N            | Western & Central Himalayas (Himachal Pradesh, Uttarakhand, Ladakh, J&K, upper Indo-Gangetic plains)
   Coordinate Reference System                 | EPSG:4326 (WGS 84)                          | Geographic coordinates with geodesic pixel spacing (~78.2  m × 92.8  m)
   Native Grid Dimensions                      | 6,000 × 6,000 pixels                        | ~36 million elevation data points (~3 arc-second / 90m SRTM v4.1 product)
   Elevation Range                             | 157  m to 7,602  m ASL                      | Massive relief variation (3,350  m ± 1,958  m mean elevation) from river valleys to glaciated peaks
   Slope Gradient Range                        | **                                          |

       ∘
    0.0

  to

        ∘
    66.3

  ** | Mean slope:

        ∘
    14.5

  ; **18.4% of landscape has slopes

       ∘
    >30

  ** (critical landslide hazard threshold) |
  | Stable Buildable Land | **

       ∘
    <15

  slope** | 58.2% of total area (concentrated along broader valleys and foothill terraces) |
  ──────
  ### 2. Implementation in analyser.ipynb

  The notebook is divided into two self-contained blocks:

  #### Block 1: Terrain Data Visualisation & Geomorphometric Analysis

  • Geodesic Spatial Derivatives: Converts angular degrees to metric ground distances with latitude adjustments (Δx = Δλ·111320·cos (φ), Δy = Δφ·111320).
  • Geomorphometry Calculations:
      • Spatial gradient vector field


         ⎛ ∂z   ∂z ⎞
    ∇z = ⎜────,────⎟
         ⎝ ∂x   ∂y ⎠

  • Slope Angle:

                        180
    θ = arctan (|∇z|) × ───
                         π

  • Aspect: Direction of steepest descent relative to true North
  • Multi-directional Analytical Hillshade (

                 ∘                  ∘
    Azimuth = 315   NW,Altitude = 45

  )

  • Fast vectorized Terrain Ruggedness Index (

           ⎛      2⎞
           ⎜‾‾   ‾ ⎟
    TRI = √⎝z² - z ⎠

  )

  • Multi-Panel Visualizations Generated:
      1. 4-Panel Synoptic Geomorphometry Suite: Digital Elevation Model (Hypsometric relief), Analytical Hillshade, Classified Slope Angle map (


       ∘
    <15

  ,

      ∘     ∘
    15  - 30

  ,

      ∘     ∘
    30  - 45

  ,

       ∘
    >45

  ), and Terrain Ruggedness Index (TRI).
  2. Statistical Hypsometry & Slope Distribution: Probability density functions and CDF curves with critical threshold demarcations.
  3. High-Resolution Valley Focus Zoom: Sub-AOI transect over the Beas / Kullu-Manali & Alaknanda gorges showing blended hillshade, slope risk overlays, and elevation contours.
  ──────
  #### Block 2: End-to-End RESITE-GIS Analytics & Decision-Support Pipeline

  Implements the formulas and workflows from README.md:

  1. Dynamic Multi-Hazard Red-Zoning Engine:

    HI = w₁·Slope + w₂·Hydrological Runoff + w₃·Historical Scar + w₄·Precipitation (Live)

  • Parameterized weights (w₁ = 0.35,w₂ = 0.25,w₃ = 0.15,w₄ = 0.25) with real-time precipitation trigger (

    P     = 150  mm
     live

  ).

  • Extracts vector polygons for Critical Red Zones (HI ≥ 0.75) and Warning Buffers (0.50 ≤ HI < 0.75).

  2. Safe Site Carrying Capacity Index (CCI) Engine (MCDA):

                    ∑wᵢSᵢ
    CCI = ───────────────────────── × 100
          Population Density Factor

  • Evaluates:
      • Slope stability (S₁): Unbuilt land with slope


       ∘
    <15

     - Hydrological safety (S₂): Buffer exclusion outside flash flood and high runoff corridors
     - Road & Grid access (S₃): Network proximity to transit corridors (≤2  km)
     - Buildable Contiguous Acreage (S₄): Minimum contiguous land area for rehabilitation

  • Ranks candidate safe relocation zones and calculates viable family capacity.

  3. Vulnerability Prioritization Matrix & Relocation Queue:
      • Evaluates habitations against dynamic Red Zones and hazard proximity:
          • Immediate (0–30 Days): HI > 0.75 or active slope failure risk → Urgent evacuation and priority resettlement.
          • Short-Term (1–6 Months): 0.50 ≤ HI < 0.75 or within buffer → Pre-monsoon relocation & slope fortification.
          • Medium-Term (Strategic): HI < 0.50 → Long-term monitoring.
      • Spatially pairs each prioritized habitation to the nearest optimal Safe Relocation Site (CCI ≥ 60).
  4. Multi-Layer Decision Dashboard & Spatial Exports:
      • Visualizes composite maps showing Red Zones, Safe Sites, and relocation allocation vectors.
      • Generates interactive Folium map resite_gis_interactive_map.html.

  ──────
  ### 3. Generated Artifacts & Processed Layers

  All pipeline outputs have been exported to backend/data_pipeline/processed/:

  • red_zones_dynamic.geojson: Dynamic multi-hazard polygon layer with risk severity tiers.
  • safe_relocation_sites.geojson: Candidate resettlement parcels with CCI scores, area (km²), and family capacity.
  • resettlement_priority_queue.geojson: Vulnerable habitations with priority tier, population at risk, assigned safe site, and relocation distance.
  • pipeline_summary_report.json: High-level metadata report for the backend API and dashboard.
  • analyser.ipynb (and synced to analyzer.ipynb & analyser.ipynb): Fully executed with embedded figures and tabular logs.