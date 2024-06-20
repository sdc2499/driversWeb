import React, { useContext, useState, useEffect } from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { FaUser } from "react-icons/fa";
import { FaArrowCircleUp, FaUserEdit } from 'react-icons/fa';
import './home.css';

const Home = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, null, '/');
    }

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 150) {
            setVisible(true);
        } else if (scrolled <= 150) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);

    return (
        <>
            <header className={'sticky'}>
                <nav>
                    <div className="dropdown">
                        {currentUser.id ? <>
                            <span className="dropdown-text">{currentUser.firstName}  <FaUser /></span>
                            <div className="dropdown-content">
                                <NavLink className='editPassword' to={`/home/${currentUser.userType}/${currentUser.id}/editDetails`}><FaUserEdit /></NavLink>
                                <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout</NavLink>
                            </div>
                        </> : <>
                            <span className="dropdown-text">הרשמה/התחברות  <FaUser /></span>
                            <div className="dropdown-content">
                                <NavLink to='/login'>Login</NavLink><br />
                                <NavLink to='/register'>Register</NavLink><br />
                            </div>
                        </>}
                    </div>
                    <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>home</NavLink>
                    <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/info`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info</NavLink>
                    {currentUser.userType!="secretary"&&<NavLink to={`/home/${currentUser.userType}/${currentUser.id}/requestRide`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>הזמנת נסיעה</NavLink>}
                </nav>
            </header>
            <footer>
                <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
                    <FaArrowCircleUp onClick={scrollToTop} />
                </button>
            </footer>
            <Outlet />
        </>
    );
}

export default Home;


// import React, { useContext, useState,useEffect } from 'react';
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

//     // if (id != currentUser.id) {
//     //     navigate('/error');
//     // }

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
