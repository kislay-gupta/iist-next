import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Server, Wifi, Smartphone, Database, Code } from "lucide-react";
import anand from "@/assets/anand.png";

import Image from "next/image";


export default function AboutUs() {
 

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-gray-900">About Us</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            With a strong focus on academic and industrial projects, IIST, Bihar
            has been a leader in delivering cutting-edge solutions for over a
            decade. We specialize in a wide range of projects, from academic
            assignments to industrial products, all of which focus on Embedded
            Systems and IoT applications.
          </p>
        </section>

        <section className="mb-12">
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
        </section>

        <section className="mb-12">
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
        </section>
      </main>

      <footer className="bg-gray-100 py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="rounded-full  hover:animate-spin shadow-md object-cover"
              />
              <div className="text-center md:text-left">
                <p className="font-bold hover:animate-bounce text-2xl  text-blue-700 mb-1">
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
        </div>
      </footer>
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
    <div className="transition-transform duration-200 hover:scale-105">
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
    </div>
  );
}

function DomainTag({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center gap-3 bg-white border-2 border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:scale-105 px-5 py-3 rounded-lg shadow-sm">
      <div className="text-blue-600">{icon}</div>
      <span className="font-semibold text-base text-gray-800">{name}</span>
    </div>
  );
}
