import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserRegister from './pages/User/UserRegister'
import UserLogin from './pages/User/UserLogin'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminRegister from './pages/Admin/AdminRegister'
import Dashboard from './pages/Admin/Dashboard'
import HomePage from './pages/User/HomePage'
import './App.css'
import AdminLayout from './pages/Admin/AdminLayout'
import CreateVehicleForm from './pages/Admin/Form/FormAddCar'
import UpdateVehicleFull from './pages/Admin/Form/FormUpdateCar'
import DeleteVehicleForm from './pages/Admin/Form/FormDeleteCar'
import PublishVehicleForm from './pages/Admin/Form/FormSellCar'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path='/' element={<HomePage />} />
     <Route path='/dashboard' element={<AdminLayout />}>
  <Route path='home' element={<Dashboard />} />
  <Route path='add-car' element={<CreateVehicleForm />} />
  <Route path='edit-car' element={<UpdateVehicleFull />} />
  <Route path='delete-car' element={<DeleteVehicleForm />} />
  <Route path='sell-car' element={<PublishVehicleForm />} />
  {/* Add other admin routes here */}
</Route>

      </Routes>
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </BrowserRouter>  
  )
}

export default App