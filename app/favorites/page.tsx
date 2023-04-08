import React from 'react'
import { ClientOnly } from '../ClientOnly';
import { EmptyState } from '../components/EmptyState';
import getFavorites from '../actions/getFavorites';
import getCurrentUser from '../actions/getCurrentuser';
import FavoriteClient from './FavoriteClient';

const Favoritepage = async () => {
    
    const currentuser = await getCurrentUser();
    const favorites = await getFavorites();
  
    if( favorites.length === 0){
    return (
    <ClientOnly>
        <EmptyState
        title='No favorites'
        subtitle='Add the places you want to visit'
        resetFilter={false}
        />
    </ClientOnly>
  )}

  return(
    <ClientOnly>
        <FavoriteClient
        listing={favorites}
        currentuser={currentuser}
        />
    </ClientOnly>
  )
}

export default Favoritepage;