"use client"

import {create} from 'zustand'

interface SearchProp {
    isOpen : boolean,
    onOpen : ()=> void,
    onClose : ()=> void
}

const useSearch = create<SearchProp>((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}));

export default useSearch;