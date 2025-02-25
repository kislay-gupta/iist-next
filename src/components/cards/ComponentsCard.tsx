"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
    title: string;
    image: string;
    price?: number;
    originalPrice?: number;
    slug: string;

}

export function ComponentsCard({
    title,
    image,
    price,
    originalPrice,
    slug,

}: ProductCardProps) {
    let discount = 0;
    if (price && originalPrice) {
        discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    }

    return (
        <Card className="group relative w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
            <Link href={`/components/p/${slug}`}>
                <CardContent className="p-0">
                    <div className="relative  overflow-hidden w-full h-auto bg-gray-100">
                        <Image
                            src={image}
                            alt={title}
                            width={500}
                            height={500}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {price && discount > 0 && (
                            <Badge variant="destructive" className="absolute left-3 top-3">
                                {discount}% OFF
                            </Badge>
                        )}
                    </div>
                    <div className="space-y-3 p-5">
                        <h3 className="line-clamp-2 capitalize min-h-[2.5rem] font-medium tracking-tight text-gray-900">
                            {title}
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                ₹ {price && price.toLocaleString()}
                            </span>
                            {originalPrice && price && originalPrice > price && (
                                <span className="text-sm text-muted-foreground line-through">
                                    ₹{originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                    <Button
                        className="w-full gap-2 bg-green-600 text-xl font-medium hover:bg-green-700"

                    >
                        <ShoppingCart className="h-4 w-4" />
                        View
                    </Button>
                </CardFooter>
            </Link>
        </Card>
    );
}
