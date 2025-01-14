import BlogCard from "@/components/cards/BlogCard";
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
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function BlogPost({
  params,
}: PageParams) {
  const resolvedParams = await params;

  const post = await getBlogPost(resolvedParams.slug);

  if (!post?.data) {
    notFound();
  }

  const blogPost = post.data;
  const transformedSlug = resolvedParams.slug.replace(/-/g, " ");

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl capitalize font-bold text-center mb-8 text-gray-800">
        {blogPost[0]?.category || transformedSlug} blog
      </h1>
      <div className="grid grid-cols-1 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPost &&
          blogPost.map((post: Blog) => (
            <BlogCard
              key={post._id}
              title={post.title}
              image={post.ogImage}
              slug={`${resolvedParams.slug}/${post.slug}`}
            />
          ))}
      </div>
    </main>
  );
}
