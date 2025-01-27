'use client';
import React from 'react'
import { Button } from './ui/button'

interface returnbook{
    borrowid:string
}

const ReturnBookbtn = ({borrowid}:returnbook) => {

    const handleReturnBook = async (borrowRecordId: string) => {
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
            // Optionally: Refresh the page or re-fetch data to update the UI
            window.location.reload();
          } else {
            alert(data.message || "Failed to return the book.");
          }
        } catch (error) {
          console.error("Error returning the book:", error);
          alert("An unexpected error occurred. Please try again.");
        }
      };
      
  return (
    <Button onClick={()=>{
        window.alert("Do you want to return the book?")
        handleReturnBook(borrowid)
    }} className="w-full mt-2 hover:bg-yellow-300 hover:text-black">Return</Button>
  )
}

export default ReturnBookbtn