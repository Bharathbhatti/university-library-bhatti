'use client';
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

interface viewbookbtn{
    id:string
}

const ViewBookbtn = ({id}:viewbookbtn) => {
    const router=useRouter();
  return (
    <Button onClick={()=>router.push(`/books/${id}`)} className="mt-3 w-full hover:bg-yellow-300 hover:text-black">View</Button>
  )
}

export default ViewBookbtn