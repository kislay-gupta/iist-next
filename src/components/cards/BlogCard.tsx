"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  image: string;
  slug: string;
  category: string;
}

export default function BlogCard({
  title,
  image,
  slug,
  category,
}: ProductCardProps) {
  return (
    <Link href={`/blog/${category}/${slug}`}>
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg w-[300px]">
        <CardContent className="p-0">
          <div className="relative overflow-hidden w-full h-[200px] bg-gray-100">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-3 p-5">
            <h3 className="line-clamp-2 capitalize min-h-[2.5rem] font-medium tracking-tight text-gray-900">
              {title}
            </h3>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0">
         
        </CardFooter>
      </Card>
    </Link>
  );
}
