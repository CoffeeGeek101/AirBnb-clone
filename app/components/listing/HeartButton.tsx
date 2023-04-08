
import useFavorite from '@/app/hooks/FavouriteHook';
import { SafeUser } from '@/app/types/SafeType'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps{
    listingId : string,
    currentUser : SafeUser | null
}

export const HeartButton : React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

  const {hasFavorite, toggleFav} = useFavorite({listingId, currentUser});

  return (
    <div 
    onClick={toggleFav}
    className="
      relative
      hover:opacity-80
      transition
      cursor-pointer
    "
  >
    <AiOutlineHeart
      size={28}
      className="
        fill-white
        absolute
        -top-[2px]
        -right-[2px]
      "
    />
    <AiFillHeart
      size={24}
      className={
        hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'
      }
    />
  </div>
  )
}
