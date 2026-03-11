import google.generativeai as genai
from app.core.config import settings

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self._model = genai.GenerativeModel(settings.GEMINI_MODEL)

    def chat(self, message: str) -> str:
        response = self._model.generate_content(message)
        return response.text

gemini_service = GeminiService()