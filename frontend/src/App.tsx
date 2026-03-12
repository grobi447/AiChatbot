import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import StorageService from "./services/StorageService";
import type { Conversation } from "./types/chat";
import "./components/style/App.scss";

interface State {
    conversations: Conversation[];
    activeId: string | null;
    isDark: boolean;
}

class App extends Component<object, State> {
    state: State = {
        conversations: StorageService.getAll(),
        activeId: null,
        isDark: localStorage.getItem("theme") === "dark",
    };

    handleNew = () => {
        const newConversation: Conversation = {
            id: uuidv4(),
            title: "New Conversation",
            messages: [],
            createdAt: Date.now(),
        };
        const conversations = [newConversation, ...this.state.conversations];
        StorageService.save(conversations);
        this.setState({ conversations, activeId: newConversation.id });
    };

    handleSelect = (id: string) => {
        this.setState({ activeId: id });
    };

    handleDelete = (id: string) => {
        const conversations = this.state.conversations.filter((c) => c.id !== id);
        StorageService.save(conversations);
        this.setState({
            conversations,
            activeId: this.state.activeId === id ? null : this.state.activeId,
        });
    };

    handleUpdate = (updated: Conversation) => {
        const conversations = this.state.conversations.map((c) =>
            c.id === updated.id ? updated : c
        );
        StorageService.save(conversations);
        this.setState({ conversations });
    };

    toggleTheme = () => {
        this.setState((prev) => {
            const isDark = !prev.isDark;
            localStorage.setItem("theme", isDark ? "dark" : "light");
            return { isDark };
        });
    };

    render() {
        const { conversations, activeId, isDark } = this.state;
        const activeConversation = conversations.find((c) => c.id === activeId);

        return (
            <div
                className={`app ${isDark ? "dark" : ""}`}
                style={{ background: isDark ? "#212121" : "#f0ede8" }}
            >
                <div className="app__card">
                    <Sidebar
                        conversations={conversations}
                        activeId={activeId}
                        onSelect={this.handleSelect}
                        onNew={this.handleNew}
                        onDelete={this.handleDelete}
                        isDark={isDark}
                        onToggleTheme={this.toggleTheme}
                    />
                    <main className="app__main">
                        {activeConversation ? (
                            <ChatWindow
                                conversation={activeConversation}
                                onUpdate={this.handleUpdate}
                            />
                        ) : (
                            <div className="app__empty">
                                <span className="app__empty-icon">💬</span>
                                <p>Select a conversation or start a new one</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        );
    }
}

export default App;