import React, { useState, useEffect } from 'react'
import { options, url } from '../lib/options';
import { AiOutlineSwap, AiOutlineDoubleRight, AiOutlineCalculator } from 'react-icons/ai'

const Home = ( { data, USDtoEURdata } ) =>
{
  console.log( USDtoEURdata );
  const { symbols } = data;

  const [ amount, setAmount ] = useState( 1 );
  const [ from, setFrom ] = useState( "USD" );
  const [ to, setTo ] = useState( "EUR" );
  const [ total, setTotal ] = useState( null );
  const [ date, setDate ] = useState( "" )

  const [ isLoading, setIsLoading ] = useState( false )

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
        console.log(data);

        setDate( data?.info?.timestamp )
        setTotal( data?.result )
        setIsLoading( false )
      }
    } else
    {
      setTotal( 0 )
    }

  }

  useEffect( () =>
  {
    getDevise()
  }, [ amount, from, to ] )

  const totalTocurrency = new Intl.NumberFormat( 'en-US', { maximumSignificantDigits: 5 } ).format( total );
  const amountToCurrency = new Intl.NumberFormat( 'en-US', { maximumSignificantDigits: 5 } ).format( amount );
  const usdToEurTocurrency = new Intl.NumberFormat( 'en-US', { maximumSignificantDigits: 5 } ).format( USDtoEURdata.result );

  return (
    <div className='home-container'>
      <div className="input-container from">
        <AiOutlineCalculator />
        <form
          onSubmit={ ( e ) =>
          {
            e.preventDefault();
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
              setAmount( e.target.value )
            }
            }
          />
        </form>
      </div>
      <div className="input-container from">
        <AiOutlineDoubleRight />
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
            symbols &&
            Object.keys( symbols ).map( ( key, index ) =>
            {
              return (
                <option key={ index } value={ key }>{ `${ key } - ${ symbols[ key ] }` }</option>
              )
            } )
          }
        </select>
      </div>
      <div className="input-container to">
        <AiOutlineSwap />
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
            symbols &&
            Object.keys( symbols ).map( ( key, index ) =>
            {
              return (
                <option key={ index } value={ key }>{ `${ key } - ${ symbols[ key ] }` }</option>
              )
            } )
          }
        </select>
      </div>

      <button
        className='convert-btn'
        onClick={ () => getDevise() }
      >
        CONVERT
      </button>

      <div className='result-container'>
        { isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {
              total && (
                <div>
                  <p>{ amountToCurrency }.00 { from } =</p>
                  <h1>{ totalTocurrency } { to }</h1>
                  <br />
                  <p>
                    1 { from } = { total / amount } { to }
                  </p>
                  <p>
                    1 { to } = { amount / total } { from }
                  </p>
                  <p style={ { fontSize: "8pt" } }>Updated on : { timeConverter( date ) }</p>
                </div>
              )
            }
          </div>
        )
        }
      </div>
    </div>

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