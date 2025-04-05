import { ProductCard } from "@/components/cards/";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import conf from "@/config/config";
import EmptySearch from "@/components/shared/EmptySearch";

interface Project {
  sno: number;
  name: string;
  slug: string;
  image: string;
  imageLink: string;
  pdf: string;
  pdfLink: string;
  CatID: number;
  price: string;
  DiscPrice: string;
  Description: string;
  created: string;
}

type PageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const formattedSlug = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedSlug} Projects - IIST`,
  };
}

async function getProducts(category: string) {
  try {
    const response = await fetch(
      `${conf.baseUrl}projectData?req_data=getProjectByCatSlug&CatSlug=${category}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching products:", {
        error,
        message: error.message,
        stack: error.stack,
        category,
        url: `${conf.baseUrl}projectData?req_data=getProjectByCatSlug&CatSlug=${category}`,
      });
    } else {
      console.error("Unknown error fetching products:", {
        error,
        category,
        url: `${conf.baseUrl}projectData?req_data=getProjectByCatSlug&CatSlug=${category}`,
      });
    }
    return [];
  }
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const products = await getProducts(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb category={slug} />
        <div className="mb-8 space-y-4 md:space-y-6">
          <h1 className="text-3xl font-bold capitalize tracking-tight text-gray-900 sm:text-4xl">
            {slug}
          </h1>
          <p className="max-w-3xl text-lg text-gray-600">
            Explore our collection of products designed for innovation and
            learning innovation and learning
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing all{" "}
            <span className="font-medium text-gray-900">{products.length}</span>{" "}
            results
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.length > 0 ? (
            products.map((product: Project) => (
              <div key={product.sno}>
                <ProductCard
                  category={slug}
                  sno={product.sno}
                  slug={product.slug}
                  title={product.name}
                  image={product.imageLink}
                  price={Number(product.DiscPrice)}
                  originalPrice={Number(product.price)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <EmptySearch />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
