import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosUrl from '../../../config/AxiosConfig';
import { toast } from 'react-toastify';
import '../../styles/Login.css';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    phoneNumberOrEmail: '',
    password: '',
  });
  const [err, setErr] = useState({});
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErr({ ...err, [name]: '' });
  };

  // Validate form
  const validate = () => {
    const newErr = {};

    if (!formData.phoneNumberOrEmail.trim()) {
      newErr.phoneNumberOrEmail = 'Phone number or email is required';
    } else if (
      !/^[\w.+-]+@gmail\.com$/.test(formData.phoneNumberOrEmail) ||
      !/^0\d{9}$/.test(formData.phoneNumberOrEmail)
    ) {
      newErr.phoneNumberOrEmail = 'Must be a valid Gmail address or 10-digit phone number starting with 0';
    }

    if (!formData.password.trim()) {
      newErr.password = 'Password is required';
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s;])[^\s\n;]{5,32}$/.test(formData.password)) {
      newErr.password = 'Password must be 5-32 characters long, contain at least one uppercase letter, one number, and one special character';
    }

    setErr(newErr);
    return Object.keys(newErr).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    try {
      const loginData = {
        phoneNumberOrEmail: formData.phoneNumberOrEmail,
        password: formData.password
      };
      console.log('Login Payload:', loginData);
      const response = await axiosUrl.post('/customer-login', loginData);

      if (response.status === 200) {
        toast.success('Login successful');
        navigate('/dashboard'); // Adjust to your app's dashboard route
      }
    } catch (error) {
      const errMessage = error.response?.data?.message || 'Login failed';
      toast.error(errMessage);
      console.error('Login error:', error);
    }
  };

  return (
    <Box
      component="form"
      className="flex items-center justify-center min-h-screen bg-gray-100"
      onSubmit={handleLogin}
    >
      <div className="login-form bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Login
        </h1>
        <div className="form space-y-4">
          <TextField
            label="Phone Number or Email"
            variant="filled"
            fullWidth
            name="phoneNumberOrEmail"
            value={formData.phoneNumberOrEmail}
            onChange={handleInputChange}
            error={!!err.phoneNumberOrEmail}
            helperText={err.phoneNumberOrEmail}
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
        </div>
        <div className="login-submit mt-6 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Forgot password?{' '}
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Click here
            </Link>
          </span>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </span>
        </div>
      </div>
    </Box>
  );
};

export default UserLogin;