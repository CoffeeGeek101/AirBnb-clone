"use client"

import { Modals } from "./Modals";
import useRentModal from "@/app/hooks/RentHook";
import { useMemo, useState } from "react";
import { categories } from "../navbar/Categories";
import { Icon } from "@mui/material";
import CategoryInput from "../input/CategoryInput";
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form'

export const RentModal = () => {

    const rentModal = useRentModal();
    const [ isLoading, setIsLoading] = useState(false);

    enum STEPS {
        CATEGORY,
        LOCATION,
        INFO,
        IMAGES,
        DESCIRPTION,
        PRICE
    } 
    const [ step, setStep] = useState(STEPS.CATEGORY);
    const onBack = () =>{
        setStep((value)=>value - 1);
    }
    const onFront = () =>{
        setStep((value)=> value + 1);
    }

    const actionLabel = useMemo(()=>{
        if(step === STEPS.PRICE){
            return 'Rent your home'
        }
        return 'continue'
    },[step]);
    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
            return undefined
        }
        return 'back'
    },[step]);

    const {register, handleSubmit, setValue, watch, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category');

    const setCustomValues = (id: string, value : any) =>{
        setValue(id, value, {
            shouldDirty : true,
            shouldTouch : true,
            shouldValidate : true
        })
    }

    let bodyContent = (
        <div className="py-4 flex flex-col gap-5">
            <div className="flex flex-col items-start">
            <p className="font-semibold text-lg">Which of these describe your place?</p>
            <p className="text-gray-400">Pick a category</p>
            </div>
            <div className="max-h-[50vh] overflow-y-scroll flex flex-wrap gap-3">
            {
                categories.map((item)=>(
                    <div key={item.label} className="min-w-full md:min-w-[20vw] lg:min-w-[22.5vw]">
                        <CategoryInput
                        onClick={(category)=>setCustomValues('category', category)}
                        selected={category === item.label}
                        label={item.label}
                        Icon={item.icon}
                        />
                    </div>
                ))
            }
            </div>
        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent=(
            <div className="py-4 flex flex-col gap-5">
                <div className="flex flex-col items-start">
                    <p className="font-semibold text-lg">Where is your place located?</p>
                    <p className="text-gray-400">Help users find you !</p>
                </div>
            </div>
        )
    }


  return (
    <Modals
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={onFront}
    actionLabel={actionLabel}
    disabled={isLoading}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    title="Airbnb your home"
    body={bodyContent}
    />
  )
}
