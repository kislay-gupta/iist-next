import React from 'react'
import TitleCard from '../shared/TitleCard'
import GetInspirationCard from './GetInspirationCard'

const cards = [
    {
        title: 'Get started with expert insights, real-world projects, step-by-step guides, and personalized mentorship!',
        description: '',
        buttonText: 'Blogs',
        buttonLink: '#blogs',
    },
    {
        title: 'Discover innovative real-world solutions designed by passionate Teachers and Students from our community!',
        description: '',
        buttonText: 'Projects Gallery',
        buttonLink: '#projects',
    },
    {
        title: 'Explore the innovative projects and solutions delivered by Sparkovation across industries and institutions!',
        description: '',
        buttonText: 'Impact Programs',
        buttonLink: '#impact',
    },
]

const GetInspiration = () => {
    return (
        <div className='container mx-auto my-8'>
            <div className='flex justify-center mb-8'>
                <TitleCard bgColor='bg-blue-400' title='Get Inspiration for Learning AI' />
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-5xl mx-auto">
                {cards.map((card, idx) => (
                    <GetInspirationCard
                        key={idx}
                        title={card.title}
                        description={card.description}
                        buttonText={card.buttonText}
                        buttonLink={card.buttonLink}
                    />
                ))}
            </div>
        </div>
    )
}

export default GetInspiration