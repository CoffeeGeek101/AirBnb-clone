import prisma from '@/app/lib/util';

export interface IListing{
    userId ?: string,
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings( params : IListing ){
    try{

        const {userId,
            roomCount, 
            guestCount, 
            bathroomCount, 
            locationValue,
            startDate,
            endDate,
            category,} = params;

        let query : any = {};

        if(userId){
            query.userId = userId
        }

        if(category){
            query.category = category
        }   

        // gte means greater than or equals , we have to put the '+' infront of roomcount
        // so that can be converted to number, as we are passing it as a string
        if(roomCount){
            query.roomCount = {
                gte : +roomCount
            }
        }

        if(guestCount){
            query.guestCount = {
                gte : +guestCount
            }
        }

        if(bathroomCount){
            query.bathroomCount = {
                gte : +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
              reservations: {
                some: {
                  OR: [
                    {
                      endDate: { gte: startDate },
                      startDate: { lte: startDate }
                    },
                    {
                      startDate: { lte: endDate },
                      endDate: { gte: endDate }
                    }
                  ]
                }
              }
            }
          }


        const listing = await prisma.listing.findMany({
            where : query,
            orderBy:{createdAt : 'desc'}
        });
        
        const safeListing = listing.map((list)=>({
            ...list,
            createdAt : list.createdAt.toISOString()
        }));
        
        return safeListing;
    }catch(error : any){
        throw new Error(error);
    }
}