import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Replace with your actual backend WebSocket URL
const socket = io("http://localhost:3000"); 

const useChatLogic = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Listen to incoming messages
    useEffect(() => {
        socket.on("chat message", (data) => {
        setMessages((prev) => [...prev, data]);
        });

        return () => {
        socket.off("chat message");
        };
    }, []);

    // Send message to server via socket
    const sendMessage = (username) => {
        if (message.trim() === "") return;

        const data = { username, message };
        socket.emit("chat message", data);
        setMessage(""); 
    };

    return {
        messages,
        message,
        setMessage,
        sendMessage,
        isLoading,
    };
};

export default useChatLogic;
