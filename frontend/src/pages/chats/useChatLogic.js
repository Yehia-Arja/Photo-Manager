import request from "../../utils/remote/axios";
import { requestMethod } from "../../utils/enums/requestMethod";
import { useState } from "react";

const useChatLogic = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const sendMessage = async (message) => {
        setIsLoading(true);
        try {
        const response = await request({
            method: requestMethod.POST,
            route: 'send-message',
            body: JSON.stringify({ message }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
            
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, data]);
            
        } catch (err) {
        setError(err);
        } finally {
        setIsLoading(false);
        }
    };
    
    return { messages, message, setMessage, sendMessage, isLoading, error };
}

export default useChatLogic;