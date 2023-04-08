"use client"

import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types/SafeType'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Container } from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listing/ListingCard'

interface IReservaionClient{
    reservation ?: SafeReservation[],
    currentuser : SafeUser | null
}

const ReservationClient : React.FC<IReservaionClient> = ({
    reservation,
    currentuser
}) => {

    const[deletingId, setDeletingId] = useState('');
    const router = useRouter();

    const onCancel = useCallback((id : string)=>{
        setDeletingId(id);

        axios.delete(`/api/reservation/${id}`)
        .then(()=>{
            toast.success('Reservation cancelled');
            router.refresh();
        })
        .catch((error)=>{
            toast.error(error)
        })
        .finally(()=>{
            setDeletingId('')
        })  
    },[router])

  return (
    <Container>
        <Heading
        title='Reservations'
        subtitle='Bookings on your Properties'
        />
        <div className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
        
        {
            reservation?.map((res)=>(
                <ListingCard
                    key={res.id}
                    data={res.listing}
                    reservation={res}
                    actionId={res.id}
                    onAction={onCancel}
                    actionLabel='Cancel guest resrvations'
                    disabled={deletingId === res.id}
                    currentUser={currentuser}
                />
            ))
        }
        </div>
    </Container>
  )
}

export default ReservationClient