import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './drivers.css';
import { useForm } from "react-hook-form";

const Drivers = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [openForm, setOpenForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const registerDriver = (driverDetails) => {
    fetch(`http://localhost:8080/users/upgradeToDriver/${currentUser.id}`, {
      method: 'PUT',
      body: JSON.stringify({ gender: driverDetails.gender, religiousSector: driverDetails.religiousSector }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': currentUser.token
      }
    }).then(() => {
      alert("הצטרפת לצוות הנהגים שלנו בהצלחה!!!");
      setOpenForm(!openForm);
    }
    )
  };

  return (
    <div className="container">
      <h1 className="title">הצטרף לצוות הנהגים שלנו</h1>
      <p>להיות נהג אצלנו מגיע עם יתרונות גדולים ותגמולים. הצטרף לצוות שלנו היום והתחל להרוויח!</p>

      <h2 className="subtitle">פרטי הנהגים</h2>
      <ul className="driver-list">
        {/* {drivers.map(driver => (
          <li className="driver-item" key={driver.id}>
            <h3>{driver.name}</h3>
            <p>אימייל: {driver.email}</p>
            <p>טלפון: {driver.phone}</p>
            <p>משכורת: {driver.salary}</p>
          </li>
        ))} */}
      </ul>

      <h2 className="subtitle">בונוסים</h2>
      <ul>
        <li>בונוס 1: 100$ על השלמת 50 נסיעות בחודש</li>
        <li>בונוס 2: 200$ על שמירה על דירוג מעל 4.8</li>
        <li>בונוס 3: 300$ על הפניית נהג חדש</li>
      </ul>

      {currentUser.userType === 1 && (
        <button className="join-button" onClick={() => setOpenForm(!openForm)}>הצטרף כנהג</button>
      )}
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
    </div>
  );
};

export default Drivers;
