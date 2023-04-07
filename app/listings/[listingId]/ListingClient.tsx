"use client"

import { Container } from '@/app/components/Container'
import ListingHead from '@/app/components/listing/ListingHead'
import { categories } from '@/app/components/navbar/Categories'
import { SafeList, SafeUser } from '@/app/types/SafeType'
import { Reservation } from '@prisma/client'
import Image from 'next/image'
import React, { useMemo } from 'react'

interface ListingClientProp{
    reservation ?: Reservation[],
    listing : SafeList  & {
        user : SafeUser ;
    }
    currentUser : SafeUser | null
}

const ListingClient : React.FC<ListingClientProp> = ({
    reservation,
    listing,
    currentUser
}) => {

const category = useMemo(()=>{
    categories.find((item)=> item.label === listing.category);
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
            </div>
        </div>
    </Container>
  )
}

export default ListingClient