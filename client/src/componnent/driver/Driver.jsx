import React, { useState, useEffect, useContext } from 'react';
import socket from '../../socket';
import { useNavigate, NavLink } from 'react-router-dom';
import './driver.css'
import { UserContext } from "../../App";
import Main from '../../main/Main';

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
      <h1 className="page-title">שלום לך נהג - {currentUser.firstName}</h1>
      {notification && (
        <div className="notification show">
          יש בקשה חדשה!{' '}
          <NavLink to={`/home/driver/${currentUser.id}/ridesAvailable`}>לחצו כאן</NavLink>
          לעבור לעמוד הבקשות.
        </div>
      )}
      <Main/>
    </>
  );
};

export default Driver;




