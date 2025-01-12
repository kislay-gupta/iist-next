"use client";
import { X, CircuitBoardIcon as Circuit, Loader2 } from "lucide-react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCategory } from "@/hooks/get-category";

export default function ProjectsNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { categories, isLoading, refetch } = useCategory();

  useEffect(() => {
    refetch();
  }, []);

  // Desktop sidebar
  const SidebarContent = () => (
    <div className="h-screen shadow-lg sm:hidden flex-col bg-[#f5f5dc]">
      <div className="bg-blue-500 p-4 sticky top-0 z-10 flex justify-between items-center">
        <h3 className="text-white">PROJECTS CATEGORIES</h3>
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          categories.map((category) => {
            return (
              <button
                key={category.sno}
                className="flex w-full items-center gap-3 border-b border-gray-200 px-4 py-3 hover:bg-gray-100"
                onClick={() => router.push(`/projects/${category.slug}`)}
              >
                <Link
                  href={`/projects/${category.slug}`}
                  className="capitalize text-gray-700"
                >
                  {category.CatName}
                </Link>
              </button>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>

      {/* Mobile bottom sheet */}
      <div className="lg:hidden">
        {/* Trigger button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-30 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          <Circuit className="h-6 w-6" />
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sheet */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-[#f5f5dc] rounded-t-[20px] transition-transform duration-300 transform ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ maxHeight: "80vh" }}
        >
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
