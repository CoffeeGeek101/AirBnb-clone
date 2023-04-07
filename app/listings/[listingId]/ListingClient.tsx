"use client"

import { Container } from '@/app/components/Container'
import ListingHead from '@/app/components/listing/ListingHead'
import ListingInfo from '@/app/components/listing/ListingInfo'
import ListingReservation from '@/app/components/listing/ListingReservation'
import { categories } from '@/app/components/navbar/Categories'
import useLogin from '@/app/hooks/LoginHook'
import { SafeList, SafeUser } from '@/app/types/SafeType'
import { Reservation } from '@prisma/client'
import axios from 'axios'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };

interface ListingClientProp{
    reservations ?: Reservation[],
    listing : SafeList  & {
        user : SafeUser ;
    }
    currentUser : SafeUser | null
}

const ListingClient : React.FC<ListingClientProp> = ({
    reservations = [],
    listing,
    currentUser
}) => {

    const loginModal = useLogin();
    const router = useRouter();

   const disableDate = useMemo(()=>{
    let dates : Date[] = [];

   reservations.forEach((reservation:any)=>{
        const range = eachDayOfInterval({
            start: new Date(reservation.startDate),
            end : new Date(reservation.endDate)
        });

        dates = [...dates, ...range]
   });

   return dates;
   },[reservations]);
   
   const [isLoading, setIsLoading] = useState(false);
   const [totalPrice, setTotalPrice] = useState(listing.price);
   const [dateRange, setDateRange] = useState(initialDateRange);


   const onReservation = useCallback(()=>{
     if(!currentUser){
        return loginModal.onOpen();
     }
     setIsLoading(true);

     axios.post('/api/reservation',{
        totalPrice,
        startDate : dateRange.startDate,
        endDate : dateRange.endDate,
        listingId : listing?.id
     })
     .then(()=>{
        toast.success('Reservation is done!');
        setDateRange(initialDateRange);
        router.push('/trips');
     })
     .catch((error)=>{
        toast.error('something went wrong');
     })
     .finally(()=>{
        setIsLoading(false);
     })

   },[
    totalPrice,
    dateRange,
    listing.id,
    router,
    currentUser,
    loginModal
   ])

   useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);


const category = useMemo(()=>{
   return categories.find((item)=> item.label === listing.category);
},[listing.category])

  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className='flex flex-col  md:flex-row md:justify-around'>
                <ListingInfo
                user={listing.user}
                bathroomCount={listing.bathroomCount}
                roomCount={listing.roomCount}
                category={category}
                description={listing.description}
                guestCount={listing.guestCount}
                locationValue={listing.locationValue}
                />
                <div
                    className='order-first 
                    mb-10 
                    md:order-last 
                    md:col-span-3'
                >
                    <ListingReservation
                    price = {listing.price}
                    totalPrice={totalPrice}
                    onChangeDate ={(value : any)=> setDateRange(value)}
                    dateRange = {dateRange}
                    onSubmit={onReservation}
                    disabled={isLoading}
                    disableDates ={disableDate}
                    />
                </div>
            </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient