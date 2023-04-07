
import { ClientOnly } from '@/app/ClientOnly';
import getListingById from '@/app/actions/getListingbyId';
import React from 'react'
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/actions/getCurrentuser';
import { EmptyState } from '@/app/components/EmptyState';

interface IListingPage{
  listingId ?: string;
}

const ListingPage = async ({params} : {params : IListingPage}) =>{

  const listing = await getListingById(params);
  const currentuser = await getCurrentUser();

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
        currentUser={currentuser}
      />
    </ClientOnly>
  );
}

export default ListingPage;