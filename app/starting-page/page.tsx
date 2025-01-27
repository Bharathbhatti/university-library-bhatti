'use client'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
    
  return (
    <>
        <h2 className='font-bebas-neue text-white text-3xl text-center'>Are you a Student or admin?</h2>
        <div className='flex flex-row justify-between mt-20'>
            <Button onClick={()=>redirect('/sign-in')}>Student</Button>
            <Button onClick={()=>redirect('/sign-in-admin')}>Admin</Button>
        </div>
    </>
  )
}

export default page