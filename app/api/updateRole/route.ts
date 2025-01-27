import { NextResponse } from "next/server";
import { eq } from "drizzle-orm"; 
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, role } = body;

    
    if (!userId || !role) {
      return NextResponse.json(
        { message: "User ID and role are required." },
        { status: 400 }
      );
    }

    
    const result = await db
      .update(users)
      .set({ role }) 
      .where(eq(users.id, userId)); 

    return NextResponse.json(
      { message: "Role updated successfully.", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { message: "Error updating role.", error },
      { status: 500 }
    );
  }
}
