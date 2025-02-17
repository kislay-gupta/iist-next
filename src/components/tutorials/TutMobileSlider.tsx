"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Tutorial = {
  slug: string;
  title: string;
  description: string;
};

type MobileTutorialSidebarProps = {
  tutorials: Tutorial[];
  category: string;
};

export default function MobileTutorialSidebar({ tutorials, category }: MobileTutorialSidebarProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="border-b border-gray-200 bg-[#1e2756] px-3 py-2">
          <SheetTitle className="text-base font-bold text-gray-100">
            {category} Tutorials
          </SheetTitle>
        </SheetHeader>
        <nav className="px-3 py-4">
          <div className="space-y-1">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${category}/${tutorial.slug}`}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === `/tutorials/${category}/${tutorial.slug}`
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                )}
              >
                {tutorial.title}
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}