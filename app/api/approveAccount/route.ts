import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "User ID is required." }, { status: 400 });
  }

  try {
    await db.update(users).set({ status: "APPROVED" }).where(eq(users.id, userId));
    return NextResponse.json({ message: "Account approved successfully." });
  } catch (error) {
    console.error("Error approving account:", error);
    return NextResponse.json({ message: "Error approving account." }, { status: 500 });
  }
}
