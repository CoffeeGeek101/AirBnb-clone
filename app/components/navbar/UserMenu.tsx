"use client"

import React, { useState } from 'react'
import {BiGlobe} from 'react-icons/bi'
import {RxHamburgerMenu} from 'react-icons/rx'
import { Avatar } from './Avatar'
import { UsermenuItems } from './UsermenuItems'
import useRegister from '@/app/hooks/RegisterHook'

export const UserMenu = () => {

  const register = useRegister();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='hidden md:block relative'>
      <div className='flex items-center'>
      <div className='text-[13px] font-semibold px-4 py-3 rounded-full hover:bg-slate-100 cursor-pointer whitespace-nowrap'>Airbnb your home</div>
      <BiGlobe className='text-5xl p-3 font-extralight rounded-full hover:bg-slate-100 cursor-pointer'/>
      <div 
        onClick={()=>{setIsOpen(!isOpen)}}
      className='flex items-center gap-3 border px-2 py-[6px] rounded-full ml-3 border-slate-300 hover:shadow-md cursor-pointer'>
        <RxHamburgerMenu className='font-bold'/>
        <Avatar/>
      </div>
      </div>
     { isOpen && <div className='py-2 absolute right-1 top-14 shadow-md bg-white rounded-xl overflow-hidden border'>
          <UsermenuItems onClick={register.onOpen} label='Sign up'/>
          <UsermenuItems onClick={()=>{}} label='Log in'/>
      </div>}
    </div>
  )
}
