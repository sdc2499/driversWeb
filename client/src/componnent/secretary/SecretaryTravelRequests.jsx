import React, { useState, useEffect, useContext } from 'react';
import socket from '../../socket';
import { UserContext } from "../../App";
import { useNavigate } from 'react-router-dom';
import './secretary.css';

const SecretaryTravelRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    const fetchOpenRides = async () => {
      try {
        const response = await fetch(`http://localhost:8080/rides/waitingForPrice`, {
          headers: { Authorization: currentUser.token }
        });
        const data = await response.json();
        console.log('Fetched waitingForPrice rides:', data.data);
        setRequests(data.data);
      } catch (error) {
        console.error('Error fetching waitingForPrice rides:', error);
      }
    };

    fetchOpenRides();
    const handleNewRequest = (request) => {
      setRequests(prev => [{ ...request, closed: false, priceUpdated: false }, ...prev]);
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
  }, [currentUser.token]);

  const updatePrice = (request, price) => {
    const updatedRequest = { ...request, price, priceUpdated: true };
    setRequests(prev => prev.map(req => req.id === request.id ? updatedRequest : req));
    socket.emit('priceUpdated', updatedRequest);
  };

  const sendRequestToDrivers = (request) => {
    socket.emit('sendToDrivers', request.id);
    alert(`Request from ${request.from} to ${request.to} has been sent to drivers.`);
  };

  const isWithinNextWeek = (date) => {
    const today = new Date();
    const requestDate = new Date(date);
    const oneWeekFromNow = new Date(today);
    oneWeekFromNow.setDate(today.getDate() + 7);

    return requestDate >= today && requestDate <= oneWeekFromNow;
  };

  const sortedRequests = requests
    .filter(request => !request.closed || (request.closed && isWithinNextWeek(request.date)))
    .sort((a, b) => a.closed === b.closed ? 0 : a.closed ? 1 : -1);

  return (
    <div className="secretary-container">
      <h1 className="page-title">Hello Secretary</h1>
      {sortedRequests.map(request => (
        <div className="request-item" key={request.id}>
          { request.guestPhone&&<p><strong>טלפון(לקוח לא רשום):</strong> {request.guestPhone}</p>}
          <p><strong>From:</strong> {request.from || request.pickup_location}</p>
          <p><strong>To:</strong> {request.to}</p>
          <p><strong>Date:</strong> {request.date}</p>
          <p><strong>Time:</strong> {request.time}</p>
          <p><strong>Type:</strong> {request.requestType === 'package' ? 'Package Delivery' : 'People Transportation'}</p>
          {request.requestType === 'package' ? (
            <p><strong>Package Size:</strong> {request.packageSize}</p>
          ) : (
            <>
              <p><strong>מספר נוסעים:</strong> {request.passengers}</p>
              {/* <p><strong>Infants:</strong> {request.infants}</p> */}
            </>
          )}
          {request.closed ? (
            <div className="closed-message">
              <p>This request has been closed.</p>
              {request.price && <p><strong>Final Price:</strong> {request.price}</p>}
            </div>
          ) : (
            <div>
              <input
                type="number"
                placeholder="Enter price"
                onBlur={(e) => updatePrice(request, e.target.value)}
              />
              {!request.priceUpdated ? (
                <button disabled>Send</button>
              ) : (
                <button onClick={() => sendRequestToDrivers(request)}>Send</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SecretaryTravelRequests;



// import React, { useState, useEffect,useContext } from 'react';
// import socket from '../../socket';
// import { UserContext } from "../../App";

// import { useNavigate } from 'react-router-dom';
// import './secretary.css';

// const SecretaryTravelRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useContext(UserContext);

//   useEffect(() => {
//     const fetchOpenRides = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/rides/waitingForPrice`,{
//           headers: { Authorization: currentUser.token }
//         });
//         const data = await response.json();
//         console.log('Fetched waitingForPrice rides:', data.data);
//         setRequests(data.data);
//       } catch (error) {
//         console.error('Error fetching waitingForPrice rides:', error);
//       }
//     };

//     fetchOpenRides();
//     const handleNewRequest = (request) => {
//       console.log("b   "+requests)
//       setRequests(prev => [...prev, { ...request, closed: false, priceUpdated: false }]);
//       console.log("a   "+requests)

//     };

//     const handleRequestClosed = (requestId) => {
//       console.log(requests)
//       console.log(requestId)

//       setRequests(prev => prev.map(req =>
//         req.id === requestId ? { ...req, closed: true } : req
//       ));
//     };

//     socket.on('rideRequestForSecretary', handleNewRequest);
//     socket.on('rideRequestClosed', handleRequestClosed);

//     return () => {
//       socket.off('rideRequestForSecretary', handleNewRequest);
//       socket.off('rideRequestClosed', handleRequestClosed);
//     };
//   }, []);

//   const updatePrice = (request, price) => {
//     const updatedRequest = { ...request, price, priceUpdated: true };
//     setRequests(prev => prev.map(req => req.id === request.id ? updatedRequest : req));
//     socket.emit('priceUpdated', updatedRequest);
//   };

//   const sendRequestToDrivers = (request) => {
//     socket.emit('sendToDrivers', request.id);
//     alert(`Request from ${request.from} to ${request.to} has been sent to drivers.`);
//   };

//   return (
//     <div className="secretary-container">
//       <h1 className="page-title">Hello Secretary</h1>
//       {requests.map(request => (
//         <div className="request-item" key={request.id}>
//           <p><strong>From:</strong> {request.from||request.pickup_location}</p>
//           <p><strong>To:</strong> {request.to}</p>
//           <p><strong>Date:</strong> {request.date}</p>
//           <p><strong>Time:</strong> {request.time}</p>
//           <p><strong>Type:</strong> {request.requestType === 'package' ? 'Package Delivery' : 'People Transportation'}</p>
//           {request.requestType === 'package' ? (
//             <p><strong>Package Size:</strong> {request.packageSize}</p>
//           ) : (
//             <>
//               <p><strong>מספר נוסעים:</strong> {request.passengers}</p>
//               {/* <p><strong>Infants:</strong> {request.infants}</p> */}
//             </>
//           )}
//           {request.closed ? (
//             <div className="closed-message">
//               <p>This request has been closed.</p>
//               {request.price && <p><strong>Final Price:</strong> {request.price}</p>}
//             </div>
//           ) : (
//             <div>
//               <input
//                 type="number"
//                 placeholder="Enter price"
//                 onBlur={(e) => updatePrice(request, e.target.value)}
//               />
//               {!request.priceUpdated ? (
//                 <button disabled>Send</button>
//               ) : (
//                 <button onClick={() => sendRequestToDrivers(request)}>Send</button>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SecretaryTravelRequests;
