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
      {/* <div className="driver-welcome-container">
        <h1>ברוך הבא, נהג יקר!</h1>
        <p>
          אנחנו שמחים לראות אותך כאן. כמוביל בשירות התחבורה שלנו, יש לך את הכוח והיכולת לספק חוויית נסיעה בטוחה, נעימה ומקצועית לכל הנוסעים.
        </p>
        <h2>מה ניתן לעשות בעמוד זה?</h2>
        <ul>
          <li>בדוק בקשות נסיעה זמינות: ראה את כל הבקשות הנסיעה הממתינות לקבלתך.</li>
          <li>ניהול נסיעות מאושרות: עקוב אחר כל הנסיעות שקיבלת והתחל את הנסיעה בזמן המיועד.</li>
          <li>פרופיל אישי: עדכן את פרטיך האישיים ונהל את חשבונך בקלות.</li>
          <li>היסטוריית נסיעות: צפה ברשימת הנסיעות הקודמות שלך ובביקורות שקיבלת.</li>
        </ul>
        <h2>טיפים לשירות טוב:</h2>
        <ol>
          <li>הקפד על בטיחות: וודא שהרכב שלך במצב תקין ושמור על כללי התעבורה.</li>
          <li>דייק בזמנים: נסה להגיע בזמן המיועד לכל נסיעה.</li>
          <li>תקשורת ברורה: תתקשר עם הנוסעים בנעימות וענה על כל שאלותיהם.</li>
          <li>שמור על נקיון: שמור על רכב נקי ומסודר לנוחות הנוסעים.</li>
        </ol>
        <p>
          אנחנו כאן לתמוך בך בכל שלב. אם נתקלת בבעיה או יש לך שאלה, אל תהסס לפנות אלינו דרך דף התמיכה או שירות הלקוחות שלנו.
        </p>
        <p>
          נסיעה בטוחה ומהנה!
        </p>
      </div> */}
    </>
  );
};

export default Driver;




