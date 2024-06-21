import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './drivers.css';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [currentUser, setCurrentUser] = useContext(UserContext);
  
//   useEffect(() => {
//     fetch('http://localhost:8080/drivers', {
//       headers: { Authorization: currentUser.token }
//     })
//     .then(response => response.json())
//     .then(data => setDrivers(data))
//     .catch(error => console.error('Error fetching drivers data:', error));
//   }, [currentUser]);

  const handleJoinDrivers = () => {
    console.log('הצטרף כנהג');
  };

  return (
    <div className="container">
      <h1 className="title">הצטרף לצוות הנהגים שלנו</h1>
      <p>להיות נהג אצלנו מגיע עם יתרונות גדולים ותגמולים. הצטרף לצוות שלנו היום והתחל להרוויח!</p>
      
      <h2 className="subtitle">פרטי הנהגים</h2>
      <ul className="driver-list">
        {/* {drivers.map(driver => (
          <li className="driver-item" key={driver.id}>
            <h3>{driver.name}</h3>
            <p>אימייל: {driver.email}</p>
            <p>טלפון: {driver.phone}</p>
            <p>משכורת: {driver.salary}</p>
          </li>
        ))} */}
      </ul>

      <h2 className="subtitle">בונוסים</h2>
      <ul>
        <li>בונוס 1: 100$ על השלמת 50 נסיעות בחודש</li>
        <li>בונוס 2: 200$ על שמירה על דירוג מעל 4.8</li>
        <li>בונוס 3: 300$ על הפניית נהג חדש</li>
      </ul>

      {currentUser.userType === 'costumer' && (
        <button className="join-button" onClick={handleJoinDrivers}>הצטרף כנהג</button>
      )}
    </div>
  );
};

export default Drivers;
