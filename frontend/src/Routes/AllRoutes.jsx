import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Task from '../Pages/Task'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import PrivateRoute from './PrivateRoute'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
      <Route path="/task" element={<PrivateRoute><Task></Task></PrivateRoute>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
    </Routes>
  )
}

export default AllRoutes