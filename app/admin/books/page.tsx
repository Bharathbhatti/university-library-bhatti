import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import Link from 'next/link'
import React from 'react'

interface Book{
    id:number;
    title:string;
    author:string;
    genre:string;
    createdAt:string;
}

const page = async() => {

    const book=await db.select().from(books);
    const data = JSON.stringify(book)
    const name = JSON.parse(data)
  return (
    <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='text-3xl font-semibold'>
                All Books!
            </h2>
            <Button className='bg-primary-admin' asChild>
                <Link href='/admin/books/new' className='text-white'>
                    + Create a new book
                </Link>
            </Button>
        </div>

        <div className='mt-7 w-full overflow-hidden'>
        <div className='overflow-x-auto'>
                <div className='inline-block min-w-full bg-white rounded-md'>
                    
                    <div className='flex items-center justify-between gap-4 p-4 bg-light-300 text-gray-400 mt-5'>
                        <span className='w-1/4 font-semibold'>Book Title</span>
                        <span className='w-1/4 font-semibold'>Author</span>
                        <span className='w-1/4 font-semibold'>Genre</span>
                        <span className='w-1/4 font-semibold'>Date Created</span>
                    </div>

                    <ul>
                        {name.map((t:Book) => (
                            <li key={t.id} className='flex items-center justify-between gap-4 p-4 hover:bg-slate-200'>
                                <span className='w-1/4'>{t.title}</span>
                                <span className='w-1/4'>{t.author}</span>
                                <span className='w-1/4 '>{t.genre}</span>
                                <span className='w-1/4'>{new Date(t.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
  )
}

export default page