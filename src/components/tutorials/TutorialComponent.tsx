import React from 'react'
import AnimatedGrid from '../animations/AnimatedGrid'
import { TutorialsCard } from '../cards/';
interface ProjectCardProps {
    CatName?: string;
    imageLink?: string;
    slug?: string;
    isLoading?: boolean;
    category?: "projects" | "blog";
}
import conf from "@/config/config";

async function getTutorials() {
    try {
        const res = await fetch(
            `${conf.baseUrl}/tutorial?req_data=getTutCat`,
            {
                next: { revalidate: 60 }, // Revalidate cache every 60 seconds
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data?.data || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

const TutorialComponent = async () => {
    const projectCards = await getTutorials()

    return (
        <div className="lg:container w-full  lg:my-16 mx-auto">
            <AnimatedGrid>
                {projectCards?.map((category: ProjectCardProps) => (
                    <TutorialsCard
                        key={category.CatName}
                        image={category.imageLink}
                        slug={category.slug}
                        title={category.CatName}
                        isLoading={false}

                    />
                ))}
            </AnimatedGrid>
        </div>
    )
}

export default TutorialComponent