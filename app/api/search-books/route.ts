import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ilike, desc, and, gte, eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || "";
  const minRating = Number(searchParams.get("minRating") || 0);

  try {
    let conditions = [];

    if (query.trim()) {
      conditions.push(ilike(books.title, `%${query}%`));
    }

    if (genre) {
      conditions.push(eq(books.genre, genre));
    }

    if (minRating > 0) {
      conditions.push(gte(books.rating, minRating));
    }

    const results = await db
      .select()
      .from(books)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(books.createdAt));

    return NextResponse.json({ books: results });
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books. Please try again later." },
      { status: 500 }
    );
  }
}
