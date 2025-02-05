import BookCover from '@/components/BookCover'
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schema'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const book = await db.select().from(books).limit(6)
  const user = await db.select().from(users)
  const borrowbook = await db.select().from(borrowRecords)

  return (
    <>
      <div className="flex justify-between items-center space-x-4">
        <div className="w-1/3 h-[120px] p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-500">Borrowed Books</p>
          <p className="mt-5 font-bold text-3xl">{borrowbook.length}</p>
        </div>
        <div className="w-1/3 h-[120px] p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-500">Total Users</p>
          <p className="mt-5 font-bold text-3xl">{user.length}</p>
        </div>
        <div className="w-1/3 h-[120px] p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-500">Total Books</p>
          <p className="mt-5 font-bold text-3xl">{book.length}</p>
        </div>
      </div>
      <div className="flex justify-between items-start space-x-8 mt-8">
        {/* Recently Added Books Section */}
        <div className="bg-white w-1/2 h-full p-6 rounded-lg shadow-md ">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-xl">Recently Added Books</p>
            <Link href={'/admin/books'}>
              <Button>View All</Button>
            </Link>
          </div>
          <div>
            <ul>
              {book.map((t) => (
                <li key={t.id} className="mb-4 hover:bg-slate-200">
                  <div className="flex items-center space-x-4">
                    {/* Book Cover */}
                    <div className=" flex-shrink-0">
                      <BookCover className='w-12 h-16' coverImage={t.coverUrl} coverColor={t.coverColor} />
                    </div>
                    {/* Book Title */}
                    <div className='flex flex-col'>
                      <span className="font-medium text-gray-800 text-lg">{t.title}</span>
                      <div className='flex flex-row space-x-3 text-xs'>
                        <span>By:{t.author}</span>
                        <span>{t.genre}</span>
                      </div>
                      <span className='text-xs mt-2 text-gray-500 font-semibold'>{new Date(t.createdAt!).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Borrow Records Section */}
        <div className="w-1/2 bg-white h-full p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-xl">Borrow Records</p>
            <Button>View All</Button>
          </div>
          {/* Add content for Borrow Records here */}
          <div>
            <p className="text-gray-600">No borrow records to display.</p>
          </div>
        </div>
      </div>



    </>
  )
}

export default page