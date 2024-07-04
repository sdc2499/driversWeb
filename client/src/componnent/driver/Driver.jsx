import React, { useState, useEffect, useContext } from 'react';
import socket from '../../socket';
import { useNavigate } from 'react-router-dom';
import './driver.css'
import { UserContext } from "../../App";

const Driver = () => {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    console.log("currentUser  " + currentUser)
    const fetchOpenRides = async () => {
      try {
        const response = await fetch(`http://localhost:8080/rides/waitingForDriver`, {
          headers: { Authorization: currentUser.token }
        });
        const data = await response.json();
        console.log('Fetched waitingForDriver rides:', data.data);
        setRequests(data.data);
      } catch (error) {
        console.error('Error fetching waitingForDriver rides:', error);
      }
    };

    fetchOpenRides();

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
    console.log("req   " + request.customerId)
    console.log("req   " + request.id)
    console.log("req   " +currentUser.id )
    socket.emit('driverAccepted', { costumerId:request.customerId,request: request.id, socketId: request.socketId, driverId: currentUser.id });
  };

  return (
    <div className="driver-container">
      <h1 className="page-title">Hello Driver</h1>
      <div className="new-ride-requests">
        <h2>New Ride Requests</h2>
        {requests && requests.map(request => (

          <div className="ride-request" key={request.id}>
            {console.log(request)}
            <p><strong>מ:</strong> {request.from || request.pickup_location}</p>
            <p><strong>ל:</strong> {request.destination || request.to}</p>
            <p><strong>תאריך:</strong> {request.date}</p>
            <p><strong>תאריך:</strong> {request.time}</p>
            {request.requestType === 'package' ? (
              <p><strong>גודל החבילה:</strong> {request.packageSize}</p>
            ) : (
              <div>
                <p><strong>מספר נוסעים:</strong> {request.passengers}</p>
              </div>
            )}
            <button className="accept-button" onClick={() => acceptRequest(request)}>אשר</button>
          </div>
        ))}
      </div>
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
                {console.log("vh  " + acceptedRequest)}
                <p><strong>מספר נוסעים:</strong> {acceptedRequest.passengers}</p>
              </div>
            )}
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Driver;