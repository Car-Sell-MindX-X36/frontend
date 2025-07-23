import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormGroup,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosUrl from '../../../config/AxiosConfig.js';
import '../../styles/Login.css';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosUrl.post('/admin-login', formData);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      toast.success("✅ Đăng nhập thành công!", { autoClose: 3000 });
      navigate('/dashboard/home'); // hoặc route nào đó sau đăng nhập
    } catch (error) {
      console.error('❌ Lỗi đăng nhập:', error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || '❌ Đăng nhập thất bại!', { autoClose: 3000 });
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleLogin}
      className='w-full h-screen flex flex-col items-center justify-center'
    >
      <h1 className='text-2xl font-bold text-center text-gray-800 my-3'>Admin login</h1>

      <FormGroup className='flex-row gap-4'>
        <FormLabel id='role-buttons-group-label'>Role</FormLabel>
        <RadioGroup
          row
          aria-labelledby='role-buttons-group-label'
          name='role'
          value={formData.role}
          onChange={handleChange}
        >
          <FormControlLabel value='manager' control={<Radio />} label='Manager' />
          <FormControlLabel value='agent' control={<Radio />} label='Agent' />
        </RadioGroup>
      </FormGroup>

      <div className="flex flex-col items-center justify-center gap-[1.25rem] my-[1.25rem]">
        <TextField
          sx={{ width: '300px' }}
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          variant='filled'
        />
        <TextField
          sx={{ width: '300px' }}
          label='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          variant='filled'
          type='password'
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-[1.25rem] my-[1.25rem]">
        <span>Forgot password? <Link to='#'>Click here</Link></span>
        <Button type='submit' variant='contained'>Login</Button>
      </div>

      <span>Don't have an account? <Link to='/admin-register'>Register</Link></span>
    </Box>
  );
};

export default AdminLogin;
