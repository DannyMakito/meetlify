'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'

const MeetingTypeList = () => {

  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting'|'isJoiningMeeting' | 'isInstantMeeting'>()
  return (

  
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      {/*cards*/}
      <HomeCard 
      img="/icons/add-meeting.svg"
      title = 'meeting'
      description="Start instant meeeting"
      handleClick={ ()=>setMeetingState('isJoiningMeeting')}
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
      img="/icons/add-meeting.svg"
      title = 'meeting'
      description="Start instant meeeting"
      handleClick={ ()=>setMeetingState('isJoiningMeeting')}
      className = "bg-yellow-1"/> 
    </section>
  )
}

export default MeetingTypeList