"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const MdLogo = () => {
  const router = useRouter();
  return (
    <Image
    onClick={()=>router.push('/')}
    alt='logo'
    width={30}
    height={30}
    src='/images/logo.png'
    className='hidden md:block lg:hidden cursor-pointer'
    />
  )
}

export default MdLogo;