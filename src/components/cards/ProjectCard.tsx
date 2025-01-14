import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title?: string;
  image?: string;
  slug?: string;
  isLoading?: boolean;
  category?: "projects" | "blog";
}

export function ProjectCard({
  title,
  image,
  slug,
  isLoading = true,
  category = "projects"
}: ProjectCardProps) {
  if (isLoading) {
    return (
      <Card className="group overflow-hidden">
        <CardContent className="p-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <div className="h-full w-full animate-pulse bg-gray-200" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={`/${category}/${slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
            <Image
              width={500}
              height={500}
              src={image || ""}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>
        <CardContent className="p-4">
          <div className=" flex items-center justify-between">
            <h3 className="font-semibold capitalize text-gray-900">{title}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
