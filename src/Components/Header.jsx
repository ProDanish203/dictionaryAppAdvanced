import React from 'react'
import logo from "./favicon.png";

export const Header = () => {
  return (
    <header className='flex items-center justify-between px-5 py-3 bg-blue-500'>
        <h2 className='text-white font-bold text-2xl flex items-center justify-center gap-2'>
          <img src={logo} alt="" className='w-[50px]'/>
           dictionary</h2>
        <a href="https://github.com/ProDanish203" target='_blank'>
            <button className='bg-black px-5 py-2 cursor-pointer text-white rounded-md shadow-lg '>Github</button>
        </a>
    </header>
  )
}
