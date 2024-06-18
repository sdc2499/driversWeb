import React, { useState, useEffect } from 'react';
import socket from './socket';
import { useNavigate } from "react-router-dom";

const Secretary = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleNewRequest = (request) => {
      setRequests(prev => [...prev, { ...request, closed: false }]);
    };

    const handleRequestClosed = (requestId) => {
      setRequests(prev => prev.map(req =>
        req.id === requestId ? { ...req, closed: true } : req
      ));
    };

    socket.on('rideRequestForSecretary', handleNewRequest);
    socket.on('rideRequestClosed', handleRequestClosed);

    return () => {
      socket.off('rideRequestForSecretary', handleNewRequest);
      socket.off('rideRequestClosed', handleRequestClosed);
    };
  }, []);

  const updatePrice = (request, price) => {
    const updatedRequest = { ...request, price };
    setRequests(prev => prev.map(req => req.id === request.id ? updatedRequest : req));
    socket.emit('priceUpdated', updatedRequest);
  };

  return (
    <div>
      <h1>Hello Secretary</h1>
      {requests.map(request => (
        <div key={request.id}>
          <p>From: {request.from}</p>
          <p>To: {request.to}</p>
          <p>Date: {request.date}</p>
          <p>Time: {request.time}</p>
          <p>Type: {request.requestType === 'package' ? 'Package Delivery' : 'People Transportation'}</p>
          {request.requestType === 'package' ? (
            <p>Package Size: {request.packageSize}</p>
          ) : (
            <>
              <p>Adults: {request.adults}</p>
              <p>Infants: {request.infants}</p>
            </>
          )}
          {request.closed ? (
            <div>
              <p>This request has been closed.</p>
              {request.price && <p>Final Price: {request.price}</p>}
            </div>
          ) : (
            <input
              type="number"
              placeholder="Enter price"
              onBlur={(e) => updatePrice(request, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Secretary;
