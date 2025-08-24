"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Tutorial = {
  sno: number;
  title: string;
  slug: string;
  description?: string;
  chapters: Chapter[];
};

type Chapter = {
  sno: number;
  title: string;
  slug: string;
  content: string | null;
  pdf: string | null;
  Videolink: string | null;
};

type MobileTutorialSidebarProps = {
  tutorials: Tutorial[];
  category: string;
};

export default function MobileTutorialSidebar({
  tutorials,
  category,
}: MobileTutorialSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedTutorials, setExpandedTutorials] = useState<number[]>([]);

  const toggleTutorial = (sno: number) => {
    setExpandedTutorials((prev) =>
      prev.includes(sno) ? prev.filter((id) => id !== sno) : [...prev, sno],
    );
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false);
    };
    return () => {
      handleRouteChange();
    };
  }, [pathname]);

  // Auto-expand tutorial if current path matches any of its chapters
  useEffect(() => {
    const currentTutorial = tutorials.find((tutorial) =>
      tutorial.chapters.some((chapter) =>
        pathname.includes(`/tutorials/${category}/${tutorial.slug}/${chapter.slug}`)
      )
    );

    if (currentTutorial && !expandedTutorials.includes(currentTutorial.sno)) {
      setExpandedTutorials((prev) => [...prev, currentTutorial.sno]);
    }
  }, [pathname, tutorials, category, expandedTutorials]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="rounded-md p-2 hover:bg-gray-100 lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] overflow-y-auto p-0">
        <SheetHeader className="border-b border-gray-200 bg-[#1e2756] px-3 py-2">
          <SheetTitle className="text-base font-bold text-gray-100">
            {category.charAt(0).toUpperCase() +
              category.slice(1).replace("-", " ")}
          </SheetTitle>
        </SheetHeader>
        <nav className="px-3 py-4">
          {tutorials.length === 0 ? (
            <p className="text-gray-500 text-sm">No tutorials available</p>
          ) : (
            <div className="space-y-2">
              {tutorials.map((tutorial) => (
                <div key={tutorial.slug} className="border-b border-gray-100 pb-2 last:border-b-0">
                  <button
                    onClick={() => toggleTutorial(tutorial.sno)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm">
                      {tutorial.title}
                    </span>
                    <motion.div
                      initial={false}
                      animate={{
                        rotate: expandedTutorials.includes(tutorial.sno) ? 90 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-2"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedTutorials.includes(tutorial.sno) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 space-y-1 overflow-hidden"
                      >
                        {tutorial.chapters.map((chapter) => {
                          const isActive = pathname === `/tutorials/${category}/${tutorial.slug}/${chapter.slug}`;

                          return (
                            <Link
                              key={chapter.slug}
                              href={`/tutorials/${category}/${tutorial.slug}/${chapter.slug}`}
                              className={cn(
                                "flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors",
                                isActive
                                  ? "bg-indigo-50 text-indigo-700"
                                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700",
                              )}
                            >
                              <span className="flex-1">{chapter.title}</span>
                              <div className="flex items-center space-x-1 ml-2">
                                {chapter.content && (
                                  <span className="text-blue-500 text-xs" title="Has content">
                                    📝
                                  </span>
                                )}
                                {chapter.pdf && (
                                  <span className="text-red-500 text-xs" title="Has PDF">
                                    📄
                                  </span>
                                )}
                                {chapter.Videolink && (
                                  <span className="text-green-500 text-xs" title="Has video">
                                    🎥
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}