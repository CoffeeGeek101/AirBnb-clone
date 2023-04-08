
import { ClientOnly } from '@/app/ClientOnly';
import getListingById from '@/app/actions/getListingbyId';
import React from 'react'
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/actions/getCurrentuser';
import { EmptyState } from '@/app/components/EmptyState';
import getReservations from '@/app/actions/getReservations';

interface IListingPage{
  listingId ?: string;
}

const ListingPage = async ({params} : {params : IListingPage}) =>{

  const listing = await getListingById(params);
  const currentuser = await getCurrentUser();
  const reservations = await getReservations(params);

  if(!listing){
    return(
      <ClientOnly>
        <EmptyState title='Opps! Not found' subtitle='The property you are looking for might have been moved' resetFilter/>
      </ClientOnly>
    )
  }

  return(
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentuser}
      />
    </ClientOnly>
  );
}

export default ListingPage;