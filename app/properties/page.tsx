import React from 'react'
import getCurrentUser from '../actions/getCurrentuser'
import { ClientOnly } from '../ClientOnly';
import { EmptyState } from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import PropertyClient from './PropertyClient';
import getListings from '../actions/getListings';



const PropertyPage =  async () => {

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

      const listing = await getListings({userId : currentUser.id});

      if (listing.length === 0) {
        return (
          <ClientOnly>
            <EmptyState
              title="No properties found"
              subtitle="Looks like you have no property."
              resetFilter={false}
            />
          </ClientOnly>
        );
      }

  return (
    <ClientOnly>
    <PropertyClient
      listing={listing}
      currentUser={currentUser}
    />
  </ClientOnly>
  )
}

export default PropertyPage