import axios from "axios";
import Link from "next/link";
import { Metadata } from "next";
import Card from "./Card";
// Define the project data type
interface ProjectData {
  name: string;
  imageLink: string;
  pdfLink?: string;
  price: string;
  DiscPrice: string;
  Description?: string;
}

async function getProjectData(id: string): Promise<ProjectData | null> {
  try {
    const response = await axios.get<{ data: ProjectData[] }>(
      `${process.env.NEXT_PUBLIC_BASE_URL}projectData?req_data=getProjectBySlug&ProjectSlug=${id}`
    );
    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

type PageParams = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectData(resolvedParams.id);

  if (!project) {
    return {
      title: "Project Not Found | Sparkovation Hub",
      description: "Project details could not be found",
    };
  }

  return {
    title: `${project.name} | Sparkovation Hub`,
    description: `${project.name} | Sparkovation Hub`,
    openGraph: {
      images: [project.imageLink],
    },
  };
}

export default async function ProjectPage({ params }: PageParams) {
  const resolvedParams = await params;
  const project = await getProjectData(resolvedParams.id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl font-semibold mb-4">Project Not Found</div>
        <Link href="/projects" className="text-blue-600 hover:underline">
          Return to Projects
        </Link>
      </div>
    );
  }

  const { name, imageLink, pdfLink, price, DiscPrice, Description } = project;

  return (
    <>
      {project &&
        <Card
          slug={resolvedParams.slug}
          name={name || ''}
          imageLink={imageLink || ''}
          pdfLink={pdfLink || ''}
          price={price || ''}
          DiscPrice={DiscPrice || ''}
          Description={Description || ''}
          id={resolvedParams.id}
        />
      }
    </>
  );
}
