import BookCover from '@/components/BookCover'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schema'
import { getInitials } from '@/lib/utils'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'
import React from 'react'

interface BorrowedBook extends Book {
  borrowRecordId: string;
  status: string;
  userId: string;
  name: string;
  email: string;
  borrowedDate: string | Date,
  dueDate: string | Date,
}

const page = async () => {
  const book = await db.select().from(books).limit(6)
  const user = await db.select().from(users)
  const borrowbook = await db.select().from(borrowRecords)

  let borrowedBooks: BorrowedBook[] = [];

  borrowedBooks = await db.select({
    id: books.id,
    title: books.title,
    genre: books.genre,
    coverColor: books.coverColor,
    coverUrl: books.coverUrl,
    author: books.author,
    rating: books.rating,
    totalCopies: books.totalCopies,
    availableCopies: books.availableCopies,
    description: books.description,
    videoUrl: books.videoUrl,
    summary: books.summary,
    createdAt: books.createdAt,
    borrowRecordId: borrowRecords.id,
    status: borrowRecords.status,
    userId: borrowRecords.userId,
    name: users.fullName,
    email: users.email,
    borrowedDate: borrowRecords.borrowDate,
    dueDate: borrowRecords.dueDate,
  }).from(borrowRecords).innerJoin(books, eq(borrowRecords.bookId, books.id)).innerJoin(users, eq(borrowRecords.userId, users.id)).orderBy(desc(borrowRecords.borrowDate)).limit(6)

  return (
    <div className="p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold text-gray-500">Borrowed Books</p>
          <p className="mt-3 font-bold text-3xl">{borrowbook.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold text-gray-500">Total Users</p>
          <p className="mt-3 font-bold text-3xl">{user.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold text-gray-500">Total Books</p>
          <p className="mt-3 font-bold text-3xl">{book.length}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Recently Added Books Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-xl">Recently Added Books</p>
            <Link href={'/admin/books'}>
              <Button>View All</Button>
            </Link>
          </div>
          <ul>
            {book.map((t) => (
              <li key={t.id} className="mb-4 p-2 hover:bg-gray-100 rounded-lg transition">
                <div className="flex items-center space-x-4">
                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <BookCover className="w-12 h-16" coverImage={t.coverUrl} coverColor={t.coverColor} />
                  </div>
                  {/* Book Details */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-lg">{t.title}</span>
                    <div className="flex flex-row space-x-3 text-xs text-gray-600">
                      <span>By: {t.author}</span>
                      <span>{t.genre}</span>
                    </div>
                    <span className="text-xs mt-2 text-gray-500 font-semibold">
                      {new Date(t.createdAt!).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Borrow Records Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-xl">Borrow Records</p>
            <Button>View All</Button>
          </div>
          <ul>
            {borrowedBooks.map((t) => (
              <li key={t.borrowRecordId} className="mb-4 p-2 hover:bg-gray-100 rounded-lg transition">
                <div className="flex items-center space-x-4">
                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <BookCover className="w-12 h-16" coverImage={t.coverUrl} coverColor={t.coverColor} />
                  </div>
                  {/* Book Details */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-lg">{t.title}</span>
                    <div className="flex flex-row space-x-3 text-xs text-gray-600">
                      <span>By: {t.author}</span>
                      <span>{t.genre}</span>
                    </div>
                    <div className="flex items-center w-full mt-1">
                      {/* Avatar and Name Section - Flex grows to take available space */}
                      <div className="flex items-center gap-x-3 flex-1 min-w-0">
                        <Avatar className="h-7 w-7 text-xs flex-shrink-0">
                          <AvatarFallback className="bg-amber-100 text-gray-800">
                            {getInitials(t.name || 'IN')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-semibold text-gray-800 truncate">
                          {t.name}
                        </span>
                      </div>

                      
                    </div>


                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default page
