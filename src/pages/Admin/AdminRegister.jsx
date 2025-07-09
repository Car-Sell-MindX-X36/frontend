import { useState } from 'react'
import { Box, TextField, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import '../../styles/Register.css'

const AdminRegister = () => {
  const [gender, setGender] = useState('')
  const [manager, setManager] = useState('')
  const [role, setRole] = useState('')
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    manager: '',
    gender: '',
    dob: ''
  })
  const [err, setErr] = useState({})

  const handleRoleSelect = (role) => {
    setRole(role)
    if (role === 'Hr' || role === 'Manager') {
      setData({ ...data, manager: '' })
    }
    setErr({ ...err, manager: '' })
  }

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
          {/* <Button>Hr</Button>
          <Button>Manager</Button>
          <Button>Agent</Button> */}
          {['HR', 'Manager', 'Agent'].map((roleOption) => (
            <Button
              key={roleOption}
              type="button"
              onClick={() => handleRoleSelect(roleOption)}
            >
              {roleOption}
            </Button>
          ))}
        </ButtonGroup>
        <h1>Admin Register</h1>
        <div className="form">
          <TextField label='Full Name' variant='standard' />
          <TextField label='Email' variant='standard' />
          <TextField label='Password' variant='standard' type='password' />
          <TextField label='Confirm Password' variant='standard' type='password' />
          <TextField label='Phone Number' variant='standard' />
          <TextField label='Address' variant='standard' />
          {role === 'Agent' && (
            <FormControl fullWidth variant="standard" error={!!err.manager}>
              <InputLabel id="manager-select-label">Manager</InputLabel>
              <Select
                labelId="manager-select-label"
                id="manager-select"
                name="manager"
                value={data.manager}
                label="Manager"
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Manager 1">Manager 1</MenuItem>
                <MenuItem value="Manager 2">Manager 2</MenuItem>
              </Select>
            </FormControl>
          )}
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
