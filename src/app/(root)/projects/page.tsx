import TextAnimation from "@/components/animations/TextAnimation";
import ProjectComponent from "@/components/project/ProjectComponent";
import Link from "next/link";
import React from "react";

const Projects = () => {
  return (
    <div className="lg:w-11/12 mx-auto px-4 py-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="text-green-600 hover:underline">
          Home
        </Link>
        <span>/</span>
        <span>Projects</span>
      </nav>
      <TextAnimation text="Project Categories" />

      <ProjectComponent />
    </div>
  );
};

export default Projects;
