import React, { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { io } from 'socket.io-client';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const socket = io('http://localhost:8080');
const libraries = ['places'];

const RequestRide = () => {
    const [driverFound, setDriverFound] = useState(false);
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [rideStatus, setRideStatus] = useState(null);
    const [noDriverMessage, setNoDriverMessage] = useState('');
    const [requestType, setRequestType] = useState('package');
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [isFromValid, setIsFromValid] = useState(false);
    const [isToValid, setIsToValid] = useState(false);
    const [distance, setDistance] = useState(null);
    const [priceRange, setPriceRange] = useState("");

    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);
    const calculateDistance = (from, to) => {
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [from],
            destinations: [to],
            travelMode: window.google.maps.TravelMode.DRIVING,
        }, (response, status) => {
            if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                const distanceInMeters = response.rows[0].elements[0].distance.value;
                const distanceInKm = distanceInMeters / 1000;
                setDistance(distanceInKm);
                const price = calculatePrice(distanceInKm);
                setPriceRange(price);
            } else {
                console.error('Distance Matrix request failed:', status);
            }
        });
    };

    const calculatePrice = (distance) => {
        const minPricePerKm = 10;
        const maxPricePerKm = 15;
        const minPrice = distance * minPricePerKm;
        const maxPrice = distance * maxPricePerKm;
        //לעשות מינימום הזמנה
        return `₪${minPrice.toFixed(2)} - ₪${maxPrice.toFixed(2)}`;
    };

    const requestRide = (rideDetails) => {
        if (!isFromValid || !isToValid) {
            setError("from", { type: "manual", message: "אנא בחר כתובת חוקית מתוך אפשרויות ההשלמה האוטומטית." });
            setError("to", { type: "manual", message: "אנא בחר כתובת חוקית מתוך אפשרויות ההשלמה האוטומטית." });
            return;
        }

        const rideRequest = { costumerId: currentUser.id || rideDetails.guestPhone, costumerEmail: currentUser.email || rideDetails.email, from, to, ...rideDetails, requestType, priceRange, date: rideDetails.date, time: rideDetails.time };
        socket.emit('newRideRequest', rideRequest);
        setRideStatus('Waiting for a driver to accept your request...');
        reset();

        setTimeout(() => {
            !driverFound && setNoDriverMessage('No driver accepted your request within 3 minutes. Please call us for assistance.');
        }, 180000);
    };

    useEffect(() => {
        socket.on('driverFound', (data) => {
            console.log("hi driver")
            setRideStatus(`Driver found! Driver ID: ${data.driverId}`);
            setDriverFound(true);
            setNoDriverMessage('');
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

    return (
        <>
            <h1>הזמן נסיעה</h1>
            <LoadScript googleMapsApiKey="AIzaSyAOADq1o80YyWo4Tvp5vlbzimVXDYpJVWA" libraries={libraries}>
                <form noValidate onSubmit={handleSubmit(requestRide)}>
                    {!currentUser.id && <input type='tel' name='phone' placeholder='טלפון' {...register("guestPhone", {
                        required: "יש להכניס טלפון",
                    })} />}
                    {!currentUser.id && <input type="email" name="email" placeholder="מייל"
                        {...register("email", {
                            required: "יש להכניס מייל",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "יש להכניס מייל תקין"
                            },
                        })} />}
                    {errors.phone && <p>{errors.phone.message}</p>}
                    <Autocomplete
                        onLoad={autocomplete => {
                            fromInputRef.current = autocomplete;
                        }}
                        onPlaceChanged={() => {
                            const place = fromInputRef.current.getPlace();
                            if (place && place.formatted_address) {
                                setFrom(place.formatted_address);
                                setIsFromValid(true);
                                clearErrors("from");
                                if (to) {
                                    calculateDistance(place.formatted_address, to);
                                }
                            } else {
                                setIsFromValid(false);
                                setError("from", { type: "manual", message: "אנא בחר כתובת חוקית מתוך אפשרויות ההשלמה האוטומטית." });
                            }
                        }}
                        types={['address']}
                        componentRestrictions={{ country: "IL" }}
                    >
                        <input
                            type='text'
                            placeholder='מ'
                            value={from}
                            onChange={(e) => {
                                setFrom(e.target.value);
                                setIsFromValid(false);
                            }}
                        />
                    </Autocomplete>
                    {errors.from && <span>{errors.from.message}</span>}

                    <Autocomplete
                        onLoad={autocomplete => {
                            toInputRef.current = autocomplete;
                        }}
                        onPlaceChanged={() => {
                            const place = toInputRef.current.getPlace();
                            if (place && place.formatted_address) {
                                setTo(place.formatted_address);
                                setIsToValid(true);
                                clearErrors("to");
                                if (from) {
                                    calculateDistance(from, place.formatted_address);
                                }
                            } else {
                                setIsToValid(false);
                                setError("to", { type: "manual", message: "אנא בחר כתובת חוקית מתוך אפשרויות ההשלמה האוטומטית." });
                            }
                        }}
                        types={['address']}
                        componentRestrictions={{ country: "IL" }}
                    >
                        <input
                            type='text'
                            placeholder='ל'
                            value={to}
                            onChange={(e) => {
                                setTo(e.target.value);
                                setIsToValid(false);
                            }}
                        />
                    </Autocomplete>
                    {errors.to && <span>{errors.to.message}</span>}

                    <input
                        type='date'
                        name='date'
                        min={currentDate}
                        max={maxDateString}
                        {...register("date", {
                            required: "יש להכניס תאריך",
                        })}
                    />
                    {errors.date && <span>{errors.date.message}</span>}

                    <input
                        type='time'
                        name='time'
                        {...register("time", {
                            required: "יש להכניס זמן",
                        })}
                    />
                    {errors.time && <span>{errors.time.message}</span>}



                    <div>
                        <label>
                            <input
                                type="radio"
                                name="requestType"
                                value="package"
                                checked={requestType === 'package'}
                                onChange={() => setRequestType('package')}
                            />
                            משלוח חבילה
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="requestType"
                                value="people"
                                checked={requestType === 'people'}
                                onChange={() => setRequestType('people')}
                            />
                            הסעות אנשים
                        </label>
                    </div>

                    {requestType === 'package' && (
                        <div>
                            <select {...register("packageSize", { required: "יש להכניס גודל חבילה" })}>
                                <option value="">גודל חבילה:</option>
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
                                name='passengers'
                                placeholder='מספר נוסעים'
                                {...register("passengers", { required: "יש להכניס מספר נוסעים" })}
                            />
                            {errors.passengers && <span>{errors.passengers.message}</span>}
                        </div>
                    )}
                    {distance && <p>מרחק משוער: {distance.toFixed(2)} ק"מ</p>}
                    {priceRange && <p>טווח מחירים משוער: {priceRange}</p>}
                    <input type="submit" value="הזמן נסיעה" />
                </form>

                {rideStatus && <p>{rideStatus}</p>}
                {!driverFound && (noDriverMessage && <p>{noDriverMessage}</p>)}
            </LoadScript>
        </>
    );
};

export default RequestRide;



// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { UserContext } from '../../App';
// import { io } from 'socket.io-client';
// import { LoadScript, Autocomplete } from '@react-google-maps/api';

// const socket = io('http://localhost:8080');
// const libraries = ['places'];

// const RequestRide = () => {
//     const [driverFound, setDriverFound] = useState(false)
//     const [currentUser, setCurrentUser] = useContext(UserContext);
//     const [rideStatus, setRideStatus] = useState(null);
//     const [noDriverMessage, setNoDriverMessage] = useState('');
//     const [requestType, setRequestType] = useState('package');
//     const [step, setStep] = useState(1);
//     const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm();
//     const [from, setFrom] = useState("");
//     const [to, setTo] = useState("");
//     const [isFromValid, setIsFromValid] = useState(false);
//     const [isToValid, setIsToValid] = useState(false);
//     const [distance, setDistance] = useState(null);
//     const [priceRange, setPriceRange] = useState("");

//     const fromInputRef = useRef(null);
//     const toInputRef = useRef(null);
//     const calculateDistance = (from, to) => {
//         const service = new window.google.maps.DistanceMatrixService();
//         service.getDistanceMatrix({
//             origins: [from],
//             destinations: [to],
//             travelMode: window.google.maps.TravelMode.DRIVING,
//         }, (response, status) => {
//             if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
//                 const distanceInMeters = response.rows[0].elements[0].distance.value;
//                 const distanceInKm = distanceInMeters / 1000;
//                 setDistance(distanceInKm);
//                 const price = calculatePrice(distanceInKm);
//                 setPriceRange(price);
//             } else {
//                 console.error('Distance Matrix request failed:', status);
//             }
//         });
//     };

//     const calculatePrice = (distance) => {
//         const minPricePerKm = 10;
//         const maxPricePerKm = 15;
//         const minPrice = distance * minPricePerKm;
//         const maxPrice = distance * maxPricePerKm;
//         return `₪${minPrice.toFixed(2)} - ₪${maxPrice.toFixed(2)}`;
//     };

//     const requestRide = (rideDetails) => {
//         if (!isFromValid || !isToValid) {
//             setError("from", { type: "manual", message: "Please select a valid address from the autocomplete options." });
//             setError("to", { type: "manual", message: "Please select a valid address from the autocomplete options." });
//             return;
//         }

//         const rideRequest = { customerId: currentUser.id, from, to, ...rideDetails, requestType, priceRange };
//         socket.emit('newRideRequest', rideRequest);
//         setRideStatus('Waiting for a driver to accept your request...');
//         reset();

//         setTimeout(() => {
//             !driverFound && setNoDriverMessage('No driver accepted your request within 3 minutes. Please call us for assistance.');
//         }, 180000);
//     };

//     useEffect(() => {
//         socket.on('driverFound', (data) => {
//             setRideStatus(`Driver found! Driver ID: ${data.driverId}`);
//             setDriverFound(true);
//             setNoDriverMessage('');
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
//         if (!isFromValid || !isToValid) {
//             setError("from", { type: "manual", message: "אנא בחר כתובת חוקית מתוך אפשרויות ההשלמה האוטומטית" });
//             setError("to", { type: "manual", message: "אנא בחר כתובת חוקית מתוך אפשרויות ההשלמה האוטומטית" });
//             return;
//         }
//         setStep(step + 1);
//     };

//     const prevStep = () => {
//         setStep(step - 1);
//     };

//     return (
//         <>
//             <h1>הזמן נסיעה טרהלהלהלה</h1>
//             <LoadScript googleMapsApiKey="AIzaSyAOADq1o80YyWo4Tvp5vlbzimVXDYpJVWA" libraries={libraries}>
//                 <div>
//                     {step === 1 && (
//                         <form noValidate onSubmit={handleSubmit(nextStep)}>
//                             <Autocomplete
//                                 onLoad={autocomplete => {
//                                     fromInputRef.current = autocomplete;
//                                 }}
//                                 onPlaceChanged={() => {
//                                     const place = fromInputRef.current.getPlace();
//                                     if (place && place.formatted_address) {
//                                         setFrom(place.formatted_address);
//                                         setIsFromValid(true);
//                                         clearErrors("from");
//                                         if (to) {
//                                             calculateDistance(place.formatted_address, to);
//                                         }
//                                     } else {
//                                         setIsFromValid(false);
//                                         setError("from", { type: "manual", message: "אנא בחר כתובת חוקית מתוך אפשרויות ההשלמה האוטומטית." });
//                                     }
//                                 }}
//                                 types={['address']}
//                                 componentRestrictions={{ country: "IL" }}
//                             >
//                                 <input
//                                     type='text'
//                                     placeholder='מ'
//                                     value={from}
//                                     onChange={(e) => {
//                                         setFrom(e.target.value);
//                                         setIsFromValid(false);
//                                     }}
//                                 />
//                             </Autocomplete>
//                             {errors.from && <span>{errors.from.message}</span>}

//                             <Autocomplete
//                                 onLoad={autocomplete => {
//                                     toInputRef.current = autocomplete;
//                                 }}
//                                 onPlaceChanged={() => {
//                                     const place = toInputRef.current.getPlace();
//                                     if (place && place.formatted_address) {
//                                         setTo(place.formatted_address);
//                                         setIsToValid(true);
//                                         clearErrors("to");
//                                         if (from) {
//                                             calculateDistance(from, place.formatted_address);
//                                         }
//                                     } else {
//                                         setIsToValid(false);
//                                         setError("to", { type: "manual", message: "אנא בחר כתובת חוקית מתוך אפשרויות ההשלמה האוטומטית." });
//                                     }
//                                 }}
//                                 types={['address']}
//                                 componentRestrictions={{ country: "IL" }}
//                             >
//                                 <input
//                                     type='text'
//                                     placeholder='ל'
//                                     value={to}
//                                     onChange={(e) => {
//                                         setTo(e.target.value);
//                                         setIsToValid(false);
//                                     }}
//                                 />
//                             </Autocomplete>
//                             {errors.to && <span>{errors.to.message}</span>}

//                             <input
//                                 type='date'
//                                 name='date'
//                                 min={currentDate}
//                                 max={maxDateString}
//                                 {...register("date", {
//                                     required: "יש להכניס תאריך",
//                                 })}
//                             />
//                             {errors.date && <span>{errors.date.message}</span>}

//                             <input
//                                 type='time'
//                                 name='time'
//                                 {...register("time", {
//                                     required: "יש להכניס זמן",
//                                 })}
//                             />
//                             {errors.time && <span>{errors.time.message}</span>}

//                             {distance && <p>מרחק משוער: {distance.toFixed(2)} ק"מ</p>}
//                             {priceRange && <p>טווח מחירים משוער: {priceRange}</p>}

//                             <button type="submit">הבא</button>
//                         </form>
//                     )}

//                     {step === 2 && (
//                         <form noValidate onSubmit={handleSubmit(requestRide)}>
//                             <div>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="requestType"
//                                         value="package"
//                                         checked={requestType === 'package'}
//                                         onChange={() => setRequestType('package')}
//                                     />
//                                     משלוח חבילה
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="radio"
//                                         name="requestType"
//                                         value="people"
//                                         checked={requestType === 'people'}
//                                         onChange={() => setRequestType('people')}
//                                     />
//                                     הסעות אנשים
//                                 </label>
//                             </div>

//                             {requestType === 'package' && (
//                                 <div>
//                                     <select {...register("packageSize", { required: "יש להכניס גודל חבילה" })}>
//                                         <option value="">גודל חבילה:</option>
//                                         <option value="small">Small</option>
//                                         <option value="medium">Medium</option>
//                                         <option value="large">Large</option>
//                                     </select>
//                                     {errors.packageSize && <span>{errors.packageSize.message}</span>}
//                                 </div>
//                             )}

//                             {requestType === 'people' && (
//                                 <div>
//                                     <input
//                                         type='number'
//                                         name='passengers'
//                                         placeholder='מספר נוסעים'
//                                         {...register("passengers", { required: "יש להכניס מספר נוסעים" })}
//                                     />
//                                     {errors.passengers && <span>{errors.passengers.message}</span>}
//                                 </div>
//                             )}

//                             <button type="button" onClick={prevStep}>חזור</button>
//                             <input type="submit" value="הזמן נסיעה" />
//                         </form>
//                     )}

//                     {rideStatus && <p>{rideStatus}</p>}
//                     {!driverFound && (noDriverMessage && <p>{noDriverMessage}</p>)}
//                 </div>
//             </LoadScript>
//         </>
//     );
// };

// export default RequestRide;