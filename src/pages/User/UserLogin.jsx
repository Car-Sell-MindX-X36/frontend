import React from 'react'
import { Box, TextField, Button } from '@mui/material'

const UserLogin = () => {
  return (
    <>
        <Box>
            <h1>Login</h1>
            <TextField label='Email' variant='standard' />
            <TextField label='Password' variant='standard' type='password' />
            <Button variant='contained'>Login</Button>
            <span>Don't have an account? <a href='/register'>Register</a></span>
        </Box>
    </>
  )
}

export default UserLogin