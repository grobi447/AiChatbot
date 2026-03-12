import { Component, createRef } from "react";
import "./style/MessageInput.scss";

interface Props {
    onSend: (message: string) => void;
    disabled: boolean;
}

class MessageInput extends Component<Props> {
    private inputRef = createRef<HTMLInputElement>();

    handleSend = () => {
        const value = this.inputRef.current?.value.trim();
        if (!value) return;
        this.props.onSend(value);
        if (this.inputRef.current) this.inputRef.current.value = "";
    };

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            this.handleSend();
        }
    };

    render() {
        const { disabled } = this.props;

        return (
            <div className="message-input">
                <input
                    ref={this.inputRef}
                    className="message-input__field"
                    placeholder="Type a message..."
                    onKeyDown={this.handleKeyDown}
                    disabled={disabled}
                />
                <button
                    className="message-input__button"
                    onClick={this.handleSend}
                    disabled={disabled}
                >
                    {disabled ? "..." : "Send"}
                </button>
            </div>
        );
    }
}

export default MessageInput;