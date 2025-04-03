'use client'
import { avatarImages } from '@/constants'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface MeetingCardProps {
  icon: string,
  title: string,
  date: string, 
  isPreviousMeeting?: boolean,
  buttonIcon1?: string,
  handleClick: () => void,
  link: string,
  buttonText?: string
}

const MeetingCard = ({ icon, title, date, isPreviousMeeting, buttonIcon1, handleClick, link, buttonText }: MeetingCardProps) => {
  const { toast } = useToast();
  return (
    <section className='flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]'>
      <article className='flex flex-col gap-5'>
        <Image
          src={icon}
          alt='upcoming'
          width={28}
          height={28}
        />
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-base font-normal'>{date}</p>
          </div>
        </div>
      </article>
      <article className={cn('flex justify-center relative', {})}>
        <div className='relative flex w-full max-sm:hidden'>
          {avatarImages}
        </div>
      </article>
    </section>
  )
}

export default MeetingCard