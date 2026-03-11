import google.generativeai as genai
from app.core.config import settings
from app.models.chat import Message

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self._model = genai.GenerativeModel(settings.GEMINI_MODEL)

    def chat(self, message: str, history: list[Message]) -> str:
        formatted_history = [
            {"role": msg.role, "parts": [msg.content]} for msg in history
        ]
        chat_session = self._model.start_chat(history=formatted_history)
        response = chat_session.send_message(message)
        return response.text

gemini_service = GeminiService()