import React from 'react'
import UserLoginModal from '../Modal/UserLoginModal'
import UserRegisterModal from '../Modal/UserRegisterModal'
import {} from '@mui/material'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='w-4/5 flex justify-between items-center p-4'>
        <h1 className='text-3xl font-bold'><Link to='/'>AUTOCAR</Link></h1>
        <nav className='flex gap-6'>
            <span className='font-bold'><Link to='#'>Mua xe</Link></span>
            <p>|</p>
            <span className='font-bold'><Link to='#'>Bán xe</Link></span>
            <p>|</p>
            <span className='font-bold'><Link to='#'>Thuê xe</Link></span>
        </nav>
        <div className='flex items-center gap-4'>
            <UserLoginModal />
            <UserRegisterModal />
        </div>
    </div>
  )
}

export default Header