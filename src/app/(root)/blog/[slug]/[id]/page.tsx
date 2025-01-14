import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import parse from 'html-react-parser'

type PageParams = {
    params: Promise<{
      slug: string;
      id: string;
    }>;
  };
async function getBlogPost(slug: string) {
    try {
        const res = await fetch(`https://api.iistbihar.com/api/v1/blogData?req_data=getBlogBySlug&BlogSlug=${slug}`, {

        })
        
        if (!res.ok) {
            throw new Error('Failed to fetch blog post')
        }
        
        return res.json()
    } catch (error) {
        console.error('Error fetching blog post:', error)
        return null
    }
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const resolvedParams = await params;

    const blog = await getBlogPost(resolvedParams.id)
    
    if (!blog?.data) {
        return {
            title: 'Blog Post Not Found',
            description: 'The requested blog post could not be found'
        }
    }

    return {
        title: blog.data.title,
        description: blog.data.excerpt || blog.data.title,
        openGraph: {
            images: [blog.data.ogImage],
        },
    }
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
    )
}

export default async function Page({
    params,

}: PageParams) {
    const resolvedParams = await params;

    const blog = await getBlogPost(resolvedParams.id)
    
    if (!blog?.data) {
        notFound()
    }

    const post = blog.data
    console.log(post)
    const publishDate = new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    
    return (
        <Suspense fallback={<LoadingBlog />}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Blog post header */}
                    <div className="py-8">
                        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                        <p className="text-gray-500 text-sm">
                            Published on <time dateTime={post.createdAt}>{publishDate}</time>
                        </p>
                    </div>
                    
                    {/* Featured image */}
                    {post.ogImage && (
                        <div className="relative aspect-[16/9] mb-8">
                            <Image
                                src={post.ogImage}
                                alt={post.title}
                                fill
                                className="rounded-lg object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    )}
                    
                    {/* Blog post content */}
                    <div 
                        className="browser-css">
                        {post?.content && parse(post.content)}
                        </div>
                </div>
            </div>
        </Suspense>
    )
}