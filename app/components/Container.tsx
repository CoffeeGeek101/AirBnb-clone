"use client"

import React, { ReactNode } from "react"

interface ContainerProps{
    children : ReactNode;
}

export const Container : React.FC<ContainerProps> = ({children}) => {
  return (
    <div className="px-4 lg:px-20 py-4 md:py-5 lg:py-5">
        {children}
    </div>
  )
}
