"use client"

import useSearch from '@/app/hooks/SearchHook';
import React, { useCallback, useMemo, useState } from 'react'
import { Modals } from './Modals';
import { useRouter, useSearchParams } from 'next/navigation';
import { CountryType , CountrySelector } from '../input/CountrySelector';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calender from '../input/Calender';
import Counter from '../Counter';

const SearchModal = () => {


    enum STEPS {
        LOCATION,
        DATE,
        INFO
    }

    const searchModal = useSearch();
    const router = useRouter();
    const params = useSearchParams();

    const [ step, setStep ] = useState(STEPS.LOCATION);

    const[location, setLocation] = useState<CountryType>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate : new Date(),
        endDate : new Date(),
        key:'selection'
    })

    const Map = useMemo(()=> dynamic(()=> import('../Map'),{
        ssr : false
    }),[location]);

    const onBack = useCallback(()=>{
        setStep((value) => value - 1);
    },[]);

    const onFront = useCallback(()=>{
        setStep((value) => value + 1);
    },[]);

    const onSubmit = useCallback( async()=>{

        if(step !== STEPS.INFO){
            return onFront();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery : any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url : '/',
            query : updatedQuery
        }, {skipNull : true})

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);

    },[
        step, 
        searchModal, 
        location, 
        router, 
        guestCount, 
        roomCount,
        dateRange,
        onFront,
        bathroomCount,
        params
    ])

    const actionLabel = useMemo(()=>{
        if(step === STEPS.INFO){
            return 'Search'
        }
        return 'Next'
    },[step])
    
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
          return undefined
        }
    
        return 'Back'
      }, [step]);

    let header = (
        <Heading
            title='Where do you wanna go?'
            subtitle='Please select a place'
        />
    )
    
    let body = (
        <div className="py-4 flex flex-col gap-5">
        <CountrySelector
            value={location}
            onChange={(value)=>setLocation(value as CountryType)}
        />
        <Map center={location?.latlag} />
    </div>
    )

    if(step === STEPS.DATE){
        header = (
            <Heading
            title='When do you wanna go?'
            subtitle='Please select the dates for your travel'
            />
        )

        body=(
            <Calender
                value={dateRange}
                onChange={(value)=>setDateRange(value.selection)}
            />
        )
    }

    if(step === STEPS.INFO){
        header=(
            <Heading
            title='Enter your needs'
            subtitle='Please select the suitable needs for your staying'
            />
        )

        body=(
            <div className="flex flex-col gap-8">
            <Counter
            title="Guests"
            subtitle="how many guests you are?"
            value={guestCount}
            onChange={(value)=> setGuestCount(value)}
            />
            <hr/>
            <Counter
            title="Rooms"
            subtitle="how many rooms you want?"
            value={roomCount}
            onChange={(value)=> setRoomCount(value)}
            />
            <hr/>
            <Counter
            title="Bathroom"
            subtitle="how many bathroom you want ?"
            value={bathroomCount}
            onChange={(value)=> setBathroomCount(value)}
            />
            </div>
        )
    }

  return (
    <Modals
    isOpen={searchModal.isOpen}
    onClose={searchModal.onClose}
    onSubmit={onSubmit}
    title='Search by Filter'
    actionLabel={actionLabel}
    header={header}
    body={body}
    secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    secondaryActionLabel={secondaryActionLabel}
    />
  )
}

export default SearchModal;