import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
    return (
        <div className="lg:w-11/12 lg:mx-auto mx-0 lg:px-4 px-2 py-6 lg:py-12">
            <div className="grid md:grid-cols-12 gap-y-4 lg:gap-12">
                {/* Left Column - Image & Quick Actions Skeleton */}
                <div className="lg:space-y-6 col-span-5 space-y-2">
                    <Skeleton className="h-8 w-3/4 md:hidden" /> {/* Mobile title */}
                    <Skeleton className="w-full aspect-[4/3] rounded-xl" /> {/* Image */}
                    <div className="flex gap-4">
                        <Skeleton className="w-full h-12" /> {/* Add to Cart button */}
                        <Skeleton className="w-12 h-12" /> {/* Download/PDF button */}
                    </div>
                </div>

                {/* Right Column - Content Skeleton */}
                <div className="col-span-7 space-y-6">
                    <Skeleton className="h-10 w-3/4 hidden md:block" /> {/* Desktop title */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-1/4" /> {/* Price label */}
                        <Skeleton className="h-8 w-1/3" /> {/* Price */}
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </div>
        </div>
    );
}
