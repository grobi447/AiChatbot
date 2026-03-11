from fastapi import APIRouter
from app.models.chat import ChatRequest, ChatResponse
from app.services.gemini_service import gemini_service

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    response = gemini_service.chat(request.message)
    return ChatResponse(response=response)