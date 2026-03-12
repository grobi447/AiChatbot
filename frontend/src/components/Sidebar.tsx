import { Component } from "react";
import ConversationItem from "./ConversationItem";
import type { Conversation } from "../types/chat";
import { Moon, Sun } from "lucide-react";

import "./style/Sidebar.scss";

interface Props {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

class Sidebar extends Component<Props> {
  render() {
    const { conversations, activeId, onSelect, onNew, onDelete, isDark, onToggleTheme } = this.props;

    return (
      <div className="sidebar">
        <div className="sidebar__header">
          <h1 className="sidebar__title">AiChatbot</h1>
          <button className="sidebar__theme-toggle" onClick={onToggleTheme}>
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        <button className="sidebar__new-btn" onClick={onNew}>
          + New Conversation
        </button>

        <div className="sidebar__divider" />

        <div className="sidebar__list">
          {conversations.length === 0 ? (
            <p className="sidebar__empty">No conversations yet</p>
          ) : (
            conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isActive={conv.id === activeId}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;