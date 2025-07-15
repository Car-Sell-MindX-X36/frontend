import React from 'react'
import UserLoginModal from '../Modal/UserLoginModal'
import UserRegisterModal from '../Modal/UserRegisterModal'
import {} from '@mui/material'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='w-full flex justify-between items-center p-4 bg-gray-800 text-white'>
        <h1 className='text-3xl'>Autocar</h1>
        <nav className='flex gap-6'>
            <span><Link to='#'>Mua xe</Link></span>
            <span><Link to='#'>Bán xe</Link></span>
            <span><Link to='#'>Thuê xe</Link></span>
        </nav>
        <div className='flex items-center gap-4'>
            <UserLoginModal />
            <UserRegisterModal />
        </div>
    </div>
  )
}

export default Header