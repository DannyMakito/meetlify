import React,{ ReactNode }from 'react'

const RootLayout = ({ children }:  { children: ReactNode }) => {
  return (
  <main>
    Navbar 
    {children}
    sidebar
  </main>
  )
}

export default RootLayout
