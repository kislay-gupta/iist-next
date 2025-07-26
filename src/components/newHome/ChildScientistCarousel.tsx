"use client"
import React, { useState, useEffect } from 'react'
import ChildScientistCard from './ChildScientistCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StaticImageData } from 'next/image';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

interface ChildScientistCarouselProps {
    cardsData: {
        imageSrc: string | StaticImageData,
        name: string
    }[];

}

const ChildScientistCarousel: React.FC<ChildScientistCarouselProps> = ({
    cardsData,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Responsive cards per page based on screen size
    const getCardsPerPage = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 1; // mobile
            if (window.innerWidth < 768) return 2; // tablet
            return 3; // desktop
        }
        return 3; // default for SSR
    }

    const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage())

    useEffect(() => {
        const handleResize = () => {
            setCardsPerPage(getCardsPerPage())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cardsData.length - cardsPerPage : prevIndex - cardsPerPage
        )
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= cardsData.length - cardsPerPage ? 0 : prevIndex + cardsPerPage
        )
    }

    const visibleCards = cardsData.slice(currentIndex, currentIndex + cardsPerPage)

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <ScrollArea className="w-11/12 rounded-md border whitespace-nowrap">
                <div className="flex w-full gap-3 sm:gap-4 md:gap-6 justify-center items-center overflow-hidden   mx-auto ">

                    {visibleCards.map((card, idx) => (
                        <ChildScientistCard
                            key={idx}
                            imageSrc={card.imageSrc}
                            name={card.name}
                            priority={idx < 2} // Prioritize first 2 visible cards
                            loading={idx < 2 ? 'eager' : 'lazy'}
                        />
                    ))}
                    <ScrollBar orientation="horizontal" />
                </div>

            </ScrollArea>
            <div className="flex space-x-4 mt-8">
                <button
                    onClick={handlePrev}
                    className="bg-blue-400 rounded-full p-2 text-white shadow-md hover:bg-blue-500 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={handleNext}
                    className="bg-blue-400 rounded-full p-2 text-white shadow-md hover:bg-blue-500 transition-colors"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    )
}

export default ChildScientistCarousel 