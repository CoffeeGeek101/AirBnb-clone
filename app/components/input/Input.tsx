import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
    id : string,
    label : string,
    type ?: string,
    disabled ?: boolean,
    formatPrice ?: boolean,
    required ?: boolean,
    register : UseFormRegister<FieldValues>
    errors : FieldErrors
}

export const Input : React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    required,
    register,
    errors
}) => {
  return (
    <div className='w-full relative'>
        <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, {required})}
        className={` 
        peer
        w-full
        p-3
        pt-4 
        font-light 
        bg-white 
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`}
        />
        <label
        className={` absolute 
        text-md
        duration-150 
        transform 
        -translate-y-4
        top-2
        bg-white px-3 
        z-10 
        origin-[0] 
        ${formatPrice ? 'left-9' : 'left-4'}
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-5
        ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}
        >{label}</label>
    </div>
  )
}
