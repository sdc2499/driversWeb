import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaUserEdit } from 'react-icons/fa';
// import './navlinks.css';

const NavLinks = ({ currentUser, logout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="dropdown">
            <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/contact`}>צור קשר</NavLink>
            <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/aboutUs`}>קצת עלינו</NavLink>
            <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/drivers`}>נהגים</NavLink>
            {currentUser.id ? (
                <>
                    <span onClick={toggleDropdown} className="dropdown-toggle">
                        {currentUser.firstName} <FaUser />
                    </span>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            <NavLink className="editPassword" to={`/home/${currentUser.userType}/${currentUser.id}/editDetails`}>
                                <FaUserEdit />
                            </NavLink>
                            <NavLink
                                onClick={logout}
                                to={'/home/main'}
                                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                            >
                                יציאה
                            </NavLink>
                        </div>
                    )}
                    <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>ראשי</NavLink>
                </>
            ) : (
                <>
                    <span onClick={toggleDropdown} className="dropdown-toggle">
                        הרשמה/התחברות <FaUser />
                    </span>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            <NavLink to="/login">התחברות</NavLink>
                            <NavLink to="/register">הרשמה</NavLink>
                        </div>
                    )}
                    <NavLink to={`/home/main`}>ראשי</NavLink>
                </>
            )}
        </div>
    );
};

export default NavLinks;


// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaUser, FaUserEdit } from 'react-icons/fa';
// // import './navlinks.css';

// const NavLinks = ({ currentUser, logout }) => (
//     <div className="dropdown">
//         <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/contact`}>צור קשר</NavLink>
//         <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/aboutUs`}>קצת עלינו</NavLink>
//         <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/drivers`}>נהגים</NavLink>
//         {currentUser.id ? (
//             <>
//                 <span >
//                     {currentUser.firstName} <FaUser />
//                     <div className="dropdown-content">
//                         <NavLink className="editPassword" to={`/home/${currentUser.userType}/${currentUser.id}/editDetails`}>
//                             <FaUserEdit />
//                         </NavLink>
//                         <NavLink
//                             to={`/home/${currentUser.userType}/${currentUser.id}/info`}
//                             className={({ isActive }) => (isActive ? 'active' : 'inactive')}
//                         >
//                             פרטים
//                         </NavLink>
//                         <NavLink onClick={logout} to={'/home/main'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
//                             יציאה
//                         </NavLink>
//                     </div>
//                 </span>
//                 <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>ראשי</NavLink>
//             </>
//         ) : (
//             <>
//                 <span className="dropdown-text">
//                     הרשמה/התחברות <FaUser />
//                     <div className="dropdown-content">
//                         <NavLink to="/login">התחברות</NavLink>
//                         <NavLink to="/register">הרשמה</NavLink>
//                     </div>
//                 </span>
//                 <NavLink to={`/home/main`}>ראשי</NavLink>
//             </>
//         )}
//     </div>
// );

// export default NavLinks;
