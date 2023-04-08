"use client"

import React, { useCallback, useState } from 'react'
import {BiGlobe} from 'react-icons/bi'
import {RxHamburgerMenu} from 'react-icons/rx'
import { Avatar } from './Avatar'
import { UsermenuItems } from './UsermenuItems'
import useRegister from '@/app/hooks/RegisterHook'
import useLogin from '@/app/hooks/LoginHook'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types/SafeType'
import useRentModal from '@/app/hooks/RentHook'
import { useRouter } from 'next/navigation'

interface UserMenuProps{
  currentUser ?: SafeUser | null
}

export const UserMenu : React.FC<UserMenuProps> = ({currentUser}) => {

  const register = useRegister();
  const login = useLogin();
  const rent = useRentModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onRent = useCallback(()=>{
    if(!currentUser){
      return register.onOpen();
    }
    rent.onOpen();
  },[currentUser,register])

  return (
    <div className='hidden md:block relative'>
      <div className='flex items-center'>
        <div onClick={onRent} className='text-[13px] font-semibold px-4 py-3 rounded-full hover:bg-slate-100 cursor-pointer whitespace-nowrap'>
          Airbnb your home
        </div>
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
                <UsermenuItems onClick={()=> router.push('/trips')} label='My trips'/>
                <UsermenuItems onClick={()=>router.push('/reservations')} label='My Reservation'/>
                <UsermenuItems onClick={()=>{}} label='My properties'/>
                <UsermenuItems onClick={()=>router.push('/favorites')} label='My Favorities'/>
                <UsermenuItems onClick={rent.onOpen} label='Airbnb my home'/>
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
