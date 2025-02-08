"use client";

import { useState, useEffect } from "react";
import BookList from "@/components/BookList";
import SearchInput from "@/components/SearchInput";
import { toast } from "@/hooks/use-toast";

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ genre: "", minRating: 0 });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1); // Reset to first page on new search
      fetchBooks(searchQuery, 1);
    }, 300);
  
    return () => clearTimeout(handler);
  }, [searchQuery, filters.genre, filters.minRating]);
  

  // Fetch books with filters and pagination
  const fetchBooks = async (query: string, pageNum: number = 1) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const res = await fetch(
        `/api/search-books?q=${encodeURIComponent(query)}&genre=${encodeURIComponent(filters.genre)}&minRating=${filters.minRating}&page=${pageNum}`
      );
      const data = await res.json();
  
      if (!data.books || !Array.isArray(data.books)) {
        throw new Error("Invalid response format");
      }
  
      setBooks((prev) => (pageNum === 1 ? data.books : [...prev, ...data.books]));
      setHasMore(data.totalPages > pageNum);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      setError("Failed to fetch books. Please try again.");
      toast({
        title: "Error",
        description: "Failed to fetch books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  // Handle filter changes
  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mt-8">
      {/* Search Input */}
      <SearchInput initialValue={searchQuery} onSearch={setSearchQuery} />

      {/* Filters */}
      <div className="flex gap-4 mt-4">
        <select
          value={filters.genre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
        </select>
        <select
          value={filters.minRating}
          onChange={(e) => handleFilterChange("minRating", Number(e.target.value))}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value={0}>Any Rating</option>
          <option value={3}>3+ Stars</option>
          <option value={4}>4+ Stars</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={() => fetchBooks(searchQuery, page)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && page === 1 ? (
        <BookListSkeleton />
      ) : (
        <>
          {/* Book List */}
          <BookList title="All Books" books={books} containerClassName="mt-10" />

          {/* Empty State */}
          {!isLoading && books.length === 0 && !error && (
            <div className="text-center mt-12">
              <div className="inline-block p-8 bg-gray-800 rounded-lg">
                <span className="text-6xl">📚</span>
                <h3 className="mt-4 text-xl font-semibold">No Books Found</h3>
                <p className="text-gray-400 mt-2">
                  Try searching for something else or explore our recommendations
                </p>
              </div>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && !isLoading && (
            <button
              onClick={() => {
                setPage((p) => p + 1);
                fetchBooks(searchQuery, page + 1);
              }}
              className="mt-6 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded"
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Skeleton Loading Component
const BookListSkeleton = () => (
  <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="p-4 bg-gray-800 rounded-lg">
        <div className="h-48 bg-gray-700 rounded-md mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

export default LibraryPage;