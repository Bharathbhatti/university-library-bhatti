'use client';
import React from 'react'
import { Button } from './ui/button'

interface returnbook{
    borrowid:string
}

const ReturnBookbtn = React.memo(({borrowid}:returnbook) => {

  const [isLoading, setIsLoading] = React.useState(false);

  const handleReturnBook = async (borrowRecordId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/return-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ borrowRecordId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || "Book returned successfully!");
        window.location.reload();
      } else {
        alert(data.message || "Failed to return the book.");
      }
    } catch (error) {
      console.error("Error returning the book:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      onClick={() => {
        if (window.confirm("Do you want to return the book?")) {
          handleReturnBook(borrowid);
        }
      }}
      disabled={isLoading}
      className="w-full mt-2 hover:bg-yellow-300 hover:text-black"
    >
      {isLoading ? "Returning..." : "Return"}
    </Button>
  );
})

export default ReturnBookbtn