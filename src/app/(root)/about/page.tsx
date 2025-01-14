"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Server, Wifi, Smartphone, Database, Code } from "lucide-react";
import anand from "@/assets/anand.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import conf from "@/config/config";
import Image from "next/image";
interface Data {
    _id: string;
    text: string;
    description: string;
    ogImage: string;
    slug: string;
}
export default function AboutUs() {
  const [data, setData] = useState<Data | null>(null);
  const getAbout = () => {
    axios
      .get(`${conf.baseUrl}/siteData?req_data=aboutSite`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAbout();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Hero Section */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.section
          className="mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-6 text-gray-900">About Us</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {data?.text}
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            With a strong focus on academic and industrial projects, IIST, Bihar
            has been a leader in delivering cutting-edge solutions for over a
            decade. We specialize in a wide range of projects, from academic
            assignments to industrial products, all of which focus on Embedded
            Systems and IoT applications.
          </p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-900">
            Our Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ExpertiseCard
              icon={<Cpu className="w-6 h-6" />}
              title="Microcontrollers"
              description="8051, PIC, AVR, Arduino, Node MCU, STM32, ESP32, ESP8266, and Raspberry Pi"
            />
            <ExpertiseCard
              icon={<Server className="w-6 h-6" />}
              title="Proprietary Modules"
              description="GSM, GPS, Xbee/Zigbee, LIFI, Load Cell, Arduino Daughter Boards"
            />
            <ExpertiseCard
              icon={<Wifi className="w-6 h-6" />}
              title="IoT Applications"
              description="Innovative and cost-effective solutions for various industries"
            />
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-900">
            Project Domains
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <DomainTag icon={<Smartphone className="w-4 h-4" />} name="IoT" />
            <DomainTag icon={<Wifi className="w-4 h-4" />} name="GSM/GPS" />
            <DomainTag icon={<Database className="w-4 h-4" />} name="RFID" />
            <DomainTag icon={<Code className="w-4 h-4" />} name="LIFI" />
            <DomainTag icon={<Server className="w-4 h-4" />} name="DTMF" />
            <DomainTag icon={<Wifi className="w-4 h-4" />} name="Zigbee" />
            <DomainTag icon={<Cpu className="w-4 h-4" />} name="ESP32 CAM" />
            <DomainTag
              icon={<Server className="w-4 h-4" />}
              name="Raspberry Pi"
            />
          </div>
        </motion.section>
      </main>

      {/* Footer - Director's Message */}
      <motion.footer
        className="bg-gray-100 py-16 relative cursor-pointer"
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          y: 0,
          rotate: 0,
          scale: 1,
        }}
        onClick={() => {
          const footer = document.querySelector("footer");
          if (footer) {
            // Create rocket flame effect
            const flame = document.createElement("div");
            flame.className =
              "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-32";
            flame.style.background =
              "linear-gradient(to top, #ff4d4d, #ff9933, transparent)";
            flame.style.filter = "blur(8px)";
            footer.appendChild(flame);

            // Animate the flame
            flame.animate(
              [
                { height: "32px", opacity: 0 },
                { height: "128px", opacity: 1 },
                { height: "256px", opacity: 0 },
              ],
              {
                duration: 1000,
                iterations: 1,
              }
            );

            // Create smoke particles
            for (let i = 0; i < 20; i++) {
              const smoke = document.createElement("div");
              smoke.className = "absolute bottom-0 rounded-full";
              smoke.style.width = `${Math.random() * 20 + 10}px`;
              smoke.style.height = smoke.style.width;
              smoke.style.left = `${Math.random() * 100}%`;
              smoke.style.background = "rgba(200, 200, 200, 0.3)";
              footer.appendChild(smoke);

              smoke.animate(
                [
                  { transform: "translateY(0) scale(1)", opacity: 0.8 },
                  {
                    transform: `translateY(-${
                      Math.random() * 200 + 100
                    }px) scale(2)`,
                    opacity: 0,
                  },
                ],
                {
                  duration: 1500,
                  easing: "ease-out",
                }
              ).onfinish = () => smoke.remove();
            }
          }
        }}
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          animate={{
            y: [-1000, 0],
            rotate: [-45, 0],
            scale: [0.5, 1],
          }}
          transition={{
            duration: 1.5,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Message from the Director
          </h3>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              <Image
                src={anand}
                alt="Mr. Anand Vijay"
                width={120}
                height={120}
                className="rounded-full shadow-md object-cover"
              />
              <div className="text-center md:text-left">
                <p className="font-bold text-2xl  text-blue-700 mb-1">
                  Mr. Anand Vijay
                </p>
                <p className="text-lg text-gray-600">
                  CEO & Director, IIST, Bihar
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed italic">
              &quot;As a passionate believer in hands-on learning and practical
              application, I encourage all our students to explore their
              potential and challenge themselves to create the technologies of
              tomorrow. Whether you&apos;re working on a simple academic project
              or a complex industrial application, we are here to support you
              every step of the way. Together, let&apos;s build a future where
              technology drives progress and innovation.&quot;
            </p>
          </div>
        </motion.div>
      </motion.footer>
    </div>
  );
}

function ExpertiseCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-white border-2 border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:shadow-lg hover:border-blue-600">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            {icon}
            <h4 className="text-xl font-bold ml-3 text-gray-900">{title}</h4>
          </div>
          <p className="text-base text-gray-600 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DomainTag({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex items-center gap-3 bg-white border-2 border-blue-500 hover:bg-blue-50 transition-colors duration-200 px-5 py-3 rounded-lg shadow-sm"
    >
      <div className="text-blue-600">{icon}</div>
      <span className="font-semibold text-base text-gray-800">{name}</span>
    </motion.div>
  );
}
