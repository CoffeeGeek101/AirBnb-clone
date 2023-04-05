"use client"

import React, { useCallback } from 'react'
import { IconType } from 'react-icons';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryBoxProps{
    label : string;
    icon : IconType;
    selected ?: boolean
}

const CategoryBox : React.FC<CategoryBoxProps> = ({
    label,
    icon : Icon,
    selected
}) => {

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(()=>{
        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery:any = {
            ...currentQuery,
            category : label
        } 
        if(params?.get('category') === label){
            delete updatedQuery.category
        }
        const url = qs.stringifyUrl({
            url:'/',
            query : updatedQuery  
        },{skipNull:true});

        router.push(url);
    },[params, router, label])

  return (
    <div 
    onClick={handleClick}
    className={`
        px-2
        flex 
        flex-col
        items-center
        justify-center
        gap-2
        pb-3
        transition-all
        border-b-[2px]
        border-white
        hover:border-slate-400
        hover:cursor-pointer
        text-gray-400
        ${selected && 'text-slate-950 border-slate-900 border-b-[2px]'}
    `}>
        <Icon size={26} className={`${selected ? 'text-slate-900' : 'text-gray-400'}`}/>
        <p className='text-[11px] font-semibold'>{label}</p>
    </div>
  )
}

export default CategoryBox;