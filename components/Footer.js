import React from 'react';
import Image from 'next/image';
import Twitter from '../images/Twitter.png'
import Facebook from '../images/Facebook.png'
import Telegram from '../images/Telegram.png'

const Footer = () => {
  return (
    <footer className='flex flex-col justify-center text-center mt-5'>
      <h6 className='font-semibold'>Contact developer</h6>
      <div className="flex justify-center">
        <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <Image src={Twitter} alt="" height={40} width={40}/>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Image src={Facebook} alt="" height={40} width={40}/>
        </a>
        <a href="https://t.me/allpharv" target="_blank" rel="noopener noreferrer">
          <Image src={Telegram} alt="" height={40} width={40}/>
        </a>
      </div>
    </footer>
  )
}

export default Footer