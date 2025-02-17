"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

type TutorialSidebarProps = {
  tutorials: Tutorial[];
  category: string;
}

type Tutorial = {
  sno: number;
  title: string;
  slug: string;
  chapters: Chapter[];
}

type Chapter = {
  sno: number;
  title: string;
  slug: string;
  content: string | null;
  pdf: string | null;
  Videolink: string | null;
}

export default function TutorialSidebar({ tutorials, category }: TutorialSidebarProps) {
  const [expandedTutorials, setExpandedTutorials] = useState<number[]>([]);

  const toggleTutorial = (sno: number) => {
    setExpandedTutorials(prev =>
      prev.includes(sno)
        ? prev.filter(id => id !== sno)
        : [...prev, sno]
    );
  };

  return (
    <nav className="w-64 h-screen overflow-y-auto bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      <div className="space-y-2">
        {tutorials.map((tutorial) => (
          <div key={tutorial.slug} className="border-b pb-2">
            <button
              onClick={() => toggleTutorial(tutorial.sno)}
              className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-100 rounded"
            >
              <span className="font-medium">{tutorial.title}</span>
              {expandedTutorials.includes(tutorial.sno)
                ? <ChevronDown className="w-4 h-4" />
                : <ChevronRight className="w-4 h-4" />
              }
            </button>
            {expandedTutorials.includes(tutorial.sno) && (
              <div className="ml-4 mt-2 space-y-1">
                {tutorial.chapters.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/tutorials/${category}/${tutorial.slug}/${chapter.slug}`}
                    className="block p-2 text-sm hover:bg-gray-100 rounded"
                  >
                    {chapter.title}
                    {chapter.content && <span className="ml-2 text-blue-500">📝</span>}
                    {chapter.pdf && <span className="ml-2 text-red-500">📄</span>}
                    {chapter.Videolink && <span className="ml-2 text-green-500">🎥</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}