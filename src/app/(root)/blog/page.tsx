import React, { Suspense } from 'react'
import Loader from '@/components/shared/Loader'
import BlogComponent from '@/components/blog/BlogData'



export default async function BlogPage() {
    
    
    return (
        <main className="contimport Image from 'next/image'
ainer mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Our Blog
            </h1>
            <div className="max-w-7xl mx-auto">
                <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><Loader /></div>}>
                    <div className="">
                        <BlogComponent />
                    </div>
                </Suspense>
            </div>
        </main>
    )
}