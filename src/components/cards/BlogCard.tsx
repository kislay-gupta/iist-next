"use client"
import React from 'react'
const BlogCard = ({title, image, slug, }:{title: string, image: string, slug: string, }) => {
  return (
 
<article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
  <div className="relative overflow-hidden">
    <img
      alt={title}
      src={image}
      className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>

  <div className="p-4 sm:p-6">
    <a href={`/blog/${slug}`}>
      <h3 className="text-3xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
    </a>

    <div className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
    </div>

    <a href={`/blog/${slug}`} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
      Read More

      <span aria-hidden="true" className="block transition-all group-hover:translate-x-1 rtl:rotate-180">
        &rarr;
      </span>
    </a>
  </div>
</article>
  )
}

export default BlogCard