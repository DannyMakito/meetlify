'use client'

import { useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup  = () => {

    const [isMicToggleOn, setisMicToggleOn] = useState(false);

    const call = useCall();

    useEffect(() =>{
        if(isMicToggleOn){
            call?.camera.disable();
            call?.microphone.disable();
        }else{
            call?.camera.enable();
            call?.microphone.enable();
        }
    },[isMicToggleOn,call?.camera, call?.microphone]);


  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>
            Set up
        </h1>
        <VideoPreview />
    </div>
  )
}


export default MeetingSetup