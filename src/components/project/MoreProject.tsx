import * as React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getProducts } from "@/hooks/get-product";
import Project from "@/interfaces/Project";
import { ProductCard } from "../cards";

export async function MoreProject({
  category,
  projects_slug,
}: {
  category: string;
  projects_slug: string;
}) {
  const data = await getProducts(category);
  const filteredData = data.filter(
    (item: Project) => item.slug !== projects_slug
  );
  if (filteredData.length === 0) {
    return <div className="flex justify-center">No products found</div>;
  }
  return (
    <ScrollArea className="w-full lg:whitespace-nowrap rounded-md border">
      <div className="flex w-full sm:w-max space-x-4 p-4">
        {filteredData.map((item: Project) => (
          <div key={item.sno}>
            <ProductCard
              category={category}
              slug={item.slug}
              title={item.name}
              image={item.imageLink}
              price={Number(item.DiscPrice)}
              originalPrice={Number(item.price)}
            />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
