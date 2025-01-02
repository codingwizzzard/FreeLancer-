import React from 'react'
import Aside from '../components/Aside'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>

      <Aside />

      <Header />
      <section className="pc-container">
        <Outlet />
      </section>

    </>
  )
}

export default Layout