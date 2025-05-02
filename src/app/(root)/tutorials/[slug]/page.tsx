type PageParams = {
  params: Promise<{ slug: string }>;
};

type Tutorial = {
  sno: number;
  title: string;
  slug: string;
  author: string;
  created: string;
  chapters: Chapter[];
};

type Chapter = {
  sno: number;
  tutorial_id: number;
  title: string;
  slug: string;
  author: string;
  content: string | null;
  pdf: string | null;
  Videolink: string | null;
  created: string;
};

async function getTutorialsByCategory(slug: string): Promise<Tutorial[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(
    `${baseUrl}tutorial?req_data=getTutByCatSlug&TutCatSlug=${slug}`,
    {
      // Enable cache by default for static pages
      cache: "force-cache",
      // Optional: Add headers if needed
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch tutorials");
  }

  const data = await res.json();
  // Debugging line to check the response
  return data.data; // Adjust based on your API response structure
}

// ... existing imports and types

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const tutorials = await getTutorialsByCategory(slug);

  return (
    <main className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} Tutorials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.slug}
            className="group border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {tutorial.title}
              </h2>
              <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {tutorial.chapters.length}{" "}
                {tutorial.chapters.length === 1 ? "chapter" : "chapters"}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p className="text-sm">{tutorial.author}</p>
              </div>
              <div className="flex items-center text-gray-500">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time className="text-sm">
                  {new Date(tutorial.created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
