"use client"

import { Modals } from "./Modals";
import useRentModal from "@/app/hooks/RentHook";
import { useMemo, useState } from "react";
import { categories } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import {useForm, FieldValues, SubmitHandler} from 'react-hook-form'
import { CountrySelector } from "../input/CountrySelector";
import dynamic from "next/dynamic";
import Counter from "../Counter";
import Heading from "../Heading";
import { ImageUpload } from "../input/ImageUpload";
import { Input } from "../input/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RentModal = () => {
    const router = useRouter();
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
        setStep((value)=> value - 1);
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

    const {register, handleSubmit, setValue, watch, formState:{errors}, reset} = useForm<FieldValues>({
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
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');


    const setCustomValues = (id: string, value : any) =>{
        setValue(id, value, {
            shouldDirty : true,
            shouldTouch : true,
            shouldValidate : true
        })
    }

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        if(step !== STEPS.PRICE){
            return onFront();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(()=>{
            toast.success('Your Place had been listed!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error('Something went wrong.');
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    let header =(
        <Heading
            title="Which of these describe your place?"
            subtitle="Pick a category"
        />
    )

    let bodyContent = (
        <div className="py-4 flex flex-col gap-5">
            <div className="max-h-[40vh] overflow-y-scroll flex flex-wrap gap-3 ">
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

    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
      }), [location]);

    if(step === STEPS.LOCATION){

        header=(
            <Heading
                title="Where is your place located?"
                subtitle="Help guests find you!"
            />
        )

        bodyContent=(
            <div className="py-4 flex flex-col gap-5">
                <CountrySelector
                value={location}
                onChange={(value)=>setCustomValues('location', value)}
                />
                <Map center={location?.latlag} />
            </div>
        )
    }

    if(step === STEPS.INFO){

        header=(
            <Heading
                title="Share some basics about your place"
                subtitle="What amenitis do you have?"
            />
        )

        bodyContent=(
            <div className="py-4 flex flex-col gap-5">
                <Counter
                 title="Guests"
                 subtitle="how many guests you allowed ?"
                 value={guestCount}
                 onChange={(value)=>setCustomValues('guestCount', value)}
                />
                <hr/>
                <Counter
                 title="Rooms"
                 subtitle="how many rooms do you have ?"
                 value={roomCount}
                 onChange={(value)=>setCustomValues('roomCount', value)}
                />
                <hr/>
                <Counter
                 title="Bathrooms"
                 subtitle="how many bathrooms do you have ?"
                 value={bathroomCount}
                 onChange={(value)=>setCustomValues('bathroomCount', value)}
                />
            </div>
        )
    }

    if(step === STEPS.IMAGES){
        header=(
            <Heading
            title="Upload an Image of your place."
            subtitle="Show guests what your place look like."
            />
        )

        bodyContent=(
            <div>
                <ImageUpload 
                value={imageSrc} 
                onChange={(value)=>setCustomValues('imageSrc', value)}
                />
            </div>
        )
    }

    if(step === STEPS.DESCIRPTION){
        header=(
            <Heading
            title="How would you describe your place"
            subtitle="Short and sweet works the best!"
            />
        )

        bodyContent=(
            <div className="flex flex-col gap-10">
                <Input
                id="title"
                label="Title"
                errors={errors}
                register={register}
                disabled={isLoading}
                required
                />
                <hr/>
                <Input
                id="description"
                label="Description"
                errors={errors}
                register={register}
                disabled={isLoading}
                required
                />
            </div>
        )
    }

    if(step === STEPS.PRICE){
        header=(
            <Heading
            title="Now, set your price"
            subtitle="How much do you charge per night"
            />
        )

        bodyContent=(
            <div>
                <Input
                id="price"
                label="Price"
                errors={errors}
                register={register}
                disabled={isLoading}
                formatPrice
                type="number"
                required
                />
            </div>
        )
    }


  return (
    <Modals
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    disabled={isLoading}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    title="Airbnb your home"
    body={bodyContent}
    header={header}
    />
  )
}
