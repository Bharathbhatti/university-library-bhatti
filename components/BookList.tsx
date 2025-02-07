import React from 'react'
import BookCard from './BookCard';

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}

const BookList = ({ title, books, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      {books.length >= 1 ? (
        <ul className="book-list">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No books available</p> 
      )}
    </section>

  )
}

export default BookList