import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './drivers.css';
import { useForm } from "react-hook-form";
import { getTokenFromCookie } from '../cookies/cookies';
import { putRequest } from '../../fetch';
const Drivers = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [openForm, setOpenForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const registerDriver = async (driverDetails) => {

    try {
      const response = await putRequest(`users/upgradeToDriver/${currentUser.id}`, { gender: driverDetails.gender, religiousSector: driverDetails.religiousSector })
      if (response.ok) {
        alert("הצטרפת לצוות הנהגים שלנו בהצלחה!!!");
        setOpenForm(!openForm);
      }
    } catch {
      console.error('Error fetching waitingForDriver rides:');
    }

  };

  return (
    <div className="container">
     {currentUser.userType === 'costumer' && <h1 className="title">הצטרף לצוות הנהגים שלנו</h1>}
      <p>להיות נהג אצלנו מגיע עם יתרונות גדולים ותגמולים. הצטרף לצוות שלנו היום והתחל להרוויח!</p>

      <h2 className="subtitle">פרטי הנהגים</h2>
      <ul className="driver-list">
      </ul>

      <h2 className="subtitle">בונוסים</h2>
      <ul>
        <li>בונוס 1: 100$ על השלמת 50 נסיעות בחודש</li>
        <li>בונוס 2: 200$ על שמירה על דירוג מעל 4.8</li>
        <li>בונוס 3: 300$ על הפניית נהג חדש</li>
      </ul>

      {currentUser.userType === 'costumer' && (
        <button className="join-button" onClick={() => setOpenForm(!openForm)}>הצטרף כנהג</button>
      )}
      {openForm && (
        <form noValidate onSubmit={handleSubmit(registerDriver)}>
          <input
            type='text'
            name='gender'
            placeholder='מגדר M/F'
            {...register("gender", {
              required: "gender is required.",
            })}
          />
          {errors.gender && <span>{errors.gender.message}</span>}
          <input
            type='text'
            name='religiousSector'
            placeholder='מגזר דתי'
            {...register("religiousSector", {
              required: "religiousSector is required.",
            })}
          />
          {errors.religiousSector && <span>{errors.religiousSector.message}</span>}
          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default Drivers;
