import getCurrentUser from '@/app/actions/getCurrentuser'
import prisma from '@/app/lib/util'
import { NextResponse } from 'next/server';

interface IParams {
    reservationId : string
}

export async function DELETE(resquest : Request, {params} : {params : IParams}){

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { reservationId } = params;

    if(!reservationId || typeof reservationId !== 'string'){
        return NextResponse.error();
    }

    const reservation = await prisma.reservation.deleteMany({
        where : {
            id : reservationId,
            OR : [
                {userId : currentUser.id},
                { listing : {userId : currentUser.id}  }
            ]
        }
    })
    return NextResponse.json(reservation);
}