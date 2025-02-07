import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";


const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  
}: Book) => (
  <li  className="xs:w-52 w-full ">
    <Link
      href={`/books/${id}`}
      className="w-full flex flex-col items-center hover:scale-105 transition-transform duration-300 "
    >
      {coverUrl ? (
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
        ) : (
          <div className="h-40 w-28 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No Cover</p>
          </div>
        )}

      <div className="xs:max-w-40 max-w-28">
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>

      
    </Link>
  </li>
);

export default BookCard;