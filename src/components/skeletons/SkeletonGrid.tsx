import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonGrid() {
    return (
        <>
            <div className="flex">


                <main className="block w-full">


                    <div className="container lg:my-16 my-8 m-auto">


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="flex flex-col space-y-3">
                                    <Skeleton className="h-40 w-full rounded-md" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

