import React from "react";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { BgCard } from "@/components/cards";
import VideoPreview from "@/components/shared/VideoPreview";

// Types for the API response
interface ChapterData {
  sno: number;
  tutorial_id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  pdf: string | null;
  Videolink: string | null;
  created: string;
}

interface ApiResponse {
  DataReq: string;
  text: string;
  data: ChapterData;
}

type PageParams = {
  params: Promise<{
    slug: string;
    chapter: string[];
  }>;
};

// Fetch chapter data with timeout and retries
async function fetchChapterData(slug: string): Promise<ApiResponse | null> {
  const TIMEOUT_MS = 5000; // 5 second timeout
  const MAX_RETRIES = 3;
  const BASE_DELAY = 1000; // 1 second initial delay between retries

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      if (!process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error("BASE_URL environment variable is not defined");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}tutorial?req_data=getChapterBySlug&Slug=${slug}`
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt === MAX_RETRIES - 1) {
        console.error("All retry attempts failed");
        return null;
      }

      // Wait before retrying, with exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, BASE_DELAY * Math.pow(2, attempt))
      );
    }
  }

  return null;
}

export default async function Page({ params }: PageParams) {
  try {
    const { chapter } = await params;
    const currentChapterSlug = chapter[chapter.length - 1];

    const chapterData = await fetchChapterData(currentChapterSlug);

    if (!chapterData || chapterData.text === "Chapter fetch failed") {
      console.error("Chapter data not found or fetch failed");
      notFound();
    }

    return (
      <BgCard>
        <article className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">{chapterData.data.title}</h1>

          {/* Author and date information */}
          <div className="text-gray-600 mb-8">
            <span>By {chapterData.data.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={chapterData.data.created}>
              {new Date(chapterData.data.created).toLocaleDateString()}
            </time>
          </div>

          {chapterData.data.content && (
            <div className="browser-css">{parse(chapterData.data.content)}</div>
          )}

          {/* PDF viewer */}
          {chapterData.data.pdf && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">PDF Resources</h2>
              <embed
                src={chapterData.data.pdf}
                type="application/pdf"
                width="100%"
                height="600px"
                className="border rounded-lg"
              />
            </div>
          )}

          {/* Video content */}
          {chapterData.data.Videolink && (
            <div className="mt-8">
              <div className="aspect-video">
                <VideoPreview url={chapterData.data.Videolink} />
              </div>
            </div>
          )}
        </article>
      </BgCard>
    );
  } catch (error) {
    console.error("Error in Page component:", error);
    notFound();
  }
}
