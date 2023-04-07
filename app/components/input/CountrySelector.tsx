"use client"

import useCountries from '@/app/hooks/CountryHook'
import React from 'react'
import Select from 'react-select'

export type CountryType = {
    flag : string,
    label : string,
    value : string,
    latlag : number[],
    region : string
}

interface CountrySelectorProp{
    value ?: CountryType,
    onChange : (value : CountryType) => void
}

export const CountrySelector : React.FC<CountrySelectorProp> = ({
    value,
    onChange
}) => {

    const {getAll} = useCountries();

  return (
    <Select
        placeholder='Anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value)=>onChange(value as CountryType)}
        formatOptionLabel={(option : any)=>(
            <div className='flex flex-row items-center gap-2 p-2 cursor-pointer'>
                <div>{option?.flag}</div>
                <p className='font-medium'>{option?.label}, <span className='text-gray-400 font-light text-sm'>{option?.region}</span></p>
            </div>
        )}
        classNames={{
            control : () => 'p-[5px] border-1'
        }}
        theme={(theme)=>({
            ...theme,
            borderRadius : 6,
            colors : {
                ...theme.colors,
                primary : 'black',
                primary25 : '#ffe4e6'
            }
        })}
    />
  )
}
