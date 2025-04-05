'use client'
import { StreamVideoProvider } from '@/providers/StreamClientProvider'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = ({children} : { children: ReactNode}) => {
  const {user} = useUser()
  const route = useRouter()
  if(!user) {
    route.push('/sign-in')
  }
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout