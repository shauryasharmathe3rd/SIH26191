from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routing_routes import router as routing_router

app = FastAPI(
    title="RESITE-GIS Engine & Evacuation Routing API",
    description="AI-driven decision support & multi-criteria evacuation routing engine for State Disaster Management Authorities (SDMAs).",
    version="1.0.0"
)

# Enable CORS for local Vite dev server and external clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes with /api/v1 prefix and /api aliases
app.include_router(routing_router, prefix="/api/v1")
app.include_router(routing_router, prefix="/api")

@app.get("/")
def root_status():
    return {
        "system": "RESITE-GIS Spatial Engine",
        "status": "ONLINE",
        "region": "Indian Himalayas (Uttarakhand & Himachal Pradesh)",
        "endpoints": [
            "/api/v1/routes?source=HAB-010&destination=SAFE-SITE-001",
            "/api/v1/hazards/active",
            "/api/v1/roads/status",
            "/api/v1/evacuation/plan"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
