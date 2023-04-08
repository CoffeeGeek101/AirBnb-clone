import React from 'react'
import getCurrentUser from '../actions/getCurrentuser'
import { ClientOnly } from '../ClientOnly';
import { EmptyState } from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';


const TripsPage =  async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
          <ClientOnly>
            <EmptyState
              title="Unauthorized"
              subtitle="Please login"
              resetFilter={false}
            />
          </ClientOnly>
        );
      }

      const reservations = await getReservations({ userId: currentUser.id });

      if (reservations.length === 0) {
        return (
          <ClientOnly>
            <EmptyState
              title="No trips found"
              subtitle="Looks like you havent reserved any trips."
              resetFilter={false}
            />
          </ClientOnly>
        );
      }

  return (
    <ClientOnly>
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
    />
  </ClientOnly>
  )
}

export default TripsPage