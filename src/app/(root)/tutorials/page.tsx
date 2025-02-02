import TextAnimation from "@/components/animations/TextAnimation";
import TutorialComponent from "@/components/tutorials/TutorialComponent";
import Link from "next/link";
import React from "react";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tutorial || IIST, Bihar',
    description:
        "Learn everything about IIST, Bihar – courses, admissions, eligibility, fees, and career opportunities. Get a complete step-by-step tutorial for aspiring students!",
}
const Tutorials = () => {
    return (
        <div className="lg:w-11/12 mx-auto px-4 py-8">
            <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="text-green-600 hover:underline">
                    Home
                </Link>
                <span>/</span>
                <span>Projects</span>
            </nav>
            <TextAnimation text="Tutorials" />

            <TutorialComponent />
        </div>
    );
};

export default Tutorials;
