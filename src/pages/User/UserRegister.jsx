import { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosUrl from '../../../config/AxiosConfig';
import { toast } from 'react-toastify';
import '../../styles/Register.css';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dob: '',
    gender: '',
  });
  const [err, setErr] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErr = {};

    if (!formData.name.trim()) {
      newErr.name = 'Full name is required';
    } else if (!/^([A-ZÀ-Ỹ][a-zà-ỹ]*)(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)+$/u.test(formData.name)) {
      newErr.name = 'Full name must start with a capital letter and contain at least two words';
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

    if (!formData.phone.trim()) {
      newErr.phone = 'Phone number is required';
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErr.phone = 'Phone number must be 10 digits long and start with 0';
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
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        dob: formData.dob,
        gender: formData.gender
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
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            variant="filled"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            label="Confirm Password"
            variant="filled"
            fullWidth
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone Number"
            variant="filled"
            fullWidth
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
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
              defaultValue=""
              value={formData.gender}
              label="Gender"
              onChange={handleInputChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Date of Birth"
            variant="filled"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
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