import React, { useContext, useEffect, useState } from "react";
import './user.css';
import Main from "../../main/Main";
import UserChat from "../chat/UserChat";
const User = () => {

    return (
        <>
            <Main />
            <UserChat/>
        </>
    );
};

export default User;



