'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid';

const MeetingTypeList = () => {

  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting'|'isJoiningMeeting' | 'isInstantMeeting'|'undefined'>();

const {user} = useUser();
const client = useStreamVideoClient();
const [values, setValues] = useState({
  dateTime: new Date(),
  description:'',
  link: ''
})

const [CallDetails, setCallDetails] = useState<Call>();


  const createMeeting = async() =>{
      if(!user || !client) return;
      try {
        if(!values.dateTime){
          toast("Please select date and time")
          return;
        }

        const id = uuidv4();
        const call = client.call('default', id);
        
        if(!call) throw new Error('failed to create call');
        const startAt= values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || 'instant meating';

        await call.getOrCreate({
          data:{
            starts_at: startAt,
            custom:{
              description
            }
          }
        })

        setCallDetails(call);

        if(!values.description){
          router.push(`/meeting/${call.id}`)
          
        }
        toast("Meeting created")
      } catch (error) {
        console.log(error);
        toast("Failed to create meeting.")
      }
  }

  return (

  
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      {/*cards*/} {/*Everything inSide a selfclosing component is a prop that will be passed to the component src*/}
      <HomeCard 
      img="/icons/add-meeting.svg"
      title = 'meeting'
      description="Start instant meeeting"
      handleClick={ ()=>setMeetingState('isInstantMeeting')}
      className = "bg-orange-1"/> 

      <HomeCard
      img="/icons/schedule.svg"
      title = ' schedule meeting'
      description="Plan your  meeeting"
      handleClick={ ()=>setMeetingState('isScheduleMeeting')}
      className = "bg-blue-1" /> 

      <HomeCard
      img="/icons/recordings.svg"
      title = 'View recordings'
      description="Check out your recordings"
      handleClick={ ()=>router.push('/recordings')}
       className = "bg-purple-1"/>  

      <HomeCard
      img="/icons/join-meeting.svg"
      title = 'join'
      description="Via invitation link"
      handleClick={ ()=>setMeetingState('isJoiningMeeting')}
      className = "bg-yellow-1"/> 

      <MeetingModal
       isOpen = {meetingState ==='isInstantMeeting'}
      onClose = {() => setMeetingState('undefined')}
      title='Start an instant meeting'
      className="text-center"
      buttonText="Start meeting"
      handleClick={createMeeting}/>
    </section>
  )
}

export default MeetingTypeList