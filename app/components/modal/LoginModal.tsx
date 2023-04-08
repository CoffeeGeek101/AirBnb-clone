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
import useLogin from '@/app/hooks/LoginHook'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'


export const LoginModal = () => {

    const router = useRouter();
    const registerModal = useRegister();
    const loginModal = useLogin();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState:{errors} } = useForm<FieldValues>({
        defaultValues:{
            email :'',
            password :''
        },
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        signIn('credentials',{
            ...data,
            redirect : false
        })
        .then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in sucessfully');
                router.refresh();
                loginModal.onClose();
            };

            if(callback?.error){
                toast.error(callback.error);
            }
        });
    }

    const toggle = () =>{
        loginModal.onClose();
        registerModal.onOpen();
    }

    const footer = (
        <>
        <div>
            <Button
            label='Continue with Google'
            icon={FcGoogle}
            onClick={()=>signIn('google')}
            outlined
            />
        </div>
        <div className='flex flex-row justify-center gap-3 items-center'>
            <p className='text-gray-500'>Dont have an account ?</p>
            <p className='font-bold'>{`.`}</p>
            <p onClick={toggle} className='font-medium underline hover:cursor-pointer hover:font-semibold'>Sign in</p>
        </div>
        </>
    )

    const content = (
        <div className='flex flex-col gap-10'>
            <p className='font-semibold text-2xl mt-3'>Welcome Back!</p>
            <div className='flex flex-col gap-5'>
            <Input id='email' label='Email' type='email' register={register} disabled={isLoading} errors={errors} required/>
            <Input id='password' label='Password' type='password' register={register} disabled={isLoading} errors={errors} required/>
            </div>
        </div>
    )



  return (
    <Modals 
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    onClose={loginModal.onClose}
    title='Log in'
    actionLabel='Log in'
    onSubmit={handleSubmit(onSubmit)}
    body={content}
    footer={footer}
    />
  )
}
