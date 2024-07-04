import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import socketIOClient from 'socket.io-client';
import './Chat.css';

const SecretaryDashboard = () => {
  const [currentUser] = useContext(UserContext);
  const [socket] = useState(socketIOClient('http://localhost:8080'));
  const [chatRequests, setChatRequests] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const handleChatRequest = (data) => {
      setChatRequests((prevRequests) => {
        if (prevRequests.some(request => request.customerSocketId === data.customerSocketId)) {
          return prevRequests;
        }
        return [...prevRequests, data];
      });
    };

    socket.on('chatRequestForSecretary', handleChatRequest);

    const handleIncomingMessage = (message) => {
      if (message.senderId === activeChat?.customerSocketId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on('receiveMessage', handleIncomingMessage);

    return () => {
      socket.off('chatRequestForSecretary', handleChatRequest);
      socket.off('receiveMessage', handleIncomingMessage);
    };
  }, [socket, activeChat]);

  const handleResponse = (customerSocketId, accepted) => {
    const response = accepted ? 'המזכירה אישרה את השיחה' : 'המזכירה דחתה את הבקשה';
    socket.emit('respondToChatRequest', { customerSocketId, accepted, message: response, secretarySocketId: socket.id });

    setChatRequests((prevRequests) => prevRequests.filter(req => req.customerSocketId !== customerSocketId));

    if (accepted) {
      const acceptedChat = chatRequests.find(req => req.customerSocketId === customerSocketId);
      setActiveChat(acceptedChat);
      setMessages([]);
    }
  };

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    const message = {
      senderId: socket.id,
      recipientId: activeChat.customerSocketId,
      userName: currentUser.name,
      text: messageInput,
      timestamp: new Date().toISOString()
    };

    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessageInput('');
  };

  return (
    <div>
      <h2>בקשות שיחה</h2>
      {chatRequests.length === 0 && <p>אין בקשות שיחה כרגע.</p>}
      {chatRequests.map((request, index) => (
        <div key={index}>
          <p>{request.userName} רוצה להתחיל שיחה</p>
          <button onClick={() => handleResponse(request.customerSocketId, true)}>אשר</button>
          <button onClick={() => handleResponse(request.customerSocketId, false)}>דחה</button>
        </div>
      ))}

      {activeChat && (
        <div className="chat-window">
          <h3>שיחה עם {activeChat.userName} ({activeChat.customerSocketId})</h3>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.userName === currentUser.name ? 'message sent' : 'message received'}>
                <p><strong>{msg.userName}</strong>: {msg.text}</p>
                <p className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              value={messageInput} 
              onChange={(e) => setMessageInput(e.target.value)} 
              placeholder="הקלד הודעה..." 
            />
            <button onClick={sendMessage}>שלח</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretaryDashboard;