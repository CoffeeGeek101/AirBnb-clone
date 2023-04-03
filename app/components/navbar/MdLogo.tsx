"use client"

import React from 'react'
import Image from 'next/image'

const MdLogo = () => {
  return (
    <Image
    alt='logo'
    width={30}
    height={30}
    src='/images/logo.png'
    className='hidden md:block lg:hidden'
    />
  )
}

export default MdLogo;