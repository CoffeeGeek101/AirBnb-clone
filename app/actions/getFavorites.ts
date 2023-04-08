import prisma from '@/app/lib/util'
import getCurrentUser from './getCurrentuser'

export default async function getFavorites(){
    try{
        const currentuser = await getCurrentUser();

        if(!currentuser){
            return []
        }

        const favoriteIds = await prisma.listing.findMany({
            where : {
                id : {
                    in : [...(currentuser.favoriteIds || [])]
                }
            }
        });

        const SafeFavorites = favoriteIds.map((fav)=>(
           {
            ...fav,
            createdAt : fav.createdAt.toISOString()
           }
        ));

        return SafeFavorites;

    }catch(error : any) {
        throw new Error(error)
    }
}