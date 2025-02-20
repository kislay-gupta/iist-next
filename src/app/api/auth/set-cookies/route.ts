import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { session_id, userID, role } = await req.json();

    // Set cookies
    const cookieStore = await cookies();
    cookieStore.set("session_id", session_id);
    cookieStore.set("user_id", userID);
    cookieStore.set("user_role", role);

    return NextResponse.json({
      success: true,
      message: "Cookies set successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to set cookies" },
      { status: 500 }
    );
  }
}
