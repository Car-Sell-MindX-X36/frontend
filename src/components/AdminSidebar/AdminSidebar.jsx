import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CreateVehicleForm from '../../pages/Admin/Form/FormAddCar'
import { useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useState(''); // ✅ Theo dõi tab hiện tại

  const open = Boolean(anchorEl);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

 const navigate = useNavigate(); // ✅ thêm dòng này ở đầu component

const handleMenuItemClick = (path) => {
  navigate(`/dashboard/${path}`); // 🧭 chuyển đúng route con
  handleDropdownClose(); // ✅ đóng menu sau khi bấm
};


  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className='flex'>
      {/* Sidebar bên trái */}
      <div className='w-64 min-h-screen bg-gray-100 shadow-lg flex flex-col'>
        {/* Header */}
        <div className='p-6 border-b border-gray-200'>
          <h1 className='text-3xl font-bold text-gray-800'><Link to='/dashboard'>Admin</Link></h1>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-4'>
      <Button
  component={Link}
  to='/dashboard/home' // ✅ đường dẫn mới tương ứng với route đã sửa
  variant='text'
  fullWidth
  sx={buttonStyle}
>
  Dashboard
</Button>

          <Button
            component={Link}
            to='/dashboard/revenue'
            variant='text'
            fullWidth
            sx={buttonStyle}
          >
            Doanh Thu
          </Button>

          <div>
            <Button
              variant='text'
              fullWidth
              onClick={handleDropdownClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={buttonStyle}
            >
              Thêm/Đăng Bán/Thuê Xe
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleDropdownClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={menuStyle}
            >
              <MenuItem onClick={() => handleMenuItemClick('add-car')} sx={menuItemStyle}>
                Thêm xe
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('edit-car')} sx={menuItemStyle}>
                Sửa xe
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('delete-car')} sx={menuItemStyle}>
                Xóa xe
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('rent-car')} sx={menuItemStyle}>
                Đăng thuê xe
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick('sell-car')} sx={menuItemStyle}>
                Đăng bán xe
              </MenuItem>
            </Menu>
          </div>

          <Button
            component={Link}
            to='/admin/orders'
            variant='text'
            fullWidth
            sx={buttonStyle}
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
            sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold', textTransform: 'none' }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Nội dung chính bên phải */}
      <div className='flex-1 p-6 flex flex-col space-y-4'>
        {selectedTab === 'add-car' && <CreateVehicleForm mode='create' />}
      </div>
    </div>
  )
}

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
}

const menuStyle = {
  '& .MuiPaper-root': {
    minWidth: '200px',
    marginTop: '4px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}

const menuItemStyle = {
  fontSize: '1rem',
  padding: '12px 16px',
  '&:hover': {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
  },
}

export default AdminSidebar
