"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  Facebook,
  Instagram,
  Search,
  User,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#1e2756] shadow-lg">
      <div className="container justify-center  mx-auto flex h-12 items-center gap-4 px-4 sm:gap-8">
        {/* Social Links */}
        <nav
          className="flex items-center gap-4 sm:gap-6"
          aria-label="Social media"
        >
          <Link
            href="https://facebook.com"
            className="text-gray-300 transition-colors hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Facebook</span>
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="https://instagram.com"
            className="text-gray-300 transition-colors hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://youtube.com"
            className="text-gray-300 transition-colors hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">YouTube</span>
            <Youtube className="h-5 w-5" />
          </Link>
        </nav>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative flex max-w-2xl items-center">
            <Input
              type="search"
              placeholder="Search projects..."
              className="h-9 w-full bg-white/10 pr-12 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-0 h-9 w-9 px-2 text-gray-300 hover:text-white"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            size="sm"
            className="hidden bg-teal-500 text-white hover:bg-teal-600 sm:inline-flex"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Projects List
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-black"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">User account</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
