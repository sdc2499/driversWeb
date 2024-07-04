import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './componnent/home/Home';
import Register from './componnent/entrance/Register'
import Login from './componnent/entrance/Loginn';
import Layout from './componnent/Layout'
import Error from './componnent/Error';
// import Info from './componnent/info/Info'
import User from './componnent/user/User'
import Secretary from './componnent/secretary/Secretary'
import EditDetails from './componnent/editDetails/EditDetails'
import Driver from './componnent/driver/Driver'
import AboutUs from './componnent/aboutUs/AboutUs'
import Contact from './componnent/contact/Contact'
import Drivers from './componnent/drivers/Driverss'
import RequestRide from './componnent/requestRide/RequestRide';
import RatingPage from './componnent/rating/Rating'
import './App.css'
import ThankYou from './componnent/thankYou/ThankYou';

export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const user = (data,token) => {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      token:token
    }
  }

  useEffect(() => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    currntUser && fetch(`http://localhost:8080/users?id=${currntUser.userId}`, {
      headers: { Authorization: currntUser.token }
    })
      .then(async response => {
        const data = await response.json();
        console.log("data in app.jsx: "+data)
        response.ok && setCurrentUser(() => user(data.data,currntUser.token))
      })
  }, []);

  return (
    <>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Router>
          <Routes >
            <Route path='/' element={<Navigate to={'/home'} />} />
            <Route path='/rating/:token' element={<RatingPage/>} />

            <Route path='/home' element={<Home />}>
              {/* <Route path='editDetails' element={<EditDetails />} /> */}
              <Route path='requestRide' element={<RequestRide />} />

              <Route path={`${currentUser.userType}/:id`} element={<Layout />} >
                <Route path='editDetails' element={<EditDetails />} />
                {/* <Route path='info' element={<Info />} /> */}
                <Route path='requestRide' element={<RequestRide />} />
                <Route path='contact' element={<Contact />} />

              </Route>
              <Route path='costumer/:id' element={<Layout />} >
                <Route index element={<User />} />

                {/* 
                <Route path='editDetails' element={<EditDetails />} />
                <Route path='info' element={<Info />} /> */}
                <Route path='aboutUs' element={<AboutUs />} />
                {/* <Route path='contact' element={<Contact />} /> */}
                {/* <Route path='requestRide' element={<RequestRide />} /> */}
                <Route path='drivers' element={<Drivers />} />
              </Route>

              <Route path='driver/:id' element={<Layout />} >
                <Route path='drivers' element={<Drivers />} />
                <Route index element={<Driver />} />
                {/* <Route path='info' element={<Info />} />
                <Route path='editDetails' element={<EditDetails />} /> */}
                {/* <Route path='requestRide' element={<RequestRide />} /> */}
                {/* <Route path='aboutUs' element={<AboutUs />} /> */}
                <Route path='contact' element={<Contact />} />
              </Route>

              <Route path='secretary/:id' element={<Layout />} >
                <Route index element={<Secretary />} />
                {/* <Route path='info' element={<Info />} />
                <Route path='editDetails' element={<EditDetails />} /> */}
              </Route>

              {/* 
              <Route path='secretary/:id' element={<Secretary />} />
              <Route path='driver/:id' element={<Driver />} > */}
              {/* <Route path='editDetails' element={<EditDetails />} /> */}
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

