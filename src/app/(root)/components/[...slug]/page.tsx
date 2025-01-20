import AnimatedGrid from "@/components/animations/AnimatedGrid";
import TextAnimation from "@/components/animations/TextAnimation";
import { ComponentsCard } from "@/components/cards";
import { Metadata } from "next";
import Link from "next/link";
type PageParams = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};
export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: resolvedParams.slug[0],
    description: `Page for ${resolvedParams.slug[0]}`,
  };
}

interface ProductCardProps {
  sno: number;
  imageLink: string;
  name: string;
  image: string;
  price?: number;
  DiscPrice?: number;
  slug: string;

}


const getComPonentsByCategoru = async (slug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/componentData?req_data=CompByCatSlugOrID&CompCatSlug=${slug}`);
  const data = await res.json();
  return data;
}

export default async function Page({
  params,
}: PageParams) {
  const resolvedParams = await (params);
  const data = await getComPonentsByCategoru(resolvedParams.slug[0]);
  console.log(data);
  return <>
    <div className="lg:w-11/12 mx-auto px-4 py-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="text-green-600 hover:underline">
          Home
        </Link>
        <span>/</span>
        <span>{resolvedParams.slug[0]}</span>
      </nav>
      <TextAnimation text={resolvedParams.slug[0]} />
      <div className="lg:container w-full  lg:my-16 mx-auto">
        <AnimatedGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
          {data?.data?.map((category: ProductCardProps) => (
            <ComponentsCard
              key={category.sno}
              image={category.imageLink}
              slug={category.slug}
              title={category.name}

              originalPrice={Number(category.price)}
              price={Number(category.DiscPrice)}
            />
          ))}
        </AnimatedGrid>
      </div>
    </div>
  </>;
}