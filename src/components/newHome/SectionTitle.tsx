import React from 'react'
import { Card, CardTitle } from '../ui/card'

const SectionTitle = ({ title, bgColor }: { title: string; bgColor: string }) => {
    return (
        <Card className="w-max rounded-full shadow-none flex justify-center">
            <CardTitle
                className={`rounded-full text-center w-max capitalize px-8 py-3 titillium-medium text-gray-50 ${bgColor}`}
            >
                {title}
            </CardTitle>
        </Card>
    )
}

export default SectionTitle 