import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import ParseHTML from '../shared/ParsedHTML';

interface GetInspirationCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
}

const GetInspirationCard: React.FC<GetInspirationCardProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    image,
}) => {
    return (
        <div className="flex flex-col justify-between rounded-2xl shadow-md border border-gray-200 bg-white p-4 w-full max-w-xs  mx-auto transition-transform hover:scale-105 hover:shadow-lg">
            <div>
                <img
                    src={image}
                    alt="Inspiration"
                    className="rounded-xl w-full h-[120px] object-cover mb-4"
                />
                <div className="font-bold text-base text-black mb-2 text-justify leading-tight">
                    {title}
                </div>
                <div className="text-sm text-black text-justify mb-6  line-clamp-1">
                    <ParseHTML data={description} />
                </div>
            </div>
            <Button asChild variant="link" className='text-white'>

                <Link
                    href={buttonLink}
                    className="inline-block mt-auto px-2 py-1.5 rounded-full bg-fuchsia-600 text-white text-xs font-semibold shadow hover:bg-fuchsia-700 transition-colors text-center"
                >
                    {buttonText}
                </Link>
            </Button>
        </div>
    );
};

export default GetInspirationCard; 