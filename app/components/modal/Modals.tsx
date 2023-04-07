"use client"

import React, { useCallback, useEffect, useState } from 'react'
import {RxCross2} from 'react-icons/rx'
import { Button } from '../Button'

interface ModalProps{
    isOpen : boolean,
    onClose : ()=>void,
    onSubmit : ()=>void,
    title ?: string,
    header ?: React.ReactElement,
    body ?: React.ReactElement,
    footer ?: React.ReactElement,
    actionLabel : string,
    disabled ?: boolean,
    secondaryActionLabel ?: string, 
    secondaryAction ?: ()=>void
}

export const Modals : React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    header,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryActionLabel,
    secondaryAction
}) => {

    const [showModal, setShowModal] = useState(isOpen);

   useEffect(()=>{
    setShowModal(isOpen);
   },[]) 

  const handleClose = useCallback(()=>{
    if(disabled){
        return;
    }
    setShowModal(false);
    setTimeout(()=>{
        onClose();
    },300)
  },[isOpen,onClose]);

  const handleSubmit = useCallback(()=>{
    if(disabled){
        return;
    }
    
    onSubmit();
  },[disabled,onSubmit]);

  const handleSecondaryAction = useCallback(()=>{
    if(disabled || !secondaryAction){
        return;
    }
    secondaryAction();
  },[disabled, secondaryAction]);

  if(!isOpen){
    return null
  }

  return (
    <div className='w-full h-full fixed z-50 top-0 left-0 bg-neutral-700/70 flex justify-center items-end md:items-center lg:items-center'>
        <div className='relative w-full md:w-2/4 lg:w-3/6 bg-white h-[80%] md:h-auto lg:h-auto rounded-2xl'>
            
            <div className='flex flex-col h-full justify-start gap-2'>

                {/* title */}
                <div className='border-b-[1px] py-2'>
                    <div className='px-6 flex items-center justify-start'>
                        <RxCross2 onClick={handleClose} className='text-4xl hover:bg-slate-100 rounded-full cursor-pointer p-2'/>
                        <div className='w-full h-auto'>
                            <p className='font-semibold mr-4 text-center'>{title}</p>
                        </div>
                    </div>
                </div>

                <div className='py-3 px-5'>
                    {header}
                </div>

                {/* body */}
                <div className='py-3 px-5'>
                    {body}
                </div>
                {/* footer */}
                <div className='flex flex-col justify-end p-4 gap-3'>
                    <div className='flex flex-row gap-2 '>
                        {
                            secondaryActionLabel && (
                                <Button label='back' onClick={handleSecondaryAction} outlined/>
                            )
                        }
                        <Button label={actionLabel} onClick={handleSubmit}/>
                    </div>
                    {footer}
                </div>
            </div>
        </div>
    </div>
  )
}
