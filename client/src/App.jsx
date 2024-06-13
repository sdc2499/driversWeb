import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Home from './componnent/home/Home'; 
import Home from './componnent/home/Home';
import Register from './componnent/entrance/Register'
import Login from './componnent/entrance/Loginn';
// import Login from './componnent/entrance/Login'
// import Layout from './componnent/Layout';
import Error from './componnent/Error';
import Info from './componnent/info/Info';
import User from './componnent/user/User'
import "./app.css"

// import EditPassword from './components/editPassword/EditPassword';
export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const user = (data) => {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone
    }
  }

  useEffect(() => {
    const currntUser = JSON.parse(localStorage.getItem("currentUser"))
    currntUser && fetch(`http://localhost:8080/users?phone=${currntUser.phone}`, {
      // headers: { Authorization: currntUser.token.token }
    })
      .then(async response => {
        const data = await response.json();
        console.log("data in app.jsx: "+data+data[0]+data.id+data[0])
        response.ok && setCurrentUser(() => user(data))
      })
  }, []);

  return (
    <>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Router>
          <Routes >
            <Route path='/' element={<Navigate to={'/home'} />} />
            <Route path='/home' element={<Home />}>
              {/* <Route path='editPassword' element={<EditPassword />} /> */}
              <Route path='info' element={<Info />} />
              <Route path='user/:id' element={<User />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/error' element={<Error />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App

