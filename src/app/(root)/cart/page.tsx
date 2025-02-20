"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CartItemSkeleton = () => (
    <div className="flex flex-col md:flex-row gap-6 py-6 border-b border-gray-100 last:border-0">
        <div className="md:w-1/4">
            <Skeleton className="w-full h-[200px] md:h-[180px] rounded-xl" />
        </div>
        <div className="md:w-3/4 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-6">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>
            <div className="flex justify-end">
                <Skeleton className="h-6 w-24" />
            </div>
        </div>
    </div>
);

export default function CartPage() {
    const {
        items,
        totalItems,
        totalPrice,
        updateQuantity,
        removeItem,
        hydrateCart,
    } = useCart();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            await hydrateCart();
            setIsLoading(false);
        };
        loadCart();
    }, [hydrateCart]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                <Card className="backdrop-blur-sm bg-white/90 shadow-xl rounded-2xl border-0 lg:w-2/3">
                    <CardHeader className="px-6 py-8">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                                <ShoppingCart className="h-7 w-7 text-blue-600" />
                                Shopping Cart
                            </CardTitle>
                            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                                {isLoading ? (
                                    <Skeleton className="h-4 w-16" />
                                ) : (
                                    `${totalItems} ${totalItems === 1 ? 'Item' : 'Items'}`
                                )}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="space-y-8">
                            {isLoading ? (
                                <>
                                    <CartItemSkeleton />
                                    <CartItemSkeleton />
                                    <CartItemSkeleton />
                                </>
                            ) : (
                                items.map((item) => (
                                    <div
                                        key={item.product._id}
                                        className="flex flex-col md:flex-row gap-6 py-6 border-b border-gray-100 last:border-0"
                                    >
                                        <div className="md:w-1/4">
                                            <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    width={500}
                                                    height={500}
                                                    className="object-cover w-full h-[200px] md:h-[180px] transform hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:w-3/4 space-y-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-1">
                                                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 font-mono">{item.product._id}</p>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <Select
                                                        value={String(item.quantity)}
                                                        onValueChange={(value) => updateQuantity(item.product._id, parseInt(value))}
                                                    >
                                                        <SelectTrigger className="w-24 bg-gray-50 border-gray-200">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {[...Array(10)].map((_, i) => (
                                                                <SelectItem key={i + 1} value={String(i + 1)}>
                                                                    {String(i + 1).padStart(2, "0")}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeItem(item.product._id)}
                                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <p className="text-xl font-semibold text-blue-600">
                                                    ₹{(item.product.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="px-6 py-8 border-t border-gray-100">
                        <Link href="/projects" className="w-full md:w-auto">
                            <Button
                                variant="outline"
                                className="w-full md:w-auto hover:bg-gray-50 transition-colors"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Continue Shopping
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card className="backdrop-blur-sm bg-white/90 shadow-xl rounded-2xl border-0 lg:w-1/3 h-fit sticky top-8">
                    <CardHeader className="px-6 py-8 border-b border-gray-100">
                        <CardTitle className="text-2xl font-bold text-gray-900">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                                {isLoading ? (
                                    <Skeleton className="h-4 w-32" />
                                ) : (
                                    `Subtotal (${totalItems} items)`
                                )}
                            </span>
                            <span className="text-lg font-semibold text-gray-900">
                                {isLoading ? (
                                    <Skeleton className="h-6 w-24" />
                                ) : (
                                    `₹${totalPrice.toLocaleString()}`
                                )}
                            </span>
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Shipping Method</label>
                            <Select defaultValue="standard" disabled={isLoading}>
                                <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="standard">Standard shipping - ₹100.00</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Promo Code</label>
                            <div className="flex gap-3">
                                <Input
                                    placeholder="Enter your code"
                                    className="bg-gray-50 border-gray-200"
                                    disabled={isLoading}
                                />
                                <Button className="px-6 hover:bg-blue-700 transition-colors" disabled={isLoading}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                        <Separator className="my-6" />
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Total Cost</span>
                            <span className="text-2xl font-bold text-blue-600">
                                {isLoading ? (
                                    <Skeleton className="h-8 w-32" />
                                ) : (
                                    `₹${(totalPrice + 100).toLocaleString()}`
                                )}
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter className="p-6">
                        <Button
                            size="lg"
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-lg font-semibold py-6"
                            disabled={isLoading}
                        >
                            Proceed to Checkout
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}