import React, { useState, useEffect } from 'react';
import socket from './socket';
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]); // שמירת כל הבקשות שנתפסו
  const navigate = useNavigate();

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
    setAcceptedRequests(prev => [...prev, request]); // שמירת הבקשה שנתפסה ב-state
    socket.emit('driverAccepted', request.id);
  };

  return (
    <div>
      <h1>Hello Driver</h1>
      {acceptedRequests.map((acceptedRequest, index) => (
        <div key={index}>
          <h2>Accepted Ride Details</h2>
          <p>From: {acceptedRequest.from}</p>
          <p>To: {acceptedRequest.to}</p>
          <p>Date: {acceptedRequest.date}</p>
          <p>Time: {acceptedRequest.time}</p>
          {acceptedRequest.requestType === 'package' ? (
            <p>Package Size: {acceptedRequest.packageSize}</p>
          ) : (
            <div>
              <p>Number of Adults: {acceptedRequest.adults}</p>
              <p>Number of Infants: {acceptedRequest.infants}</p>
            </div>
          )}
        </div>
      ))}
      <div>
        <h2>New Ride Requests</h2>
        {requests.map(request => (
          <div key={request.id}>
            <p>From: {request.from}, To: {request.to}, Date: {request.date}, Time: {request.time}</p>
            {request.requestType === 'package' ? (
              <p>Package Size: {request.packageSize}</p>
            ) : (
              <div>
                <p>Number of Adults: {request.adults}</p>
                <p>Number of Infants: {request.infants}</p>
              </div>
            )}
            <button onClick={() => acceptRequest(request)}>Accept</button>
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