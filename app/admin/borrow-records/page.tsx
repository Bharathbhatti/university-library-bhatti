import BookCover from '@/components/BookCover';
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schema'
import { eq } from 'drizzle-orm';
import React from 'react'

interface BorrowedBook extends Book {
  borrowRecordId: string;
  status: string;
  userId: string;
  name: string;
  email: string;
  borrowedDate: string|Date,
  dueDate: string|Date,
}

const page = async () => {
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
  }).from(borrowRecords).innerJoin(books, eq(borrowRecords.bookId, books.id)).innerJoin(users, eq(borrowRecords.userId, users.id))
  return (
    <div className='mt-7 w-full overflow-hidden'>
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full bg-white rounded-md'>
          <h1 className="text-3xl font-bold p-5">BORROW RECORDS!</h1>
          <div className='flex items-center justify-between gap-4 p-4 bg-light-300 text-gray-400 mt-5'>
            <span className='w-1/2 font-semibold'>Book Title</span>
            <span className='w-1/3 font-semibold'>User Requested</span>
            <span className='w-1/6 font-semibold'>Borrowed Date</span>
            <span className='w-1/6 font-semibold'>Due Date</span>
            <span className='w-1/6 font-semibold'>status</span>
          </div>

          <ul>
            {borrowedBooks.map((book) => (
              <li key={book.borrowRecordId} className='flex items-center justify-between gap-4 p-4 hover:bg-slate-200 text-xs'>
                <span className="w-1/2 flex items-center gap-2">
                  <BookCover className='h-12 w-8' coverColor={book.coverColor} coverImage={book.coverUrl} />
                  <span className="whitespace-normal font-semibold text-sm">{book.title}</span>
                </span>
                <span className="w-1/3 font-semibold">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{book.name}</span>
                    <span className="text-xs text-gray-500">{book.email}</span>
                  </div>
                </span>
                <span className='w-1/6 font-semibold'>{new Date(book.borrowedDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}</span>
                <span className='w-1/6 font-semibold'>{new Date(book.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}</span>
                <span className={`${book.status === 'BORROWED' ? 'bg-purple-500 text-purple-800' : 'bg-orange-400 text-orange-700'}w-1/6 font-semibold rounded-lg p-3`}>{book.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default page