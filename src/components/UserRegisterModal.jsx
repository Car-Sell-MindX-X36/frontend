import { useState } from 'react'
import { Button, Box, Typography, Modal, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axiosUrl from '../../config/AxiosConfig';
import { toast } from 'react-toastify'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

const UserRegisterModal = () => {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        dob: ''
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
    };

    const handleSubmit = async (e) => {
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
            }

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
        }

    return (
            <>
                <Button variant='contained' onClick={handleOpen}>Register</Button>
                <Modal open={open} onClose={handleClose} aria-labelledby="register-modal" aria-describedby="click-to-register">
                    <Box onSubmit={handleSubmit} style={style} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff' }}>
                        <Typography id="register-modal" variant="h6" component="h2" sx={{ fontSize: '2rem', margin: '1rem 0' }}>
                            User Register
                        </Typography>
                        <div className="flex flex-col items-center justify-center gap-[1.25rem] my-[1.25rem]">
                            <TextField sx={{ width: '300px' }} label='Full Name' variant='filled' name='name' value={formData.name} onChange={handleInputChange} required />
                            <TextField sx={{ width: '300px' }} label='Email' variant='filled' name='email' type='email' value={formData.email} onChange={handleInputChange} required />
                            <TextField sx={{ width: '300px' }} label='Password' variant='filled' name='password' type='password' value={formData.password} onChange={handleInputChange} required />
                            <TextField sx={{ width: '300px' }} label='Confirm Password' variant='filled' name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleInputChange} required />
                            <TextField sx={{ width: '300px' }} label='Phone Number' variant='filled' name='phone' value={formData.phone} onChange={handleInputChange} required />
                            <div className='w-[300px] flex items-center justify-center gap-[1.25rem] my-[0.5rem]'>
                                <FormControl sx={{ width: '50%' }} variant='filled' required>
                                    <InputLabel id='gender-select-label'>Gender</InputLabel>
                                    <Select labelId='gender-select-label' id='gender-select' name='gender' defaultValue='' label='Gender' value={formData.gender} onChange={handleInputChange}>
                                        <MenuItem value=''>Select</MenuItem>
                                        <MenuItem value='Male'>Male</MenuItem>
                                        <MenuItem value='Female'>Female</MenuItem>
                                        <MenuItem value='Other'>Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label='Date Of Birth' variant='filled' type='date' name='dob' InputLabelProps={{ shrink: true }} sx={{ width: '50%' }} value={formData.dob} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full gap-[1.25rem] my-[1.25rem]">
                            <Button variant='contained' sx={{ width: '300px' }}>Register</Button>
                        </div>
                    </Box>
                </Modal>
            </>
        )
    }

    export default UserRegisterModal