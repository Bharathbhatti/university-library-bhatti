import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

import { Button } from './ui/button';
import { auth, signOut } from '@/auth';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getInitials } from '@/lib/utils';




const Header = async () => {
    const session = await auth();

    const isAdmin = session?.user?.role === 'ADMIN';

    return (
        <header className='my-10 flex flex-row justify-between gap-5 '>
            <div className='flex flex-row gap-5 justify-items-center'>
            <Link href="/">
                <Image src='/icons/logo.svg' alt='logo' height={40} width={40} />
            </Link>
            <Link href={'/library'}>
                <Button>Library</Button>
            </Link>
            </div>
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
                        }}>
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