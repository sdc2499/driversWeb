import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../App'
// import "./info.css"
const User = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [openForm,setOpenForm]=useState(false)
    function registerDriver(){
        

    }
    return (
        <>
                <h1>Hello {currentUser.firstName} {currentUser.lastName}!!!</h1>
                <button onClick={()=>setOpenForm(!openForm)}>To became a driver press here</button>
                {openForm && <form>
                    
                    </form>}
        </>
    )
}
export default User