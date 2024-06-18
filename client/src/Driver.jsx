import React, { useState, useEffect } from 'react';
import socket from './socket';
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const [requests, setRequests] = useState([]);
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