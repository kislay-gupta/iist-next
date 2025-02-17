import { BgCard } from "@/components/cards";
import { Download, Eye } from "lucide-react";
import ClickToCopy from "@/components/project/ClickToCopy";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import parse from "html-react-parser";
type PageParams = {
  params: Promise<{ slug: string }>;
};
const getTeamMemberData = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}teams?req_data=getTeamMemberBySlug&TeamMemberSlug=${slug}`
    );
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      return (
        <p className="text-red-500">Failed to load posts: {error.message}</p>
      );
    } else {
      return <p className="text-red-500">Failed to load posts</p>;
    }
  }
};

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const data = await getTeamMemberData(slug);
  const { name, designation, protfolio, content, pdfLink, imageLink } =
    data.data;
  return (
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
              alt="anand"
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
          <div className="flex gap-4">
            <Button
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <Link href={protfolio}>
                <Eye className="mr-2 h-5 w-5" />
                View Portfolio
              </Link>
            </Button>

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
          </div>
        </div>

        {/* Right Column - All Details */}
        <div className="space-y-8 col-span-7">
          <div>
            <h1 className="text-3xl hidden md:block font-bold text-gray-900 mb-6 font-['Times_New_Roman']">
              {name}
              <br></br>
              {designation}
            </h1>

            {/* Price Section */}
          </div>

          {/* Project Stats */}

          {/* Key Features */}
          {/* <div className="bg-gray-50 rounded-lg p-6">
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
                    </div> */}

          {/* Description */}
          <BgCard>
            <h2 className="text-2xl font-semibold mb-4 font-['Times_New_Roman'] text-justify">
              Description
            </h2>
            <div className="  font-['Times_New_Roman'] text-justify">
              <div className="browser-css">{content && parse(content)}</div>
            </div>
          </BgCard>
        </div>
      </div>
    </div>
  );
}
