"use client"
import React from 'react'
import Image from 'next/image'

const LgLogo = () => {
  return (
    <Image
    alt='logo'
    width={110}
    height={50}
    src='/images/lglogo.png'
    className='hidden md:hidden lg:block'
    />
  )
}

export default LgLogo;