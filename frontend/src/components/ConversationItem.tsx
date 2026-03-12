import { Component } from "react";
import type { Conversation } from "../types/chat";
import "./style/ConversationItem.scss";

interface Props {
    conversation: Conversation;
    isActive: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
}

class ConversationItem extends Component<Props> {
    render() {
        const { conversation, isActive, onSelect, onDelete } = this.props;

        return (
            <div
                className={`conversation-item ${isActive ? "conversation-item--active" : ""}`}
                onClick={() => onSelect(conversation.id)}
            >
                <span className="conversation-item__title">{conversation.title}</span>
                <button
                    className="conversation-item__delete"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(conversation.id);
                    }}
                >
                    ✕
                </button>
            </div>
        );
    }
}

export default ConversationItem;