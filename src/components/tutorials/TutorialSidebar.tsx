"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TutorialSidebarProps = {
  tutorials: Tutorial[];
  category: string;
};

type Tutorial = {
  sno: number;
  title: string;
  slug: string;
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

export default function TutorialSidebar({
  tutorials,
  category,
}: TutorialSidebarProps) {
  const [expandedTutorials, setExpandedTutorials] = useState<number[]>([]);

  const toggleTutorial = (sno: number) => {
    setExpandedTutorials((prev) =>
      prev.includes(sno) ? prev.filter((id) => id !== sno) : [...prev, sno],
    );
  };

  return (
    <nav className="h-screen w-64 overflow-y-auto border-r bg-white p-4">
      <h2 className="mb-4 text-xl font-bold">
        {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
      </h2>
      {tutorials.length === 0 ? (
        <p className="text-gray-500">No tutorials available</p>
      ) : null}
      <div className="space-y-2">
        {tutorials.map((tutorial) => (
          <div key={tutorial.slug} className="border-b pb-2">
            <button
              onClick={() => toggleTutorial(tutorial.sno)}
              className="flex w-full items-center justify-between rounded p-2 text-left hover:bg-gray-100"
            >
              <span className="font-medium">{tutorial.title}</span>
              <motion.div
                initial={false}
                animate={{
                  rotate: expandedTutorials.includes(tutorial.sno) ? 90 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4" />
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
                  {tutorial.chapters.map((chapter) => (
                    <Link
                      key={chapter.slug}
                      href={`/tutorials/${category}/${tutorial.slug}/${chapter.slug}`}
                      className="block rounded p-2 text-sm hover:bg-gray-100"
                    >
                      {chapter.title}
                      {chapter.content && (
                        <span className="ml-2 text-blue-500">📝</span>
                      )}
                      {chapter.pdf && (
                        <span className="ml-2 text-red-500">📄</span>
                      )}
                      {chapter.Videolink && (
                        <span className="ml-2 text-green-500">🎥</span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </nav>
  );
}
