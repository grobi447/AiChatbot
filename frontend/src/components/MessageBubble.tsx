import { Component } from "react";
import type { Message } from "../types/chat";
import "./style/MessageBubble.scss";

interface Props {
    message: Message;
}

class MessageBubble extends Component<Props> {
    render() {
        const { message } = this.props;
        const isUser = message.role === "user";

        return (
            <div className={`message-bubble ${isUser ? "message-bubble--user" : "message-bubble--ai"}`}>
                <div className={`message-bubble__content ${isUser ? "message-bubble__content--user" : "message-bubble__content--ai"}`}>
                    {message.content}
                </div>
            </div>
        );
    }
}

export default MessageBubble;