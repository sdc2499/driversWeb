import React, { useState, useEffect, useContext } from 'react';
import socket from '../../socket';
import { useNavigate } from 'react-router-dom';
import './driver.css'
import { UserContext } from "../../App";
import RequestDetails from './RequestDetails';
import { getTokenFromCookie } from '../cookies/cookies';
import { getRequest } from '../../fetch';
const RidesAvailable = () => {

    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(UserContext);

    useEffect(() => {
        console.log("currentUser  " + currentUser)
        const fetchOpenRides = async () => {

            try {
                const response = await getRequest(`rides/waitingForDriver`)
                if (response.ok) {
                    const data = await response.json();
                    setRequests(data.data);
                }
            } catch {
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
        console.log("socket" + request.socketId)
        socket.emit('driverAccepted', { costumerEmail: request.costumerEmail, costumerId: request.costumerId, request: request.id, socketId: request.socketId, driverId: currentUser.id });
    };

    return (<>

        <div className="new-ride-requests">

            {(requests.length != 0) ? requests.map(request => (
                <div className="ride-request" key={request.id}>
                    {console.log(request)}
                    <RequestDetails request={request} />
                    <button className="accept-button" onClick={() => acceptRequest(request)}>אשר</button>
                </div>
            )) : <h1>אין בקשות זמינות כרגע</h1>}
        </div>

    </>)
}
export default RidesAvailable