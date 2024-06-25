import React, { useState, useEffect,useContext } from 'react';
import socket from '../../socket';
import { useNavigate } from 'react-router-dom';
import './driver.css'
import { UserContext } from '../../App';

const Driver = () => {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    const handleNewRequest = (request) => {
      setRequests(prev => [...prev, request]);
    };

    const handleRequestClosed = (requestId) => {
      setRequests(prev => prev.filter(req => req.id !== requestId));
    };

    socket.on('rideRequestForDrivers', handleNewRequest);
    socket.on('rideRequestClosed', handleRequestClosed);

    return () => {
      socket.off('rideRequestForDrivers', handleNewRequest);
      socket.off('rideRequestClosed', handleRequestClosed);
    };
  }, []);

  const acceptRequest = (request) => {
    setAcceptedRequests(prev => [...prev, request]);
    socket.emit('driverAccepted',{request:request.id,driverId:currentUser.id} );
  };

  return (
    <div className="driver-container">
      <h1 className="page-title">Hello Driver</h1>

      <div className="accepted-requests">
        {acceptedRequests.map((acceptedRequest, index) => (
          <div className="accepted-request" key={index}>
            <h2>Accepted Ride Details</h2>
            <p><strong>מ:</strong> {acceptedRequest.from}</p>
            <p><strong>ל:</strong> {acceptedRequest.to}</p>
            <p><strong>תאריך:</strong> {acceptedRequest.date}</p>
            <p><strong>שעה:</strong> {acceptedRequest.time}</p>
            {acceptedRequest.requestType === 'package' ? (
              <p><strong>גודל החבילה:</strong> {acceptedRequest.packageSize}</p>
            ) : (
              <div>
                <p><strong>מספר מבוגרים:</strong> {acceptedRequest.adults}</p>
                <p><strong>מספר ילדים מעל גיל חצי שנה:</strong> {acceptedRequest.infants}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="new-ride-requests">
        <h2>New Ride Requests</h2>
        {requests.map(request => (
          <div className="ride-request" key={request.id}>
            <p><strong>מ:</strong> {request.from}</p>
            <p><strong>ל:</strong> {request.to}</p>
            <p><strong>תאריך:</strong> {request.date}</p>
            <p><strong>תאריך:</strong> {request.time}</p>
            {request.requestType === 'package' ? (
              <p><strong>גודל החבילה:</strong> {request.packageSize}</p>
            ) : (
              <div>
                <p><strong>מספר מבוגרים:</strong> {request.adults}</p>
                <p><strong>מספרי ילדיים:</strong> {request.infants}</p>
              </div>
            )}
            <button className="accept-button" onClick={() => acceptRequest(request)}>אשר</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Driver;