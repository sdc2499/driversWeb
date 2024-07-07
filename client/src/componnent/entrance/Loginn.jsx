import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import ForgotPasswordModal from '../forgotPasswordModal/ForgotPasswordModal';
import { setTokenCookie } from '../cookies/cookies';

// import ForgotPasswordModal from './ForgotPasswordModal';
import './login.css';
import { postFetch } from '../../fetch';

const Login = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [exist, setExist] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const goToHome = (data, token_) => {
        console.log("data.userType" + data.userType);

        switch (data.userType) {
            case '1':
                data.userType = "costumer";
                break;
            case '2':
                console.log("driver");
                data.userType = "driver";
                break;
            case '3':
                console.log("secretry");
                data.userType = "secretary";
                break;
        }

        setCurrentUser({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            userType: data.userType

        });
        localStorage.setItem('currentUser', JSON.stringify({ phone: data.phone, userId: data.id }));
        navigate(`/home/${data.userType}/${data.id}`);
    };

    const logIn = async (user) => {


        try {
            const response = await postFetch(`entrance/login`, { phone: user.phone, password: user.password })
            if (response.ok) {
                const data = await response.json();
                setTokenCookie(data.token)
                goToHome(data.data);
            }
        } catch (error){
            if (error.status == 500)
                alert("Oops, something went wrong... please try again!");
            else
                setExist(false);
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="container">
            <h1>כניסה</h1>
            {!exist && <div>הפרטים שהזנת אינם קיימים במערכת. אנא בדוק ונסה שוב, או הירשם כלקוח חדש.</div>}
            <form noValidate onSubmit={handleSubmit(logIn)}>
                <input type='tel' name='phone' placeholder='טלפון'
                    {...register("phone", {
                        required: "יש להכניס טלפון",
                    })} />
                {errors.phone && <p>{errors.phone.message}</p>}

                <input type="password" name="password" placeholder='סיסמא'
                    {...register("password", {
                        required: "יש להכניס סיסמא",
                    })} />
                {errors.password && <p>{errors.password.message}</p>}

                <input type="submit" value="כניסה" />
            </form>

            {/* כפתור לפתיחת חלונית שחזור סיסמה */}
            <button onClick={openModal}>שכחתי סיסמה</button>
            <ForgotPasswordModal isOpen={modalIsOpen} closeModal={closeModal} />

            <div className="link"> משתמש חדש? <Link to={'/register'}>להרשמה</Link></div>
        </div>
    );
};

export default Login;
