import { BgCard } from "@/components/cards";
import ClickToCopy from "@/components/project/ClickToCopy";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Link, Download } from "lucide-react";
import Image from "next/image";
import parse from 'html-react-parser';
import { Metadata } from "next";
type PageParams = {
    params: Promise<{
        slug: string;

    }>;
};
export async function generateMetadata({
    params,
}: PageParams): Promise<Metadata> {
    const resolvedParams = await params;
    const project = await getComPonentsBySlug(resolvedParams.slug);
    const product = project.data[0];
    if (!project) {
        return {
            title: "Project Not Found | Sparkovation Hub",
            description: "Project details could not be found",
        };
    }

    return {
        title: `${product.name} | Sparkovation Hub`,
        description: `${product.name} | Sparkovation Hub`,
        openGraph: {
            images: [product.imageLink],
        },
    };
}
const getComPonentsBySlug = async (slug: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/componentData?req_data=getComponentByslug&CompSlug=${slug}`);
    const data = await res.json();
    return data;
}

export default async function Page({
    params,
}: PageParams) {
    const resolvedParams = await (params);
    const data = await getComPonentsBySlug(resolvedParams.slug);

    const product = data.data[0];
    const { name, imageLink, pdfLink, price, DiscPrice, Description } = product;
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
                    <div className="flex gap-4">
                        <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>

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

                {/* Right Column - All Details */}
                <div className="space-y-8 col-span-7">
                    <div>
                        <h1 className="text-3xl hidden md:block font-bold text-gray-900 mb-6 font-['Times_New_Roman']">
                            {name}
                        </h1>

                        {/* Price */}
                        {DiscPrice && (
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
                                            {Math.round((1 - Number(DiscPrice) / Number(price)) * 100)}%
                                            OFF
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>


                    {/* Project Stats */}

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
                            {Description && parse(Description)}
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
                    {/* <MoreProject category={resolvedParams.slug} projects_slug={resolvedParams.id} /> */}
                </div>
            </div>
        </div>
    )
}
