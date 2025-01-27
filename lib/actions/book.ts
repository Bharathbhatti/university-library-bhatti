'use server';

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook=async(params:BorrowBookParams)=>{
    const {userId,bookId}=params;

    try {
       const book=await db.select({availableCopies:books.availableCopies})
       .from(books).where(eq(books.id,bookId))
       .limit(1);

       const verify=await db.select().from(users).where(eq(users.id,userId)).limit(1)

       if(verify[0].status==='PENDING' || verify[0].status==='REJECTED'){
        return {
          success:false,
          error:"Please verify your account for borrowing the book!"
      }
       }
       
       if(!book.length || book[0].availableCopies<=0){
            return {
                success:false,
                error:"Book is not available for borrowing"
            }
       }
       const dueDate=dayjs().add(7,'day').toDate().toDateString();

       const record = await db.insert(borrowRecords).values({
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      });

      await db.update(books).set({availableCopies:book[0].availableCopies-1})
      .where(eq(books.id,bookId));

      return {
        success:true,
        data: JSON.parse(JSON.stringify(record)),
      }
    } catch (error) {
        console.log(error);

        return {
            success:false,
            error:"an error occured while borrowing the book",
        }
    }
}