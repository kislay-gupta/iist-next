import React from 'react'
import { Card, CardContent } from '../ui/card'

interface ChildScientistCardProps {
    imageSrc: string;
    name: string;
}

const ChildScientistCard: React.FC<ChildScientistCardProps> = ({
    imageSrc,
    name,
}) => {
    return (
        <Card className="rounded-2xl border-2 border-gray-300 shadow-md w-[240px] h-[240px] flex flex-col items-center justify-center overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
            <CardContent className="p-0 w-full h-[200px] flex items-center justify-center">
                <img src={imageSrc} alt={`${name} - Child Scientist`} className="w-full h-full object-cover rounded-xl p-1" />
            </CardContent>
            <div className="w-full px-4 py-2 text-center">
                <p className="font-medium text-gray-800">{name}</p>
            </div>
        </Card>
    )
}

export default ChildScientistCard 