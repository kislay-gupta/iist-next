'use client'
import React, { useState } from 'react'
import { Category, useCategory } from '@/hooks/useCategory'
import { ProjectCard } from '../cards'
import { BlurHoverWrapper } from '../ui/blur-hover-wrapper'
import SkeletonGrid from '../skeletons/SkeletonGrid'

const FutureSkill = () => {
    const { categories, isLoading } = useCategory()
    const [hovered, setHovered] = useState<number | null>(null)

    return (
        <section className="py-12 bg-orange-600 text-gray-100 sm:py-12 lg:py-16">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto text-center xl:max-w-2xl">
                    <h2 className="text-lg font-semibold leading-tight text-gray-50 sm:text-xl xl:text-3xl mb-6">
                        Empowering Kids with the Right Future Skills
                    </h2>
                    <div className="bg-yellow-500 w-1/4 mx-auto h-1" />
                    <p className="mb-4">
                        We are creating a tool that helps you be more productive and efficient
                        when building websites and webapps
                    </p>
                </div>
                {isLoading && (
                    <SkeletonGrid />
                )}
                <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
                    {categories?.data?.length === 0 && (
                        <div className="text-center text-gray-500">
                            No categories found
                        </div>
                    )}
                    {categories?.data?.map((category: Category, index: number) => (
                        <BlurHoverWrapper
                            key={category.sno}
                            index={index}
                            hovered={hovered}
                            setHovered={setHovered}
                        >
                            <ProjectCard
                                image={category.imageLink}
                                slug={category.slug}
                                title={category.CatName}
                                isLoading={isLoading}
                            />
                        </BlurHoverWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FutureSkill