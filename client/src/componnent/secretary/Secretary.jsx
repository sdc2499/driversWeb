import React, { useState, useEffect } from 'react';
import socket from '../../socket';
import { useNavigate } from 'react-router-dom';
import './secretary.css'; // ייבוא קובץ ה-CSS המכיל את עיצוב המזכירה

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
    <div className="secretary-container">
      <h1 className="page-title">Hello Secretary</h1>
      {requests.map(request => (
        <div className="request-item" key={request.id}>
          <p><strong>From:</strong> {request.from}</p>
          <p><strong>To:</strong> {request.to}</p>
          <p><strong>Date:</strong> {request.date}</p>
          <p><strong>Time:</strong> {request.time}</p>
          <p><strong>Type:</strong> {request.requestType === 'package' ? 'Package Delivery' : 'People Transportation'}</p>
          {request.requestType === 'package' ? (
            <p><strong>Package Size:</strong> {request.packageSize}</p>
          ) : (
            <>
              <p><strong>Adults:</strong> {request.adults}</p>
              <p><strong>Infants:</strong> {request.infants}</p>
            </>
          )}
          {request.closed ? (
            <div className="closed-message">
              <p>This request has been closed.</p>
              {request.price && <p><strong>Final Price:</strong> {request.price}</p>}
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
