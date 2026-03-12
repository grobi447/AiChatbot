import type { Conversation } from "../types/chat";

class StorageService {
  private readonly key = "conversations";

  getAll(): Conversation[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  save(conversations: Conversation[]): void {
    localStorage.setItem(this.key, JSON.stringify(conversations));
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}

export default new StorageService();