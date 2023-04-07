"use client"

import React, { useState } from 'react'
import {BiGlobe} from 'react-icons/bi'
import {RxHamburgerMenu} from 'react-icons/rx'
import { Avatar } from './Avatar'
import { UsermenuItems } from './UsermenuItems'
import useRegister from '@/app/hooks/RegisterHook'
import useLogin from '@/app/hooks/LoginHook'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types/SafeType'

interface UserMenuProps{
  currentUser ?: SafeUser | null
}

export const UserMenu : React.FC<UserMenuProps> = ({currentUser}) => {

  const register = useRegister();
  const login = useLogin();

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
        <Avatar src={currentUser?.image}/>
      </div>
      </div>
     { isOpen && 
     <div className='py-2 absolute right-1 top-14 shadow-md bg-white rounded-xl overflow-hidden border'>
          {
            currentUser ? (
              <>
                <UsermenuItems onClick={()=>{}} label='My trips'/>
                <UsermenuItems onClick={()=>{}} label='My Reservation'/>
                <UsermenuItems onClick={()=>{}} label='My properties'/>
                <hr/>
                <UsermenuItems onClick={()=>signOut()} label='Log out'/>
              </>
            ) : (
              <>
                <UsermenuItems onClick={register.onOpen} label='Sign up'/>
                <UsermenuItems onClick={login.onOpen} label='Log in'/>
              </>
            )
          }
      </div>}
    </div>
  )
}
