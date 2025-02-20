// app/(protected)/layout.tsx
import { validateServerSession } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Validate session on the server side
  await validateServerSession();

  return (
    <div className="min-h-screen">
      {/* Your layout components like Navbar, Sidebar etc */}
      <nav className="bg-gray-800 text-white p-4">
        {/* Navigation content */}
      </nav>

      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
