import React from 'react'
import { Box, TextField, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const AdminRegister = () => {
  return (
    <>
        <Box>
            <ButtonGroup variant='contained' aria-label='position admin register'>
                <Button>HR</Button>
                <Button>Manager</Button>
                <Button>Agent</Button>
            </ButtonGroup>
            <h1>Admin Register</h1>
            <TextField  />
        </Box>
    </>
  )
}

export default AdminRegister