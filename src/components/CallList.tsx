'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import { useToast } from '@/hooks/use-toast'

const CallList = ({type}: {type: 'ended' | 'upcoming' | 'recordings'}) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([])
  const { toast } = useToast()
  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls
      default:
        return []
    }
  }

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls'
      case 'recordings':
        return 'No Recordings'
      case 'upcoming':
        return 'No Upcoming Calls'
      default:
        return ''
    }
  }

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(callRecordings.map(
          (meeting) => meeting.queryRecordings()))
        
        const recordings = callData
          .filter(call => call.recordings.length > 0)
          .flatMap(call => call.recordings)
        
        setRecordings(recordings)
      } catch (error) {
        toast({ title: 'try again later', className: 'text-white bg-dark-3' })
      }
    }
    if(type === 'recordings') fetchRecordings()
  }, [type, callRecordings])

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage()

  if(isLoading) return <Loader />
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
        <MeetingCard
          key={(meeting as Call).id}
          icon={
            type === 'ended' ? '/icons/previous.svg' : type === 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'
          }
          title={(meeting as Call).state?.custom?.description?.substring(0, 20) || (meeting as CallRecording).filename?.substring(0, 20) || 'No Description'}
          date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording)?.start_time?.toLocaleString() || 'No Date'}
          isPreviousMeeting={type==='ended'}
          buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
          buttonText={type === 'recordings' ? 'Play' : 'Start'}
          handleClick={type == 'recordings' ? () => router.push(`${(meeting as CallRecording).url}`) : () => router.push(`/meeting/${(meeting as Call).id}`)}
          link={type === 'recordings' ? (meeting as CallRecording).url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`}
        />
      )): (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  )
}

export default CallList