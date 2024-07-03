import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import './login.css';

const Login = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [exist, setExist] = useState(true);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const goToHome = (data, token_) => {
        setCurrentUser({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            userType: data.userType,
            token:token_
        });
        localStorage.setItem('currentUser', JSON.stringify({ phone: data.phone, userId: data.id, token: token_ }));
        navigate(`/home/${data.userType}/${data.id}`);
    };

    const logIn = async (user) => {
        try {
            const response = await fetch(`http://localhost:8080/entrance/login`, {
                method: 'POST',
                body: JSON.stringify({ phone: user.phone, password: user.password }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            const data = await response.json();
            goToHome(data.data, data.token);
        } catch (error) {
            if (error.status == 500)
                alert("Oops, something went wrong... please try again!");
            else
                setExist(false);
        }
    };

    return (
        <div className="container">
            <h1>כניסה</h1>
            {!exist && <div>הפרטיים אינם מדויקים</div>}
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
            <div className="link">אתה משתמש חדש? <Link to={'/register'}> בבקשה תרשם </Link></div>
        </div>
    );
};

export default Login;