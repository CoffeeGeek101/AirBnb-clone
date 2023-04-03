"use client"

import React, { ReactNode, useEffect, useState } from 'react'

interface ClientonlyProps{
    children : ReactNode
}

export const ClientOnly : React.FC<ClientonlyProps> = ({children}) => {

    const [hasMounted, isHasMounted] = useState(true);

    useEffect(()=>{
        isHasMounted(true)
    },[]);

    if(!hasMounted){
        return null;
    }

  return (
    <>{children}</>
  )
}
