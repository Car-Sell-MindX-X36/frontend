import React from 'react'
import Header from '../../components/Header/Header'

const HomePage = () => {

  return (
    <>
      <Header />
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-4xl font-bold'>Welcome to the Home Page</h1>
      </div>
    </>
  )
}

export default HomePage