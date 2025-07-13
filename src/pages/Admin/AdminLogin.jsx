import React from 'react'
import { Box, TextField, Button, ButtonGroup } from '@mui/material'
import { Link } from 'react-router-dom'
import '../../styles/Login.css'

const AdminLogin = () => {
  return (
    <>
      <Box className='login-form'>
        <ButtonGroup variant='contained' aria-label='position admin register'>
          <Button>Manager</Button>
          <Button>Agent</Button>
        </ButtonGroup>
        <h1>Admin login</h1>
        <div className="form">
          <TextField label='email' variant='filled' />
          <TextField label='password' variant='filled' type='password' />
        </div>
        <div className="login-submit">
          <span>Forgot password? <Link to='#'>Click here</Link></span>
          <Button variant='contained'>Login</Button>
        </div>
        <span>Don't have an account? <Link to='/admin-register'>Register</Link></span>
      </Box>
    </>
  )
}

export default AdminLogin