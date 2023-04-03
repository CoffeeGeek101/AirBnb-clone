"use client"
import React from 'react'
import Image from 'next/image';

export const Avatar = () => {
  return (
    <Image
    alt='avatar'
    width={30}
    height={30}
    src='/images/avatar.jpeg'
    className='rounded-full'
    />
  )
}
