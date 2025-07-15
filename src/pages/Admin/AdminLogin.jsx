import { useState } from 'react'
import { Box, TextField, Button, FormGroup, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/Login.css'

const AdminLogin = () => {
  const [role, setRole] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleRoleSelect = (role) => {
    setRole(role)
    setFormData({ ...formData, manager: '' })
  }


  return (
    <>
      <Box component='form' className='w-full h-screen flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold text-center text-gray-800 my-3'>Admin login</h1>
        {/* <FormGroup>
          <FormLabel id='role-buttons-group-label'>Role</FormLabel>
          <RadioGroup>
            <FormControlLabel value='Manager' control={<Radio />} label='Manager' />
            <FormControlLabel value='Agent' control={<Radio />} label='Agent' />
          </RadioGroup>
        </FormGroup> */}
        <div className="flex flex-col items-center justify-center gap-[1.25rem] my-[1.25rem]">
          <TextField sx={{ width: '300px' }} label='email' variant='filled' />
          <TextField sx={{ width: '300px' }} label='password' variant='filled' type='password' />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-[1.25rem] my-[1.25rem]">
          <span>Forgot password? <Link to='#'>Click here</Link></span>
          <Button variant='contained'>Login</Button>
        </div>
        <span>Don't have an account? <Link to='/admin-register'>Register</Link></span>
      </Box>
    </>
  )
}

export default AdminLogin