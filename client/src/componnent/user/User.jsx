import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App'
// import "./info.css"
const User = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [openForm, setOpenForm] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    function registerDriver(driverDetailes) {
        console.log("userId:::::" + currentUser.id)
        fetch(`http://localhost:8080/users/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify({ gender: driverDetailes.gender, religiousSector: driverDetailes.religiousSector }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })

    }
    return (
        <>
            <h1>Hello {currentUser.firstName} {currentUser.lastName}!!!</h1>
            <button onClick={() => setOpenForm(!openForm)}>To became a driver press here</button>
            {openForm && <form noValidate onSubmit={handleSubmit(registerDriver)}>
                <input type='text' name='gender' placeholder='gender M/F'
                    {...register("gender", {
                        required: "gender is required.",
                    })} />
                <input type='text' name='religiousSector' placeholder='religiousSector'
                    {...register("religiousSector", {
                        required: "religiousSector is required.",
                    })} />
                <input type="submit" />
            </form>}
        </>
    )
}
export default User