// import React, { useContext, useState, useEffect } from 'react';
// import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../App';
// import { FaUser } from "react-icons/fa";
// import { FaArrowCircleUp, FaUserEdit } from 'react-icons/fa';
// import './home.css';

// const Home = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [currentUser, setCurrentUser] = useContext(UserContext);

//     const logout = () => {
//         localStorage.removeItem("currentUser");
//         window.history.replaceState(null, null, '/');
//     }

//     const [visible, setVisible] = useState(false);

//     const toggleVisible = () => {
//         const scrolled = document.documentElement.scrollTop;
//         if (scrolled > 150) {
//             setVisible(true);
//         } else if (scrolled <= 150) {
//             setVisible(false);
//         }
//     };

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     };
//     window.addEventListener('scroll', toggleVisible);

//     return (
//         <>
//             <header className={'sticky'}>
//                 <nav>
//                     <div className="dropdown">
//                         {currentUser.id ? <>
//                             <span className="dropdown-text">{currentUser.firstName}  <FaUser /></span>
//                             <div className="dropdown-content">
//                                 <NavLink className='editPassword' to={`/home/${currentUser.userType}/${currentUser.id}/editDetails`}><FaUserEdit /></NavLink>
//                                 <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout</NavLink>
//                             </div>
//                         </> : <>
//                             <span className="dropdown-text">הרשמה/התחברות  <FaUser /></span>
//                             <div className="dropdown-content">
//                                 <NavLink to='/login'>Login</NavLink><br />
//                                 <NavLink to='/register'>Register</NavLink><br />
//                             </div>
//                         </>}
//                     </div>
//                     <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>home</NavLink>
//                     <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/info`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info</NavLink>
//                     {currentUser.userType!="secretary"&&<NavLink to={`/home/${currentUser.userType}/${currentUser.id}/requestRide`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>הזמנת נסיעה</NavLink>}
//                 </nav>
//             </header>
//             <footer>
//                 <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
//                     <FaArrowCircleUp onClick={scrollToTop} />
//                 </button>
//             </footer>
//             <Outlet />
//         </>
//     );
// }

// export default Home;


// // import React, { useContext, useState,useEffect } from 'react';
// // import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
// // import { UserContext } from '../../App';
// // import { FaUser } from "react-icons/fa";
// // import { FaArrowCircleUp, FaUserEdit } from 'react-icons/fa';
// // import './home.css';

// // const Home = () => {
// //     const navigate = useNavigate();
// //     const { id } = useParams();
// //     const [currentUser, setCurrentUser] = useContext(UserContext);

// //     const logout = () => {
// //         localStorage.removeItem("currentUser");
// //         window.history.replaceState(null, null, '/');
// //     }

// //     const [visible, setVisible] = useState(false);

// //     const toggleVisible = () => {
// //         const scrolled = document.documentElement.scrollTop;
// //         if (scrolled > 150) {
// //             setVisible(true);
// //         } else if (scrolled <= 150) {
// //             setVisible(false);
// //         }
// //     };

// //     const scrollToTop = () => {
// //         window.scrollTo({
// //             top: 0,
// //             behavior: 'smooth'
// //         });
// //     };
// //     window.addEventListener('scroll', toggleVisible);

// //     // if (id != currentUser.id) {
// //     //     navigate('/error');
// //     // }

// //     return (
// //         <>
// //             <header className={'sticky'}>
// //                 <nav>
// //                     <div className="dropdown">
// //                         {currentUser.id ? <>
// //                             <span className="dropdown-text">{currentUser.firstName}  <FaUser /></span>
// //                             <div className="dropdown-content">
// //                                 <NavLink className='editPassword' to={`/home/${currentUser.userType}/${currentUser.id}/editDetails`}><FaUserEdit /></NavLink>
// //                                 <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout</NavLink>
// //                             </div>
// //                         </> : <>
// //                             <span className="dropdown-text">הרשמה/התחברות  <FaUser /></span>
// //                             <div className="dropdown-content">
// //                                 <NavLink to='/login'>Login</NavLink><br />
// //                                 <NavLink to='/register'>Register</NavLink><br />
// //                             </div>
// //                         </>}
// //                     </div>
// //                     <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>home</NavLink>
// //                     <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/info`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info</NavLink>
// //                 </nav>
// //             </header>
// //             <footer>
// //                 <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
// //                     <FaArrowCircleUp onClick={scrollToTop} />
// //                 </button>
// //             </footer>
// //             <Outlet />
// //         </>
// //     );
// // }

// // export default Home;











import React, { useContext, useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { FaUser, FaArrowCircleUp, FaUserEdit } from 'react-icons/fa';
import SecretaryDashboard from '../chat/chatS';
import ChatRequestButton from '../chat/chat';
import './home.css';

const Home = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, null, '/');
        setCurrentUser([]);
    }

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        setVisible(scrolled > 150);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    const handleRequestRideClick = () => {
        if (currentUser.id) {
            navigate(`/home/${currentUser.userType}/${currentUser.id}/requestRide`);
        } else {
            navigate(`/home/requestRide`);
        }
    };
    return (
        <>
            <header className={'sticky'}>
                <nav>
                    <div className="dropdown">
                        <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/contact`}>צור קשר</NavLink>
                        <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/aboutUs`}>קצת עלינו</NavLink>
                        <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/drivers`}>נהגים</NavLink>
                        {currentUser.id ? (
                            <>
                                <span className="dropdown-text">
                                    {currentUser.firstName} <FaUser />
                                    <div className="dropdown-content">
                                        <NavLink className='editPassword' to={`/home/${currentUser.userType}/${currentUser.id}/editDetails`}><FaUserEdit /></NavLink>
                                        <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/info`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>פרטים</NavLink>
                                        <NavLink onClick={logout} to={'/home'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>יציאה</NavLink>
                                    </div>
                                </span>
                                <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>ראשי</NavLink>
                            </>
                        ) : (
                            <>
                                <span className="dropdown-text">
                                    הרשמה/התחברות<FaUser />
                                    <div className="dropdown-content">
                                        <NavLink to='/login'>התחברות</NavLink><br />
                                        <NavLink to='/register'>הרשמה</NavLink><br />
                                    </div>
                                </span>
                                <NavLink to={`/home`}>ראשי</NavLink>
                            </>
                        )}
                    </div>
                    <button onClick={handleRequestRideClick} className="ride-button">הזמנת נסיעה</button>
                </nav>
            </header>
            {console.log("👩🏽"+currentUser.userType)}
            {currentUser.userType === 'costumer' ? <ChatRequestButton />:console.log("n "+currentUser.userType)}
            {currentUser.userType === 'secretary' ? <SecretaryDashboard />:console.log("👩🏽n"+currentUser.userType)}
            <footer>
                <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
                    <FaArrowCircleUp onClick={scrollToTop} />
                </button>
            </footer>
            <Outlet />
        </>
    );
};
export default Home;
