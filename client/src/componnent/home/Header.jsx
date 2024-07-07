import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import NavLinks from './NavLinks';
// import './header.css';

const Header = ({ currentUser, logout }) => (
    <header className="sticky">
        <nav>
            <NavLinks currentUser={currentUser} logout={logout} />
            <button onClick={() => handleRequestRideClick()} className="ride-button">
                הזמנת נסיעה
            </button>
            {currentUser.userType === 'secretary' && (
                <NavLink to={`/home/secretary/${currentUser.id}/travelRequests`}>
                    בקשות נסיעה
                </NavLink>
            )}
            {currentUser.userType === 'driver' && (
                <>
                    <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/acceptedRequests`}>
                        נסיעות שנלקחו על ידי
                    </NavLink>
                    <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/ridesAvailable`}>
                        בקשות נסיעה
                    </NavLink>
                </>
            )}
        </nav>
    </header>
);

export default Header;
