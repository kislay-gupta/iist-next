"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Download,
  Settings,
  User,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    title: "Tutorials",
    href: "/tutorials",
    icon: FileText,
  },
  {
    title: "Downloads",
    href: "/downloads",
    icon: Download,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger asChild className="fixed right-4 top-4 z-50 lg:hidden">
          <button className="rounded-lg bg-white p-2 shadow-md">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col gap-2 py-6">
            <div className="flex-1 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                      pathname === link.href
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-100",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex-1 space-y-1 p-4">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                    pathname === link.href
                      ? "bg-gray-100 text-gray-900"
                      : "hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
