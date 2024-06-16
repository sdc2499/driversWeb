
import React, { useState, useEffect } from 'react';
import socket from './socket';
import { useNavigate } from "react-router-dom";

const Secretary = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('rideRequestForSecretary', (request) => {
      setRequests(prev => [...prev, request]);
    });
  }, []);

  const updatePrice = (from,to,id, price) => {
    socket.emit('priceUpdated', {from,to, id, price });
    navigate('/home/driver')
  };

  return (
    <div>
      {requests.map(request => (
        <div key={request.id}>
          <p>From: {request.from}, To: {request.to}</p>
          <input
            type="number"
            placeholder="Enter price"
            onBlur={(e) => updatePrice(request.from,request.to,request.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Secretary;

