import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import parse from "html-react-parser";
import ClickToCopy from "@/components/project/ClickToCopy";
import { BgCard } from "@/components/cards";
import { MoreProject } from "@/components/project/MoreProject";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PageParams = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};
async function getBlogPost(slug: string) {
  try {
    const res = await fetch(
      `https://api.iistbihar.com/api/v1/blogData?req_data=getBlogBySlug&BlogSlug=${slug}`,
      {}
    );

    if (!res.ok) {
      throw new Error("Failed to fetch blog post");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const resolvedParams = await params;

  const blog = await getBlogPost(resolvedParams.id);

  if (!blog?.data) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: blog.data.title,
    description: blog.data.excerpt || blog.data.title,
    openGraph: {
      images: [blog.data.ogImage],
    },
  };
}

function LoadingBlog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-3xl mx-auto">
        <div className="py-8">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-[400px] bg-gray-200 rounded-lg mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export default async function Page({ params }: PageParams) {
  const resolvedParams = await params;

  const blog = await getBlogPost(resolvedParams.id);

  if (!blog?.data) {
    notFound();
  }

  const post = blog.data;
  const publishDate = new Date(post.created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Suspense fallback={<LoadingBlog />}>
      <div className="lg:w-11/12 lg:mx-auto mx-0 lg:px-4 px-2 py-6 lg:py-12">
        <div className="grid md:grid-cols-12 gap-y-4 lg:gap-12">
          {/* Left Column - Image & Quick Actions */}
          <div className="lg:space-y-6 col-span-5 space-y-2 sticky md:top-24 self-start">
            <h1 className="text-2xl md:hidden font-bold text-gray-900 font-['Times_New_Roman']">
              {post.title}
            </h1>
            <div className="relative group w-full">
              <Image
                src={post.ogImage}
                alt={post.title}
                width={800}
                height={600}
                className="w-full h-full object-contain rounded-xl shadow-lg transition duration-300 group-hover:shadow-2xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-xl" />

              {/* Share button overlay */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ClickToCopy />
              </div>
            </div>

            {/* Action Buttons */}
          </div>

          {/* Right Column - All Details */}
          <div className="space-y-8 col-span-7">
            <div>
              <h1 className="text-3xl hidden md:block font-bold text-gray-900 mb-6 font-['Times_New_Roman']">
                {post.title}
              </h1>

              {/* Price Section */}
              <div className="flex items-center gap-4 mb-8">{publishDate}</div>
            </div>

            {/* Project Stats */}

            {/* Key Features */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 font-['Times_New_Roman']">
                Key Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span className="ml-3">Complete source code included</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span className="ml-3">Detailed documentation</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span className="ml-3">6 months technical support</span>
                </li>
              </ul>
            </div>

            {/* Description */}
            <div className="browser-css">
              <BgCard>
                <h2 className="text-2xl font-semibold mb-4 font-['Times_New_Roman']">
                  Description
                </h2>
                {post.content && parse(post.content)}
              </BgCard>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 font-['Times_New_Roman']">
              Similar Projects
            </h2>
            <Button>
              <Link href={`/projects/${resolvedParams.slug}`}>View All</Link>
            </Button>
          </div>
          <div className="w-full">
            {/* Similar project cards */}
            <MoreProject
              category={resolvedParams.slug}
              projects_slug={resolvedParams.id}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
