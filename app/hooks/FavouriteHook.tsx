"use client"

import { useCallback, useMemo } from "react"
import { SafeUser } from "../types/SafeType"
import useLogin from "./LoginHook"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

interface favoriteProps{
    listingId : string,
    currentUser : SafeUser | null
}

const useFavorite = ({listingId, currentUser} : favoriteProps) =>{

    const loginModal = useLogin();
    const router = useRouter();

    const hasFavorite = useMemo(()=>{
        const favoriteIds = currentUser?.favoriteIds || [];
        return favoriteIds?.includes(listingId);
    },[currentUser,listingId])

    const toggleFav = useCallback( async (e: React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation()
        
        if (!currentUser) {
            return loginModal.onOpen();
            }    
        
        try {let request;

        if(hasFavorite){
            request = ()=> axios.delete(`/api/favorites/${listingId}`);
        }else{
            request = ()=> axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        toast.success('added to favorities');
        router.refresh();
    }
    catch(error){
        toast.error('something went wrong');
    }
    },[listingId, currentUser, hasFavorite,loginModal,router])

    return{
        hasFavorite,
        toggleFav,
    }
}

export default useFavorite;