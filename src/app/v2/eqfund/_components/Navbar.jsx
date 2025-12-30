"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const currentPath  = usePathname();
    console.log(currentPath)
  return (
    <div className='w-full inter h-[10vh] flex items-center justify-between px-4 gap-8 bg-black text-white'>
     <div className='flex items-center justify-start gap-8'>
     <div className='flex items-center gap-2 '>
        <Image src="https://framerusercontent.com/images/U4HZ0n51V5im9Xn3de193jRPOxM.png?width=500&height=500" alt="logo" width={48} height={48} />
        <span className='text-xl font-bold'>EQFund</span>
      </div>
      <div className='flex items-center gap-4 text-sm text-bold'>
        <Link href="/v2/eqfund" className={`${currentPath=="/v2/eqfund" ?"text-[#A5FF8A]":"text-white"}`}>Home</Link>
        <Link href="/v2/eqfund/portfolio" className={`${currentPath=="/v2/eqfund/portfolio" ?"text-[#A5FF8A]":"text-white"}`}>Portfolio</Link>
        <Link href="/v2/eqfund/messages" className={`${currentPath=="/v2/eqfund/messages" ?"text-[#A5FF8A]":"text-white"}`}>Message</Link>
        <Link href="/v2/contact" className={`${currentPath=="/v2/eqfund/contact-us" ?"text-[#A5FF8A]":"text-white"}`}>Contact Us</Link>
        <button onClick={()=>{console.log("perform logout operation")}} className="text-sm">Logout</button>
      </div>
     </div>
     <div className='flex items-center gap-4'>
        <h3>My Profile</h3>
        <div className='bg-green-400 w-6 h-6 rounded-full'></div>
     </div>
    </div>
  )
}

export default Navbar
