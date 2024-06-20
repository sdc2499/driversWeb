import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
    const navigate = useNavigate();
    const [exist, setExist] = useState("");
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const goToHome = (user, data) => {
        console.log(data.token);
        setCurrentUser({
            id: data.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        });
        
        localStorage.setItem('currentUser', JSON.stringify({ phone: user.phone, userId: data.id, token: data.dataToken }));
        navigate(`/home/costumer/${data.id}`);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const addDetails = (data) => {
        if (data.password !== data.passwordVerification) {
            setExist("notValid");
            return;
        }
        const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            password: data.password
        };

        fetch('http://localhost:8080/entrance/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(async response => {
                const data = await response.json();
                console.log("data in register::: " + data + data.status + user + user.firstName);
                if (data.status === 200)
                    goToHome(user, data);
                else
                    throw new Error(response);
            }).catch(response => {
                (response.status === 409) ?
                    alert("user already exists") :
                    alert("oops somthing went wrong... please try again!");
            });
    };

    return (
        <div className="container">
            <h1>Sign Up</h1>
            {exist === "notValid" && <div>Not valid input</div>}
            {exist === "exist" && <div>You are an existing user, please log in!</div>}
            <div>
                <form noValidate onSubmit={handleSubmit(addDetails)}>
                    <input type="text" name="firstName" placeholder="First Name"
                        {...register("firstName", {
                            required: "First name is required.",
                        })} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}

                    <input type="text" name="lastName" placeholder="Last Name"
                        {...register("lastName", {
                            required: "Last name is required.",
                        })} />
                    {errors.lastName && <p>{errors.lastName.message}</p>}

                    <input type="password" name="password" placeholder="Password"
                        {...register("password", {
                            required: "Password is required.",
                        })} />
                    {errors.password && <p>{errors.password.message}</p>}

                    <input type="password" name="passwordVerification" placeholder="Password Verification"
                        {...register("passwordVerification", {
                            required: "Password verification is required.",
                        })} />
                    {errors.passwordVerification && <p>{errors.passwordVerification.message}</p>}

                    <input type="email" name="email" placeholder="Email"
                        {...register("email", {
                            required: "Email is required.",
                        })} />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input type="tel" name="phone" placeholder="Phone"
                        {...register("phone", {
                            required: "Phone is required.",
                        })} />
                    {errors.phone && <p>{errors.phone.message}</p>}

                    <input type="submit" value="Sign Up" />
                </form>
            </div>
            <div className="link">
                Are you an existing user? <Link to={'/login'}>Please login</Link>
            </div>
        </div>
    );
}

export default Register;

// import React, { useState, useContext, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { UserContext } from '../../App';
// import { useNavigate } from 'react-router-dom';
// import './auth.css';

// const Register = () => {
//     const navigate = useNavigate();
//     const [exist, setExist] = useState("");
//     const [currentUser, setCurrentUser] = useContext(UserContext);

//     const containerRef = useRef(null);
//     const signInBtnRef = useRef(null);
//     const signUpBtnRef = useRef(null);

//     const goToHome = (user, data) => {
//         setCurrentUser({
//             id: data.id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             phone: user.phone
//         });
//         localStorage.setItem('currentUser', JSON.stringify({ phone: user.phone, userId: data.id, token: data.dataToken }));
//         navigate(`/home/costumer/${data.id}`);
//     };

//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const addDetails = (data) => {
//         if (data.password !== data.passwordVerification) {
//             setExist("notValid");
//             return;
//         }
//         const user = {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             phone: data.phone,
//             email: data.email,
//             password: data.password
//         };

//         fetch('http://localhost:8080/entrance/register', {
//             method: 'POST',
//             body: JSON.stringify(user),
//             headers: { 'Content-type': 'application/json; charset=UTF-8' }
//         })
//             .then(async response => {
//                 const data = await response.json();
//                 if (data.status === 200)
//                     goToHome(user, data);
//                 else
//                     throw new Error(response);
//             }).catch(response => {
//                 (response.status === 409) ?
//                     alert("user already exists") :
//                     alert("oops somthing went wrong... please try again!");
//             });
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
//             <div className="container__form container--signup">
//                 <form className="form" onSubmit={handleSubmit(addDetails)}>
//                     <h2 className="form__title">Sign Up</h2>
//                     <input type="text" placeholder="First Name" className="input"
//                         {...register("firstName", { required: "First name is required." })} />
//                     {errors.firstName && <p>{errors.firstName.message}</p>}

//                     <input type="text" placeholder="Last Name" className="input"
//                         {...register("lastName", { required: "Last name is required." })} />
//                     {errors.lastName && <p>{errors.lastName.message}</p>}

//                     <input type="password" placeholder="Password" className="input"
//                         {...register("password", { required: "Password is required." })} />
//                     {errors.password && <p>{errors.password.message}</p>}

//                     <input type="password" placeholder="Password Verification" className="input"
//                         {...register("passwordVerification", { required: "Password verification is required." })} />
//                     {errors.passwordVerification && <p>{errors.passwordVerification.message}</p>}

//                     <input type="email" placeholder="Email" className="input"
//                         {...register("email", { required: "Email is required." })} />
//                     {errors.email && <p>{errors.email.message}</p>}

//                     <input type="tel" placeholder="Phone" className="input"
//                         {...register("phone", { required: "Phone is required." })} />
//                     {errors.phone && <p>{errors.phone.message}</p>}

//                     <button className="btn">Sign Up</button>
//                 </form>
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
// }

// export default Register;
