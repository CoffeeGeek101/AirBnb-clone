import getCurrentUser from '@/app/actions/getCurrentuser'
import prisma from '@/app/lib/util'
import { NextResponse } from 'next/server';

interface IProperty{
    listingId : string
}

export async function DELETE(request : Request, {params} : {params : IProperty}){

    const currentuser = await getCurrentUser();

    if(!currentuser){
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId || typeof listingId !== 'string'){
        return NextResponse.error();
    }

    const listing = await prisma.listing.deleteMany({
        where : {
            id : listingId,
            userId : currentuser.id
        }
    })

    return NextResponse.json(listing)
}