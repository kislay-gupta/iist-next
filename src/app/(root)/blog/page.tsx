import React, { Suspense } from 'react'
import Loader from '@/components/shared/Loader'
import BlogComponent from '@/components/blog/BlogData'



export default async function BlogPage() {
    
    
    return (
        <main className="container mx-auto lg:px-4 py-4 lg:py-12">
            <h1 className="text-4xl font-bold text-center mb-2 lg:mb-8 text-gray-800">
                Our Blog
            </h1>
            <div className="flex justify-center items-center">
                <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><Loader /></div>}>
                    <div className="flex justify-center items-center">
                        <BlogComponent />
                    </div>
                </Suspense>
            </div>
        </main>
    )
}