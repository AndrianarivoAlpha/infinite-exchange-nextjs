import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='flex-col items-center m-auto text-center'>
      <Header title={"Infite Exchange"}/>
      <main className='flex-col m-auto items-center justify-center'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout