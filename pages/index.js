import React, { useState, useEffect } from 'react'
import { options, url } from '../lib/options'
import { CiCoins1 } from 'react-icons/ci'
import { CiCalculator2 } from 'react-icons/ci'

const Home = ( { data, USDtoEURdata } ) =>
{
  //console.log( USDtoEURdata );
  const { symbols } = data;

  const [ amount, setAmount ] = useState( 1 );
  const [ from, setFrom ] = useState( "USD" );
  const [ to, setTo ] = useState( "EUR" );
  const [ total, setTotal ] = useState( null );
  const [date, setDate] = useState("")

  const [isLoading, setIsLoading] =useState(false)

  const timeConverter = ( UNIX_timestamp ) =>
  {
    var a = new Date( UNIX_timestamp * 1000 );
    var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    var year = a.getFullYear();
    var month = months[ a.getMonth() ];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  const getDevise = async () =>
  {
    setIsLoading( true )
    
    if ( amount > 0 )
    {
      const res = await fetch( `${ url }/convert?from=${ from }&to=${ to }&amount=${ amount.toString() }`, options );
      const data = await res.json()

      if ( data )
      {
        setDate( data.info.timestamp )
        setTotal( data.result )
        setIsLoading(false)
      }
    } else
    {
      setTotal( 0 )
    }

  }

  const totalTocurrency = new Intl.NumberFormat( 'en-US', { maximumSignificantDigits: 15 } ).format( total );
  
  const usdToEurTocurrency = new Intl.NumberFormat( 'en-US', { maximumSignificantDigits: 15 } ).format( USDtoEURdata.result );

  return (
    <>
      <div className='home-container'>
        <div className="input-container from">
          <CiCalculator2 style={ { fontSize: "1.5rem" } } />
          <form
            onSubmit={ ( e ) =>
            {
              e.preventDefault();
              getDevise();
            } }
          >
            <input
              autoFocus
              type="text"
              name="devise"
              className="devise-amount"
              value={ amount }
              onChange={ ( e ) =>
              {
                setAmount( e.target.value );
              }
              }
            />
          </form>
          <select
            id=""
            name=""
            value={ from }
            onChange={ ( e ) =>
            {
              setFrom( e.target.value );
            }
            }
          >
            {
              Object.keys( symbols ).map( ( key, index ) =>
              {
                return (
                  <option key={ index } value={ key }>{ `${ key } - ${ symbols[ key ] }` }</option>
                )
              } )
            }
          </select>
        </div>

        <div className="input-container">
          <CiCoins1 style={ { fontSize: "1.5rem" } } />
          <div>
            { isLoading ? (
              <p>Loading...</p>
            ) : (
              <p className='total-p'>{ total ? totalTocurrency : usdToEurTocurrency }</p>
            )
            }
          </div>

          <select
            id=""
            name=""
            value={ to }
            onChange={ ( e ) =>
            {
              setTo( e.target.value );
            }
            }
          >
            {
              Object.keys( symbols ).map( ( key, index ) =>
              {
                return (
                  <option key={ index } value={ key }>{ `${ key } - ${ symbols[ key ] }` }</option>
                )
              } )
            }
          </select>
        </div>
        {
          total && <p><small>Updated on : { timeConverter( date ) }</small></p>
        }
        <button
          className='convert-btn'
          onClick={ () => getDevise() }
        >
          CONVERT
        </button>

      </div>
    </>
    
  )
}

export default Home

export const getServerSideProps = async () =>
{
  const resUSDtoEUR = await fetch( `${ url }/convert?from=USD&to=EUR&amount=1`, options );
  const USDtoEURdata = await resUSDtoEUR.json();

  const res = await fetch( `${ url }/symbols`, options );
  const data = await res.json()
  return {
    props: { data, USDtoEURdata }
  }
}