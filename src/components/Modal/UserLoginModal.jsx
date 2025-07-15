import { useState } from 'react'
import { Button, Box, Typography, Modal, TextField } from '@mui/material'
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

const UserLoginModal = () => {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumberOrEmail: '',
        password: ''
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErr({ ...err, [name]: '' });
    };

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
        <>
            <Button variant='contained' onClick={handleOpen}>Login</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="login-modal" aria-describedby="click-to-login">
                <Box onSubmit={handleLogin} style={style} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff' }}>
                    <Typography id="login-modal" variant="h6" component="h2" sx={{ fontSize: '2rem', margin: '1rem 0' }}>
                        User Login
                    </Typography>
                    <div className="flex flex-col items-center justify-center gap-[1.25rem] my-[1.25rem]">
                        <TextField sx={{ width: '300px' }} label='Email or Phone Number' variant='filled' />
                        <TextField sx={{ width: '300px' }} label='Password' variant='filled' type='password' />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full gap-[1.25rem] my-[1.25rem]">
                        <span>Forgot password? <Link to='#'>Click here</Link></span>
                        <Button sx={{ width: '300px' }} variant='contained'>Login</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default UserLoginModal