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
        console.log(data+data.id)
        setCurrentUser({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            userType: data.userType
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
            <h1>Login</h1>
            {!exist && <div>Incorrect phone or password</div>}
            <form noValidate onSubmit={handleSubmit(logIn)}>
                <input type='tel' name='phone' placeholder='Phone'
                    {...register("phone", {
                        required: "Phone is required.",
                    })} />
                {errors.phone && <p>{errors.phone.message}</p>}

                <input type="password" name="password" placeholder='Password'
                    {...register("password", {
                        required: "Password is required.",
                    })} />
                {errors.password && <p>{errors.password.message}</p>}

                <input type="submit" value="Log In" />
            </form>
            <div className="link">New here? <Link to={'/register'}>Please sign up</Link></div>
        </div>
    );
};

export default Login;




// import React, { useState, useContext, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../../App';
// import { useForm } from 'react-hook-form';
// import './auth.css';

// const Login = () => {
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const [exist, setExist] = useState(true);
//     const navigate = useNavigate();
//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const containerRef = useRef(null);
//     const signInBtnRef = useRef(null);
//     const signUpBtnRef = useRef(null);

//     const goToHome = (data, token_) => {
//         setCurrentUser({
//             id: data.id,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//             phone: data.phone,
//             userType: data.userType
//         });
//         localStorage.setItem('currentUser', JSON.stringify({ phone: data.phone, userId: data.id, token: token_ }));
//         navigate(`/home/${data.userType}/${data.id}`);
//     };

//     const logIn = async (user) => {
//         try {
//             const response = await fetch(`http://localhost:8080/entrance/login`, {
//                 method: 'POST',
//                 body: JSON.stringify({ phone: user.phone, password: user.password }),
//                 headers: { 'Content-type': 'application/json; charset=UTF-8' }
//             });
//             const data = await response.json();
//             goToHome(data.data, data.token);
//         } catch (error) {
//             if (error.status == 500)
//                 alert("Oops, something went wrong... please try again!");
//             else
//                 setExist(false);
//         }
//     };

//     useEffect(() => {
//         const signInBtn = signInBtnRef.current;
//         const signUpBtn = signUpBtnRef.current;
//         const container = containerRef.current;

//         if (signInBtn && signUpBtn && container) {
//             signInBtn.addEventListener("click", () => {
//                 container.classList.remove("right-panel-active");
//             });

//             signUpBtn.addEventListener("click", () => {
//                 container.classList.add("right-panel-active");
//             });
//         }
//     }, []);

//     return (
//         <div className="container" ref={containerRef}>
//             <div className="container__form container--signin">
//                 <form className="form" onSubmit={handleSubmit(logIn)}>
//                     <h2 className="form__title">Sign In</h2>
//                     <input type='tel' placeholder='Phone' className="input"
//                         {...register("phone", { required: "Phone is required." })} />
//                     {errors.phone && <p>{errors.phone.message}</p>}

//                     <input type="password" placeholder='Password' className="input"
//                         {...register("password", { required: "Password is required." })} />
//                     {errors.password && <p>{errors.password.message}</p>}

//                     <button className="btn">Sign In</button>
//                 </form>
//                 {!exist && <div>Incorrect phone or password</div>}
//             </div>

//             <div className="container__overlay">
//                 <div className="overlay">
//                     <div className="overlay__panel overlay--left">
//                         <button className="btn" id="signIn" ref={signInBtnRef}>Sign In</button>
//                     </div>
//                     <div className="overlay__panel overlay--right">
//                         <button className="btn" id="signUp" ref={signUpBtnRef}>Sign Up</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
