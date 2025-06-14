import React from 'react'

interface CallToActionBannerProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    // imageSrc: string;
}

const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    // imageSrc,
}) => {
    return (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-zinc-900 my-8">
            {/* <div className="absolute inset-0">
                <Image
                    src={imageSrc}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                />
            </div> */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 text-white">
                <div className="text-center md:text-left mb-6 md:mb-0 md:w-3/5">
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-sm text-gray-300">{description}</p>
                </div>
                <a
                    href={buttonLink}
                    className="px-8 py-3 bg-red-500 rounded-lg text-white font-semibold shadow-md hover:bg-red-600 transition-colors"
                >
                    {buttonText}
                </a>
            </div>
        </div>
    );
};

export default CallToActionBanner; 