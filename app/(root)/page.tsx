import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import redis from "@/database/redis"; 

const getLatestBooks = async () => {
  const cacheKey = "latest-books";
  const cachedBooks = await redis.get(cacheKey);

  if (cachedBooks) {
    return cachedBooks as Book[]; 
  }

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  
  await redis.set(cacheKey, latestBooks, { ex: 600 });

  return latestBooks;
};

const Home = async () => {
  
  const [session, latestBooks] = await Promise.all([auth(), getLatestBooks()]);

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
