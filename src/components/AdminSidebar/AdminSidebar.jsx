import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AdminSidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Dùng để biết tab nào đang active

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(`/dashboard/${path}`);
    handleDropdownClose();
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const isActive = (path) => location.pathname === `/dashboard/${path}`;

  return (
    <div className='flex'>
      {/* Sidebar bên trái */}
      <div className='w-64 min-h-screen bg-gray-100 shadow-lg flex flex-col'>
        {/* Header */}
        <div className='p-6 border-b border-gray-200'>
          <h1 className='text-3xl font-bold text-gray-800'>
            <Link to='/dashboard'>Admin</Link>
          </h1>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-4'>
          <Button
            component={Link}
            to='/dashboard/home'
            variant='text'
            fullWidth
            sx={{
              ...buttonStyle,
              ...(isActive('home') && activeStyle),
            }}
          >
            Dashboard
          </Button>

          <Button
            component={Link}
            to='/dashboard/revenue'
            variant='text'
            fullWidth
            sx={{
              ...buttonStyle,
              ...(isActive('revenue') && activeStyle),
            }}
          >
            Doanh Thu
          </Button>

          <div>
            <Button
              variant='text'
              fullWidth
              onClick={handleDropdownClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                ...buttonStyle,
                ...(location.pathname.includes('/dashboard/add-car') ||
                location.pathname.includes('/dashboard/edit-car') ||
                location.pathname.includes('/dashboard/delete-car') ||
                location.pathname.includes('/dashboard/rent-car') ||
                location.pathname.includes('/dashboard/sell-car')
                  ? activeStyle
                  : {}),
              }}
            >
              Nghiệp vụ xe
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleDropdownClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={menuStyle}
            >
              <MenuItem
                onClick={() => handleMenuItemClick('add-car')}
                sx={{
                  ...menuItemStyle,
                  ...(isActive('add-car') && activeStyle),
                }}
              >
                Thêm xe
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick('edit-car')}
                sx={{
                  ...menuItemStyle,
                  ...(isActive('edit-car') && activeStyle),
                }}
              >
                Sửa xe
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick('delete-car')}
                sx={{
                  ...menuItemStyle,
                  ...(isActive('delete-car') && activeStyle),
                }}
              >
                Xóa xe
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick('rent-car')}
                sx={{
                  ...menuItemStyle,
                  ...(isActive('rent-car') && activeStyle),
                }}
              >
                Đăng thuê xe
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuItemClick('sell-car')}
                sx={{
                  ...menuItemStyle,
                  ...(isActive('sell-car') && activeStyle),
                }}
              >
                Đăng bán xe
              </MenuItem>
            </Menu>
          </div>

          <Button
            component={Link}
            to='/dashboard/orders'
            variant='text'
            fullWidth
            sx={{
              ...buttonStyle,
              ...(isActive('orders') && activeStyle),
            }}
          >
            Đơn hàng
          </Button>
        </nav>

        {/* Logout */}
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
              textTransform: 'none',
              borderRadius: '8px',
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Outlet để hiển thị nội dung theo route con */}
      <div className='flex-1 p-6 flex flex-col space-y-4'>
        {/* Nội dung sẽ hiển thị bằng <Outlet /> trong App.jsx hoặc DashboardLayout */}
      </div>
    </div>
  );
};

const buttonStyle = {
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
};

const activeStyle = {
  borderBottom: '2px solid #2563eb',
  backgroundColor: '#e0f2fe',
};

const menuStyle = {
  '& .MuiPaper-root': {
    minWidth: '200px',
    marginTop: '4px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
};

const menuItemStyle = {
  fontSize: '1rem',
  padding: '12px 16px',
  '&:hover': {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
  },
};

export default AdminSidebar;
