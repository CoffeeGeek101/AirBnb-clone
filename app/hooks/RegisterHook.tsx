"use client"

import {create} from 'zustand';

interface Register{
    isOpen : boolean,
    onOpen : () => void,
    onClose : ()=> void
}

const useRegister = create<Register>()((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}));

export default useRegister;