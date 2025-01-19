import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import socketIOClient from 'socket.io-client';
import ChatRequests from './ChatRequests';
import ChatWindow from './ChatWindow';
import './Chat.css';

const SOCKET_SERVER_URL = 'http://localhost:8080';

const SecretaryChat = () => {
  const [currentUser] = useContext(UserContext);
  const [socket] = useState(socketIOClient(SOCKET_SERVER_URL));
  const [chatRequests, setChatRequests] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [handlingRequest, setHandlingRequest] = useState(false);

  useEffect(() => {
    const handleChatRequest = (data) => {
      if (!handlingRequest) {
        setChatRequests((prevRequests) => [...prevRequests, data]);
      }
    };

    const handleIncomingMessage = (message) => {
      if (message.senderId === activeChat?.customerSocketId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on('chatRequestForSecretary', handleChatRequest);
    socket.on('receiveMessage', handleIncomingMessage);

    return () => {
      socket.off('chatRequestForSecretary', handleChatRequest);
      socket.off('receiveMessage', handleIncomingMessage);
    };
  }, [socket, activeChat, handlingRequest]);

  const handleResponse = (customerSocketId, accepted) => {
    const response = accepted ? 'המזכירה אישרה את השיחה' : 'המזכירה דחתה את הבקשה';
    socket.emit('respondToChatRequest', { customerSocketId, accepted, message: response, secretarySocketId: socket.id });

    setHandlingRequest(true);
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
      userName: currentUser.firstName,
      text: messageInput,
      timestamp: new Date().toISOString()
    };

    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessageInput('');
  };

  const closeChat = () => {
    const closingMessage = {
      senderId: socket.id,
      recipientId: activeChat.customerSocketId,
      userName: currentUser.firstName,
      text: 'המזכירה סיימה את השיחה',
      timestamp: new Date().toISOString()
    };

    socket.emit('sendMessage', closingMessage);
    setMessages((prevMessages) => [...prevMessages, closingMessage]);

    setTimeout(() => {
      setActiveChat(null);
      setMessages([]);
      setHandlingRequest(false);
    }, 500);
  };

  return (
    <div>
      <ChatRequests
        chatRequests={chatRequests}
        handleResponse={handleResponse}
      />
      {activeChat && (
        <ChatWindow
          activeChat={activeChat}
          messages={messages}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          sendMessage={sendMessage}
          closeChat={closeChat}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default SecretaryChat;