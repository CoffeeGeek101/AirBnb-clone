"use client"
import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb'
import Image from 'next/image';

interface ImageUploadProps{
    value : string;
    onChange :(value : string) => void;
}

export const ImageUpload : React.FC<ImageUploadProps> = ({
    value,
    onChange
}) => {

    const handleUpload = useCallback((result : any)=>{
        onChange(result.info.secure_url);
    },[onChange])

  return (
    <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset='bgphf23a'
    options={{ maxFiles : 1 }}
    >
        {({ open })=>{
            return(
                <div
                onClick={()=> open?.()}
                className='flex flex-col justify-center items-center
                h-[40vh] border-dashed border w-auto p-20 gap-4 relative rounded-lg overflow-hidden'
                >
                <TbPhotoPlus size={26}/>
                <div className='font-semi-bold text-base'>Click to upload</div>
                {
                    value && ( 
                        <div className='absolute top-0 left-0 h-full w-full'>
                            <Image
                            fill
                            alt='photo'
                            style={{ objectFit: 'cover' }} 
                            src={value}
                            />
                        </div>
                    )
                }
                </div>
            )
        }}
    </CldUploadWidget>
  )
}
