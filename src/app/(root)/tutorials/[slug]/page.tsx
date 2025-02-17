
type PageParams = {
  params: Promise<{ slug: string }>;
}

type Tutorial = {
  sno: number;
  title: string;
  slug: string;
  author: string;
  created: string;
  chapters: Chapter[];
}

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
}

async function getTutorialsByCategory(slug: string): Promise<Tutorial[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}tutorial?req_data=getTutByCatSlug&TutCatSlug=${slug}`, {
    // Enable cache by default for static pages
    cache: 'force-cache',
    // Optional: Add headers if needed
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch tutorials');
  }

  const data = await res.json();
  return data.data; // Adjust based on your API response structure
}

// ... existing imports and types

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const tutorials = await getTutorialsByCategory(slug);

  return (
    <main className="container px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tutorials for {slug}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial.slug} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{tutorial.title}</h2>
            <p className="text-gray-500 text-sm mb-2">By {tutorial.author}</p>
            <p className="text-gray-600 mb-4">
              {tutorial.chapters.length} {tutorial.chapters.length === 1 ? 'chapter' : 'chapters'}
            </p>
            <div className="text-sm text-gray-500">
              Created: {new Date(tutorial.created).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}