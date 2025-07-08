import { useState } from 'react'
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import '../../styles/Register.css'

const UserRegister = () => {
  const [gender, setGender] = useState('')

  const handleChangeGender = (e) => {
    setGender(e.target.value)
  }

  return (
    <>
      <Box className='register-form'>
        <h1>Register</h1>
        <div className="form">
          <TextField label='Full Name' variant='standard'  />
          <TextField label='Email' variant='standard' />
          <TextField label='Password' variant='standard' type='password' />
          <TextField label='Confirm Password' variant='standard' type='password' />
          <TextField label='Address' variant='standard' />
          <TextField label='Phone Number' variant='standard' />
        </div>
        <div className="gender-dob">
          <FormControl sx={{ width: '50%'}} variant='standard'>
            <InputLabel id='gender-select-label'>Gender</InputLabel>
            <Select labelId='gender-select-label' id='gender-select' value={gender} label='Gender' onChange={handleChangeGender}>
              <MenuItem value=''>Select</MenuItem>
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Women'>Women</MenuItem>
            </Select>
          </FormControl>
          <TextField label='DOB' variant='standard' type='date' />
          <TextField label='Note' variant='standard' />
        </div>
        <div className="register-submit">
          <span>Already have an account? <Link to='/login'>Login</Link></span>
          <Button variant='contained'>Register</Button>
        </div>
      </Box>
    </>
  )
}

export default UserRegister