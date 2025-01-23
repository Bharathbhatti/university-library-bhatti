
import RoleDropdown from '@/components/RoleDropdown';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import React from 'react';


interface User {
    id: number;
    fullName: string;
    createdAt: string;
    role: string;
    universityId: number;
}

const page = async () => {

    const result = await db.select().from(users);
    const data = JSON.stringify(result)
    const name = JSON.parse(data)

    console.log(name)
    


    

    return (
        <>

            <div className='overflow-hidden'>
                <div className='inline-block min-w-full bg-white rounded-md'>
                    <h1 className='text-3xl font-bold p-5'>All Users!</h1>
                    <div className='flex items-center justify-between gap-4 p-4 bg-light-300 text-gray-400 mt-5'>
                        <span className='w-1/4 font-semibold'>Name</span>
                        <span className='w-1/4 font-semibold'>Date Joined</span>
                        <span className='w-1/4 font-semibold'>Role</span>
                        <span className='w-1/4 font-semibold'>University ID No</span>
                    </div>

                    <ul>
                        {name.map((t: User) => (
                            <li key={t.id} className='flex items-center justify-between gap-4 p-4 hover:bg-slate-200'>
                                <span className='w-1/4'>{t.fullName}</span>
                                <span className='w-1/4'>{new Date(t.createdAt).toLocaleDateString()}</span>
                                <span className='w-1/4 '>
                                    
                                    <RoleDropdown currentRole={t.role} userId={t.id} />
                                    
                                </span>
                                <span className='w-1/4'>{t.universityId}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default page