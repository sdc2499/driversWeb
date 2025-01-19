import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet ,NavLink, Link} from 'react-router-dom';
import { UserContext } from '../../App';
import Header from './Header';
import SecretaryChat from '../chat/SecretaryChat';
import UserChat from '../chat/UserChat';
import './home.css';
import ScrollToTopButton from '../home/ScrollToTopButton';

const Home = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [visible, setVisible] = useState(false);

    // Scroll to Top Button
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 150);
        };
        window.addEventListener('scroll', handleScroll);
        // if(currentUser.id)
        //     if(currentUser.id!=id)
        // <NavLink className="editPassword" to={`/erorr`}></NavLink>
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser([]);
        navigate('/home');
    };

    return (
        <>
            <Header currentUser={currentUser} logout={logout} />
            {currentUser.userType === 'secretary' && <SecretaryChat />}
            {currentUser.userType === 'customer' && <UserChat />}
            {/* <footer>
                <ScrollToTopButton visible={visible} />
            </footer> */}
            <Outlet />
        </>
    );
};

export default Home;

// import React, { useContext, useState, useEffect } from 'react';
// import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../App';
// import { FaUser, FaArrowCircleUp, FaUserEdit } from 'react-icons/fa';

// import './home.css';
// import SecretaryChat from '../chat/SecretaryChat';
// import UserChat from '../chat/UserChat';
// const Home = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [currentUser, setCurrentUser] = useContext(UserContext);

//     const logout = () => {
//         localStorage.removeItem("currentUser");
//         window.history.replaceState(null, null, '/');
//         setCurrentUser([]);
//     }

//     const [visible, setVisible] = useState(false);

//     const toggleVisible = () => {
//         const scrolled = document.documentElement.scrollTop;
//         setVisible(scrolled > 150);
//     };

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     };

//     window.addEventListener('scroll', toggleVisible);

//     const handleRequestRideClick = () => {
//         if (currentUser.id) {
//             navigate(`/home/${currentUser.userType}/${currentUser.id}/requestRide`);
//         } else {
//             navigate(`/home/requestRide`);
//         }
//     };
//     return (
//         <>
//             <header className={'sticky'}>
//                 <nav>
//                     <div className="dropdown">
//                         <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/contact`}>צור קשר</NavLink>
//                         <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/aboutUs`}>קצת עלינו</NavLink>
//                         <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/drivers`}>נהגים</NavLink>
//                         {currentUser.id ? (
//                             <>
//                                 <span className="dropdown-text">
//                                     {currentUser.firstName} <FaUser />
//                                     <div className="dropdown-content">
//                                         <NavLink className='editPassword' to={`/home/${currentUser.userType}/${currentUser.id}/editDetails`}><FaUserEdit /></NavLink>
//                                         <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/info`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>פרטים</NavLink>
//                                         <NavLink onClick={logout} to={'/home'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>יציאה</NavLink>
//                                     </div>
//                                 </span>
//                                 <NavLink to={`/home/${currentUser.userType}/${currentUser.id}`}>ראשי</NavLink>
//                             </>
//                         ) : (
//                             <>
//                                 <span className="dropdown-text">
//                                     הרשמה/התחברות<FaUser />
//                                     <div className="dropdown-content">
//                                         <NavLink to='/login'>התחברות</NavLink><br />
//                                         <NavLink to='/register'>הרשמה</NavLink><br />
//                                     </div>
//                                 </span>
//                                 <NavLink to={`/home`}>ראשי</NavLink>
//                             </>
//                         )}
//                     </div>
//                     <button onClick={handleRequestRideClick} className="ride-button">הזמנת נסיעה</button>
//                     {currentUser.userType === 'secretary' && <NavLink to={`/home/secretary/${currentUser.id}/travelRequests`}>בקשות נסיעה</NavLink>}
//                     {currentUser.userType === 'driver' && (<><NavLink to={`/home/${currentUser.userType}/${currentUser.id}/acceptedRequests`}>נסיעות שנלקחו על ידי</NavLink>
//                         <NavLink to={`/home/${currentUser.userType}/${currentUser.id}/ridesAvailable`}>בקשות נסיעה</NavLink></>)}
//                 </nav>
//             </header>

//             {currentUser.userType === 'secretary' && <SecretaryChat />}
//             {currentUser.userType === 'costumer' && <UserChat />}
//             <footer>
//                 <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
//                     <FaArrowCircleUp onClick={scrollToTop} />
//                 </button>
//             </footer>
//             <Outlet />
//         </>
//     );
// };
// export default Home;
