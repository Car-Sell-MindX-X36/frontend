// import { useState } from 'react'
// import { Box, TextField, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// import { Link } from 'react-router-dom'
// import '../../styles/Register.css'

// const AdminRegister = () => {
//   const [gender, setGender] = useState('')
//   const [manager, setManager] = useState('')
//   const [role, setRole] = useState('')
//   const [data, setData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     address: '',
//     manager: '',
//     gender: '',
//     dob: ''
//   })
//   const [err, setErr] = useState({})

//   const handleRoleSelect = (role) => {
//     setRole(role)
//     if (role === 'Manager') {
//       setData({ ...data, manager: '' })
//     }
//     setErr({ ...err, manager: '' })
//   }

//   const handleChangeGender = (e) => {
//     setGender(e.target.value)
//   }

//   const handleChangeManager = (e) => {
//     setManager(e.target.value)
//   }

//   return (
//     <>
//       <Box className='register-form'>
//         <ButtonGroup variant='contained' aria-label='position admin register'>
//           {/* <Button>Hr</Button>
//           <Button>Manager</Button>
//           <Button>Agent</Button> */}
//           {['Manager', 'Agent'].map((roleOption) => (
//             <Button
//               key={roleOption}
//               type="button"
//               onClick={() => handleRoleSelect(roleOption)}
//             >
//               {roleOption}
//             </Button>
//           ))}
//         </ButtonGroup>
//         <h1>Admin Register</h1>
//         <div className="form">
//           <TextField label='Full Name' variant='filled' />
//           <TextField label='Email' variant='filled' />
//           <TextField label='Password' variant='filled' type='password' />
//           <TextField label='Confirm Password' variant='filled' type='password' />
//           <TextField label='Phone Number' variant='filled' />
//           <TextField label='Address' variant='filled' />
//           {role === 'Agent' && (
//             <FormControl fullWidth variant="filled" error={!!err.manager}>
//               <InputLabel id="manager-select-label">Manager</InputLabel>
//               <Select
//                 labelId="manager-select-label"
//                 id="manager-select"
//                 name="manager"
//                 value={data.manager}
//                 label="Manager"
//               >
//                 <MenuItem value="">Select</MenuItem>
//                 <MenuItem value="Manager 1">Manager 1</MenuItem>
//                 <MenuItem value="Manager 2">Manager 2</MenuItem>
//               </Select>
//             </FormControl>
//           )}
//         </div>
//         <div className="gender-dob">
//           <FormControl sx={{ width: '50%' }} variant='filled'>
//             <InputLabel id='gender-select-label'>Gender</InputLabel>
//             <Select labelId='gender-select-label' id='gender-select' value={gender} label='Gender' onChange={handleChangeGender}>
//               <MenuItem value=''>Select</MenuItem>
//               <MenuItem value='Male'>Male</MenuItem>
//               <MenuItem value='Women'>Women</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField variant='filled' type='date' />
//         </div>
//         <div className="register-submit">
//           <span>Already have an account? <Link to='/admin-login'>Login</Link></span>
//           <Button variant='contained'>Register</Button>
//         </div>
//       </Box>
//     </>
//   )
// }

// export default AdminRegister

import { useState } from 'react';
import { Box, TextField, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosUrl from '../../../config/AxiosConfig';
import { toast } from 'react-toastify';
import '../../styles/Register.css';

const AdminRegister = () => {
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    manager: '',
    gender: '',
    dob: '',
  });
  const [err, setErr] = useState({});
  const navigate = useNavigate();

  // Handle role button click
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Manager') {
      setFormData({ ...formData, manager: '' });
      setErr({ ...err, manager: '' });
    }
    setErr({ ...err, role: '' });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErr({ ...err, [name]: '' });
  };

  // Validate form
  const validate = () => {
    const newErr = {};

    if (!role) {
      newErr.role = 'Please select a role';
    }

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

    if (!formData.address.trim()) {
      newErr.address = 'Address is required';
    }

    if (role === 'Agent' && !formData.manager) {
      newErr.manager = 'Please select a manager';
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

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    try {
      const adminData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        manager: formData.manager || null,
        gender: formData.gender,
        dob: formData.dob,
        role,
      };
      console.log('Admin Registration Payload:', adminData);
      const response = await axiosUrl.post('/admin-registers', adminData);

      if (response.status === 201) {
        toast.success('Registration successful');
        navigate('/admin-login');
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
        <ButtonGroup
          variant="contained"
          aria-label="position admin register"
          fullWidth
          className="mb-6"
        >
          {['Manager', 'Agent'].map((roleOption) => (
            <Button
              key={roleOption}
              type="button"
              onClick={() => handleRoleSelect(roleOption)}
              color={role === roleOption ? 'primary' : 'inherit'}
            >
              {roleOption}
            </Button>
          ))}
        </ButtonGroup>
        {err.role && <p className="text-red-500 text-sm mb-4">{err.role}</p>}

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Register
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
          <TextField
            label="Address"
            variant="filled"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={!!err.address}
            helperText={err.address}
          />
          {role === 'Agent' && (
            <FormControl fullWidth variant="filled" error={!!err.manager}>
              <InputLabel id="manager-select-label">Manager</InputLabel>
              <Select
                labelId="manager-select-label"
                id="manager-select"
                name="manager"
                value={formData.manager}
                label="Manager"
                onChange={handleInputChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Manager 1">Manager 1</MenuItem>
                <MenuItem value="Manager 2">Manager 2</MenuItem>
              </Select>
              <FormHelperText>{err.manager}</FormHelperText>
            </FormControl>
          )}
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
            <Link to="/admin-login" className="text-blue-600 hover:underline">
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

export default AdminRegister;