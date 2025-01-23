import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

import { Button } from './ui/button';
import { auth, signOut } from '@/auth';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getInitials } from '@/lib/utils';
import { users } from '@/database/schema';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';



const Header = async () => {

    const session = await auth();
    //@ts-ignore
    const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1)
    const isAdmin = user[0].role === 'ADMIN';

    return (
        <header className='my-10 flex justify-between gap-5'>
            <Link href="/">
                <Image src='/icons/logo.svg' alt='logo' height={40} width={40} />
            </Link>
            <ul className='flex flex-row items-center gap-8'>
                <li>
                    <div className='flex gap-5'>
                        <Link href='/my-profile'>
                            <Avatar>
                                <AvatarFallback className='bg-amber-100'>{getInitials(session?.user?.name || 'IN')}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <form action={async () => {
                            'use server';

                            await signOut();
                        }} className='mb-10'>
                            <Button>Logout</Button>
                        </form>
                        <Link href={'/admin'}>
                            <Button className={`${!isAdmin ? 'hidden' : 'visible'}`}>Admin</Button>
                        </Link>





                    </div>
                </li>
            </ul>
        </header>
    )
}

export default Header