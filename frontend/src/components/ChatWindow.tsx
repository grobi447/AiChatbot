import "./style/ChatWindow.scss";

import { Component, createRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import type { Conversation, Message } from "../types/chat";
import ChatService from "../services/ChatService";
import StorageService from "../services/StorageService";

interface Props {
  conversation: Conversation;
  onUpdate: (conversation: Conversation) => void;
}

interface State {
  isLoading: boolean;
  error: string | null;
}

class ChatWindow extends Component<Props, State> {
  private scrollRef = createRef<HTMLDivElement>();

  state: State = {
    isLoading: false,
    error: null,
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
    }
  }

  handleSend = async (content: string) => {
    const { conversation, onUpdate } = this.props;

    const userMessage: Message = { role: "user", content };
    const updatedMessages = [...conversation.messages, userMessage];

    const updatedConversation: Conversation = {
      ...conversation,
      messages: updatedMessages,
      title: conversation.messages.length === 0 ? content.slice(0, 30) : conversation.title,
    };

    onUpdate(updatedConversation);
    this.setState({ isLoading: true, error: null });

    try {
      const response = await ChatService.sendMessage(content, updatedMessages);
      const assistantMessage: Message = { role: "model", content: response };

      const finalConversation: Conversation = {
        ...updatedConversation,
        messages: [...updatedMessages, assistantMessage],
      };

      onUpdate(finalConversation);
    } catch (err) {
      this.setState({ error: "Failed to send message. Please try again." });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { conversation } = this.props;
    const { isLoading, error } = this.state;

    return (
      <div className="chat-window">
        <div className="chat-window__header">
          <h2>{conversation.title || "New Conversation"}</h2>
        </div>

        <div ref={this.scrollRef} className="chat-window__messages">
          {conversation.messages.length === 0 ? (
            <p className="chat-window__empty">Send a message to start the conversation!</p>
          ) : (
            conversation.messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))
          )}
          {isLoading && (
            <div className="chat-window__thinking">
              <span>Thinking...</span>
            </div>
          )}
          {error && <p className="chat-window__error">{error}</p>}
        </div>

        <MessageInput onSend={this.handleSend} disabled={isLoading} />
      </div>
    );
  }
}

export default ChatWindow;