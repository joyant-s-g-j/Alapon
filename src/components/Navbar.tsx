'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Button } from './ui/button'

const Navbar = () => {
  const { user } = useUser(); // Correct way to get the current user in a React component

  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      {/* Logo */}
      <Link href="/" className='flex items-center gap-1'>
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt='Alapon Logo'
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden tracking-extra-widest uppercase'>Alapon</p>
      </Link>

      <div className='flex-between gap-5'>
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
            <SignInButton mode='modal'>
                <Button variant="default" className='border rounded bg-dark-3 text-white'>Sign In</Button>
            </SignInButton>
        </SignedOut>

        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
