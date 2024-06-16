import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import socket from "../../socket";
import { useNavigate } from "react-router-dom";
const User = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [openForm, setOpenForm] = useState(false);
    const [rideStatus, setRideStatus] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const registerDriver = (driverDetails) => {
        console.log("userId:::::" + currentUser.id);
        fetch(`http://localhost:8080/users/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify({ gender: driverDetails.gender, religiousSector: driverDetails.religiousSector }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
    };

    const requestRide = () => {
        const rideRequest = { id: Date.now(), from: 'Location A', to: 'Location B' };
        navigate('/home/secretary')
        socket.emit('newRideRequest', rideRequest);
    };

    useEffect(() => {
        socket.on('driverFound', (data) => {
            setRideStatus(`Driver found! Driver ID: ${data.driverId}`);
        });
    }, []);

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

            <div>
                <button onClick={requestRide}>Request Ride</button>
                {rideStatus && <p>{rideStatus}</p>}
            </div>
        </>
    );
};

export default User;











// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { UserContext } from '../../App'
// // import "./info.css"
// const User = () => {
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const [openForm, setOpenForm] = useState(false)
//     const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm();
//     function registerDriver(driverDetailes) {
//         console.log("userId:::::" + currentUser.id)
//         fetch(`http://localhost:8080/users/${currentUser.id}`, {
//             method: 'PUT',
//             body: JSON.stringify({ gender: driverDetailes.gender, religiousSector: driverDetailes.religiousSector }),
//             headers: { 'Content-type': 'application/json; charset=UTF-8' }
//         })

//     }
//     return (
//         <>
//             <h1>Hello {currentUser.firstName} {currentUser.lastName}!!!</h1>
//             <button onClick={() => setOpenForm(!openForm)}>To became a driver press here</button>
//             {openForm && <form noValidate onSubmit={handleSubmit(registerDriver)}>
//                 <input type='text' name='gender' placeholder='gender M/F'
//                     {...register("gender", {
//                         required: "gender is required.",
//                     })} />
//                 <input type='text' name='religiousSector' placeholder='religiousSector'
//                     {...register("religiousSector", {
//                         required: "religiousSector is required.",
//                     })} />
//                 <input type="submit" />
//             </form>}
//         </>
//     )
// }
// export default User