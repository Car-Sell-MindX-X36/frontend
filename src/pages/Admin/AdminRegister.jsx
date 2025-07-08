import { useState } from 'react'
import { Box, TextField, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import '../../styles/Register.css'

const AdminRegister = () => {
  const [gender, setGender] = useState('')
  const [manager, setManager] = useState('')

  const handleChangeGender = (e) => {
    setGender(e.target.value)
  }

  const handleChangeManager = (e) => {
    setManager(e.target.value)
  }

  return (
    <>
      <Box className='register-form'>
        <ButtonGroup variant='contained' aria-label='position admin register'>
          <Button>HR</Button>
          <Button>Manager</Button>
          <Button>Agent</Button>
        </ButtonGroup>
        <h1>Admin Register</h1>
        <div className="form">
          <TextField label='Full Name' variant='standard' />
          <TextField label='Email' variant='standard' />
          <TextField label='Password' variant='standard' type='password' />
          <TextField label='Confirm Password' variant='standard' type='password' />
          <TextField label='Phone Number' variant='standard' />
          <TextField label='Address' variant='standard' />
          <FormControl fullWidth variant='standard'>
            <InputLabel id='manager-select-label'>Manager</InputLabel>
            <Select labelId='manager-select-label' id='manager-select' value={manager} label='Manager' onChange={handleChangeManager}>
              <MenuItem value=''>Select</MenuItem>
              <MenuItem value='Manager 1'>Manager 1</MenuItem>
              <MenuItem value='Manager 2'>Manager 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="gender-dob">
          <FormControl sx={{ width: '50%' }} variant='standard'>
            <InputLabel id='gender-select-label'>Gender</InputLabel>
            <Select labelId='gender-select-label' id='gender-select' value={gender} label='Gender' onChange={handleChangeGender}>
              <MenuItem value=''>Select</MenuItem>
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Women'>Women</MenuItem>
            </Select>
          </FormControl>
          <TextField variant='standard' type='date' />
        </div>
        <div className="register-submit">
          <span>Already have an account? <Link to='/admin-login'>Login</Link></span>
          <Button variant='contained'>Register</Button>
        </div>
      </Box>
    </>
  )
}

export default AdminRegister