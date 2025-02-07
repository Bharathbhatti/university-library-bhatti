"use client";

import { useState, useEffect } from "react";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [books, setBooks] = useState<Book[]>([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  
  const fetchBooks = async (query: string) => {
    setIsLoading(true);
    setError(null);
  
    try {
  
      const res = await fetch(`/api/search-books?q=${encodeURIComponent(query)}`);
      const data = await res.json();
  
      if (!data.books || !Array.isArray(data.books)) {
        throw new Error("Invalid response format");
      }
  
      console.log("📖 Books received:", data.books.map((book:Book) => book.title)); 
  
      setBooks(data.books); 
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      setError("Failed to fetch books. Please try again.");
      setBooks([]); 
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery]);

  return (
    <div className="mt-8">
      {/* Search Input */}
      <SearchInput initialValue={searchQuery} onSearch={setSearchQuery} />

      {/* Show error message if any */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Show loading state */}
      {isLoading ? (
        <p className="text-gray-500 mt-4">Loading books...</p>
      ) : (
        <BookList title="All Books" books={books} containerClassName="mt-10" />
      )}

      {/* Show message if no books found */}
      {!isLoading && books.length === 0 && !error && (
        <p className="text-gray-500 mt-4">No books found for your search.</p>
      )}
    </div>
  );
};

export default LibraryPage;
