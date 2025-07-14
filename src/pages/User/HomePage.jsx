import React from 'react'
import UserLoginModal from '../../components/UserLoginModal'
import UserRegisterModal from '../../components/UserRegisterModal'

const HomePage = () => {

  return (
    <>
      <h1>Home page</h1>
      <UserLoginModal />
      <UserRegisterModal />
    </>
  )
}

export default HomePage