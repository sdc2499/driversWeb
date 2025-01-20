import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './componnent/home/Home';
import Register from './componnent/entrance/Register'
import Login from './componnent/entrance/Loginn';
import Layout from './componnent/Layout'
import Error from './componnent/Error';
import User from './componnent/user/User'
import Secretary from './componnent/secretary/Secretary'
import EditDetails from './componnent/editDetails/EditDetails'
import Driver from './componnent/driver/Driver'
import AboutUs from './componnent/aboutUs/AboutUs'
import Contact from './componnent/contact/Contact'
import Drivers from './componnent/drivers/Driverss'
import RequestRide from './componnent/requestRide/RequestRide';
import RatingPage from './componnent/rating/Rating'
import SecretaryTravelRequests from './componnent/secretary/SecretaryTravelRequests';
import './App.css'
import ThankYou from './componnent/thankYou/ThankYou';
import AcceptedRequests from './componnent/driver/AcceptedRequests';
import RidesAvailable from './componnent/driver/RidesAvailable';
import SecretaryChat from './componnent/chat/SecretaryChat';
import Main from './main/Main'
import { getTokenFromCookie } from './componnent/cookies/cookies';
export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const user = (data) => {
    switch (data.userType) {
      case '1':
        data.userType = "costumer";
        break;
      case '2':
        console.log("driver");
        data.userType = "driver";
        break;
      case '3':
        console.log("secretry");
        data.userType = "secretary";
        break;
    }

    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      userType: data.userType
    }
  }

  useEffect(() => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    currntUser && fetch(`http://localhost:8080/users?id=${currntUser.userId}`, {
      headers: { Authorization: getTokenFromCookie() }
    })
      .then(async response => {
        const data = await response.json();
        response.ok && setCurrentUser(() => user(data.data))
      })
  }, []);

  return (
    <>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Router>
          <Routes >

            <Route path='/' element={<Navigate to={'/home/main'} />} />
            <Route path='/rating/:token' element={<RatingPage />} />

            <Route path='/home' element={<Home />}>
              <Route path='requestRide' element={<RequestRide />} />
              <Route path='main' element={<Main />} />

              <Route path={`${currentUser.userType}/:id`} element={<Layout />} >
                <Route path='editDetails' element={<EditDetails />} />
                <Route path='requestRide' element={<RequestRide />} />
                <Route path='contact' element={<Contact />} />
                <Route path='aboutUs' element={<AboutUs />} />
              </Route>

              <Route path='costumer/:id' element={<Layout />} >
                <Route index element={<User />} />
                <Route path='aboutUs' element={<AboutUs />} />
                <Route path='drivers' element={<Drivers />} />
              </Route>

              <Route path='driver/:id' element={<Layout />} >
                <Route index element={<Driver />} />
                <Route path='drivers' element={<Drivers />} />
                <Route path='acceptedRequests' element={<AcceptedRequests />} />
                <Route path='ridesAvailable' element={<RidesAvailable />} />
                <Route path='contact' element={<Contact />} />
              </Route>

              <Route path='secretary/:id' element={<Layout />} >
                <Route index element={<Secretary />} />
                <Route path='travelRequests' element={<SecretaryTravelRequests />} />
                <Route path='callRequests' element={<SecretaryChat />} />
              </Route>
            </Route>

            <Route path='/costumer/:id/rating/:driverId' element={<RatingPage />} />
            <Route path='/thank' element={<ThankYou />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/error' element={<Error />} />
         
          </Routes>
        </Router>
      </UserContext.Provider >
    </>
  )
}

export default App

