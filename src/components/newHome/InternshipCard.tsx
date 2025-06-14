import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import Image from "next/image";
import { Internship } from "./internshipData";

interface InternshipCardProps {
    internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
    return (
        <Card className="w-full max-w-xs mx-auto bg-gradient-to-br from-orange-50 to-white border-0 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
            <div className="relative w-full h-44 bg-orange-100 flex items-center justify-center">
                <Image
                    src={internship.src}
                    alt={internship.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full"
                />
                <span className="absolute top-2 right-2 bg-white/80 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full shadow">{internship.duration}</span>
            </div>
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-bold text-orange-700 mb-1 truncate">{internship.title}</CardTitle>
                <CardDescription className="text-xs text-gray-500 font-medium">{internship.location}</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
                <p className="text-sm text-gray-700 min-h-[48px] line-clamp-3">{internship.description}</p>
            </CardContent>
        </Card>
    );
};

export default InternshipCard;
