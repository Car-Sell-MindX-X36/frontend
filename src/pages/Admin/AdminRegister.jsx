import { useState } from 'react'
import { Box, TextField, Button, FormGroup, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import axiosUrl from '../../../config/AxiosConfig'
import { toast } from 'react-toastify'
import '../../styles/Register.css'

const AdminRegister = () => {
  const [gender, setGender] = useState('')
  const [manager, setManager] = useState('')
  const [role, setRole] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    manager: '',
    gender: '',
    dob: '',
    role: ''
  })
  const [err, setErr] = useState({})

  const handleRoleSelect = (role) => {
    setRole(role)
    if (role === 'Manager') {
      setFormData({ ...formData, manager: '' })
    }
    setErr({ ...err, manager: '' })
  }

  const validate = () => {
    const newErr = {};

    if (!formData.fullName.trim()) {
      newErr.fullName = 'Full name is required';
    } else if (!/^([A-ZÀ-Ỹ][a-zà-ỹ]*)(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)+$/u.test(formData.fullName)) {
      newErr.fullName = 'Full name must start with a capital letter and contain at least two words';
    }

    if (!formData.email.trim()) {
      newErr.email = 'Email is required';
    } else if (!/^[\w.+-]+@gmail\.com$/.test(formData.email)) {
      newErr.email = 'Email must be a valid Gmail address';
    }

    if (!formData.password.trim()) {
      newErr.password = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s;])[^\s\n;]{5,32}$/.test(formData.password)) {
      newErr.password = 'Password must be 5-32 characters long, contain at least one uppercase letter, one number, and one special character';
    }

    if (!formData.confirmPassword.trim()) {
      newErr.confirmPassword = 'Confirm password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErr.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phoneNumber.trim()) {
      newErr.phoneNumber = 'Phone number is required';
    } else if (!/^0\d{9}$/.test(formData.phoneNumber)) {
      newErr.phoneNumber = 'Phone number must be 10 digits long and start with 0';
    }

    if (!formData.gender.trim()) {
      newErr.gender = 'Gender is required';
    }

    if (!formData.manager.trim() && role === 'Agent') {
      newErr.manager = 'Manager is required';
    }

    if (!formData.dob) {
      newErr.dob = 'Date of birth is required';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dob)) {
      newErr.dob = 'Date of birth must be in YYYY-MM-DD format';
    }

    setErr(newErr);
    return Object.keys(newErr).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErr({ ...err, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = validate()
    if (!isValid) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const adminData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        manager: formData.manager,
        gender: formData.gender,
        dob: formData.dob,
        role: formData.role
      }
      console.log(adminData)
      const response = await axiosUrl.post('/admin-registers', adminData)

      if (response.status === '201') {
        toast.success('Registration successfully')
        Navigate('/admin-login')
      }
    } catch (error) {
      const errMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errMessage);
      console.error('Registration error:', error);
    }
  }

  const handleChangeGender = (e) => {
    setGender(e.target.value)
  }

  const handleChangeManager = (e) => {
    setManager(e.target.value)
  }

  return (
    <>
      <Box component='form' className='w-full h-screen flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold text-center text-gray-800 my-3'>Admin Register</h1>
        <div className="register-form flex flex-row items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center px-[1.25rem]">
            <TextField sx={{ width: '300px', margin: '12.5px 0' }} label='Full Name' variant='filled' value={formData.name} onChange={handleInputChange} required />
            <TextField sx={{ width: '300px', margin: '12.5px 0' }} label='Email' variant='filled' required />
            <TextField sx={{ width: '300px', margin: '12.5px 0' }} label='Password' variant='filled' type='password' required />
            <TextField sx={{ width: '300px', margin: '12.5px 0' }} label='Confirm Password' variant='filled' type='password' required />
          </div>
          <div className="flex flex-col items-center justify-center px-[1.25rem]">
            <div className='w-[300px] flex items-center justify-center flex-col'>
              <TextField sx={{ width: '300px', margin: '15px 0' }} label='Phone Number' variant='filled' required />
              <FormGroup sx={{ width: '300px', margin: '15px 0' }}>
                <div className='flex flex-row items-center gap-[1.25rem] justify-center'>
                  <FormLabel id='role-buttons-group-label'>Role</FormLabel>
                  <RadioGroup>
                    <div className='flex flex-row items-center justify-center'>
                      <FormControlLabel
                        value='Manager'
                        control={<Radio />}
                        label='Manager'
                        onChange={() => handleRoleSelect('Manager')}
                      />
                      <FormControlLabel
                        value='Agent'
                        control={<Radio />}
                        label='Agent'
                        onChange={() => handleRoleSelect('Agent')}
                      />
                    </div>
                  </RadioGroup>
                </div>
              </FormGroup>
            </div>
            <FormControl sx={{ width: '300px', margin: '15px 0' }} fullWidth variant="filled" error={!!err.manager}>
              <InputLabel id="manager-select-label">Manager</InputLabel>
              <Select
                labelId="manager-select-label"
                id="manager-select"
                name="manager"
                value={formData.manager}
                label="Manager"
                disabled={!role || role !== 'Agent'}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Manager 1">Manager 1</MenuItem>
                <MenuItem value="Manager 2">Manager 2</MenuItem>
              </Select>
            </FormControl>
            <div className="w-[300px] flex items-center justify-center gap-[1.25rem] my-[1rem]">
              <FormControl sx={{ width: '50%' }} variant='filled'>
                <InputLabel id='gender-select-label'>Gender</InputLabel>
                <Select labelId='gender-select-label' id='gender-select' value={gender} label='Gender' onChange={handleChangeGender}>
                  <MenuItem value=''>Select</MenuItem>
                  <MenuItem value='Male'>Male</MenuItem>
                  <MenuItem value='Women'>Women</MenuItem>
                </Select>
              </FormControl>
              <TextField label='Date of Birth' variant='filled' type='date' InputLabelProps={{ shrink: true }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-[1.25rem] my-[1rem]">
          <span>Already have an account? <Link to='/admin-login'>Login</Link></span>
          <Button variant='contained'>Register</Button>
        </div>
      </Box>
    </>
  )
}

export default AdminRegister
