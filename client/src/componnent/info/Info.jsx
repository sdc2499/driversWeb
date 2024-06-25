import React, { useContext, useEffect } from "react";
import { UserContext } from '../../App'
// import "./info.css"
const Info = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  return (
    <>
      <div className="info_item">
        <h1>פרטיים</h1>
        <p><span>מזהה:</span> {currentUser.id}</p>
        <p><span>שם פרטי:</span> {currentUser.firstName}</p>
        <p><span>שם משפחה:</span> {currentUser.lastName}</p>
        <p><span>מייל:</span> {currentUser.email}</p>
        <p><span>פלאפון: </span>{currentUser.phone}</p>
      </div>
    </>
  )
}
export default Info