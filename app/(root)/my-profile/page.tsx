import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button'
import React from 'react'
import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

const page = async () => {
  const session = await auth();
  const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books.createdAt))) as Book[];
  return (
    <>
      
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title='Latest Books'
        books={latestBooks.slice(1)}
        containerClassName='mt-28'
      />
    </>
  )
}

export default page