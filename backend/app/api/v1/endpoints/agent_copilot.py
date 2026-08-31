from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.agentic_support.disaster_agent import get_disaster_agent

router = APIRouter()

class AgentRequest(BaseModel):
    prompt: str

class AgentResponse(BaseModel):
    response: str
    execution_steps: list

@router.post("/chat", response_model=AgentResponse)
async def chat_with_gis_agent(request: AgentRequest):
    try:
        agent = get_disaster_agent()
        inputs = {"messages": [("user", request.prompt)]}
        
        # Execute agent graph
        result = agent.invoke(inputs)
        
        # Extract last AI message response
        final_message = result["messages"][-1].content
        
        return AgentResponse(
            response=final_message,
            execution_steps=[m.content for m in result["messages"] if hasattr(m, 'tool_calls')]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))