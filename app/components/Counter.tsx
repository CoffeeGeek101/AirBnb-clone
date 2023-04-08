import React, { useCallback } from 'react'
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'


interface CounterProp{
    title : string,
    subtitle : string,
    value : number,
    onChange : (value : number) => void,
}

const Counter : React.FC<CounterProp> = ({
    title,
    subtitle,
    onChange,
    value
}) => {

    const onAdd = useCallback(()=>{
        onChange(value + 1);
    },[onChange]);

    const onSub = useCallback(()=>{
        if(value === 1){
            return;
        }
        onChange(value - 1);
    },[onChange, value])


  return (
    <div className='flex flex-row justify-between items-center py-2'>
        <div className='flex flex-col items-start'>
            <p className='font-semibold text-md'>{title}</p>
            <p className='text-gray-400 text-sm'>{subtitle}</p>
        </div>
        <div className='flex flex-row items-center gap-5'>
            <div
            onClick={onSub}
            className='w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-slate-100 border-[1px]'>
                <AiOutlineMinus/>
            </div>
            <p className='font-semibold'>{value}</p>
            <div 
            onClick={onAdd}
            className='w-10 h-10 flex cursor-pointer items-center justify-center rounded-full bg-slate-100 border-[1px]'>
                <AiOutlinePlus/>
            </div>
        </div>
    </div>
  )
}


export default Counter;