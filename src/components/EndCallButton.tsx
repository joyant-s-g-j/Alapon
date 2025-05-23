'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { PhoneOff } from 'lucide-react'

const EndCallButton = () => {
  const call = useCall()
  const router = useRouter()
  const { useLocalParticipant } = useCallStateHooks()
  const localParticipant = useLocalParticipant()

  const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id

  if(!isMeetingOwner) return null
  return (
    <Button 
        onClick={async () => {
            await call.endCall();
            router.push('/')
        }} 
        className='bg-red-500 hover:bg-red-800 rounded-full'
    >
        <PhoneOff size={24} />
    </Button>
  )
}

export default EndCallButton