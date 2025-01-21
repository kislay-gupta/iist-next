import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaUsers,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutIist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      id: 1,
      name: "STEM Education",
      description:
        "Comprehensive training in Science, Technology, Engineering, and Mathematics.",
      icon: <FaGraduationCap className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      name: "Innovation Hub",
      description:
        "State-of-the-art facilities for hands-on learning and creative problem-solving.",
      icon: <FaLaptopCode className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      name: "Critical Thinking",
      description:
        "Developing analytical and problem-solving skills through practical training and workshops.",
      icon: <FaUsers className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      name: "Expert Mentorship",
      description:
        "Learn from experienced educators and industry professionals dedicated to nurturing future innovators.",
      icon: <FaChalkboardTeacher className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div ref={ref} className="mx-auto w-full max-w-7xl bg-white px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-5"
      >
        <h2 className="text-left text-2xl font-extrabold text-primary md:text-3xl">
          About IIST
        </h2>
        <p className="text-sm text-gray-500">
          Inspire Institute of Science and Technology (IIST) is a premier
          institute dedicated to STEM education and critical thinking
          development, fostering innovation and excellence in future leaders.
        </p>
      </motion.div>

      {/* Features */}
      <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-10 md:max-w-none md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="col-span-1 flex flex-col items-start"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              {feature.icon}
            </div>
            <h4 className="mt-3 text-sm font-semibold text-gray-700">
              {feature.name}
            </h4>
            <p className="mt-1 text-sm text-gray-500 md:text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/about">
          <Button variant="default" size="lg" className="font-semibold">
            Learn More About IIST
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutIist;
