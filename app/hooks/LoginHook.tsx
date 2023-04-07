"use client"

import {create} from 'zustand';

interface Login{
    isOpen : boolean,
    onOpen : () => void,
    onClose : ()=> void
}

const useLogin = create<Login>()((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen : true}),
    onClose : () => set({isOpen : false})
}));

export default useLogin;