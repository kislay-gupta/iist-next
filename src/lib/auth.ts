// utils/auth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

export async function validateServerSession() {
  const cookieStore = await cookies();
  const session_id = cookieStore.get("session_id");
  const user_id = cookieStore.get("user_id");
  const user_type = cookieStore.get("user_role");

  if (!session_id || !user_id) {
    redirect("/");
  }

  try {
    const formData = new FormData();
    formData.append("req_data", "sessionaValidation");
    formData.append("session_id", session_id.value);
    formData.append("user_id", user_id.value);
    formData.append("user_role", user_type?.value || "");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}users`,
      formData
    );

    if (!response.data.valid) {
      redirect("/");
    }

    return true;
  } catch (error) {
    console.error("Server-side authentication failed:", error);
    redirect("/");
  }
}
