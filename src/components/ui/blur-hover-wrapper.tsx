import React from "react";
import { cn } from "@/lib/utils";

interface BlurHoverWrapperProps {
    children: React.ReactNode;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    className?: string;
    hoverContent?: React.ReactNode;
    hoverContentClassName?: string;
}

export function BlurHoverWrapper({
    children,
    index,
    hovered,
    setHovered,
    className,
    hoverContent,
    hoverContentClassName,
}: BlurHoverWrapperProps) {
    return (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "relative overflow-hidden transition-all duration-300 ease-out",
                hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
                className
            )}
        >
            {children}
            {hoverContent && (
                <div
                    className={cn(
                        "absolute inset-0 transition-opacity duration-300",
                        hovered === index ? "opacity-100" : "opacity-0",
                        hoverContentClassName
                    )}
                >
                    {hoverContent}
                </div>
            )}
        </div>
    );
} 