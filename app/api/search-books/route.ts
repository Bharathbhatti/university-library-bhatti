import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { like, desc } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || ""; 

  try {
    
    const results = query
      ? await db
          .select()
          .from(books)
          .where(like(books.title, `%${query}%`)) 
          .orderBy(desc(books.createdAt))
      : await db.select().from(books).orderBy(desc(books.createdAt));

    return NextResponse.json({ books: results });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books. Please try again later." },
      { status: 500 }
    );
  }
}
