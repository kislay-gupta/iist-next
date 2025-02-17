import TutorialSidebar from "@/components/tutorials/TutorialSidebar";
import MobileTutorialSidebar from "@/components/tutorials/TutMobileSlider";
import { Suspense } from "react";

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

type Tutorial = {
    sno: number;
    title: string;
    slug: string;
    author: string;
    created: string;
    chapters: Chapter[];
    description: string;
}

type Chapter = {
    sno: number;
    tutorial_id: number;
    title: string;
    slug: string;
    author: string;
    content: string | null;
    pdf: string | null;
    Videolink: string | null;
    created: string;
}

async function getTutorialsByCategory(slug: string): Promise<Tutorial[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${baseUrl}tutorial?req_data=getTutByCatSlug&TutCatSlug=${slug}`, {
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch tutorials');
    }

    const data = await res.json();
    return data.data;
}

// Separate async component for the sidebar content
async function SidebarContent({ slug }: { slug: string }) {
    const tutorials = await getTutorialsByCategory(slug);

    return (
        <>
            <div className="hidden lg:block w-64">
                <TutorialSidebar tutorials={tutorials} category={slug} />
            </div>
            <div className="lg:hidden">
                <MobileTutorialSidebar tutorials={tutorials} category={slug} />
            </div>
        </>
    );
}

export default async function TutorialLayout({ children, params }: LayoutProps) {
    const { slug } = await params
    return (
        <div className="flex">
            <Suspense fallback={<div className="w-64">Loading...</div>}>

                <SidebarContent slug={slug} />
            </Suspense>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}