import prisma from '@/app/lib/util';

export interface IListing{
    userId ?: string
}

export default async function getListings( params : IListing ){
    try{

        const {userId} = params;

        let query : any = {};

        if(userId){
            query.userId = userId
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