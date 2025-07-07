import { useState } from 'react'
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'

const UserRegister = () => {
  const [gender, setGender] = useState('')

  const handleChangeGender = (e) => {
    setGender(e.target.value)
  }

  return (
    <>
      <Box>
        <h1>Register</h1>
        <TextField label='Full Name' variant='standard'  />
        <TextField label='Email' variant='standard' />
        <TextField label='Password' variant='standard' type='password' />
        <TextField label='Phone Number' vairant='standard' />
        <FormControl fullWidth>
          <InputLabel id='gender-select-label'>Gender</InputLabel>
          <Select labelId='gender-select-label' id='gender-select' value={gender} label='Gender' onChange={handleChangeGender}>
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Women'>Women</MenuItem>
          </Select>
        </FormControl>
        <TextField variant='standard' type='date' />
        <TextField label='Address' variant='standard' />
        <span>Already have an account? <Link to='/login'>Login</Link></span>
        <Button variant='contained'>Register</Button>
      </Box>
    </>
  )
}

export default UserRegister