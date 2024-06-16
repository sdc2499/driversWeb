import React, { useState, useEffect } from 'react';
import socket from './socket';

const Driver = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.on('rideRequestForDrivers', (request) => {
      setRequests(prev => [...prev, request]);
    });
  }, []);

  const acceptRequest = (id) => {
    socket.emit('driverAccepted', id);
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