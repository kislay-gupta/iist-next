import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import MotionFade from "../shared/MotionFade";
import { FolderKanban, FileText, GraduationCap, Users } from "lucide-react";

const stats = [
  {
    icon: FolderKanban,
    value: "7+",
    label: "Project Categories",
  },
  {
    icon: FileText,
    value: "10+",
    label: "Latest Blog",
  },
  {
    icon: GraduationCap,
    value: "12+",
    label: "Internship Programme",
  },
  {
    icon: Users,
    value: "7+",
    label: "Trainings",
  },
];

const Hero = () => {
  return (
    <section className="relative rounded-b-xl bg-pink-400 px-4 pb-0 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 pb-0 pt-12 sm:px-6 lg:flex-row lg:px-8">
        {/* Left: Text */}
        <div className="flex w-full flex-col items-center justify-center text-left lg:w-1/2 lg:items-start">
          <MotionFade>
            <h1 className=" mb-4 w-full  font-sans text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-5xl xl:text-5xl  ">
              Innovate, Automate, and Simplify Your Life
            </h1>
          </MotionFade>
          <MotionFade>
            <p className="mb-6 max-w-xl text-justify text-base font-medium text-gray-900 sm:text-lg md:text-xl">
              Projectovation is a leading project and research platform
              specializing in Embedded Systems, Robotics, IoT etc.. With a
              strong focus on academic and industrial innovation, we deliver
              cutting-edge, practical solutions for real-world challenges.
            </p>
          </MotionFade>
          <div className="mb-8 flex gap-4">
            <MotionFade>
              <Button className="rounded-full bg-orange-500 px-6 py-2 font-semibold text-white shadow-md hover:bg-orange-600">
                Project
              </Button>
            </MotionFade>
            <MotionFade>
              <Button
                asChild
                className="rounded-full bg-purple-500 px-6 py-2 font-semibold text-white shadow-md hover:bg-purple-600"
              >
                <Link href="/blog">Blog</Link>
              </Button>
            </MotionFade>
          </div>
        </div>
        {/* Right: Overlapping Images */}
        <div className="relative flex min-h-[320px] w-full items-center justify-center lg:w-1/2">
          <div className="relative h-[320px] w-[320px]">
            {/* Main Image */}
            <MotionFade>
              <div className="absolute left-1/2 top-0 z-30 h-48 w-48 -translate-x-1/2 overflow-hidden rounded-full border-8 border-white shadow-lg md:h-60 md:w-60">
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
            <div className="absolute bottom-4 left-0 z-20 h-32 w-32 overflow-hidden rounded-full border-8 border-white shadow-lg md:h-36 md:w-36">
              <Image
                src="https://cdn.pixabay.com/photo/2022/01/18/13/13/robot-6947000_1280.jpg"
                alt="Robot"
                fill
                className="object-cover"
              />
            </div>
            {/* Bottom Right Image */}
            <div className="absolute bottom-0 right-0 z-20 h-24 w-24 overflow-hidden rounded-full border-8 border-white shadow-lg md:h-28 md:w-28">
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
      <div className="mx-auto flex max-w-xl flex-col items-center lg:-mt-4 lg:max-w-5xl">
        <div className="grid w-full grid-cols-2 gap-4 rounded-2xl bg-white/90 px-2 py-6 shadow-lg lg:flex lg:flex-row lg:gap-0">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-1 flex-col items-center px-4 ${idx < stats.length - 1 ? "border-r border-pink-200" : ""}`}
              >
                <div className="mb-2 rounded-full bg-pink-100 p-3">
                  <Icon className="h-8 w-8 text-pink-500" />
                </div>
                <div className="text-2xl font-bold text-pink-600">
                  {stat.value}
                </div>
                <div className="mt-1 text-center text-sm font-medium text-gray-700">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
