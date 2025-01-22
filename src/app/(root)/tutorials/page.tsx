import TextAnimation from "@/components/animations/TextAnimation";
import TutorialComponent from "@/components/tutorials/TutorialComponent";
import Link from "next/link";
import React from "react";

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
