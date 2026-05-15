import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div>
      <h1></h1>
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout