import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { borrowRecordId } = body;

    // Validate input
    if (!borrowRecordId) {
      return NextResponse.json(
        { message: "Borrow record ID is required." },
        { status: 400 }
      );
    }

    // Update the status of the borrow record to "RETURNED"
    const result = await db
      .update(borrowRecords)
      .set({ status: "RETURNED" })
      .where(eq(borrowRecords.id, borrowRecordId));

    return NextResponse.json(
      { message: "Book returned successfully.", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating book status:", error);
    return NextResponse.json(
      { message: "Error updating book status.", error },
      { status: 500 }
    );
  }
}
