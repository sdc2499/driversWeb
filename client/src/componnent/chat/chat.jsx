// ChatRequestButton.jsx
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import socketIOClient from 'socket.io-client';

const ChatRequestButton = () => {
  const [currentUser] = useContext(UserContext);
  const [socket] = useState(socketIOClient('http://localhost:8080'));
  const [response, setResponse] = useState('');

  const handleRequestChat = () => {
    socket.emit('requestChat', { userId: currentUser.id, userName: currentUser.firstName, userType: 'customer', customerSocketId: socket.id });
    
    socket.on('chatRequestResponse', (response) => {
      setResponse(response.message);
    });
  };

  return (
    <div>
      <button onClick={handleRequestChat}>בקשת שיחה</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default ChatRequestButton;
