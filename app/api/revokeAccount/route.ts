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
    await db.update(users).set({ status: "REJECTED" }).where(eq(users.id, userId));
    return NextResponse.json({ message: "Account revoked successfully." });
  } catch (error) {
    console.error("Error revoking account:", error);
    return NextResponse.json({ message: "Error revoking account." }, { status: 500 });
  }
}
