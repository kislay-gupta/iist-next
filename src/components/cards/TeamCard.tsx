"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  LinkedinIcon as LinkedIn,
  Twitter,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface TeamMemberProps {
  imageLink: string;
  coverImageLink?: string;
  name: string;
  designation: string;
  subDesignation: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  slug: string;
}

export const TeamMember = ({
  imageLink,
  coverImageLink,
  name,
  designation,
  subDesignation,
  linkedin,
  twitter,
  facebook,
  instagram,
  youtube,
  slug,
}: TeamMemberProps) => {
  const router = useRouter()
  return (
    <motion.div
      initial= {{ opacity: 0, y: 20 }
}
whileInView = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.5 }}
className = "w-full"
onClick = {() => router.push(`/team/${slug}`)}
    >
  <Card className="flex h-full flex-col" >
    <CardHeader className="relative pb-0" >
      <div className="h-48 w-full overflow-hidden rounded-t-lg" >
        <Image
              src={ coverImageLink || "/placeholder.svg" }
alt = { name }
width = { 500}
height = { 300}
className = "h-full w-full object-cover object-top"
  />
  </div>
  < div className = "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform" >
    <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white" >
      <Image
                src={ imageLink || "/placeholder.svg" }
alt = { name }
width = { 300}
height = { 300}
className = "h-full w-full object-cover object-center"
  />
  </div>
  </div>
  </CardHeader>
  < CardContent className = "flex-grow pt-12 text-center" >
    <CardTitle className="text-2xl font-bold" > { name } </CardTitle>
      < CardDescription className = "text-md font-medium text-primary" >
        { designation }
        </CardDescription>
        < p className = "text-muted-foreground mt-2 text-sm" > { subDesignation } </p>
          </CardContent>
          < CardFooter className = "flex justify-center space-x-2" >
            { linkedin && (
              <Button size="icon" variant = "ghost" asChild >
                <a href={ linkedin } target = "_blank" rel = "noopener noreferrer" >
                  <LinkedIn className="h-5 w-5" />
                    </a>
                    </Button>
          )}
{
  twitter && (
    <Button size="icon" variant = "ghost" asChild >
      <a href={ twitter } target = "_blank" rel = "noopener noreferrer" >
        <Twitter className="h-5 w-5" />
          </a>
          </Button>
          )
}
{
  facebook && (
    <Button size="icon" variant = "ghost" asChild >
      <a href={ facebook } target = "_blank" rel = "noopener noreferrer" >
        <Facebook className="h-5 w-5" />
          </a>
          </Button>
          )
}
{
  instagram && (
    <Button size="icon" variant = "ghost" asChild >
      <a href={ instagram } target = "_blank" rel = "noopener noreferrer" >
        <Instagram className="h-5 w-5" />
          </a>
          </Button>
          )
}
{
  youtube && (
    <Button size="icon" variant = "ghost" asChild >
      <a href={ youtube } target = "_blank" rel = "noopener noreferrer" >
        <Youtube className="h-5 w-5" />
          </a>
          </Button>
          )
}
</CardFooter>
  </Card>
  </motion.div>
  );
};
