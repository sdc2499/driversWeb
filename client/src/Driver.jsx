import React, { useState, useEffect } from 'react';
import socket from './socket';
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('rideRequestForDrivers', (request) => {
      setRequests(prev => [...prev, request]);
    });
  }, []);

  const acceptRequest = (id) => {
    socket.emit('driverAccepted', id);
    navigate('/home/user/1')

  };

  return (
    <div>
      {requests.map(request => (
        <div key={request.id}>
          <p>From: {request.from}, To: {request.to}, Price: {request.price}</p>
          <button onClick={() => acceptRequest(request.id)}>Accept</button>
        </div>
      ))}
    </div>
  );
};

export default Driver;