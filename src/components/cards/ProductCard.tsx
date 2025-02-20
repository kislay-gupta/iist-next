"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  slug: string;
  category: string;
  onAddToCart?: () => void;
}

export function ProductCard({
  title,
  image,
  price,
  originalPrice,
  slug,
  category,
  onAddToCart,
}: ProductCardProps) {
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      _id: slug,
      name: title,
      image,
      price,
      min_qty: 1,
    });
    if (onAddToCart) onAddToCart();
    toast.success(`${title} added to cart`);
  };

  return (
    <Card className="group relative w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/projects/${category}/${slug}`}>
        <CardContent className="p-0">
          <div className="relative  h-auto w-full overflow-hidden bg-gray-100">
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
        <Button
          className="w-full gap-2 bg-green-600 font-medium hover:bg-green-700"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
