import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const AdminSidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    console.log('Selected:', value);
    // Add navigation logic here based on selection
    handleDropdownClose();
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className='w-64 min-h-screen bg-gray-100 shadow-lg flex flex-col'>
      {/* Header */}
      <div className='p-6 border-b border-gray-200'>
        <h1 className='text-3xl font-bold text-gray-800'><Link to='/dashboard'>Admin</Link></h1>
      </div>
      
      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-4'>
        {/* Doanh Thu Button */}
        <Button
          component={Link}
          to='/admin/revenue'
          variant='text'
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#374151',
            padding: '12px 16px',
            '&:hover': {
              backgroundColor: '#dbeafe',
              color: '#2563eb',
            },
            borderRadius: '8px',
          }}
        >
          Doanh Thu
        </Button>

        {/* Mẫu Dropdown Button */}
        <div>
          <Button
            variant='text'
            fullWidth
            onClick={handleDropdownClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              justifyContent: 'space-between',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
              color: '#374151',
              padding: '12px 16px',
              '&:hover': {
                backgroundColor: '#dbeafe',
                color: '#2563eb',
              },
              borderRadius: '8px',
            }}
          >
            Mẫu
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleDropdownClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              '& .MuiPaper-root': {
                minWidth: '200px',
                marginTop: '4px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <MenuItem 
              onClick={() => handleMenuItemClick('add-car')}
              sx={{
                fontSize: '1rem',
                padding: '12px 16px',
                '&:hover': {
                  backgroundColor: '#dbeafe',
                  color: '#2563eb',
                },
              }}
            >
              Thêm xe
            </MenuItem>
            <MenuItem 
              onClick={() => handleMenuItemClick('sell-car')}
              sx={{
                fontSize: '1rem',
                padding: '12px 16px',
                '&:hover': {
                  backgroundColor: '#dbeafe',
                  color: '#2563eb',
                },
              }}
            >
              Bán xe
            </MenuItem>
            <MenuItem 
              onClick={() => handleMenuItemClick('rent-car')}
              sx={{
                fontSize: '1rem',
                padding: '12px 16px',
                '&:hover': {
                  backgroundColor: '#dbeafe',
                  color: '#2563eb',
                },
              }}
            >
              Cho thuê xe
            </MenuItem>
          </Menu>
        </div>

        {/* Đơn hàng Button */}
        <Button
          component={Link}
          to='/admin/orders'
          variant='text'
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#374151',
            padding: '12px 16px',
            '&:hover': {
              backgroundColor: '#dbeafe',
              color: '#2563eb',
            },
            borderRadius: '8px',
          }}
        >
          Đơn hàng
        </Button>
      </nav>
      
      {/* Logout Button */}
      <div className='p-4 border-t border-gray-200'>
        <Button 
          variant='contained' 
          color='error'
          fullWidth
          onClick={handleLogout}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none'
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default AdminSidebar