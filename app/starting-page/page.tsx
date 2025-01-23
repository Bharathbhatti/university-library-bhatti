'use client'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
    const handleclick=()=>{
        redirect('/sign-in')
    }
  return (
    <>
        <h2 className='font-bebas-neue text-white text-3xl text-center'>Are you a Student or admin?</h2>
        <div className='flex flex-row justify-between mt-20'>
            <Button onClick={handleclick}>Student</Button>
            <Button onClick={handleclick}>Admin</Button>
        </div>
    </>
  )
}

export default page