import React from 'react'
import Image, { StaticImageData } from 'next/image';

interface ChildScientistCardProps {
    imageSrc: string | StaticImageData;
    name: string;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
}

const ChildScientistCard: React.FC<ChildScientistCardProps> = ({
    imageSrc,
    name,
    priority = false,
    loading = 'lazy',
}) => {
    return (
        // <Card className="rounded-2xl border-2 border-gray-300 shadow-md w-full max-w-[240px] min-w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] aspect-square flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
        //     <CardContent className="p-1 w-full flex-1 relative">
        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 w-full  max-w-xl h-64">
            <Image priority={priority} loading={loading} src={imageSrc} fill alt="University of Southern California" className="absolute inset-0    object-contain aspect-[3/2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <h3 className="z-10 mt-3 text-3xl font-bold text-white">{name}</h3>
        </article>
        //     </CardContent>
        //     <div className="w-full px-2 sm:px-3 md:px-4 py-2 text-center flex-shrink-0">
        //         <p className="font-medium text-gray-800 truncate text-sm sm:text-base">{name}</p>
        //     </div>
        // </Card>
    )
}

export default ChildScientistCard 