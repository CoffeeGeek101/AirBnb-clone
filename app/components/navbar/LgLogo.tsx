"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const LgLogo = () => {
  const router = useRouter();
  return (
    <Image
    onClick={()=>router.push('/')}
    alt='logo'
    width={110}
    height={50}
    src='/images/lglogo.png'
    className='hidden md:hidden lg:block cursor-pointer'
    />
  )
}

export default LgLogo;