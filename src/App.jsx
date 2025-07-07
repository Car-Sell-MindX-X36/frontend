import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRegister from './pages/User/UserRegister'
import UserLogin from './pages/User/UserLogin'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminRegister from './pages/Admin/AdminRegister'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
      </Routes>
    </BrowserRouter>  
  )
}

export default App