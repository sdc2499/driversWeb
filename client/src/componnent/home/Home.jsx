



// import React, { useContext, useState, useEffect } from 'react';
// import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../App';
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
//         } else {
//             setVisible(false);
//         }
//     };

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', toggleVisible);
//         return () => {
//             window.removeEventListener('scroll', toggleVisible);
//         };
//     }, []);

//     if (id !== currentUser.id) {
//         navigate('/error');
//     }

//     return (
//         <div className="wrapper">
//             <header className={`sticky ${visible ? 'hide' : ''}`}>
//                 <nav>
//                     <NavLink className='editPassword' to='./editDetails'><FaUserEdit /></NavLink>
//                     {currentUser.id ? (
//                         <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout</NavLink>
//                     ) : (
//                         <div className="dropdown">
//                             <span className="dropdown-text">הרשמה/התחברות</span>
//                             <div className="dropdown-content">
//                                 <NavLink to='/login'>Login</NavLink><br />
//                                 <NavLink to='/register'>Register</NavLink><br />
//                             </div>
//                         </div>
//                     )}
//                     <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>home</NavLink>
//                     <NavLink to="/home/info" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info</NavLink>
//                 </nav>
//             </header>
//             <main>
//                 {/* תוכן העמוד הראשי */}
//                 <Outlet />
//             </main>
//             <footer>
//                 <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
//                     <FaArrowCircleUp onClick={scrollToTop} />
//                 </button>
//             </footer>
//         </div>
//     );
// }

// export default Home;




// import React, { useContext, useState } from 'react'
// import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom'
// import { UserContext } from '../../App'
// import { FaArrowCircleUp } from 'react-icons/fa';
// import { FaUserEdit } from "react-icons/fa";
// import './home.css'
// const Home = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const logout = () => {
//         localStorage.removeItem("currentUser");
//         window.history.replaceState(null, null, '/');
//     }

//     const [visible, setVisible] = useState(false)
//     const toggleVisible = () => {
//         const scrolled = document.documentElement.scrollTop;
//         if (scrolled > 150) {
//             setVisible(true)
//         }
//         else if (scrolled <= 150) {
//             setVisible(false)
//         }
//     };

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     };
//     window.addEventListener('scroll', toggleVisible);

//     if (id != currentUser.id)
//         navigate('/error')

//     return (
//         <>
//             <header className={'sticky'}>
//                 <nav >
//                     <NavLink className='editPassword' to='./editDetails' ><FaUserEdit /> </NavLink>
//                     {currentUser.id ?
//                         <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout </NavLink> :
//                         <><NavLink to='/login'>login</NavLink><br />
//                             <NavLink to='/register'>register</NavLink><br /></>}
//                     <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>home</NavLink>
//                     <NavLink to="/home/info" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info </NavLink>
//                 </nav>
//             </header>
//             {/* <h1>Hi {currentUser.firstName}</h1> */}
//             <footer>
//                 <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
//                     <FaArrowCircleUp onClick={scrollToTop} />
//                 </button>
//             </footer>
//             <Outlet />
//         </>
//     )
// }
// export default Home




import React, { useContext, useState } from 'react';
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

    // if (id != currentUser.id) {
    //     navigate('/error');
    // }

    return (
        <>
            <header className={'sticky'}>
                <nav>
                    <div className="dropdown">
                        {currentUser.id ? <>
                            <span className="dropdown-text">{currentUser.firstName}  <FaUser/></span>
                            <div className="dropdown-content">
                                <NavLink className='editPassword' to={`/home/${currentUser.userType}/${currentUser.id}/editDetails`}><FaUserEdit /></NavLink>
                                <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout</NavLink>
                            </div>
                        </> : <>
                            <span className="dropdown-text">הרשמה/התחברות  <FaUser/></span>
                            <div className="dropdown-content">
                                <NavLink to='/login'>Login</NavLink><br />
                                <NavLink to='/register'>Register</NavLink><br />
                            </div>
                        </>}
                    </div>
                    <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>home</NavLink>
                    <NavLink to="/home/info" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info</NavLink>
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
