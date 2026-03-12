import type { Message } from "../types/chat";

interface ChatResponse {
  response: string;
}

class ChatService {
  private readonly baseUrl: string = "http://localhost:8000";

  async sendMessage(message: string, history: Message[]): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data.response;
  }
}

export default new ChatService();