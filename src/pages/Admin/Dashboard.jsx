import { useState } from 'react'
import { Grid, Card, CardContent, Typography, Box, Paper } from '@mui/material'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import RevenueChart from '../../components/RevenueChart/RevenueChart'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CarRentalIcon from '@mui/icons-material/CarRental'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'

const Dashboard = () => {
  // Sample data - replace with real data from your API
  const stats = [
    {
      title: 'Tổng Doanh Thu Bán',
      value: '1,250,000,000 VND',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#10b981' }} />,
      color: '#10b981',
      bgColor: '#d1fae5'
    },
    {
      title: 'Tổng Doanh Thu Thuê',
      value: '350,000,000 VND',
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      color: '#8b5cf6',
      bgColor: '#ede9fe'
    },
    {
      title: 'Tổng Xe Bán',
      value: '156',
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: '#3b82f6' }} />,
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      title: 'Tổng Đơn Thuê Xe',
      value: '243',
      icon: <CarRentalIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
      color: '#f59e0b',
      bgColor: '#fef3c7'
    },
    {
      title: 'Đơn Hàng Bán',
      value: '89',
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#ef4444' }} />,
      color: '#ef4444',
      bgColor: '#fee2e2'
    }
  ]

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className='flex-1 p-8'>
        {/* Header */}
        <div className='mb-8'>
          <Typography variant='h3' component='h1' className='font-bold text-gray-800 mb-2'>
            Dashboard
          </Typography>
          <Typography variant='subtitle1' className='text-gray-600'>
            Chào mừng đến với trang quản trị
          </Typography>
        </div>

        {/* Stats Cards */}
        <Grid container spacing={3} className='mb-8' sx={{ width: '100%' }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={stats.length > 4 ? 2.4 : 4} key={index}>
              <Card 
                elevation={2}
                sx={{
                  borderRadius: '12px',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%'
                }}
              >
                <CardContent 
                  className='flex-1'
                  sx={{ 
                    p: { xs: 2.5, sm: 3 },
                    '&:last-child': { pb: { xs: 2.5, sm: 3 } },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: { xs: '140px', sm: '160px' },
                    width: '100%'
                  }}
                >
                  <div className='flex items-center justify-between mb-3'>
                    <div 
                      className='p-2.5 rounded-full flex-shrink-0'
                      style={{ backgroundColor: stat.bgColor }}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <div className='flex-1 flex flex-col justify-end'>
                    <Typography 
                      variant='h4' 
                      component='h2' 
                      className='font-bold mb-2' 
                      style={{ color: stat.color }}
                      sx={{ 
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                        lineHeight: 1.2,
                        wordBreak: 'break-word',
                        textAlign: 'left'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant='body1' 
                      className='text-gray-600'
                      sx={{ 
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                        fontWeight: 600,
                        textAlign: 'left'
                      }}
                    >
                      {stat.title}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Revenue Summary */}
        <Paper 
          elevation={2}
          sx={{ borderRadius: '12px', p: 4, mb: 4 }}
        >
          <Typography variant='h5' component='h2' className='font-bold mb-4 text-gray-800'>
            Tổng Quan Doanh Thu
          </Typography>
          <div className='flex gap-4 justify-between'>
            <div className='flex-1 text-center p-4 bg-green-50 rounded-lg'>
              <Typography variant='body2' className='text-green-600 mb-2'>Tổng Doanh Thu</Typography>
              <Typography variant='h5' className='font-bold text-green-800'>
                1,600,000,000 VNĐ
              </Typography>
              <Typography variant='caption' className='text-green-500'>
                Bán + Thuê
              </Typography>
            </div>
            <div className='flex-1 text-center p-4 bg-blue-50 rounded-lg'>
              <Typography variant='body2' className='text-blue-600 mb-2'>Doanh Thu Bán</Typography>
              <Typography variant='h6' className='font-bold text-blue-800'>
                1,250,000,000 VNĐ
              </Typography>
              <Typography variant='caption' className='text-blue-500'>
                78.1% tổng doanh thu
              </Typography>
            </div>
            <div className='flex-1 text-center p-4 bg-purple-50 rounded-lg'>
              <Typography variant='body2' className='text-purple-600 mb-2'>Doanh Thu Thuê</Typography>
              <Typography variant='h6' className='font-bold text-purple-800'>
                350,000,000 VNĐ
              </Typography>
              <Typography variant='caption' className='text-purple-500'>
                21.9% tổng doanh thu
              </Typography>
            </div>
            {/* <div className='flex-1 text-center p-4 bg-orange-50 rounded-lg'>
              <Typography variant='body2' className='text-orange-600 mb-2'>Tỷ Lệ Thuê/Bán</Typography>
              <Typography variant='h6' className='font-bold text-orange-800'>
                243 / 156
              </Typography>
              <Typography variant='caption' className='text-orange-500'>
                Đơn thuê / xe bán
              </Typography>
            </div> */}
          </div>
        </Paper>

        {/* Revenue Chart Component */}
        <RevenueChart />

        {/* Quick Actions */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* Recent Activities */}
          <Paper 
            elevation={2}
            sx={{ borderRadius: '12px', p: 4 }}
          >
            <Typography variant='h5' component='h2' className='font-bold mb-4 text-gray-800'>
              Hoạt Động Gần Đây
            </Typography>
            <div className='space-y-4'>
              <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                <div>
                  <Typography variant='body2' className='font-medium'>Bán xe Toyota Camry 2023</Typography>
                  <Typography variant='caption' className='text-gray-500'>2 giờ trước</Typography>
                </div>
              </div>
              <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                <div className='w-2 h-2 bg-purple-500 rounded-full mr-3'></div>
                <div>
                  <Typography variant='body2' className='font-medium'>Cho thuê xe Mercedes E-Class</Typography>
                  <Typography variant='caption' className='text-gray-500'>3 giờ trước</Typography>
                </div>
              </div>
              <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
                <div>
                  <Typography variant='body2' className='font-medium'>Thêm xe Honda Civic 2024</Typography>
                  <Typography variant='caption' className='text-gray-500'>5 giờ trước</Typography>
                </div>
              </div>
              <div className='flex items-center p-3 bg-gray-50 rounded-lg'>
                <div className='w-2 h-2 bg-orange-500 rounded-full mr-3'></div>
                <div>
                  <Typography variant='body2' className='font-medium'>Hoàn thành thuê xe BMW X5</Typography>
                  <Typography variant='caption' className='text-gray-500'>1 ngày trước</Typography>
                </div>
              </div>
            </div>
          </Paper>

          {/* Quick Stats */}
          <Paper 
            elevation={2}
            sx={{ borderRadius: '12px', p: 4 }}
          >
            <Typography variant='h5' component='h2' className='font-bold mb-4 text-gray-800'>
              Thống Kê Nhanh
            </Typography>
            <div className='space-y-4'>
              <div className='flex justify-between items-center p-3 bg-green-50 rounded-lg'>
                <Typography variant='body2' className='font-medium text-green-800'>Xe Bán Trong Tháng</Typography>
                <Typography variant='h6' className='font-bold text-green-600'>24</Typography>
              </div>
              <div className='flex justify-between items-center p-3 bg-purple-50 rounded-lg'>
                <Typography variant='body2' className='font-medium text-purple-800'>Đơn Thuê Trong Tháng</Typography>
                <Typography variant='h6' className='font-bold text-purple-600'>35</Typography>
              </div>
              <div className='flex justify-between items-center p-3 bg-blue-50 rounded-lg'>
                <Typography variant='body2' className='font-medium text-blue-800'>Xe Đang Cho Thuê</Typography>
                <Typography variant='h6' className='font-bold text-blue-600'>18</Typography>
              </div>
              <div className='flex justify-between items-center p-3 bg-orange-50 rounded-lg'>
                <Typography variant='body2' className='font-medium text-orange-800'>Đơn Hàng Đang Xử Lý</Typography>
                <Typography variant='h6' className='font-bold text-orange-600'>7</Typography>
              </div>
              <div className='flex justify-between items-center p-3 bg-red-50 rounded-lg'>
                <Typography variant='body2' className='font-medium text-red-800'>Khách Hàng Mới</Typography>
                <Typography variant='h6' className='font-bold text-red-600'>18</Typography>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default Dashboard