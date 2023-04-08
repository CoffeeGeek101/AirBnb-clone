import prisma from '@/app/lib/util'
import getCurrentUser from '@/app/actions/getCurrentuser'
import { NextResponse } from 'next/server';


export async function POST( request : Request ){
    
    const currentuser = await getCurrentUser();

    if(!currentuser){
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        price,
        imageSrc,
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
    } = body;

    Object.keys(body).forEach((value : any)=>{
        if(!body[value]){
            return NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            category,
            bathroomCount,
            guestCount,
            imageSrc,
            locationValue : location.value,
            price : parseInt(price, 10),
            roomCount,
            userId : currentuser.id
        }
    });

    return NextResponse.json(listing);
}