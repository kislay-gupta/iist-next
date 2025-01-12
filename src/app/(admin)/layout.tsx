import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - IIST",
  description: "Admin dashboard for IIST",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {/* Add admin-specific layout components here */}
      {children}
    </div>
  );
}
