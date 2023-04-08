import React from 'react'
import { ClientOnly } from '../ClientOnly'
import getCurrentUser from '../actions/getCurrentuser'
import { EmptyState } from '../components/EmptyState';
import ReservationClient from './ReservationClient';
import getReservations from '../actions/getReservations';

const Reservationpage = async() => {

    const currentuser = await getCurrentUser();

    if(!currentuser){
        return(
            <ClientOnly>
                <EmptyState
                title='No active Reservations now'
                subtitle='All the reservation will be listed here'
                resetFilter={false}
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({authorId : currentuser.id});

    if(reservations.length === 0){
        return(
            <ClientOnly>
            <EmptyState
            title='No active Reservations now'
            subtitle='All the reservation will be listed here'
            resetFilter={false}
            />
        </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <ReservationClient
            reservation = {reservations}
            currentuser = {currentuser}
        />
    </ClientOnly>
  )
}

export default Reservationpage