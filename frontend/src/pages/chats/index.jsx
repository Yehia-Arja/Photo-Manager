import useChatLogic from "./useChatLogic";
import "./style.css";

const Chats = () => {
    const {
        messages,
        message,
        setMessage,
        sendMessage,
        isLoading,
    } = useChatLogic();

    const username = "Yehia"; 

    return (
        <div className="chat-container">
        <div className="chat-header">
            <h2>Live Chat</h2>
        </div>

        <div className="chat-messages">
            {messages.map((msg, index) => (
            <div
                key={index}
                className={`message ${
                msg.username === username ? "sent" : "received"
                }`}
            >
                <strong>{msg.username}: </strong>
                {msg.message}
            </div>
            ))}
        </div>

        <div className="chat-input-container">
            <input
            type="text"
            placeholder="Type a message..."
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(username)}
            />
            <button
            onClick={() => sendMessage(username)}
            className="send-button"
            disabled={isLoading}
            >
            {isLoading ? "Sending..." : "Send"}
            </button>
        </div>
        </div>
    );
};

export default Chats;
