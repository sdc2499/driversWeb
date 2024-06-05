import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';


const Login = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [exist, setExist] = useState(true);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    //לבדוק איזה פרטים לקחת ואיזה פרטים בכלל לשמור ללקוח
    const goToHome = (data, token_) => {
        setCurrentUser({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            userType: data.userType
        })
        localStorage.setItem('currentUser', JSON.stringify({ phone: data.phone, userId: data.id, token: token_ }));
        navigate(`/home/user/${data.username}`)
    }

    const logIn = async (user) => {
        try {
            const response = await fetch(`http://localhost:8080/entrance/login`, {
                method: 'POST',
                body: JSON.stringify({ phone: user.phone, password: user.password }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
            const data = await response.json();
            goToHome(data.data, data.token)
        } catch (error) {
            if (response.status == 500)
                alert("oops somthing went wrong... please try again!")
            else
                setExist(false);
        }
    }

    return (
        <>
            <h1>login</h1>
            {!exist && <div>Incorrect phone or password</div>}
            <form noValidate onSubmit={handleSubmit(logIn)}>
                <input type='tel' name='phone' placeholder='phone'
                    {...register("phone", {
                        required: "phone is required.",
                    })} />
                {errors.phone ? <p>{errors.phone.message}</p> : <br />}
                <input type="password" name="password" id="" placeholder='password'
                    {...register("password", {
                        required: "password is required.",
                    })} />
                {errors.password ? <p>{errors.password.message}</p> : <br />}
                <input type="submit" value="Log In" />
            </form>
            <div>new here? <Link style={{ textDecoration: 'underline' }} to={'/register'}>please sign up</Link></div>
        </>
    )
}
export default Login