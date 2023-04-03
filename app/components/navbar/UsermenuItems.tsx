"use client";

import React from 'react'

interface UsermenuItemsProps{
    onClick : (e: React.MouseEvent<HTMLElement>)=>void,
    label : string
}

export const UsermenuItems : React.FC<UsermenuItemsProps> = ({onClick,label}) => {
  return (
    <div 
    onClick={onClick}
    className='font-medium cursor-pointer py-3 px-3 text-sm min-w-[210px] hover:bg-slate-100'>
        {label}
    </div>
  )
}
