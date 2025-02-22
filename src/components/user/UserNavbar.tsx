import React from "react";
import Link from "next/link";
import { User, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserNavbar() {
  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-8">
        <div className="flex-1">
          <Link href="/dashboard" className="font-semibold text-xl">
            User Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}