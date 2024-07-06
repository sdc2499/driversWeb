import React, { useState, useEffect, useContext } from 'react';
import socket from '../../socket';
import { UserContext } from "../../App";
import './secretaryCss.css';
import { useNavigate, NavLink } from 'react-router-dom';

const Secretary = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    let timer;
    socket.on('rideRequestForSecretary', () => {
      setNotification(true);
      timer = setTimeout(() => {
        setNotification(false);
      }, 3000); 
    });

    return () => {
      socket.off('rideRequestForSecretary');
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <h1>אני מזכירה תותחיתתתת</h1>
      {notification && (
        <div className="notification show">
          יש בקשה חדשה!{' '}
          <NavLink to={`/home/secretary/${currentUser.id}/travelRequests`}>לחצו כאן</NavLink>
          לעבור לעמוד הבקשות.
        </div>
      )}
    </div>
  );
}

export default Secretary;
