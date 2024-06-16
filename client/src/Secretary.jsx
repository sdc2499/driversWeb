
import React, { useState, useEffect } from 'react';
import socket from './socket';

const Secretary = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.on('rideRequestForSecretary', (request) => {
      setRequests(prev => [...prev, request]);
    });
  }, []);

  const updatePrice = (id, price) => {
    socket.emit('priceUpdated', { id, price });
  };

  return (
    <div>
      {requests.map(request => (
        <div key={request.id}>
          <p>From: {request.from}, To: {request.to}</p>
          <input
            type="number"
            placeholder="Enter price"
            onBlur={(e) => updatePrice(request.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Secretary;

