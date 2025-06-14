"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardsPerView {
    base?: number; // mobile
    md?: number;   // medium/desktop
    lg?: number;   // large screens
    [key: string]: number | undefined;
}

interface CarouselProps {
    children: React.ReactNode[];
    cardsPerView?: number | CardsPerView;
    className?: string;
    autoPlay?: boolean;
    interval?: number;
}

// Utility to get cards per view based on window width
function useResponsiveCardsPerView(cardsPerView: number | CardsPerView = 4) {
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (typeof cardsPerView === "number") return cardsPerView;
    if (width < 768) return cardsPerView.base ?? 1;
    if (width < 1024) return cardsPerView.md ?? 4;
    return cardsPerView.lg ?? cardsPerView.md ?? 4;
}

export const Carousel: React.FC<CarouselProps> = ({
    children,
    cardsPerView = { base: 1, md: 4, lg: 4 },
    className = "",
    autoPlay = true,
    interval = 5000,
}) => {
    const totalCards = React.Children.count(children);
    const cardsPerPage = useResponsiveCardsPerView(cardsPerView);

    // Track current index in the carousel (which is the first visible card)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Get all children as array
    const childrenArray = React.Children.toArray(children);

    // Calculate total number of possible positions
    const totalPositions = Math.max(0, totalCards - cardsPerPage + 1);

    // Navigation handlers
    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
        resetInterval();
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
        resetInterval();
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        resetInterval();
    };

    // Auto-slide effect
    useEffect(() => {
        if (autoPlay) {
            resetInterval();
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, cardsPerPage, totalCards, autoPlay]);

    function resetInterval() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (autoPlay) {
            intervalRef.current = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
            }, interval);
        }
    }

    // Animation variants for smooth transitions
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.98,
            rotateY: direction > 0 ? 5 : -5
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0,
            scale: 0.98,
            rotateY: direction > 0 ? -5 : 5
        })
    };

    return (
        <div className={`w-full flex flex-col gap-6 ${className}`}>
            {/* Cards container */}
            <div className="relative w-full overflow-hidden">
                <div className="flex gap-6">
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                        {Array.from({ length: Math.min(cardsPerPage, totalCards) }).map((_, idx) => {
                            const cardIndex = (currentIndex + idx) % totalCards;
                            return (
                                <motion.div
                                    key={`card-${cardIndex}-${currentIndex}`}
                                    className="flex-1"

                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20,
                                        mass: 0.8,
                                        duration: 0.3
                                    }}
                                    style={{
                                        width: `calc(${100 / cardsPerPage}% - ${(3 * (cardsPerPage - 1)) / cardsPerPage}px)`,
                                        transformOrigin: "center center",
                                        left: `${(idx * 100) / cardsPerPage}%`,
                                    }}
                                >
                                    {childrenArray[cardIndex]}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls (dots and navigation arrows) */}
            <div className="flex items-center justify-between w-full">
                {/* Dots - one for each valid starting position */}
                <div className="flex gap-2">
                    {Array.from({ length: totalPositions }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className={`h-2 w-2 rounded-full transition-colors duration-200 ${i === currentIndex % totalPositions ? "bg-primary" : "bg-gray-300"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-2">
                    <motion.button
                        onClick={handlePrev}
                        className="rounded-full border border-gray-300 p-2 bg-white hover:bg-gray-100 transition"
                        aria-label="Previous"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft className="w-5 h-5 text-primary" />
                    </motion.button>
                    <motion.button
                        onClick={handleNext}
                        className="rounded-full border border-gray-300 p-2 bg-white hover:bg-gray-100 transition"
                        aria-label="Next"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight className="w-5 h-5 text-primary" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;