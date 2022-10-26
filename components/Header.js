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
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <Link href='/'>
            <Image src={ Logo } alt="" height={ 20 } width={ 30 } />
          </Link>
        </nav>
        <h1>iNFINITE EXCHANGE</h1>
        <p>Do not miss Exchange rates.</p>
      </header>
    </div>
    
  )
}

export default Header