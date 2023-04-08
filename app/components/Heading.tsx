import React from 'react'

interface HeadingProps{
    title : string,
    subtitle : string,
    center ?: boolean
}
const Heading : React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
  return (
    <div className={`flex flex-col 
    ${center ? 'items-center' : 'items-start'}
    `}>
    <p className="font-semibold text-md">{title}</p>
    <p className="text-gray-400 text-sm">{subtitle}</p>
</div>
  )
}

export default Heading;