import React from 'react'
import { SafeList, SafeUser } from '../types/SafeType'
import { Container } from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listing/ListingCard'

interface IFavortite{
    listing : SafeList[],
    currentuser :SafeUser | null,

}
const FavoriteClient : React.FC<IFavortite> = ({
    listing,
    currentuser
}) => {
  return (
    <Container>
        <Heading
         title='Your favorites'
         subtitle='Get your trips now and feels it.'
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
            listing.map((listing)=>(
                <ListingCard
                    currentUser={currentuser}
                    key={listing.id}
                    data={listing}
                />
            ))
         }
        </div>
    </Container>
  )
}

export default FavoriteClient