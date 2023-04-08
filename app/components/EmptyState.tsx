'use client'

import React from 'react'
import Heading from './Heading'
import { Button } from './Button'
import { useRouter } from 'next/navigation'

interface EmptyStateProps{
    title ?: string,
    subtitle ?: string,
    resetFilter : boolean
}

export const EmptyState : React.FC<EmptyStateProps> = ({
    title = 'Opps, looks like no matches found',
    subtitle = "try applying different filters",
    resetFilter
}) => {
    const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-4 justify-center w-72 m-auto'>
        <Heading
        title={title}
        subtitle={subtitle}
        center
        />
        {
            resetFilter && (
                <Button
                label='reset filters'
                outlined
                onClick={()=> router.push('/')}
                />
            )
        }
    </div>
  )
}
