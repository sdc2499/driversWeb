// SecretaryDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import socketIOClient from 'socket.io-client';

const SecretaryDashboard = () => {
  const [currentUser] = useContext(UserContext);
  const [socket] = useState(socketIOClient('http://localhost:8080'));
  const [chatRequests, setChatRequests] = useState([]);

  useEffect(() => {
    socket.on('chatRequestForSecretary', (data) => {
      setChatRequests((prevRequests) => [...prevRequests, data]);
    });
  }, [socket]);

  const handleResponse = (customerSocketId, accepted) => {
    const response = accepted ? 'המזכירה אישרה את השיחה' : 'המזכירה דחתה את הבקשה';
    socket.emit('respondToChatRequest', { customerSocketId, accepted, message: response });

    setChatRequests((prevRequests) => prevRequests.filter(req => req.customerSocketId !== customerSocketId));
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
    </div>
  );
};

export default SecretaryDashboard;
