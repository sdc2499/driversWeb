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
            <p><strong>From:</strong> {acceptedRequest.from}</p>
            <p><strong>To:</strong> {acceptedRequest.to}</p>
            <p><strong>Date:</strong> {acceptedRequest.date}</p>
            <p><strong>Time:</strong> {acceptedRequest.time}</p>
            {acceptedRequest.requestType === 'package' ? (
              <p><strong>Package Size:</strong> {acceptedRequest.packageSize}</p>
            ) : (
              <div>
                <p><strong>Number of Adults:</strong> {acceptedRequest.adults}</p>
                <p><strong>Number of Infants:</strong> {acceptedRequest.infants}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="new-ride-requests">
        <h2>New Ride Requests</h2>
        {requests.map(request => (
          <div className="ride-request" key={request.id}>
            <p><strong>From:</strong> {request.from}</p>
            <p><strong>To:</strong> {request.to}</p>
            <p><strong>Date:</strong> {request.date}</p>
            <p><strong>Time:</strong> {request.time}</p>
            {request.requestType === 'package' ? (
              <p><strong>Package Size:</strong> {request.packageSize}</p>
            ) : (
              <div>
                <p><strong>Number of Adults:</strong> {request.adults}</p>
                <p><strong>Number of Infants:</strong> {request.infants}</p>
              </div>
            )}
            <button className="accept-button" onClick={() => acceptRequest(request)}>Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Driver;









// import React, { useState, useEffect } from 'react';
// import socket from './socket';
// import { useNavigate } from "react-router-dom";

// const Driver = () => {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     socket.on('rideRequestForDrivers', (request) => {
//       setRequests(prev => [...prev, request]);
//     });
//   }, []);

//   const acceptRequest = (id) => {
//     socket.emit('driverAccepted', id);
//   };

//   return (
//     <div>
//       {requests.map(request => (
//         <div key={request.id}>
//           <p>From: {request.from}, To: {request.to}, Price: {request.price}</p>
//           <button onClick={() => acceptRequest(request.id)}>Accept</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Driver;