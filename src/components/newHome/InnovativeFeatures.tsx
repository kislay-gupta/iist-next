import React from 'react'
import MotionFade from '../shared/MotionFade'
import { getProducts } from '@/hooks/get-product'
import Project from '@/interfaces/Project'
import Carousel from '../shared/carousel'
import { ProductCard } from '../cards'
import TitleCard from '../shared/TitleCard'

const InnovativeFeatures = async () => {
    const data = await getProducts("arduino-projects")
    return (
        <section className="container mx-auto flex flex-col gap-4 justify-center items-center px-4 py-16 md:py-24">
            <div className="w-full flex flex-col items-center text-center">
                <MotionFade delay={0}>
                    <h4 className="text-3xl md:text-5xl font-extrabold text-orange-400 text-center mb-6 leading-tight">
                        Shaping Future Innovators through Projectovation
                    </h4>
                </MotionFade>
                <MotionFade delay={0.2}>
                    <p className="text-center  flex justify-center text-gray-700 max-w-3xl md:max-w-4xl lg:max-w-5xl text-base md:text-lg lg:text-xl leading-relaxed mx-auto">
                        Founded in 2020, PROJECTOVATION is committed to advancing innovation through Embedded Systems and IoT. With a strong emphasis on academic and industrial projects, we deliver smart solutions while nurturing future ready skills among students and professionals. Supported by experts, educators, and industry leaders, PROJECTOVATION bridges the gap between emerging technologies and real-world applications—empowering the next generation of innovators.
                    </p>
                </MotionFade>
            </div>

            <TitleCard bgColor='bg-red-600' title='Innovative Features for Smart Living' />
            <div className='mt-6 container mx-auto max-w-7xl'>
                <Carousel cardsPerView={{ base: 1, md: 2, lg: 3 }}
                    autoPlay={true}
                    interval={4000}

                >

                    {data.map((data: Project) => (
                        <ProductCard
                            key={data.name}
                            category={"arduino-projects"}
                            image={data.imageLink}
                            price={Number(data.DiscPrice)}
                            originalPrice={Number(data.price)}
                            slug={data.slug}
                            sno={data.sno}
                            title={data.name}

                        />
                    ))}
                </Carousel>
            </div>
        </section>
    )
}

export default InnovativeFeatures