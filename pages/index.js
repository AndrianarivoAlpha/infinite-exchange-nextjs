import React, { useState, useEffect, memo } from 'react'
import { options, url } from '../lib/options';
import { timeConverter } from '../lib/utilsFunctions';
import { InfinitySpin } from 'react-loader-spinner';

const now = new Date();
const endDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const startDate = `${now.getFullYear() - 1}-${now.getMonth() + 1}-${now.getDate() + 1}`;

const Home = ({ data }) => {

  //console.log(startDate);
  const { symbols } = data;

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [total, setTotal] = useState(null);
  const [date, setDate] = useState("");

  const [isLoading, setIsLoading] = useState(false)

  const getDevise = async () => {
    setIsLoading(true)

    if (amount > 0 && amount ) {
      const res = await fetch(`${url}/convert?from=${from}&to=${to}&amount=${amount.toString()}`, options);
      const data = await res.json();

      if (data) {
        setDate(data?.info?.timestamp)
        setTotal(data?.result)
        setIsDataFetched(true)
        setIsLoading(false)
      }
    } else {
      setTotal(0)
    }

  }

  useEffect(() => {
    getDevise()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, from, to])

  const totalTocurrency = new Intl.NumberFormat().format(total);
  const amountToCurrency = new Intl.NumberFormat().format(amount);

  return (
    <div className="flex flex-col items-center gap-2">
      <form
        className="flex items-center m-auto"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="relative w-[340px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </div>
          <input
            autoFocus
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
            }
            }
          />
        </div>
      </form>

      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[340px]"
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
        }
        }
      >
        {
          symbols &&
          Object.keys(symbols).sort().map((key, index) => {
            return (
              <option key={index} value={key}>{`${key} - ${symbols[key]}`}</option>
            )
          })
        }
      </select>

      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[340px]"
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
        }
        }
      >
        {
          symbols &&
          Object.keys(symbols).sort().map((key, index) => {
            return (
              <option key={index} value={key}>{`${key} - ${symbols[key]}`}</option>
            )
          })
        }
      </select>

      <div className='w-[340px]'>
        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => getDevise()}
        >
          CONVERT
        </button>
      </div>


      <div className='result-container'>
        {
          isLoading || amount === "" ? (
            <InfinitySpin
              width='200'
              color="#2797e2"
            />

          ) : (
            <div>
              {
                isDataFetched && amount !== "" && total && (
                  <div className='text-start mb-5 w-auto bg-gray-50 px-10 py-5 rounded'>
                    <p className='text-normal font-semibold'>{amountToCurrency}.00 {from} =</p>
                    <h1 className='text-3xl font-bold'>{totalTocurrency} {to}</h1>
                    <br />
                    <p>
                      1 {from} = {total / amount} {to}
                    </p>
                    <p>
                      1 {to} = {amount / total} {from}
                    </p>
                    <p className='text-xs font-semibold text-gray-300'>Updated on : {timeConverter(date)}</p>
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

export default memo(Home)

export const getServerSideProps = async () => {
  const res = await fetch(`${url}/symbols`, options);
  const data = await res.json()

  return {
    props: { data }
  }
}