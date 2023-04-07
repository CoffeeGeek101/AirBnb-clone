import React from 'react'
import { IconType } from 'react-icons';

interface CategoryInputProp{
    label : string,
    Icon : IconType,
    selected ?: boolean,
    onClick : (value : string) => void
}


export const CategoryInput : React.FC<CategoryInputProp> = ({
    label,
    Icon,
    selected,
    onClick
}) => {

  return (
    <div
    onClick={()=>onClick(label)}
    className={`
    border-2
    p-3
    rounded-xl
    text-xs
    font-semibold
    flex
    flex-col
    gap-2
    items-start
    hover:border-slate-900
    hover:border-2
    hover:cursor-pointer
    ${selected && 'border-slate-900'}
    `}
    >
        <Icon size={26}/>
        {label}
    </div>
  )
}

export default CategoryInput;
