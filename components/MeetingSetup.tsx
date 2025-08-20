'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { Target } from 'lucide-react';
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

        <div className=' flex h-16 items-center justify-center gap-3'
        >
            <label className='flex items-center justify-center gap-2'>
                <input type="checkbox"
                checked={isMicToggleOn}
                onChange={(e)=> setisMicToggleOn(e.target.checked)} />
                JOIN WITH MIC AND CAMERA OFF
            </label>
            <DeviceSettings />

        </div>
    </div>
  )
}


export default MeetingSetup