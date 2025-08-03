"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";

interface ProductCardProps {
  sno: number;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  slug: string;
  category: string;
  onAddToCart?: () => void;
}

export function ProductCard({
  sno,
  title,
  image,
  price,
  originalPrice,
  slug,
  category,
  onAddToCart,
}: ProductCardProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const product = {
    sno: sno,
    _id: slug,
    name: title,
    image,
    price,
    min_qty: 1,
  };

  return (
    <Card className="group relative w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={category === "ideas" ? `/ideas/${slug}` : `/projects/${category}/${slug}`}>
        <CardContent className="p-0">
          <div className="relative h-auto w-full overflow-hidden bg-gray-100">
            <Image
              src={image}
              alt={title || "Product Image"}
              width={500}
              height={500}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {discount > 0 && (
              <Badge variant="destructive" className="absolute left-3 top-3">
                {discount}% OFF
              </Badge>
            )}
          </div>
          <div className="space-y-3 p-5">
            <h3 className="line-clamp-2 min-h-[2.5rem] font-medium capitalize tracking-tight text-gray-900">
              {title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{price.toLocaleString()}
              </span>
              {originalPrice > price && (
                <span className="text-muted-foreground text-sm line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-5 pt-0">
        <AddToCartButton
          product={product}
          className="w-full gap-2 bg-green-600 font-medium hover:bg-green-700"
          onAddToCart={onAddToCart}
        />
      </CardFooter>
    </Card>
  );
}
