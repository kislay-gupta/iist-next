// app/(protected)/layout.tsx
import { validateServerSession } from "@/lib/auth";
import UserNavbar from "@/components/user/UserNavbar";
import UserSidebar from "@/components/user/UserSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard | IIST",
  description: "IIST user dashboard for managing your account and activities",
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await validateServerSession();

  return (
    <div className="min-h-screen">
      <UserNavbar />
      <div className="flex">
        <UserSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
