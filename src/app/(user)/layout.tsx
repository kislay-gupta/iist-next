import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard - IIST",
  description: "User dashboard for IIST",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="user-layout">
      {/* Add user-specific layout components here */}
      {children}
    </div>
  );
}
