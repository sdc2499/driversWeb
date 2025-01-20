import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import socketIOClient from 'socket.io-client';
import ChatWindow from './ChatWindow';
import './Chat.css';

const SOCKET_SERVER_URL = 'http://localhost:8080';

const UserChat = () => {
  const [currentUser] = useContext(UserContext);
  const [socket] = useState(socketIOClient(SOCKET_SERVER_URL));
  const [response, setResponse] = useState('');
  const [activeChat, setActiveChat] = useState(false);
  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [secretarySocketId, setSecretarySocketId] = useState('');

  useEffect(() => {
    const handleChatRequestResponse = (response) => {
      setResponse(response.message);
      setWaitingForApproval(false);
      if (response.accepted) {
        setActiveChat(true);
        setSecretarySocketId(response.secretarySocketId);
        sendInitialMessage(response.secretarySocketId);
      } else {
        addSystemMessage(response.message);
      }
    };

    const handleIncomingMessage = (message) => {
      if (message.recipientId === socket.id) addMessage(message);
    };

    socket.on('chatRequestResponse', handleChatRequestResponse);
    socket.on('receiveMessage', handleIncomingMessage);

    return () => {
      socket.off('chatRequestResponse', handleChatRequestResponse);
      socket.off('receiveMessage', handleIncomingMessage);
    };
  }, [socket]);

  const handleRequestChat = () => {
    socket.emit('requestChat', {
      userId: currentUser.id,
      userName: currentUser.firstName,
      userType: 'customer',
      customerSocketId: socket.id,
    });
    addSystemMessage('מחכה לאישור מהמזכירה...');
    setWaitingForApproval(true);
  };

  const sendInitialMessage = (secretarySocketId) => {
    const initialMessage = {
      senderId: socket.id,
      recipientId: secretarySocketId,
      userName: "System",
      text: `שלום לך ${currentUser.firstName} ${currentUser.lastName} איך אוכל לעזור לך היום?`,
      timestamp: new Date().toISOString(),
    };
    addMessage(initialMessage);
    socket.emit('sendMessage', initialMessage);
  };

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const addSystemMessage = (text) => {
    addMessage({ text, userName: 'System', timestamp: new Date().toISOString() });
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const message = {
      senderId: socket.id,
      recipientId: secretarySocketId,
      userName: currentUser.firstName,
      text: messageInput,
      timestamp: new Date().toISOString(),
    };

    addMessage(message);
    socket.emit('sendMessage', message);
    setMessageInput('');
  };

  const closeChat = () => {
    const closingMessage = {
      senderId: socket.id,
      recipientId: secretarySocketId,
      userName: currentUser.firstName,
      text: 'הלקוח סיים את השיחה',
      timestamp: new Date().toISOString(),
    };

    addMessage(closingMessage);
    socket.emit('sendMessage', closingMessage);

    setTimeout(() => {
      setActiveChat(false);
      setMessages([]);
      setResponse('');
      setWaitingForApproval(false);
    }, 500);
  };

  return (
    <div>
      <button
        className={`chat-request-button ${activeChat || waitingForApproval ? 'disabled' : ''}`}
        onClick={handleRequestChat}
        disabled={activeChat || waitingForApproval}
      >
        התחל צ'אט עם מזכירה
      </button>
      {response && !activeChat && !waitingForApproval && <p>{response}</p>}
      {(waitingForApproval || activeChat) && (
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

export default UserChat;