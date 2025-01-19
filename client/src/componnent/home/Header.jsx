import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';

const Header = ({ currentUser, logout }) => {
    const navigate = useNavigate();

    const handleRequestRideClick = () => {
        const path = currentUser.id
            ? `/home/${currentUser.userType}/${currentUser.id}/requestRide`
            : `/home/requestRide`;
        navigate(path);
    };

    return (
        <header className="sticky">
            <nav className="main-nav">
                {/* מעבירים את המשתמש הנוכחי לרכיב NavLinks */}
                <NavLinks currentUser={currentUser} logout={logout} />
                <button onClick={handleRequestRideClick} className="ride-button">
                    הזמנת נסיעה
                </button>
                {/* תפריט ייחודי לפי סוג המשתמש */}
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
};

export default Header;


// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaUser } from 'react-icons/fa';
// import NavLinks from './NavLinks';
// import { useParams, useNavigate, Outlet } from 'react-router-dom';
// // import './header.css';

// const Header = ({ currentUser, logout }) => {
//     const navigate = useNavigate();
//     const handleRequestRideClick = () => {
//         const path = currentUser.id
//             ? `/home/${currentUser.userType}/${currentUser.id}/requestRide`
//             : `/home/requestRide`;
//         navigate(path);
//     };
//     return (<header className="sticky">
//         <nav>
//             <NavLinks currentUser={currentUser} logout={logout} />
//             <button onClick={() => handleRequestRideClick()} className="ride-button">
//                 הזמנת נסיעה
//             </button>
//             {currentUser.userType === 'secretary' && (
//                 <NavLink to={`/home/secretary/${currentUser.id}/travelRequests`}>
//                     בקשות נסיעה
//                 </NavLink>
//             )}
//             {currentUser.userType === 'driver' && (
//                 <>
//                     <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/acceptedRequests`}>
//                         נסיעות שנלקחו על ידי
//                     </NavLink>
//                     <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/ridesAvailable`}>
//                         בקשות נסיעה
//                     </NavLink>
//                 </>
//             )}
//         </nav>
//     </header>)
// }

// export default Header;
