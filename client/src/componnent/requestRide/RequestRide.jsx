import React, { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { io } from 'socket.io-client';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import './requestRide.css'
import UserChat from "../chat/UserChat";
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
        console.log("my id::" + currentUser.id)
        console.log("currentUser.email::::🌞"+currentUser.email)
        const rideRequest = {phone:currentUser.phone, costumerId: currentUser.id || rideDetails.guestPhone, costumerEmail: currentUser.email || rideDetails.email, from, to, ...rideDetails, requestType, priceRange, date: rideDetails.date, time: rideDetails.time };
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


        <div className="background">
            <div className="form-container">
                <h1>הזמן נסיעה</h1>
                <LoadScript googleMapsApiKey="AIzaSyAr5TP19dZdlhJ1uw6QHHNv_q1wZGh4maM" libraries={libraries}>
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
                        {errors.phone && <p className="error-message">{errors.phone.message}</p>}
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
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                    setIsFromValid(false);
                                }}
                            />
                        </Autocomplete>
                        {errors.from && <span className="error-message">{errors.from.message}</span>}

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
                                onChange={(e) => {
                                    setTo(e.target.value);
                                    setIsToValid(false);
                                }}
                            />
                        </Autocomplete>
                        {errors.to && <span className="error-message">{errors.to.message}</span>}

                        <div className="form-row">
                            <input
                                type='date'
                                name='date'
                                min={currentDate}
                                max={maxDateString}
                                {...register("date", {
                                    required: "יש להכניס תאריך",
                                })}
                            />
                            {errors.date && <span className="error-message">{errors.date.message}</span>}

                            <input
                                type='time'
                                name='time'
                                {...register("time", {
                                    required: "יש להכניס זמן",
                                })}
                            />
                            {errors.time && <span className="error-message">{errors.time.message}</span>}
                        </div>

                        <div className="radio-group">
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
                                    <option value="small">קטן</option>
                                    <option value="medium">בינוני</option>
                                    <option value="large">גדול</option>
                                </select>
                                {errors.packageSize && <span className="error-message">{errors.packageSize.message}</span>}
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
                                {errors.passengers && <span className="error-message">{errors.passengers.message}</span>}
                            </div>
                        )}
                        {distance && <p>מרחק משוער: {distance.toFixed(2)} ק"מ</p>}
                        {priceRange && <p>טווח מחירים משוער: {priceRange}</p>}
                        <input type="submit" value="הזמן נסיעה" />
                    </form>
                    {rideStatus && <p>{rideStatus}</p>}
                    {!driverFound ? (noDriverMessage && <p>{noDriverMessage}</p>) : <p></p>}
                </LoadScript>
                <img src="../../../logo.png" alt="Additional Image" className="additional" />
            </div>
            <UserChat/>
        </div>

    );
};

export default RequestRide;
