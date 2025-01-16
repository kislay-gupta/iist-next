import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logobg.jpg";
export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-8">
          {/* Logo and Social Section */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-center items-center">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="mb-4"
            />
            <p className="text-gray-300 text-center lg:text-start font-normal text-sm leading-none mb-6">
              Stay connected with us! Follow and subscribe to our social media
              platforms for regular updates on learning new skills. Happy
              Learning!
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-orange-500">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-orange-500">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-orange-500">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-orange-500">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange-500 font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-orange-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Summer Camp 2024
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-orange-500 font-semibold text-lg mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* More & Contacts */}
          <div>
            <div className="lg:mb-8">
              <h3 className="text-orange-500 font-semibold text-lg mb-4">
                More
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    Certificate verification
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    Student Panel
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-orange-500 font-semibold text-lg mb-4">
              Contacts
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                <Link
                  href="tel:+917295890160"
                  className="hover:text-orange-500"
                >
                  +91-7295890160
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                <Link
                  href="mailto:support@iistbihar.com"
                  className="hover:text-orange-500"
                >
                  support@iistbihar.com
                </Link>
              </div>
              <div className="flex gap-2 mt-4">
                <Input
                  type="email"
                  placeholder="Enter Mail"
                  className="bg-transparent border-gray-700"
                />
                <Button variant="destructive">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mb-8 lg:mb-0 mt-6 lg:pt-4 text-center text-sm text-gray-400">
          <p>
            COPYRIGHT IIST BIHAR. All rights reserved | Designed & Maintained BY{" "}
            <Link
              href="https://technotricky.com"
              target="_blank"
              className="text-orange-500"
            >
              Technotricky
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
