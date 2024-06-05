import React, { useContext, useEffect } from "react";
import { UserContext } from '../../App'
// import "./info.css"
const Info = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  return (
    <>
      <div className="info_item">
        <h1>info</h1>
        <p><span>id:</span> {currentUser.userId}</p>
        <p><span>name:</span> {currentUser.name}</p>
        <p><span>username:</span> {currentUser.username}</p>
        <p><span>email:</span> {currentUser.email}</p>
        <p><span>phone: </span>{currentUser.phone}</p>
      </div>
    </>
  )
}
export default Info