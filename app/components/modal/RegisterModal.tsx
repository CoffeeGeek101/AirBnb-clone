"use client"

import React, { useState } from 'react'
import { Modals } from './Modals'
import useRegister from '@/app/hooks/RegisterHook'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { Input } from '../input/Input'
import { error } from 'console'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import {FcGoogle} from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import useLogin from '@/app/hooks/LoginHook'

export const RegisterModal = () => {
    const registerModal = useRegister();
    const loginModal = useLogin();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState:{errors} } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email :'',
            password :''
        },
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        axios.post('/api/register', data)
        .then(()=>{
            registerModal.onClose();
        })
        .catch((error)=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const toggle = () =>{
        registerModal.onClose();
        loginModal.onOpen();
    }

    const footer = (
        <>
        <div>
            <Button
            label='Continue with Google'
            icon={FcGoogle}
            onClick={()=>{signIn('google')}}
            outlined
            />
        </div>
        <div className='flex flex-row justify-center gap-3 items-center'>
            <p className='text-gray-500'>Already have an account</p>
            <p className='font-bold'>.</p>
            <p onClick={toggle} className='font-medium underline cursor-pointer'>Log in</p>
        </div>
        </>
    )

    const content = (
        <div className='flex flex-col gap-10'>
            <p className='font-semibold text-2xl mt-3'>Welcome to Airbnb</p>
            <div className='flex flex-col gap-5'>
            <Input id='email' label='Email' register={register} disabled={isLoading} errors={errors} required/>
            <Input id='name' label='Name' register={register} disabled={isLoading} errors={errors} required/>
            <Input id='password' label='Password' register={register} disabled={isLoading} errors={errors} required/>
            </div>
        </div>
    )



  return (
    <Modals 
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    onClose={registerModal.onClose}
    title='Sign in'
    actionLabel='Sign in'
    onSubmit={handleSubmit(onSubmit)}
    body={content}
    footer={footer}
    />
  )
}
