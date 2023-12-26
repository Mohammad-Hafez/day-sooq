import React from 'react'
import Header from '../Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  return <>
      <div className="layout">
        <Header/>
        <div className="outlet">
          <Outlet/>
        </div>
      </div>
    </>
}
