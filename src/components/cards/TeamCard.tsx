"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LinkedinIcon as LinkedIn, Twitter, GitlabIcon as GitHub } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TeamMemberProps {
  imageUrl: string;
  banner?: string;
  name: string;
  designation: string;
  role: string;
 
  
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const TeamMember = ({
  imageUrl,
  banner,
  name,
  designation,
  role,


  socialLinks,
}: TeamMemberProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="relative pb-0">
          <div className="w-full h-48 overflow-hidden rounded-t-lg">
            <Image
              src={banner || "/placeholder.svg"}
              alt={name}
              width={500}
              height={300}
              className="object-cover object-top w-full h-full"
            />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={name}
                width={300}
                height={300}
                className="object-cover h-full w-full object-center"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-12 text-center flex-grow">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <CardDescription className="text-md font-medium text-primary">
            {designation}
          </CardDescription>
          <p className="mt-2 text-sm text-muted-foreground">{role}</p>
          
          
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          {socialLinks.linkedin && (
            <Button variant="ghost" size="icon" asChild>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedIn className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          )}
          {socialLinks.twitter && (
            <Button variant="ghost" size="icon" asChild>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
          )}
          {socialLinks.github && (
            <Button variant="ghost" size="icon" asChild>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <GitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

