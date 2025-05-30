"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRemoveFromCart, useRemoveItemFromCart } from "@/hooks/use-cart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmModal } from "@/components/modal";
import { useRouter } from "nextjs-toploader/app";
import Cookies from "universal-cookie";
import { CartItem } from "@/types/product";
import axios from "axios";
import { useRefreshCart } from "@/store/use-refresh-cart";
import { AddToCartButton } from "@/components/ui/add-to-cart-button";

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

const EmptyCartState = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="bg-gray-100 rounded-full p-6 mb-6">
      <ShoppingCart className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
      Your cart is empty
    </h3>
    <p className="text-gray-500 text-center mb-8">
      Looks like you haven&apos;t added any items to your cart yet.
    </p>
    <Link href="/projects">
      <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Start Shopping
      </Button>
    </Link>
  </div>
);

export default function CartPage() {
  const { removeFromCart } = useRemoveFromCart();
  const { removeItemFromCart } = useRemoveItemFromCart();
  const { state } = useRefreshCart();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartItem] = useState<CartItem[] | null>([]);
  const cookie = new Cookies();
  const router = useRouter();
  const handleGetCartItems = async () => {
    const user_id = cookie.get("user_id");
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}order_cart?req_data=getCartbyUser&userID=${user_id}`
      );
      setCartItem(res.data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItem([]);
    }
  };
  console.log(cartItem, "cartItem");
  const handleCheckout = async () => {
    try {
      const priceArr: number[] = [];
      const itemIDs: number[] = [];
      cartItem?.forEach((item) => {
        priceArr.push(item.totalPrice);
        itemIDs.push(item.sno);
      });
      const payload = {
        req_data: "checkoutCart",
        itemIDs,
        prices: priceArr,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}order_cart`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data, "checkout response");
      console.log(payload, "payload");
      router.replace("/thank-you");
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      await handleGetCartItems();
      setIsLoading(false);
    };
    loadCart();
  }, [state]);
  if (!isLoading && (!cartItem || cartItem.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Card className="backdrop-blur-sm bg-white/90 shadow-xl rounded-2xl border-0">
            <CardHeader className="px-6 py-8">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <ShoppingCart className="h-7 w-7 text-blue-600" />
                Shopping Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyCartState />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                  `${cartItem?.length} ${
                    cartItem?.length === 1 ? "Item" : "Items"
                  }`
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
                cartItem &&
                cartItem.map((item) => (
                  <div
                    key={item.sno}
                    className="flex flex-col md:flex-row gap-6 py-6 border-b border-gray-100 last:border-0"
                  >
                    <div className="md:w-1/4">
                      <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <Image
                          src={item.productDetails.imageLink}
                          alt={item.productDetails.name}
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
                            {item.productDetails.name}
                          </h3>
                          <p className="text-sm text-gray-500 font-mono">
                            {item.product_id}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={() => {
                                removeItemFromCart(item.sno);
                              }}
                            >
                              -
                            </Button>
                            <span className="text-center w-8">
                              {item.quantity}
                            </span>
                            <AddToCartButton
                              product={{
                                sno: item.product_id,
                                name: item.productDetails.name,
                              }}
                              className="border rounded-md py-2 px-4 ml-2"
                              showIcon={false}
                              variant="ghost"
                              size="icon"
                            >
                              +
                            </AddToCartButton>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeFromCart(item.sno);
                            }}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <p className="text-xl font-semibold text-blue-600">
                          ₹{Number(item.totalPrice).toLocaleString()}
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
            <CardTitle className="text-2xl font-bold text-gray-900">
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {isLoading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  `Subtotal (${cartItem?.length} items)`
                )}
              </span>
              <span className="text-lg font-semibold text-gray-900">
                {isLoading ? (
                  <Skeleton className="h-6 w-24" />
                ) : (
                  `₹${
                    cartItem &&
                    cartItem
                      .map((items) => items.totalPrice + 0)
                      .reduce((a, b) => a + b, 0)
                  }`
                )}
              </span>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Shipping Method
              </label>
              <Select defaultValue="standard" disabled={isLoading}>
                <SelectTrigger className="w-full bg-gray-50 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    Standard shipping - ₹100.00
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Promo Code
              </label>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter your code"
                  className="bg-gray-50 border-gray-200"
                  disabled={isLoading}
                />
                <Button
                  className="px-6 hover:bg-blue-700 transition-colors"
                  disabled={isLoading}
                >
                  Apply
                </Button>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Total Cost
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {isLoading ? (
                  <Skeleton className="h-8 w-32" />
                ) : (
                  `₹${
                    cartItem &&
                    cartItem
                      .map((items) => items.totalPrice + 0)
                      .reduce((a, b) => a + b, 0)
                  }`
                )}
              </span>
            </div>
          </CardContent>
          <CardFooter className="p-6">
            <ConfirmModal
              header="Are you sure you want to proceed with the checkout?"
              onConfirm={() => handleCheckout()}
            >
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-lg font-semibold py-6"
                disabled={isLoading}
              >
                Proceed to Checkout
              </Button>
            </ConfirmModal>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
