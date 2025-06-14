import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import MotionFade from '../shared/MotionFade'
import { FolderKanban, FileText, GraduationCap, Users } from 'lucide-react'

const stats = [
    {
        icon: FolderKanban,
        value: '7+',
        label: 'Project Categories',
    },
    {
        icon: FileText,
        value: '10+',
        label: 'Latest Blog',
    },
    {
        icon: GraduationCap,
        value: '12+',
        label: 'Internship Programme',
    },
    {
        icon: Users,
        value: '7+',
        label: 'Trainings',
    },
]

const Hero = () => {
    return (
        <section className="relative bg-pink-400 rounded-b-xl px-4 sm:px-6 lg:px-8 pb-0">
            <div className="mx-auto max-w-7xl px-4 pt-12 pb-0 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
                {/* Left: Text */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center lg:items-start items-center text-left">
                    <MotionFade>

                        <h1 className="text-4xl sm:text-5xl md:text-5xl font-extrabold font-sans text-white leading-tight mb-4">
                            Innovate, Automate, and <br /> Simplify Your Life
                        </h1>
                    </MotionFade>
                    <MotionFade>

                        <p className="text-base sm:text-lg md:text-xl text-gray-900 font-medium text-justify max-w-xl mb-6">
                            Projectovation is a leading project and research platform specializing in Embedded Systems, Robotics, IoT etc.. With a strong focus on academic and industrial innovation, we deliver cutting-edge, practical solutions for real-world challenges.
                        </p>
                    </MotionFade>
                    <div className="flex gap-4 mb-8">
                        <MotionFade>

                            <Button className="bg-orange-500 hover:bg-orange-600 rounded-full px-6 py-2 text-white font-semibold shadow-md">Project</Button>
                        </MotionFade>
                        <MotionFade>

                            <Button asChild className="bg-purple-500 hover:bg-purple-600 rounded-full px-6 py-2 text-white font-semibold shadow-md">
                                <Link href="/blog">Blog</Link>
                            </Button>
                        </MotionFade>
                    </div>
                </div>
                {/* Right: Overlapping Images */}
                <div className="w-full lg:w-1/2 flex justify-center items-center relative min-h-[320px]">
                    <div className="relative w-[320px] h-[320px]">
                        {/* Main Image */}
                        <MotionFade>

                            <div className="absolute z-30 top-0 left-1/2 -translate-x-1/2 w-48 h-48 md:w-60 md:h-60 rounded-full border-8 border-white shadow-lg overflow-hidden">
                                <Image
                                    src="https://cdn.pixabay.com/photo/2020/11/10/21/00/boy-5731001_1280.jpg"
                                    alt="Main Hero"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </MotionFade>
                        {/* Bottom Left Image */}
                        <div className="absolute z-20 bottom-4 left-0 w-32 h-32 md:w-36 md:h-36 rounded-full border-8 border-white shadow-lg overflow-hidden">
                            <Image
                                src="https://cdn.pixabay.com/photo/2022/01/18/13/13/robot-6947000_1280.jpg"
                                alt="Robot"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Bottom Right Image */}
                        <div className="absolute z-20 bottom-0 right-0 w-24 h-24 md:w-28 md:h-28 rounded-full border-8 border-white shadow-lg overflow-hidden">
                            <Image
                                src="https://cdn.pixabay.com/photo/2022/01/07/06/54/eye-6921238_1280.jpg"
                                alt="Cars"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Stats Bar */}
            <div className="mx-auto max-w-xl lg:max-w-5xl lg:-mt-4 flex flex-col items-center">
                <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-row lg:gap-0 bg-white/90 rounded-2xl shadow-lg px-2 py-6 w-full">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon
                        return (
                            <div key={stat.label} className={`flex flex-col items-center flex-1 px-4 ${idx < stats.length - 1 ? 'border-r border-pink-200' : ''}`}>
                                <div className="bg-pink-100 rounded-full p-3 mb-2">
                                    <Icon className="w-8 h-8 text-pink-500" />
                                </div>
                                <div className="text-2xl font-bold text-pink-600">{stat.value}</div>
                                <div className="text-sm font-medium text-gray-700 text-center mt-1">{stat.label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Hero