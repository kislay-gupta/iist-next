import BlogCard from "@/components/cards/BlogCard";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { notFound } from "next/navigation";
import React from "react";
interface Blog {
  _id: string;
  title: string;
  ogImage: string;
  slug: string;
}

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

async function getBlogPost(slug: string) {
  const res = await fetch(
    `https://api.iistbihar.com/api/v1/blogData?req_data=getBlogByCatSlug&CatSlug=${slug}`,
    {}
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function BlogPost({ params }: PageParams) {
  const resolvedParams = await params;

  const post = await getBlogPost(resolvedParams.slug);

  if (!post?.data) {
    notFound();
  }

  const blogPost = post.data;
  const transformedSlug = resolvedParams.slug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb category={transformedSlug} />
        <div className="mb-8 space-y-4 md:space-y-6">
          <h1 className="text-3xl font-bold capitalize tracking-tight text-gray-900 sm:text-4xl">
            {transformedSlug}
          </h1>
          <p className="max-w-3xl text-lg text-gray-600">
            Explore our collection of products designed for innovation and
            learning innovation and learning
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing all{" "}
            <span className="font-medium text-gray-900">{post.length}</span>{" "}
            results
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogPost &&
            blogPost.map((post: Blog) => (
              <BlogCard
                key={post._id}
                title={post.title}
                image={post.ogImage}
                category={resolvedParams.slug}
                slug={post.slug}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
