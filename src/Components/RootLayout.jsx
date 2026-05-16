import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div className="app-container">
        <Header />
        <main className="main-content"> 
          <Outlet  />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout