import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='flex justify-between'>
        <SideBar />
        <Outlet />
    </div>
  )
}

export default Layout;