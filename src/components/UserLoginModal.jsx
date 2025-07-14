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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <>
        <Button variant='contained' onClick={handleOpen}>Login</Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="login-modal" aria-describedby="click-to-login">
            <Box style={style} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff' }}>
                <Typography id="login-modal" variant="h6" component="h2" sx={{ fontSize: '2rem', margin: '1rem 0' }}>
                    User Login
                </Typography>
                <div className="flex flex-col items-center justify-center gap-[1.25rem] my-[1.25rem]">
                    <TextField sx={{ width: '300px' }} label='Email' variant='filled' />
                    <TextField sx={{ width: '300px' }} label='Password' variant='filled' type='password' />
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-[1.25rem] my-[1.25rem]">
                    <span>Forgot password? <Link to='#'>Click here</Link></span>
                    <Button variant='contained'>Login</Button>
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default UserLoginModal