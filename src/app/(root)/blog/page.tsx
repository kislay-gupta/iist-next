import React, { Suspense } from "react";
import Loader from "@/components/shared/Loader";
import BlogComponent from "@/components/blog/BlogData";
import Link from "next/link";
import TextAnimation from "@/components/animations/TextAnimation";

export default async function BlogPage() {
  return (
    <div className="lg:w-11/12 mx-auto px-4 py-8">
      <nav className=" flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="text-green-600 hover:underline">
          Home
        </Link>
        <span>/</span>
        <span>Blog</span>
      </nav>
      <TextAnimation text="Blog Categories" />
      <div className="flex justify-center items-center">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Loader />
            </div>
          }
        >
          <div className="flex justify-center items-center">
            <BlogComponent />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
