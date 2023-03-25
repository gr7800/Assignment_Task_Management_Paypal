import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Sprints from '../Pages/Sprints'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Home from '../Pages/Home'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/sprint" element={<Sprints></Sprints>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
    </Routes>
  )
}

export default AllRoutes