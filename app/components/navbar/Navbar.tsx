"use client"

import React from 'react'
import { Container } from '../Container'
import {RiSearchLine} from 'react-icons/ri'
import {VscSettings} from 'react-icons/vsc'
import MdLogo from './MdLogo'
import LgLogo from './LgLogo'
import Search from './Search'
import { UserMenu } from './UserMenu'
import { SafeUser } from '@/app/types/SafeType'
import Categories from './Categories'

interface NavbarProps{
  currentUser?: SafeUser | null 
}

export const Navbar : React.FC<NavbarProps> = ({currentUser}) => {
  console.log(currentUser)
  return (
    <div className='w-screen fixed bg-white'>
    <div className='md:border-b-[1px] md:border-slate-200'>
        <Container>
            <div className='flex justify-between items-center gap-5 md:relative lg:flex md:justify-between'>
                    <div className='hidden md:block'>
                        <MdLogo/>
                        <LgLogo/>
                    </div>
                    <Search/>   
                <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
    </div>
        <Categories/>
    </div>
  )
}
