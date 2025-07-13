// import { useState } from 'react'
// import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// import { Link, useNavigate } from 'react-router-dom'
// import axiosUrl from '../../../config/AxiosConfig'
// import { toast } from 'react-toastify'
// import '../../styles/Register.css'

// const UserRegister = () => {
//   const [fullName, setFullName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [dob, setDob] = useState('')
//   const [gender, setGender] = useState('')
//   const [err, setErr] = useState({})
//   const navigate = useNavigate()

//   const validate = () => {
//     const newErr = {}

//     if (!fullName.trim()) {
//       newErr.fullName = 'Full name is required'
//     } else if (/^([A-ZÀ-Ỹ][a-zà-ỹ]*)(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)+$/u.test(fullName)) {
//       newErr.fullName = 'Full name must start with a capital letter and contain at least two words'
//     }
    
//     if (!email.trim()) {
//       newErr.email = 'Email is required'
//     } else if (/^[\w.+-]+@gmail\.com$/.test(email)) {
//       newErr.email = 'Email must be a valid Gmail address'
//     }

//     if (!password.trim()) {
//       newErr.password = 'Password is required'
//     } else if (/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s;])[^\s\n;]{5,32}$/.test(password)) {
//       newErr.password = 'Password must be 5-32 characters long, contain at least one uppercase letter, one number, and one special character'
//     }

//     if (!confirmPassword.trim()) {
//       newErr.confirmPassword = 'Confirm password is required'
//     } else if (confirmPassword !== password) {
//       newErr.confirmPassword = 'Passwords do not match'
//     }

//     if (!phoneNumber.trim()) {
//       newErr.phoneNumber = 'Phone number is required'
//     } else if (/^0\d{9}$/.test(phoneNumber)) {
//       newErr.phoneNumber = 'Phone number must be 10 digits long and start with 0'
//     }

//     if (!gender.trim()) {
//       newErr.gender = 'Gender is required'
//     }

//     if (!dob.trim()) {
//       newErr.dob = 'Date of birth is required'
//     } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
//       newErr.dob = 'Date of birth must be in YYYY-MM-DD format'
//     }
//   }

//   const handleRegister = async (e) => {
//     e.preventDefault()

//     if (!validate()) return 

//     try {
//       const customerData = { fullName, email, password, confirmPassword, phoneNumber, gender, dob}
//       console.log(customerData)
//       const response = await axiosUrl.post('/customer-registers', customerData)

//       if (response.status === 201) {
//         toast.success('Registration successful')
//         navigate('/login')
//       }
//     } catch (error) {
//       const errMessage = error.response?.data?.message || 'Registration failed'
//       toast.error(errMessage)
//       console.error('Registration error:', error)
//     }
//   }

//   return (
//     <>
//       <Box component='form' className='register-form' onSubmit={handleRegister}>
//         <h1 className='title'>User Register</h1>
//         <div className="form">
//           <TextField 
//             label='Full Name' 
//             variant='filled' 
//             value={fullName} 
//             onChange={(e) => setFullName(e.target.value)} 
//             error={!!err.fullName} 
//             helperText={err.fullName} 
//           />
//           <TextField 
//             label='Email' 
//             variant='filled' 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             error={!!err.email} 
//             helperText={err.email} 
//           />
//           <TextField 
//             label='Password' 
//             variant='filled' 
//             type='password' 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             error={!!err.password} 
//             helperText={err.password}
//           />
//           <TextField 
//             label='Confirm Password' 
//             variant='filled' 
//             type='password' 
//             value={confirmPassword} 
//             onChange={(e) => setConfirmPassword(e.target.value)} 
//             error={!!err.confirmPassword} 
//             helperText={err.confirmPassword} 
//           />
//           <TextField 
//             label='Phone Number' 
//             variant='filled' 
//             value={phoneNumber} 
//             onChange={(e) => setPhoneNumber(e.target.value)} 
//             error={!!err.phoneNumber} 
//             helperText={err.phoneNumber} 
//           />
//         </div>
//         <div className="gender-dob">
//           <FormControl sx={{ width: '50%'}} variant='filled' required error={!!err.gender}>
//             <InputLabel id='gender-select-label'>Gender</InputLabel>
//             <Select labelId='gender-select-label' id='gender-select' value={gender} label='Gender' onChange={(e) => setGender(e.target.value)}>
//               <MenuItem value='Male'>Male</MenuItem>
//               <MenuItem value='Female'>Female</MenuItem>
//               <MenuItem value='Other'>Other</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label='Date of Birth'
//             variant='filled' 
//             type='date' 
//             value={dob} 
//             onChange={(e) => setDob(e.target.value)} 
//             error={!!err.dob} 
//             helperText={err.dob} 
//           />
//         </div>
//         <div className="register-submit">
//           <span>Already have an account? <Link to='/login'>Login</Link></span>
//           <Button variant='contained'>Register</Button>
//         </div>
//       </Box>
//     </>
//   )
// }

// export default UserRegister

import { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosUrl from '../../../config/AxiosConfig';
import { toast } from 'react-toastify';
import '../../styles/Register.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dob: '',
    gender: '',
  });
  const [err, setErr] = useState({});
  const navigate = useNavigate();

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

    if (!formData.gender) {
      newErr.gender = 'Gender is required';
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

  const handleRegister = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    try {
      const customerData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        dob: formData.dob,
        role: 'User', // Hardcoded as 'User' for customer registration
      };
      console.log('Registration Payload:', customerData);
      const response = await axiosUrl.post('/customer-registers', customerData);

      if (response.status === 201) {
        toast.success('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      const errMessage = error.response?.data?.message || 'Registration failed';
      toast.error(errMessage);
      console.error('Registration error:', error);
    }
  };

  return (
    <Box
      component="form"
      className="flex items-center justify-center min-h-screen bg-gray-100"
      onSubmit={handleRegister}
    >
      <div className="register-form bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Register
        </h1>
        <div className="form space-y-4">
          <TextField
            label="Full Name"
            variant="filled"
            fullWidth
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={!!err.fullName}
            helperText={err.fullName}
          />
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!err.email}
            helperText={err.email}
          />
          <TextField
            label="Password"
            variant="filled"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!err.password}
            helperText={err.password}
          />
          <TextField
            label="Confirm Password"
            variant="filled"
            fullWidth
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={!!err.confirmPassword}
            helperText={err.confirmPassword}
          />
          <TextField
            label="Phone Number"
            variant="filled"
            fullWidth
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            error={!!err.phoneNumber}
            helperText={err.phoneNumber}
          />
        </div>
        <div className="gender-dob flex space-x-4 mt-4">
          <FormControl
            sx={{ width: '50%' }}
            variant="filled"
            required
            error={!!err.gender}
          >
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              name="gender"
              value={formData.gender}
              label="Gender"
              onChange={handleInputChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <FormHelperText>{err.gender}</FormHelperText>
          </FormControl>
          <TextField
            label="Date of Birth"
            variant="filled"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            error={!!err.dob}
            helperText={err.dob}
            InputLabelProps={{ shrink: true }}
            sx={{ width: '50%' }}
          />
        </div>
        <div className="register-submit mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </span>
          <Button type="submit" variant="contained">
            Register
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default UserRegister;