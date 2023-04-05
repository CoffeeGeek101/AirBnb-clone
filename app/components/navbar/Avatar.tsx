"use client"
import React from 'react'
import Image from 'next/image';

interface AvatarProps{
    src : string | null | undefined
}

export const Avatar : React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
    alt='avatar'
    width={30}
    height={30}
    src={src || '/images/avatar.jpeg'}
    className='rounded-full'
    />
  )
}
