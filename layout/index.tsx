import React from 'react'
import Navbar from './Header/Navbar'
import Footer from './Footer/Footer'
import style from './MainLayout.module.scss'

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <div className={style.mainLayout}>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}

export default MainLayout