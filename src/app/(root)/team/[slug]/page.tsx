import { BgCard } from "@/components/cards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Briefcase, Cpu, Download, Eye, GraduationCap, Lightbulb, User } from "lucide-react"
import ClickToCopy from "@/components/project/ClickToCopy";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PageParams = {
    params: Promise<{ slug: string }>;
}
export default async function Page({ params }: PageParams) {
    const { slug } = await params;

    console.log(slug)
    return (
        <div className="lg:w-11/12 lg:mx-auto mx-0 lg:px-4 px-2 py-6 lg:py-12">
            <div className="grid md:grid-cols-12 gap-y-4 lg:gap-12">
                {/* Left Column - Image & Quick Actions */}
                <div className="lg:space-y-6 col-span-5 space-y-2 sticky md:top-24 self-start">
                    <h1 className="text-2xl md:hidden font-bold text-gray-900 font-['Times_New_Roman']">
                        Anand Vijay A Visionary Innovator and Educator
                    </h1>
                    <div className="relative group w-full">
                        <Image
                            src="https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b6e19af3075.19873218.png"
                            alt="anand"
                            width={800}
                            height={600}
                            className="w-full h-full object-contain rounded-xl shadow-lg transition duration-300 group-hover:shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-xl" />

                        {/* Share button overlay */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ClickToCopy />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white">
                            <Eye className="mr-2 h-5 w-5" />
                            View Portfolio
                        </Button>


                        <Button
                            variant="outline"
                            className="w-full h-12 border-blue-200 hover:bg-blue-50"
                            asChild
                        >
                            <Link href="#" target="_blank">
                                <Download className="mr-2 h-5 w-5" />
                                Download PDF
                            </Link>
                        </Button>

                    </div>
                </div>

                {/* Right Column - All Details */}
                <div className="space-y-8 col-span-7">
                    <div>
                        <h1 className="text-3xl hidden md:block font-bold text-gray-900 mb-6 font-['Times_New_Roman']">
                            Anand Vijay :<span className="italic">
                                A Visionary Innovator and Educator
                            </span>
                        </h1>

                        {/* Price Section */}
                    </div>

                    {/* Project Stats */}

                    {/* Key Features */}
                    {/* <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4 font-['Times_New_Roman']">
                            Key Features
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                    <span className="text-blue-600 text-xs">✓</span>
                                </div>
                                <span className="ml-3">Complete source code included</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                    <span className="text-blue-600 text-xs">✓</span>
                                </div>
                                <span className="ml-3">Detailed documentation</span>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                    <span className="text-blue-600 text-xs">✓</span>
                                </div>
                                <span className="ml-3">6 months technical support</span>
                            </li>
                        </ul>
                    </div> */}

                    {/* Description */}
                    <BgCard>
                        <h2 className="text-2xl font-semibold mb-4 font-['Times_New_Roman'] text-justify">
                            Description
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-['Times_New_Roman'] text-justify">
                            <Section icon={<User />} title="Early Life and Education">
                                <p>
                                    Born and raised in Madhepura, Bihar, Anand Vijay showed an early passion for electronics and innovation.
                                    He completed his matriculation in 2020 with 76% marks under the Bihar School Examination Board (BSEB),
                                    Patna. He then pursued a diploma in Electronics Engineering at the Government Polytechnic, Supaul,
                                    completing it in 2024.
                                </p>
                            </Section>

                            <Section icon={<Briefcase />} title="Role as CEO and Director">
                                <p>
                                    Anand Vijay is the CEO and Director of Sparkovation Hub of Science and Technology Pvt. Ltd., a company
                                    dedicated to scientific research and innovation. He is also the Director of Inspire Institute of Science
                                    and Technology, Bihar, established in 2020.
                                </p>
                            </Section>

                            <Section icon={<Lightbulb />} title="Innovative Contributions">
                                <p>
                                    Anand Vijay has invented two innovative machines and devices in the field of electronics engineering.
                                    His creations demonstrate expertise in hardware design, software development, and project management.
                                </p>
                            </Section>

                            <Section icon={<Award />} title="Professional Achievements">
                                <ScrollArea className="h-48">
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Recognized by National Innovation Foundation of India</li>
                                        <li>Awarded by Inspire Awards for Smart Door Lock System</li>
                                        <li>Participated in numerous science exhibitions and hackathons</li>
                                        <li>Guided students in state and national-level science congresses</li>
                                    </ul>
                                </ScrollArea>
                            </Section>

                            <Section icon={<BookOpen />} title="Electronics Outreach and Teaching">
                                <p>
                                    As a dedicated educator, Anand Vijay has been a guide teacher in various state and national-level
                                    science congresses and exhibitions, nurturing young minds in STEM disciplines.
                                </p>
                            </Section>

                            <Section icon={<Cpu />} title="Skills and Expertise">
                                <ul className="flex flex-wrap gap-2">
                                    {[
                                        "Circuit design",
                                        "PCB layout",
                                        "Microcontroller programming",
                                        "Signal processing",
                                        "Simulation software",
                                        "Software Development",
                                        "Robotics",
                                        "Automation",
                                        "PLC",
                                        "SCADA",
                                    ].map((skill) => (
                                        <Badge key={skill} variant="secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </ul>
                            </Section>
                        </div>

                        <Section icon={<GraduationCap />} title="Vision" className="mt-6">
                            <p>
                                Inspired by A.P.J. Abdul Kalam, Anand Vijay is committed to using his technical expertise and teaching
                                prowess to foster innovation and inspire the next generation of scientists and technologists. His journey
                                epitomizes dedication, curiosity, and the relentless pursuit of knowledge.
                            </p>
                        </Section>




                    </BgCard>
                </div>
            </div >

        </div >
    )
}

function Section({ icon, title, children, className = "" }: { icon: React.ReactNode, title: string, children: React.ReactNode, className?: string }) {
    return (
        <div className={`space-y-2 ${className}`}>
            <h3 className="text-lg font-semibold flex items-center gap-2">
                {icon}
                {title}
            </h3>
            {children}
        </div>
    )
}