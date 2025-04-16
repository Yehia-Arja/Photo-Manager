import useChatLogic from "./useChatLogic";
import "./style.css";

const Chats = () => {
    const { message, setMessage, sendMessage, isLoading } = useChatLogic();


    return (
        <div>
            {isLoading ? (   
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Live Chat</h2>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="chat-messages">
                        {/* Example messages */}
                        <div className="message received">Hey! How can I help you?</div>
                        <div className="message sent">I have a question about your service.</div>
                    </div>

                    <div className="chat-input-container">
                        <input
                        type="text"
                        placeholder="Type a message..."
                        className="chat-input"
                        value={message}
                        onChange={(e) => (setMessage(e.target.value))}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage(message)}
                        />
                        <button onClick={()=>sendMessage(message)} className="send-button">Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chats;
