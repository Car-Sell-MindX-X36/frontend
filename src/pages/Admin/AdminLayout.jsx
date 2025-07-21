import React from 'react'
import {Outlet} from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import { Typography } from '@mui/material'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className='flex-1 p-8'>
        {/* Header */}
        <div className='mb-8'>
          <Typography variant='h3' component='h1' className='font-bold text-gray-800 mb-2'>
            Dashboard
          </Typography>
          <Typography variant='subtitle1' className='text-gray-600'>
            Chào mừng đến với trang quản trị
          </Typography>
        </div>
        {/* Add your main content here */}
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout