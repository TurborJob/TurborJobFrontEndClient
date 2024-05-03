import React, { useState, useEffect } from 'react';
import WebSocketService from '../../services/webSocket';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const webSocketService = new WebSocketService();

    useEffect(() => {
        // Kết nối tới WebSocket khi component được mount
        webSocketService.connect();

        // Xử lý việc nhận tin nhắn từ WebSocket
        // webSocketService.subscribeToMessages((message) => {
        //     setMessages(prevMessages => [...prevMessages, message]);
        // });

        // Ngắt kết nối khi component bị unmount
        return () => {
            webSocketService.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            webSocketService.sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div>
            <h2>WebSocket Chat</h2>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.sender}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                }}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default WebSocketComponent;
