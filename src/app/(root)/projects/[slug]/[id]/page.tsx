import axios from "axios";
import { Metadata } from "next";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ClickToCopy from "@/components/project/ClickToCopy";
import { MoreProject } from "@/components/project/MoreProject";
import BgCard from "@/components/cards/BgCard";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
import ParseHTML from "@/components/shared/ParsedHTML";
// Define the project data type
interface ProjectData {
  sno: number;
  name: string;
  imageLink: string;
  pdfLink?: string;
  price: string;
  DiscPrice: string;
  Description?: string;
  slug: string;
}

async function getProjectData(id: string): Promise<ProjectData | null> {
  const MAX_RETRIES = 3;
  const TIMEOUT = 10000; // 10 seconds
  const RETRY_DELAY = 1000; // 1 second

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.get<{ data: ProjectData[] }>(
        `${process.env.NEXT_PUBLIC_BASE_URL}projectData?req_data=getProjectBySlug&ProjectSlug=${id}`,
        {
          timeout: TIMEOUT,
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      if (!response.data?.data?.[0]) {
        console.warn(`No project data found for ID: ${id}`);
        return null;
      }
      return response.data.data[0];
    } catch (error) {
      const isLastAttempt = attempt === MAX_RETRIES;

      if (axios.isAxiosError(error)) {
        console.error(`Attempt ${attempt}/${MAX_RETRIES} failed:`, {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          url: error.config?.url,
        });
      } else {
        console.error(
          `Attempt ${attempt}/${MAX_RETRIES} failed with unknown error:`,
          error
        );
      }

      if (isLastAttempt) {
        console.error("All retry attempts failed for project data fetch");
        return null;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  return null;
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

  const { sno, name, imageLink, pdfLink, price, DiscPrice, Description } =
    project;

  // Create product object for cart
  const cartProduct = {
    sno: sno,
    _id: resolvedParams.id,
    name: name,
    image: imageLink,
    price: Number(DiscPrice),
    min_qty: 1,
  };

  return (
    <>
      <div className="lg:w-11/12 lg:mx-auto mx-0 lg:px-4 px-2 py-6 lg:py-12">
        <div className="grid md:grid-cols-12 gap-y-4 lg:gap-12">
          {/* Left Column - Image & Quick Actions */}
          <div className="lg:space-y-6 col-span-5 space-y-2 sticky md:top-24 self-start">
            <h1 className="text-2xl md:hidden font-bold text-gray-900 font-['Times_New_Roman']">
              {name}
            </h1>
            <div className="relative group w-full">
              <Image
                src={imageLink}
                alt={name}
                width={800}
                height={600}
                className="w-full h-full object-contain rounded-xl shadow-lg transition duration-300 group-hover:shadow-2xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-xl" />

              {/* Share button overlay */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ClickToCopy />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 ">
              <div className="w-full">
                <AddToCartButton
                  product={cartProduct}
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                />
              </div>
              <div className="w-full">
                {pdfLink && (
                  <Button
                    variant="outline"
                    className="w-full h-12 border-blue-200 hover:bg-blue-50"
                    asChild
                  >
                    <Link href={pdfLink} target="_blank">
                      <Download className="mr-2 h-5 w-5" />
                      Download PDF
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - All Details */}
          <div className="space-y-8 col-span-7">
            <div>
              <h1 className="text-3xl hidden md:block font-bold text-gray-900 mb-6 font-['Times_New_Roman']">
                {name}
              </h1>

              {/* Price Section */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-blue-600">
                  ₹{DiscPrice}
                </span>
                {price !== DiscPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-400 line-through">
                      ₹{price}
                    </span>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                      {Math.round(
                        (1 - Number(DiscPrice) / Number(price)) * 100
                      )}
                      % OFF
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-gray-500">Downloads</div>
                <div className="font-semibold text-lg">1.2k</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-sm text-gray-500">Rating</div>
                <div className="font-semibold text-lg">4.8/5</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Views</div>
                <div className="font-semibold text-lg">3.4k</div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 font-['Times_New_Roman']">
                Key Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span className="ml-3">Complete source code included</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span className="ml-3">Detailed documentation</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span className="ml-3">6 months technical support</span>
                </li>
              </ul>
            </div>

            {/* Description */}
            <div className="browser-css">
              <BgCard>
                <h2 className="text-2xl font-semibold mb-4 font-['Times_New_Roman']">
                  Description
                </h2>
                {Description && <ParseHTML data={Description} />}
              </BgCard>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 font-['Times_New_Roman']">
              Similar Projects
            </h2>
            <Button>
              <Link href={`/projects/${resolvedParams.slug}`}>View All</Link>
            </Button>
          </div>
          <div className="w-full">
            {/* Similar project cards */}
            <MoreProject
              category={resolvedParams.slug}
              projects_slug={resolvedParams.id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
