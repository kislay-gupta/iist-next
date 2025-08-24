import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ClickToCopy from "@/components/project/ClickToCopy";
import { MoreProject } from "@/components/project/MoreProject";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";
// import ParseHTML from "@/components/shared/ParsedHTML";
import conf from "@/config/config";
import DescriptionComponent from "./DescriptionComponent";

// Define the idea data type
interface IdeaData {
    id: number;
    name: string;
    slug: string;
    CatID: number;
    pdf: string;
    pdfLink: string;
    price: string;
    discPrice: string;
    description: string;
    image: string;
    imageLink: string;
    created_at: string;
}

type PageParams = {
    params: Promise<{ slug: string }>;
};

async function getIdeaBySlug(slug: string): Promise<IdeaData | null> {
    const MAX_RETRIES = 3;
    const TIMEOUT = 10000; // 10 seconds
    const RETRY_DELAY = 1000; // 1 second

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await axios.get<{ data: IdeaData }>(
                `${conf.baseUrl}idea.php?req_data=getIdeaBySlug&IdeaSlug=${slug}`,
                {
                    timeout: TIMEOUT,
                    headers: {
                        Accept: "application/json",
                        "Cache-Control": "no-cache",
                    },
                }
            );

            if (!response.data?.data) {
                console.warn(`No idea data found for slug: ${slug}`);
                return null;
            }
            return response.data.data;
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
                console.error("All retry attempts failed for idea data fetch");
                return null;
            }

            // Wait before retrying
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
    return null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const idea = await getIdeaBySlug(slug);

    if (!idea) {
        return {
            title: "Idea Not Found | IIST",
            description: "Idea details could not be found",
        };
    }

    return {
        title: `${idea.name} | IIST`,
        description: `${idea.name} | IIST`,
        openGraph: {
            images: [idea.imageLink],
        },
    };
}

export default async function IdeaPage({ params }: PageParams) {
    const { slug } = await params;
    const idea = await getIdeaBySlug(slug);

    if (!idea) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-xl font-semibold mb-4">Idea Not Found</div>
                <Link href="/ideas" className="text-blue-600 hover:underline">
                    Return to Ideas
                </Link>
            </div>
        );
    }

    const { id, name, imageLink, pdfLink, price, discPrice, description } = idea;

    // Create product object for cart
    const cartProduct = {
        sno: id,
        _id: id.toString(),
        name: name,
        image: imageLink,
        price: Number(discPrice),
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
                        <div className="flex gap-4">
                            <div className="w-full">
                                <AddToCartButton
                                    product={cartProduct}
                                    className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                                />
                            </div>
                            <div className="hidden">
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
                                    ₹{discPrice}
                                </span>
                                {price !== discPrice && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl text-gray-400 line-through">
                                            ₹{price}
                                        </span>
                                        <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                            {Math.round(((Number(price) - Number(discPrice)) / Number(price)) * 100)}% OFF
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <DescriptionComponent description={description} />
                            {/* <div className="prose max-w-none">
                                <h2 className="text-xl font-semibold mb-4">Description</h2>
                                <div className="text-gray-700">
                                    <ParseHTML data={description} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Ideas */}
            <div className="lg:px-4 px-2 py-12 bg-gray-50">
                <div className="lg:w-11/12 lg:mx-auto">
                    <h2 className="text-2xl font-bold mb-8">More Ideas You Might Like</h2>
                    <MoreProject projects_slug={idea.slug} category="ideas" />
                </div>
            </div>
        </>
    );
}
