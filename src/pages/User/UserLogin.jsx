import React from 'react'
import { Box, TextField, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import '../../styles/UserLogin.css'

const UserLogin = () => {
  return (
    <>
        <Box className='login-form'>
            <h1>Login</h1>
            <div className="form">
              <TextField label='Email' variant='standard' />
              <TextField label='Password' variant='standard' type='password' />
            </div>
            <div className="login-submit">
              <span>Forgot password? <Link to='#'>Click here</Link></span>
              <Button variant='contained'>Login</Button>
            </div>
            <span>Don't have an account? <a href='/register'>Register</a></span>
        </Box>
    </>
  )
}

export default UserLogin