"use client";

import { useState, useEffect } from "react";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";


const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [books, setBooks] = useState([]); // Books state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to fetch books from the API
  const fetchBooks = async (query: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search-books?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setBooks(data.books || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // Fallback to empty list
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch books whenever the search query changes
  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery]);

  return (
    <div className="mt-8">
      {/* Search Input */}
      <SearchInput initialValue={searchQuery} onSearch={setSearchQuery} />

      {/* Show loading state */}
      {isLoading ? (
        <p className="text-gray-500 mt-4">Loading books...</p>
      ) : (
        <BookList
          title="All Books"
          books={books}
          containerClassName="mt-10"
        />
      )}

      {/* Show message if no books found */}
      {!isLoading && books.length === 0 && (
        <p className="text-gray-500 mt-4">No books found for your search.</p>
      )}
    </div>
  );
};

export default LibraryPage;
