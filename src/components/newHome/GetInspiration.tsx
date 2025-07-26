import React from 'react'
import TitleCard from '../shared/TitleCard'
import GetInspirationCard from './GetInspirationCard'
import { getBlogs } from '@/hooks/get-blog'
interface Blog {
    _id: string;
    title: string;
    ogImage: string;
    slug: string;
    content: string;
}


const GetInspiration = async () => {
    const data = await getBlogs("arduino-projects")

    return (
        <div className='container mx-auto my-8'>
            <div className='flex justify-center mb-8'>
                <TitleCard bgColor='bg-blue-400' title='Get Inspiration for Learning AI' />
            </div>
            <div className="flex flex-col md:flex-row gap-1 justify-center items-stretch w-full max-w-5xl mx-auto">
                {data?.map((card: Blog, idx: React.Key | null | undefined) => (
                    <GetInspirationCard
                        key={idx}
                        image={card.ogImage}
                        title={card.title}
                        description={card.content}
                        buttonText={"read more"}
                        buttonLink={card.slug}
                    />
                ))}
            </div>
        </div>
    )
}

export default GetInspiration