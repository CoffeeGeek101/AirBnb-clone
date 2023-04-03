"use client"

import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps{
 label : string,
 onClick : (e : React.MouseEvent<HTMLButtonElement>)=> void,
 outlined ?: boolean,
 small ?: boolean,
 icon ?: IconType,
 disabled ?: boolean
}

export const Button : React.FC<ButtonProps> = ({
    label,
    onClick,
    outlined,
    small,
    icon : Icon,
    disabled
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    className={`
    relative text-center disabled:opacity-70 disabled:cursor-not-allowed rounded-lg
    hover:cursor-pointer hover:opacity-80 w-full p-2 py-3 flex items-center justify-center gap-3
    ${outlined ? 'bg-white border-black text-black' : 'bg-rose-600 border-rose-500 text-white'}
    ${small ? 'text-sm font-light border-[1px]' : 'text-base font-medium border-2'}
    `}
    >
        {
            Icon && (
                <Icon size={30} className='abosolute left-2 top-2'/>
            )
        }
    {label}
    </button>
  )
}
