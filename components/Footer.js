import React from 'react';
import Image from 'next/image';
import Twitter from '../images/Twitter.png'
import Facebook from '../images/Facebook.png'
import Telegram from '../images/Telegram.png'

const Footer = () => {
  return (
    <footer className='footer-container'>
      <h6>Contact developer</h6>
      <div className="social-media">
        <a href="http://www.twiter.com" target="_blank" rel="noopener noreferrer">
          <Image src={Twitter} alt="" height={40} width={40}/>
        </a>
        <a href="http://www.twiter.com" target="_blank" rel="noopener noreferrer">
          <Image src={Facebook} alt="" height={40} width={40}/>
        </a>
        <a href="http://www.twiter.com" target="_blank" rel="noopener noreferrer">
          <Image src={Telegram} alt="" height={40} width={40}/>
        </a>
      </div>
    </footer>
  )
}

export default Footer