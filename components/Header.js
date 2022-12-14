import Head from 'next/head'
import React, { Fragment } from 'react';
import Link from 'next/link';
import Logo from '../images/infinite-logo.webp'
import Image from 'next/image';

const Header = ({title}) => {
  return (
    <div className='header-container'>
      <Head>
        <title>{ title }</title>
        <meta name="description" content="Infinite X-change is a powerful app to get exact and updated exchange rates." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className='flex flex-col text-center justify-center items-center mt-1 mb-10'>
        <nav>
          <Link href='/'>
            <Image
              src={ Logo }
              alt=""
              height={ 30 }
              width={ 40 } 
              priority
              className='mb-5'
            />
          </Link>
        </nav>
        <h1 className='text-2xl font-bold'>iNFINITE X-CHANGE</h1>
        <p className='font-thin'>Do not miss exact exchange rates.</p>
      </header>
    </div>
    
  )
}

export default Header