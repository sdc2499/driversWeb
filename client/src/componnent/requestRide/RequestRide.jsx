// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { UserContext } from '../../App';
// import { io } from 'socket.io-client';
// // import './user.css';

// const socket = io('http://localhost:8080'); // ודא שהכתובת והפורט נכונים

// const RequestRide = () => {
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const [openForm, setOpenForm] = useState(false);
//     const [rideStatus, setRideStatus] = useState(null);
//     const [noDriverMessage, setNoDriverMessage] = useState('');
//     const [requestType, setRequestType] = useState('package'); // 'package' or 'people'
//     const [step, setStep] = useState(1);
//     const { register, handleSubmit, formState: { errors }, reset } = useForm();

//     const requestRide = (rideDetails) => {
//         const rideRequest = { id: Date.now(), ...rideDetails, requestType };
//         socket.emit('newRideRequest', rideRequest);
//         setRideStatus('Waiting for a driver to accept your request...');
//         reset(); // איפוס השדות בטופס לאחר שליחה

//         // Set a timeout to update the message after 3 minutes
//         setTimeout(() => {
//             setRideStatus('');
//             setNoDriverMessage('No driver accepted your request within 3 minutes. Please call us for assistance.');
//         }, 180000); // 3 minutes in milliseconds
//     };

//     useEffect(() => {
//         socket.on('driverFound', (data) => {
//             setRideStatus(`Driver found! Driver ID: ${data.driverId}`);
//             setNoDriverMessage(''); // Clear the no driver message if a driver is found
//         });

//         socket.on('noDriverFound', (data) => {
//             setRideStatus('');
//             setNoDriverMessage(data.message);
//         });

//         return () => {
//             socket.off('driverFound');
//             socket.off('noDriverFound');
//         };
//     }, []);

//     const currentDate = new Date().toISOString().split('T')[0];
//     const maxDate = new Date();
//     maxDate.setDate(maxDate.getDate() + 7);
//     const maxDateString = maxDate.toISOString().split('T')[0];

//     const nextStep = () => {
//         setStep(step + 1);
//     };

//     const prevStep = () => {
//         setStep(step - 1);
//     };

//     return (
//         <>
//             <h1>הזמן נסיעה טרהלהלהלה</h1>

//             <div>
//                 {step === 1 && (
//                     <form noValidate onSubmit={handleSubmit(nextStep)}>
//                         <input
//                             type='text'
//                             name='from'
//                             placeholder='From'
//                             {...register("from", {
//                                 required: "Starting location is required.",
//                             })}
//                         />
//                         {errors.from && <span>{errors.from.message}</span>}

//                         <input
//                             type='text'
//                             name='to'
//                             placeholder='To'
//                             {...register("to", {
//                                 required: "Destination is required.",
//                             })}
//                         />
//                         {errors.to && <span>{errors.to.message}</span>}

//                         <input
//                             type='date'
//                             name='date'
//                             min={currentDate}
//                             max={maxDateString}
//                             {...register("date", {
//                                 required: "Date is required.",
//                             })}
//                         />
//                         {errors.date && <span>{errors.date.message}</span>}

//                         <input
//                             type='time'
//                             name='time'
//                             {...register("time", {
//                                 required: "Time is required.",
//                             })}
//                         />
//                         {errors.time && <span>{errors.time.message}</span>}

//                         <button type="submit">Next</button>
//                     </form>
//                 )}

//                 {step === 2 && (
//                     <form noValidate onSubmit={handleSubmit(requestRide)}>
//                         <div>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name="requestType"
//                                     value="package"
//                                     checked={requestType === 'package'}
//                                     onChange={() => setRequestType('package')}
//                                 />
//                                 Package Delivery
//                             </label>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name="requestType"
//                                     value="people"
//                                     checked={requestType === 'people'}
//                                     onChange={() => setRequestType('people')}
//                                 />
//                                 People Transportation
//                             </label>
//                         </div>

//                         {requestType === 'package' && (
//                             <div>
//                                 <select {...register("packageSize", { required: "Package size is required." })}>
//                                     <option value="">Select Package Size</option>
//                                     <option value="small">Small</option>
//                                     <option value="medium">Medium</option>
//                                     <option value="large">Large</option>
//                                 </select>
//                                 {errors.packageSize && <span>{errors.packageSize.message}</span>}
//                             </div>
//                         )}

//                         {requestType === 'people' && (
//                             <div>
//                                 <input
//                                     type='number'
//                                     name='adults'
//                                     placeholder='Number of Adults'
//                                     {...register("adults", { required: "Number of adults is required." })}
//                                 />
//                                 {errors.adults && <span>{errors.adults.message}</span>}
//                                 <input
//                                     type='number'
//                                     name='infants'
//                                     placeholder='Number of Infants'
//                                     {...register("infants", { required: "Number of infants is required." })}
//                                 />
//                                 {errors.infants && <span>{errors.infants.message}</span>}
//                             </div>
//                         )}

//                         <button type="button" onClick={prevStep}>Back</button>
//                         <input type="submit" value="Request Ride" />
//                     </form>
//                 )}

//                 {rideStatus && <p>{rideStatus}</p>}
//                 {noDriverMessage && <p>{noDriverMessage}</p>}
//             </div>
//         </>
//     );
// };

// export default RequestRide;


import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { io } from 'socket.io-client';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const socket = io('http://localhost:8080'); // ודא שהכתובת והפורט נכונים

const libraries = ['places'];

const RequestRide = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [rideStatus, setRideStatus] = useState(null);
    const [noDriverMessage, setNoDriverMessage] = useState('');
    const [requestType, setRequestType] = useState('package'); // 'package' or 'people'
    const [step, setStep] = useState(1);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const requestRide = (rideDetails) => {
        const rideRequest = { id: Date.now(), from, to, ...rideDetails, requestType };
        socket.emit('newRideRequest', rideRequest);
        setRideStatus('Waiting for a driver to accept your request...');
        reset(); // איפוס השדות בטופס לאחר שליחה

        // Set a timeout to update the message after 3 minutes
        setTimeout(() => {
            setRideStatus('');
            setNoDriverMessage('No driver accepted your request within 3 minutes. Please call us for assistance.');
        }, 180000); // 3 minutes in milliseconds
    };

    useEffect(() => {
        socket.on('driverFound', (data) => {
            setRideStatus(`Driver found! Driver ID: ${data.driverId}`);
            setNoDriverMessage(''); // Clear the no driver message if a driver is found
        });

        socket.on('noDriverFound', (data) => {
            setRideStatus('');
            setNoDriverMessage(data.message);
        });

        return () => {
            socket.off('driverFound');
            socket.off('noDriverFound');
        };
    }, []);

    const currentDate = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const maxDateString = maxDate.toISOString().split('T')[0];

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <>
            <h1>הזמן נסיעה טרהלהלהלה</h1>
            <LoadScript googleMapsApiKey="AIzaSyAOADq1o80YyWo4Tvp5vlbzimVXDYpJVWA" libraries={libraries}>
                <div>
                    {step === 1 && (
                        <form noValidate onSubmit={handleSubmit(nextStep)}>
                            <Autocomplete
                                onPlaceSelected={(place) => {
                                    setFrom(place.formatted_address);
                                }}
                                types={['address']}
                                componentRestrictions={{ country: "us" }} // הגבל את החיפוש למדינה מסוימת אם תרצה
                            >
                                <input
                                    type='text'
                                    placeholder='From'
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                />
                            </Autocomplete>
                            {errors.from && <span>{errors.from.message}</span>}

                            <Autocomplete
                                onPlaceSelected={(place) => {
                                    setTo(place.formatted_address);
                                }}
                                types={['address']}
                                componentRestrictions={{ country: "us" }} // הגבל את החיפוש למדינה מסוימת אם תרצה
                            >
                                <input
                                    type='text'
                                    placeholder='To'
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                />
                            </Autocomplete>
                            {errors.to && <span>{errors.to.message}</span>}

                            <input
                                type='date'
                                name='date'
                                min={currentDate}
                                max={maxDateString}
                                {...register("date", {
                                    required: "Date is required.",
                                })}
                            />
                            {errors.date && <span>{errors.date.message}</span>}

                            <input
                                type='time'
                                name='time'
                                {...register("time", {
                                    required: "Time is required.",
                                })}
                            />
                            {errors.time && <span>{errors.time.message}</span>}

                            <button type="submit">Next</button>
                        </form>
                    )}

                    {step === 2 && (
                        <form noValidate onSubmit={handleSubmit(requestRide)}>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value="package"
                                        checked={requestType === 'package'}
                                        onChange={() => setRequestType('package')}
                                    />
                                    Package Delivery
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value="people"
                                        checked={requestType === 'people'}
                                        onChange={() => setRequestType('people')}
                                    />
                                    People Transportation
                                </label>
                            </div>

                            {requestType === 'package' && (
                                <div>
                                    <select {...register("packageSize", { required: "Package size is required." })}>
                                        <option value="">Select Package Size</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                    {errors.packageSize && <span>{errors.packageSize.message}</span>}
                                </div>
                            )}

                            {requestType === 'people' && (
                                <div>
                                    <input
                                        type='number'
                                        name='adults'
                                        placeholder='Number of Adults'
                                        {...register("adults", { required: "Number of adults is required." })}
                                    />
                                    {errors.adults && <span>{errors.adults.message}</span>}
                                    <input
                                        type='number'
                                        name='infants'
                                        placeholder='Number of Infants'
                                        {...register("infants", { required: "Number of infants is required." })}
                                    />
                                    {errors.infants && <span>{errors.infants.message}</span>}
                                </div>
                            )}

                            <button type="button" onClick={prevStep}>Back</button>
                            <input type="submit" value="Request Ride" />
                        </form>
                    )}

                    {rideStatus && <p>{rideStatus}</p>}
                    {noDriverMessage && <p>{noDriverMessage}</p>}
                </div>
            </LoadScript>
        </>
    );
};

export default RequestRide;
