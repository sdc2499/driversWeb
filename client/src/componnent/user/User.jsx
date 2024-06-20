import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { io } from 'socket.io-client';
import './user.css';

const socket = io('http://localhost:8080'); // ודא שהכתובת והפורט נכונים

const User = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [openForm, setOpenForm] = useState(false);
    const [rideStatus, setRideStatus] = useState(null);
    const [noDriverMessage, setNoDriverMessage] = useState('');
    const [requestType, setRequestType] = useState('package'); // 'package' or 'people'
    const [step, setStep] = useState(1);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const registerDriver = (driverDetails) => {
        console.log("userId:::::" + currentUser.id);
        fetch(`http://localhost:8080/users/upgradeToDriver/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify({ gender: driverDetails.gender, religiousSector: driverDetails.religiousSector }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
    };

    return (
        <>
            <h1>Hello {currentUser.firstName} {currentUser.lastName}!!!</h1>
            <button onClick={() => setOpenForm(!openForm)}>To become a driver, press here</button>
            {openForm && (
                <form noValidate onSubmit={handleSubmit(registerDriver)}>
                    <input
                        type='text'
                        name='gender'
                        placeholder='gender M/F'
                        {...register("gender", {
                            required: "gender is required.",
                        })}
                    />
                    {errors.gender && <span>{errors.gender.message}</span>}
                    <input
                        type='text'
                        name='religiousSector'
                        placeholder='religiousSector'
                        {...register("religiousSector", {
                            required: "religiousSector is required.",
                        })}
                    />
                    {errors.religiousSector && <span>{errors.religiousSector.message}</span>}
                    <input type="submit" />
                </form>
            )}

        </>
    );
};

export default User;



