import json
import os
from typing import List, Dict, Any
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent

# ----------------------------------------------------------------------
# 1. DEFINE AGENT TOOLS (Wrapping Core Backend Services)
# ----------------------------------------------------------------------

@tool
def simulate_dynamic_hazard(district: str, rainfall_mm: float) -> str:
    """
    Simulates slope instability and expands dynamic hazard Red Zones 
    based on live or scenario rainfall inputs in mm.
    """
    # Call your internal Python service (hazard_calculator.py)
    # E.g., red_zone_geojson = hazard_calculator.run(district, rainfall_mm)
    mock_result = {
        "status": "success",
        "district": district,
        "rainfall_input_mm": rainfall_mm,
        "hazard_level": "CRITICAL" if rainfall_mm > 150 else "MODERATE",
        "expanded_red_zones_count": 4,
        "affected_area_sq_km": 12.4
    }
    return json.dumps(mock_result)

@tool
def evaluate_safe_relocation_sites(district: str, required_capacity: int) -> str:
    """
    Queries PostGIS to find candidate safe grounds outside hazard buffers 
    with slope < 15 degrees, good road access, and high Carrying Capacity (CCI).
    """
    # Call your internal service (cci_evaluator.py)
    mock_result = {
        "candidate_sites": [
            {
                "site_id": "CHAMOLI_SAFE_SITE_B",
                "carrying_capacity_index": 86,
                "max_population_capacity": 1500,
                "distance_to_road_km": 0.8,
                "slope_angle_deg": 6.2,
                "land_cover": "Unbuilt Grassland"
            }
        ]
    }
    return json.dumps(mock_result)

@tool
def prioritize_evacuation_queue(district: str) -> str:
    """
    Intersects active Red Zones with census habitations to output a prioritized 
    relocation queue: Immediate (0-30 days), Short-Term, and Medium-Term.
    """
    mock_result = {
        "immediate_queue": [
            {"village_name": "Helang Homesteads", "population": 340, "risk_score": 0.92},
            {"village_name": "Joshimath Lower Ward", "population": 510, "risk_score": 0.88}
        ]
    }
    return json.dumps(mock_result)

# ----------------------------------------------------------------------
# 2. INITIALIZE AGENT WITH SYSTEM PROMPT & TOOLS
# ----------------------------------------------------------------------

tools = [simulate_dynamic_hazard, evaluate_safe_relocation_sites, prioritize_evacuation_queue]

SYSTEM_PROMPT = """
You are RESITE-AI, an autonomous GIS Assistant for State Disaster Management Authorities (SDMAs).
Your mission is to help authorities make evidence-based evacuation and dynamic relocation decisions.

When asked a question:
1. First, trigger dynamic hazard simulations if weather inputs are given.
2. Identify affected habitations and rank them by immediate vulnerability.
3. Query Carrying Capacity safe sites to find where populations should be relocated.
4. Synthesize your final answer clearly into:
   - Executive Summary
   - Danger Alert & Dynamic Red Zone Status
   - Recommended Relocation Site & Carrying Capacity Match
   - Actionable Step-by-Step Directives for District Collectors
"""

def get_disaster_agent():
    # Uses GPT-4o / Claude / Gemini as the reasoning engine
    # llm = ChatOpenAI(model="gpt-4o", temperature=0)
    llm = ChatOpenAI(
    model_name="meta-llama/llama-3.3-70b-instruct",
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    openai_api_base="https://openrouter.ai/api/v1",
    )
    agent_executor = create_react_agent(llm, tools, state_modifier=SYSTEM_PROMPT)
    return agent_executor


