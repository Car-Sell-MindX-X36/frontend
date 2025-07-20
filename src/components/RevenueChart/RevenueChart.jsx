// import React from 'react'
// import { Paper, Typography } from '@mui/material'
// import { LineChart } from '@mui/x-charts/LineChart'

// const RevenueChart = () => {
//   // Monthly revenue data - replace with real data from your API
//   const monthlyData = [85, 92, 78, 105, 118, 95, 112, 125, 140, 98, 115, 130]
//   const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']

//   return (
//     <Paper 
//       elevation={2}
//       sx={{ borderRadius: '12px', p: 4, mb: 4 }}
//     >
//       <Typography variant='h5' component='h2' className='font-bold mb-6 text-gray-800'>
//         Biểu Đồ Doanh Thu Theo Tháng
//       </Typography>
      
//       <div className='w-full'>
//         <LineChart
//           width={undefined}
//           height={400}
//           series={[
//             {
//               data: monthlyData,
//               label: 'Doanh Thu (triệu VND)',
//               color: '#10b981',
//               curve: 'monotoneX',
//             },
//           ]}
//           xAxis={[{
//             scaleType: 'point',
//             data: months,
//             tickLabelStyle: {
//               fontSize: 12,
//               fill: '#6b7280',
//             },
//           }]}
//           yAxis={[{
//             tickLabelStyle: {
//               fontSize: 12,
//               fill: '#6b7280',
//             },
//             valueFormatter: (value) => `${value}M`,
//           }]}
//           grid={{ vertical: true, horizontal: true }}
//           sx={{
//             '& .MuiLineElement-root': {
//               strokeWidth: 3,
//             },
//             '& .MuiMarkElement-root': {
//               strokeWidth: 2,
//               r: 6,
//               fill: '#10b981',
//               stroke: '#ffffff',
//             },
//             '& .MuiAreaElement-root': {
//               fill: 'url(#gradient)',
//               fillOpacity: 0.1,
//             },
//             '& .MuiChartsGrid-line': {
//               stroke: '#e5e7eb',
//               strokeWidth: 1,
//             },
//             '& .MuiChartsAxis-line': {
//               stroke: '#9ca3af',
//             },
//             '& .MuiChartsAxis-tick': {
//               stroke: '#9ca3af',
//             },
//             '& .MuiChartsLegend-series': {
//               fontSize: '14px',
//               fontWeight: 500,
//             },
//             '& .MuiChartsTooltip-root': {
//               backgroundColor: 'rgba(0, 0, 0, 0.8)',
//               color: '#ffffff',
//               borderRadius: '8px',
//               border: '1px solid #10b981',
//             },
//           }}
//           margin={{
//             left: 80,
//             right: 80,
//             top: 80,
//             bottom: 80,
//           }}
//           slotProps={{
//             legend: {
//               direction: 'row',
//               position: { vertical: 'top', horizontal: 'middle' },
//               padding: 0,
//             },
//             popper: {
//               sx: {
//                 '& .MuiChartsTooltip-root': {
//                   backgroundColor: 'rgba(0, 0, 0, 0.8)',
//                   color: '#ffffff',
//                   borderRadius: '8px',
//                   border: '1px solid #10b981',
//                   fontSize: '14px',
//                 },
//               },
//             },
//           }}
//         />
        
//         {/* Custom gradient definition */}
//         <svg width="0" height="0">
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
//               <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>
//     </Paper>
//   )
// }

// export default RevenueChart

import React from 'react'
import { Paper, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'

const RevenueChart = () => {
  // Monthly revenue data in VND (billions) - replace with real data from your API
  const monthlyData = [
    850000000,    // 850 million VND - Tháng 1
    920000000,    // 920 million VND - Tháng 2
    780000000,    // 780 million VND - Tháng 3
    1050000000,   // 1.05 billion VND - Tháng 4
    1180000000,   // 1.18 billion VND - Tháng 5
    950000000,    // 950 million VND - Tháng 6
    1120000000,   // 1.12 billion VND - Tháng 7
    1250000000,   // 1.25 billion VND - Tháng 8
    1400000000,   // 1.4 billion VND - Tháng 9
    980000000,    // 980 million VND - Tháng 10
    1150000000,   // 1.15 billion VND - Tháng 11
    1300000000,   // 1.3 billion VND - Tháng 12
  ]
  
  const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
                  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

  // Format VND currency
  const formatVND = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B VNĐ`
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M VNĐ`
    } else {
      return `${value.toLocaleString('vi-VN')} VNĐ`
    }
  }

  // Format full VND for tooltip
  const formatFullVND = (value) => {
    return `${value.toLocaleString('vi-VN')} VNĐ`
  }

  return (
    <Paper 
      elevation={2}
      sx={{ borderRadius: '12px', p: 4, mb: 4 }}
    >
      <Typography variant='h5' component='h2' className='font-bold mb-6 text-gray-800'>
        Biểu Đồ Doanh Thu Theo Tháng (VNĐ)
      </Typography>
      
      <div className='w-full'>
        <LineChart
          width={undefined}
          height={400}
          series={[
            {
              data: monthlyData,
              label: 'Doanh Thu',
              color: '#10b981',
              curve: 'monotoneX',
            },
          ]}
          xAxis={[{
            scaleType: 'point',
            data: months,
            tickLabelStyle: {
              fontSize: 12,
              fill: '#6b7280',
            },
          }]}
          yAxis={[{
            tickLabelStyle: {
              fontSize: 12,
              fill: '#6b7280',
            },
            valueFormatter: formatVND,
          }]}
          grid={{ vertical: true, horizontal: true }}
          sx={{
            '& .MuiLineElement-root': {
              strokeWidth: 3,
            },
            '& .MuiMarkElement-root': {
              strokeWidth: 2,
              r: 6,
              fill: '#10b981',
              stroke: '#ffffff',
            },
            '& .MuiAreaElement-root': {
              fill: 'url(#gradient)',
              fillOpacity: 0.1,
            },
            '& .MuiChartsGrid-line': {
              stroke: '#e5e7eb',
              strokeWidth: 1,
            },
            '& .MuiChartsAxis-line': {
              stroke: '#9ca3af',
            },
            '& .MuiChartsAxis-tick': {
              stroke: '#9ca3af',
            },
            '& .MuiChartsLegend-series': {
              fontSize: '14px',
              fontWeight: 500,
            },
          }}
          margin={{
            left: 100,
            right: 80,
            top: 80,
            bottom: 80,
          }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
              padding: 0,
            },
            popper: {
              sx: {
                '& .MuiChartsTooltip-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #10b981',
                  fontSize: '14px',
                  padding: '12px',
                  minWidth: '200px',
                },
                '& .MuiChartsTooltip-table': {
                  '& .MuiChartsTooltip-cell': {
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                },
              },
            },
          }}
          tooltip={{
            formatter: (params) => {
              return `${formatFullVND(params.value)}`
            }
          }}
        />
        
        {/* Custom gradient definition */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Revenue Summary */}
        <div className='mt-6 p-4 bg-green-50 rounded-lg'>
          <Typography variant='h6' className='font-bold text-green-800 mb-2'>
            Tổng Kết Doanh Thu Năm
          </Typography>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='text-center'>
              <Typography variant='body2' className='text-green-600'>Tổng Doanh Thu</Typography>
              <Typography variant='h6' className='font-bold text-green-800'>
                {formatFullVND(monthlyData.reduce((sum, value) => sum + value, 0))}
              </Typography>
            </div>
            <div className='text-center'>
              <Typography variant='body2' className='text-green-600'>Doanh Thu Cao Nhất</Typography>
              <Typography variant='h6' className='font-bold text-green-800'>
                {formatFullVND(Math.max(...monthlyData))}
              </Typography>
            </div>
            <div className='text-center'>
              <Typography variant='body2' className='text-green-600'>Doanh Thu Trung Bình</Typography>
              <Typography variant='h6' className='font-bold text-green-800'>
                {formatFullVND(Math.round(monthlyData.reduce((sum, value) => sum + value, 0) / monthlyData.length))}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default RevenueChart