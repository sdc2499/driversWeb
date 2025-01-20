import React, { useState, useEffect, useContext } from 'react';
import socket from '../../socket';
import { useNavigate, NavLink } from 'react-router-dom';
import './driver.css'
import { UserContext } from "../../App";
import Main from '../../main/Main';
import DriverRatings from './DriverRatings';

const Driver = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const handleNewRequest = (request) => {
      setNotification(true);
      let timer = setTimeout(() => {
        setNotification(false);
      }, 3000);
    };
    socket.on('rideRequestForDrivers', handleNewRequest);
    return () => {
      socket.off('rideRequestForDrivers', handleNewRequest);
    };
  }, []);
  return (
    <>
      <Main />

      {notification && (
        <div className="notification show">
          יש בקשה חדשה!{' '}
          <NavLink to={`/home/driver/${currentUser.id}/ridesAvailable`}>לחצו כאן</NavLink>
          לעבור לעמוד הבקשות.
        </div>
      )}
      
    </>
  );
};

export default Driver;




