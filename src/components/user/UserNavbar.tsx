import React from "react";
import Link from "next/link";
import { User, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserNavbar() {
  return (
    <nav className="sticky top-0 z-50 block border-b bg-white shadow-sm">
      <div className="mx-4 my-auto flex h-16 items-center px-4">
        <div className="flex-1">
          <Link href="/dashboard" className="text-xl font-bold text-gray-900">
            User Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-gray-700 hover:text-primary hover:bg-gray-100">
            <Link href="/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-gray-700 hover:text-primary hover:bg-gray-100">
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}