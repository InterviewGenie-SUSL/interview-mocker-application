"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

  const path=usePathname();
  useEffect(()=>{
      console.log(path)
  },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo-2.svg'} width={160} height={100} alt='logo'/> 

      <ul className='hidden md:flex gap-6'>

        <li className={`hover:text-blue-700 hover:font-bold transition cursor-pointer
          ${path=='/dashboard'&&'text-blue-700 font-bold'}
          `}>Dashboard</li>
        <li className={`hover:text-blue-700 hover:font-bold transition cursor-pointer
          ${path=='/dashboard/questions'&&'text-blue-700 font-bold'}
          `}>Questions</li>
        <li className={`hover:text-blue-700 hover:font-bold transition cursor-pointer
          ${path=='/dashboard/upgrade'&&'text-blue-700 font-bold'}
          `}>Upgrade</li>
        <li className={`hover:text-blue-700 hover:font-bold transition cursor-pointer
          ${path=='/dashboard/how'&&'text-blue-700 font-bold'}
          `}>How it Works?</li>

      </ul>

      <UserButton/>
    </div>
  )
}

export default Header
