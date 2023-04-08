"use client"

import useSearch from '@/app/hooks/SearchHook'
import React from 'react'
import {RiSearchLine} from 'react-icons/ri'
import {VscSettings} from 'react-icons/vsc'

const Search = () => {

  const searchModal = useSearch();

  return (
    <div onClick={searchModal.onOpen} 
    className='flex w-screen md:max-w-max gap-5 justify-center items-center py-[5px] px-4 md:py-[6px] md:px-5 md:pr-1 rounded-full shadow-md border-[1px] md:absolute md:left-12 lg:static lg:ml-32 lg:py-2'>
                    <RiSearchLine className='text-xl md:hidden'/>
                    <div className='flex flex-col flex-grow-[4] md:flex-grow-0 md:flex-row md:items-center md:gap-3'>
                        <div className='font-[500] text-sm md:border-r md:border-slate-300 md:pr-4 lg:pr-5 lg:text-base'>Anywhere</div>
                        <div className='flex items-center gap-[6px] text-[12px] text-gray-500 mt-[-3px] md:mt-0 md:text-sm'>
                            <div className='md:border-r border-slate-300 md:pr-4 lg:text-slate-900 lg:pr-5'>
                                Anyweek
                            </div>
                            <p className='font-semibold text-xl md:hidden'>⋅</p>
                            <div className='flex items-center gap-4 md:ml-2 lg:ml-3'>
                                Add guests
                                <RiSearchLine className='hidden md:block text-3xl bg-rose-500 text-white p-[6px] rounded-full'/>
                            </div>
                        </div>
                    </div>
                    <VscSettings className='p-2 text-4xl rounded-full border-[1px] border-slate-300 md:hidden'/>
    </div>
  )
}

export default Search;