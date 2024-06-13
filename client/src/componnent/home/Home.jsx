import React, { useContext, useState } from 'react'
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { FaArrowCircleUp } from 'react-icons/fa';
import { FaUserEdit } from "react-icons/fa";

// import './Home.css'
const Home = () => {
    const navigate = useNavigate();
    const { firstName } = useParams();
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const logout = () => {
        localStorage.removeItem("currentUser");
        window.history.replaceState(null, null, '/');
    }

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 150) {
            setVisible(true)
        }
        else if (scrolled <= 150) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);

    // if (firstName != currentUser.firstName)
    //     navigate('/error')

    return (
        <>
            <header className={'sticky'}>
                <nav >
                    <NavLink  className='editPassword' to='./editPassword' ><FaUserEdit /> </NavLink><br />
                    <NavLink to='/login'>login</NavLink><br />
                    <NavLink to='/register'>register</NavLink><br />
                    <NavLink onClick={logout} to={'/login'} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Logout </NavLink><br />
                    <NavLink to="/home/info" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Info </NavLink>
                </nav>
            </header>
            {/* <h1>Hi {currentUser.firstName}</h1> */}
            <h1>Hi </h1>
            <footer>
                <button className='topBtn' style={{ display: visible ? 'inline' : 'none' }}>
                    <FaArrowCircleUp onClick={scrollToTop} />
                </button>
            </footer>
            <Outlet />
        </>
    )
}
export default Home
