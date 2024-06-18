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

  const updatePrice = (from, to, id, price) => {
    socket.emit('priceUpdated', { from, to, id, price });
  };

  return (
    <div>
      <h1>Hello Secretary</h1>
      {requests.map(request => (
        <div key={request.id}>
          <p>From: {request.from}, To: {request.to}</p>
          {request.closed ? (
            <p>This request has been closed.</p>
          ) : (
            <input
              type="number"
              placeholder="Enter price"
              onBlur={(e) => updatePrice(request.from, request.to, request.id, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Secretary;






// import React, { useState, useEffect } from 'react';
// import socket from './socket';
// import { useNavigate } from "react-router-dom";

// const Secretary = () => {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     socket.on('rideRequestForSecretary', (request) => {
//       setRequests(prev => [...prev, request]);
//     });
//   }, []);

//   const updatePrice = (from, to, id, price) => {
//     socket.emit('priceUpdated', { from, to, id, price });
//   };

//   return (
//     <div>
//       <h1>Hello Secretary</h1>
//       {requests.map(request => (
//         <div key={request.id}>
//           <p>From: {request.from}, To: {request.to}</p>
//           <input
//             type="number"
//             placeholder="Enter price"
//             onBlur={(e) => updatePrice(request.from, request.to, request.id, e.target.value)}
//           />
//         </div>))}
//     </div>
//   );
// };

// export default Secretary;

