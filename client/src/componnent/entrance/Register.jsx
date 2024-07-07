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
        setCurrentUser({
            id: data.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            userType: "costumer"
        });

        localStorage.setItem('currentUser', JSON.stringify({ phone: user.phone, userId: data.id, token: data.dataToken }));
        navigate(`/home/costumer/${data.id}/main`);
    };

    const { register, handleSubmit, formState: { errors }, trigger } = useForm();

    const addDetails = (data) => {
        if (data.password !== data.passwordVerification) {
            setExist("הפרטים שגואים ו/או לא תואמים");
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
                if (data.status === 200)
                    goToHome(user, data);
                else
                    throw new Error(response);
            }).catch(response => {
                (response.status === 409) ?
                    alert("משתמש קיים") :
                    alert("oops somthing went wrong... please try again!");
            });
    };

    return (
        <div className="container">
            <h1>Sign Up</h1>
            {exist === "notValid" && <div>שגיאה בפרטים</div>}
            {exist === "exist" && <div>אתה משתמש קיים בבקשה לך לכניסה</div>}
            <div>
                <form noValidate onSubmit={handleSubmit(addDetails)}>
                    <input type="text" name="firstName" placeholder="שם פרטי"
                        {...register("firstName", {
                            required: "יש להכניס שם פרטי",
                            minLength: {
                                value: 2,
                                message: "שם פרטי חייב להיות לפחות שני תווים"
                            },
                            onBlur: () => trigger("firstName")
                        })} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}

                    <input type="text" name="lastName" placeholder="שם משפחה"
                        {...register("lastName", {
                            required: "יש להכניס שם משפחה",
                            minLength: {
                                value: 2,
                                message: "שם משפחה חייב להיות לפחות שני תווים"
                            },
                            onBlur: () => trigger("lastName")
                        })} />
                    {errors.lastName && <p>{errors.lastName.message}</p>}

                    <input type="password" name="password" placeholder="סיסמא"
                        {...register("password", {
                            required: "יש להכניס סיסמה",
                            minLength: {
                                value: 6,
                                message: "הסיסמה חייבת להיות לפחות 6 תווים"
                            },
                            // pattern: {
                            //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            //     message: "הסיסמה חייבת לכלול אותיות ומספרים"
                            // },
                            onBlur: () => trigger("password")
                        })} />
                    {errors.password && <p>{errors.password.message}</p>}

                    <input type="password" name="passwordVerification" placeholder="Password Verification"
                        {...register("passwordVerification", {
                            required: "יש לאמת את הסיסמה",
                            validate: (value, { password }) => value === password || "הסיסמאות אינן תואמות",
                            onBlur: () => trigger("passwordVerification")
                        })} />
                    {errors.passwordVerification && <p>{errors.passwordVerification.message}</p>}

                    <input type="email" name="email" placeholder="מייל"
                        {...register("email", {
                            required: "יש להכניס מייל",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "יש להכניס מייל תקין"
                            },
                            onBlur: () => trigger("email")
                        })} />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input type="tel" name="phone" placeholder="טלפון"
                        {...register("phone", {
                            required: "יש להכניס פלאפון",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "יש להכניס מספר טלפון תקין (10 ספרות)"
                            },
                            onBlur: () => trigger("phone")
                        })} />
                    {errors.phone && <p>{errors.phone.message}</p>}

                    <input type="submit" value="הרשמה" />
                </form>
            </div>
            <div className="link">
                נרשמת כבר? <Link to={'/login'}> לכניסה</Link>
            </div>
        </div>
    );
}

export default Register;




// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { UserContext } from '../../App';
// import { useNavigate } from 'react-router-dom';
// import './register.css';

// const Register = () => {
//     const navigate = useNavigate();
//     const [exist, setExist] = useState("");
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const goToHome = (user, data) => {
//         setCurrentUser({
//             id: data.id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             phone: user.phone,
//             //לטפל שלא צריך לשלוח
//             userType: "costumer"
//         });

//         localStorage.setItem('currentUser', JSON.stringify({ phone: user.phone, userId: data.id, token: data.dataToken }));
//         navigate(`/home/costumer/${data.id}`);
//     };

//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const addDetails = (data) => {
//         if (data.password !== data.passwordVerification) {
//             setExist("הפרטים שגויים ו/או לא תואמים");
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
//                     alert("משתמש קיים") :
//                     alert("oops somthing went wrong... please try again!");
//             });
//     };

//     return (
//         <div className="container">
//             <h1>Sign Up</h1>
//             {exist === "notValid" && <div>שגיאה בפרטים</div>}
//             {exist === "exist" && <div>אתה משתמש קיים בבקשה לך לכניסה</div>}
//             <div>
//                 <form noValidate onSubmit={handleSubmit(addDetails)}>
//                     <input type="text" name="firstName" placeholder="שם פרטי"
//                         {...register("firstName", {
//                             required: "יש להכניס שם פרטי",
//                         })} />
//                     {errors.firstName && <p>{errors.firstName.message}</p>}

//                     <input type="text" name="lastName" placeholder="שם משפחה"
//                         {...register("lastName", {
//                             required: "יש להכניס שם משפחה",
//                         })} />
//                     {errors.lastName && <p>{errors.lastName.message}</p>}

//                     <input type="password" name="password" placeholder="סיסמא"
//                         {...register("password", {
//                             required: "יש להכניס סיסמה",
//                         })} />
//                     {errors.password && <p>{errors.password.message}</p>}

//                     <input type="password" name="passwordVerification" placeholder="Password Verification"
//                         {...register("passwordVerification", {
//                             required: "יש לאמת את הסיסמה",
//                         })} />
//                     {errors.passwordVerification && <p>{errors.passwordVerification.message}</p>}

//                     {/* <input type="email" name="email" placeholder="מייל"
//                         {...register("email", {
//                             required: "יש להכניס מייל",
//                         })} />
//                     {errors.email && <p>{errors.email.message}</p>} */}
//                     <input type="email" name="email" placeholder="מייל"
//                         {...register("email", {
//                             required: "יש להכניס מייל",
//                             pattern: {
//                                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                                 message: "יש להכניס מייל תקין"
//                             }
//                         })} />
//                     {errors.email && <p>{errors.email.message}</p>}
//                     <input type="tel" name="phone" placeholder="טלפון"
//                         {...register("phone", {
//                             required: "יש להכניס פלאפון",
//                         })} />
//                     {errors.phone && <p>{errors.phone.message}</p>}

//                     <input type="submit" value="הרשמה" />
//                 </form>
//             </div>
//             <div className="link">
//                 נרשמת כבר ? <Link to={'/login'}> לכניסה</Link>
//             </div>
//         </div>
//     );
// }

// export default Register;