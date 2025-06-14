"use client"
import React, { useState } from 'react'
import ChildScientistCard from './ChildScientistCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ChildScientistCarouselProps {
    cardsData: { imageSrc: string }[];
}

const ChildScientistCarousel: React.FC<ChildScientistCarouselProps> = ({
    cardsData,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cardsPerPage = 4 // As seen in the screenshot

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
            <div className="flex space-x-6 justify-center items-center overflow-hidden w-full max-w-5xl">
                {visibleCards.map((card, idx) => (
                    <ChildScientistCard key={idx} imageSrc={card.imageSrc} name={'John Doe'} />
                ))}
            </div>
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