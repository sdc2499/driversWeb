import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [exist, setExist] = useState("");
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const goToHome = (user, data) => {
        setCurrentUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        })
        localStorage.setItem('currentUser', JSON.stringify({ phone: user.phone, userId: data.id, token: data.dataToken }));
        navigate(`/home/user/${data.id}`)
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const addDetails = (data) => {
        if (data.password != data.passwordVerification) {
            setExist("notValid");
            return
        }
        const user = [{
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
        }, { password: data.password }];

        fetch('http://localhost:8080/entrance/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(async response => {
                const data = await response.json();
                if (response.ok)
                    goToHome(user[0], data)
                else
                    throw new Error(response)
            }).catch(response => {
                (response.status == 409) ?
                    alert("user already exists") :
                    alert("oops somthing went wrong... please try again!")
            })
    }
    //לבדוק בסרבר איזה שגיאות קימות
    return (
        <>
            <h1>sign up</h1>
            {exist === "notValid" && <div>not valid input</div>}

            {exist === "exist" && <div>you are an existing user please log in!</div>}
            <div>
                <form noValidate onSubmit={handleSubmit(addDetails)}>
                    <input type="text" name="firstName" placeholder='firstName'
                        {...register("firstName", {
                            required: "firstName is required.",
                            pattern: {
                                // value: /^[a-zA-Z. ]+$/,
                                // message: "Name is not valid."
                            }
                        })} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}

                    <input type='text' name='lastName' placeholder='lastName'
                        {...register("lastName", {
                            required: "lastName is required.",
                        })} />
                    {errors.lastName ? <p>{errors.lastName.message}</p> : <br />}

                    <input type="password" name="password" placeholder='password'
                        {...register("password", {
                            required: "password is required.",
                            pattern: {
                                // value: /^[a-zA-Z]+[.]+[a-zA-Z ]+$/,
                                // message: "password is not valid."
                            }
                        })} />
                    {errors.password ? <p>{errors.password.message}</p> : <br />}

                    <input type="password" name="passwordVerification" placeholder='password verification'
                        {...register("passwordVerification", {
                            required: "password verification is required.",
                            pattern: {
                                // value: /^[a-zA-Z]+[.]+[a-zA-Z ]+$/,
                                // message: "password verification is not valid."
                            }
                        })} />
                    {errors.passwordVerification ? <p>{errors.passwordVerification.message}</p> : <br />}

                    {errors.userId && <p>{errors.userId.message}</p>}

                    <input type="email" placeholder='email' name="email"
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                // value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                // message: "Email is not valid."
                            }
                        })} />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input type="tel" name="phone" placeholder='phone'
                        {...register("phone", {
                            required: "phone is required.",
                            pattern: {
                                // value: /\(?([0-9]{10})\)/,
                                // message: "phone is not valid."
                            }
                        })} />
                    {errors.phone && <p>{errors.phone.message}</p>}

                    <input type="submit" value="Sign Up" />
                </form>
            </div>
            {/* } */}
            <div>Are you an existing user? <Link style={{ textDecoration: 'underline' }} to={'/login'}>please login</Link></div>
        </>
    );
}
export default Register
