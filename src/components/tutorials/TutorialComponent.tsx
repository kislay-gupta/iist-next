import React from 'react'
import AnimatedGrid from '../animations/AnimatedGrid'
import { TutorialsCard } from '../cards/';
interface ProjectCardProps {
    title?: string;
    image?: string;
    slug?: string;
    isLoading?: boolean;
    category?: "projects" | "blog";
}
const projectCards: ProjectCardProps[] = [
    { title: "Arduino Projects", category: "projects", slug: "arduino-projects" },
    { title: "IoT Innovations", category: "projects", slug: "iot-innovations" },
    { title: "Web Development Essentials", category: "projects", slug: "web-development-essentials" },
    { title: "Frontend Magic", category: "projects", slug: "frontend-magic" },
    { title: "Backend Solutions", category: "projects", slug: "backend-solutions" },
    { title: "HTML Basics", category: "blog", slug: "html-basics" },
    { title: "CSS Styling Tips", category: "blog", slug: "css-styling-tips" },
    { title: "Tailwind Mastery", category: "blog", slug: "tailwind-mastery" },
    { title: "JavaScript Techniques", category: "blog", slug: "javascript-techniques" },
    { title: "Python Power", category: "projects", slug: "python-power" },
    { title: "PHP Development", category: "projects", slug: "php-development" },
    { title: "TypeScript Advantage", category: "blog", slug: "typescript-advantage" },
    { title: "React.js Fundamentals", category: "projects", slug: "reactjs-fundamentals" },
    { title: "Next.js for Professionals", category: "projects", slug: "nextjs-for-professionals" },
    { title: "Bootstrap Design", category: "blog", slug: "bootstrap-design" },
];

const TutorialComponent = () => {
    return (
        <div className="lg:container w-full  lg:my-16 mx-auto">
            <AnimatedGrid>
                {projectCards?.map((category: ProjectCardProps) => (
                    <TutorialsCard
                        key={category.title}
                        image={"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
                        slug={category.slug}
                        title={category.title}
                        isLoading={false}

                    />
                ))}
            </AnimatedGrid>
        </div>
    )
}

export default TutorialComponent