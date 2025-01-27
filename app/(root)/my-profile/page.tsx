import { auth } from "@/auth";
import BookCover from "@/components/BookCover";
import ReturnBookbtn from "@/components/ReturnBookbtn";
import { Button } from "@/components/ui/button";
import ViewBookbtn from "@/components/ViewBookbtn";
import { db } from "@/database/drizzle";
import { borrowRecords, books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

interface BorrowedBook extends Book {
  borrowRecordId: string;
  status: string;
}

const page = async () => {
  const session = await auth();
  let borrowedBooks: BorrowedBook[] = [];

  if (!session?.user?.id) {
    redirect("/starting-page");
  }

  try {
    borrowedBooks = await db
      .select({
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
      })
      .from(borrowRecords)
      .innerJoin(books, eq(borrowRecords.bookId, books.id))
      .where(eq(borrowRecords.userId, session.user.id))
      .orderBy(books.createdAt);
  } catch (error) {
    console.error("Failed to fetch borrowed books:", error);
  }

  
  const currentBorrowedBooks = borrowedBooks.filter((book) => book.status !== "RETURNED");

  
  const uniquePreviouslyBorrowedBooks = Array.from(
    borrowedBooks
      .filter((book) => book.status === "RETURNED")
      .reduce((map, book) => map.set(book.id, book), new Map())
      .values()
  );

  return (
    <div className="min-h-screen text-white">
      {/* Header Section */}
      <header className="top-0 z-10 bg-black bg-opacity-75 p-8 shadow-lg mb-5">
        <div className="text-center">
          <h1 className="text-7xl font-bebas-neue tracking-wider uppercase">My Profile</h1>
          <p className="text-gray-400 mt-2">Track and manage your borrowed books</p>
        </div>
      </header>

      {/* Currently Borrowed Books Section */}
      <section>
        <h2 className="text-4xl font-semibold mb-8">Currently Borrowed Books</h2>
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBorrowedBooks.length > 0 ? (
            currentBorrowedBooks.map((book) => (
              <div
                key={book.borrowRecordId}
                className="p-4 bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                  className="object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold truncate">{book.title}</h3>
                <p className="text-sm text-gray-400 truncate">{book.author}</p>
                <p className="text-sm mt-2 text-gray-300">{book.genre}</p>
                <ReturnBookbtn borrowid={book.borrowRecordId}/>
              </div>
            ))
          ) : (
            <p className="text-gray-400">You have no currently borrowed books.</p>
          )}
        </div>
      </section>

      {/* Previously Borrowed Books Section */}
      <section className="mt-12">
        <h2 className="text-4xl font-semibold mb-8">Previously Borrowed Books</h2>
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniquePreviouslyBorrowedBooks.length > 0 ? (
            uniquePreviouslyBorrowedBooks.map((book) => (
              <div
                key={book.id} 
                className="p-4 bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <BookCover
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                  className="object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold truncate">{book.title}</h3>
                <p className="text-sm text-gray-400 truncate">{book.author}</p>
                <p className="text-sm mt-2 text-gray-300">{book.genre}</p>
                <ViewBookbtn id={book.id}/>
              </div>
            ))
          ) : (
            <p className="text-gray-400">You have no previously borrowed books.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default page;




