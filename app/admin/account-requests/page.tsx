import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import React from 'react'

interface User {
  id: number;
  fullName: string;
  createdAt: string;
  universityId: number;
  status:boolean;
}

const page = async () => {
  const result = await db.select().from(users);
  const data = JSON.stringify(result)
  const name = JSON.parse(data)
  return (
    <div className='overflow-x-auto'>
                <div className='inline-block min-w-full bg-white rounded-md'>
                    <h1 className='text-3xl font-bold p-5'>Account Registration Requests!</h1>
                    <div className='flex items-center justify-between gap-4 p-4 bg-light-300 text-gray-400 mt-5'>
                        <span className='w-1/4 font-semibold'>Name</span>
                        <span className='w-1/4 font-semibold'>Date Joined</span>
                        <span className='w-1/4 font-semibold'>University ID No</span>
                        <span className='w-1/4 font-semibold'>Status</span>
                        <span className='w-1/4 font-semibold'>Actions</span>
                    </div>

                    <ul>
                        {name.map((t: User) => (
                            <li key={t.id} className='flex items-center justify-between gap-4 p-4 hover:bg-slate-200'>
                                <span className='w-1/4'>{t.fullName}</span>
                                <span className='w-1/4'>{new Date(t.createdAt).toLocaleDateString()}</span>
                                <span className='w-1/4 '>{t.universityId}</span>
                                <span className='w-1/4'>{t.status}</span>
                                <span className='w-1/4'></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
  )
}

export default page