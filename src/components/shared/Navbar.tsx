"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { menuLink } from "@/constant";
import {
  Package,
  Home,
  ShoppingBag,
  User,
  ShoppingCartIcon,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import useAuth from "@/hooks/use-auth"; // Adjust path accordingly
import { useCart } from "@/hooks/use-cart";

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthorized } = useAuth();
  const { hydrateCart } = useCart();
  const { items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart, } = useCart((state) => state);

  const handleNavigate = (to: string) => {
    setIsSheetOpen(false);
    router.push(to);
  };
  useEffect(() => {
    hydrateCart();
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 block border-b  bg-white shadow-sm">
        <div className="mx-4 my-auto flex px-4">
          <div className="grid h-16 w-full grid-cols-12 items-center">
            <div className="col-span-4 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  alt="logo"
                  className="h-14 w-auto object-contain"
                  src="/logo.png"
                  width={56}
                  height={56}
                />
                <span className="text-2xl font-bold">IIST,Bihar</span>
              </Link>
            </div>

            <div className="col-span-2 col-start-11 flex justify-end md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-4">
                    {menuLink.map((data, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigate(data.route)}
                        className={
                          pathname === data.route
                            ? "text-left text-lg font-semibold text-primary"
                            : "text-left text-lg text-gray-700 transition-colors hover:text-primary dark:text-gray-200"
                        }
                      >
                        {data.label}
                      </button>
                    ))}
                    <Separator className="my-2" />

                    <Button
                      variant="secondary"
                      onClick={() => handleNavigate("/login")}
                    >
                      Log In
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="relative col-span-6 col-start-7 hidden md:block">
              <div className="flex items-center justify-end gap-4">
                {menuLink.map((data, index) => (
                  <Link
                    key={index}
                    href={data.route}
                    className={
                      pathname === data.route
                        ? "font-semibold text-primary transition-colors hover:text-primary"
                        : "text-gray-700  transition-colors hover:text-primary"
                    }
                  >
                    {data.label}
                  </Link>
                ))}
                <Separator className="h-8 bg-black/50" orientation="vertical" />

                <Button variant="secondary" asChild>
                  <Link href={isAuthorized ? "/dashboard" : "/login"}>
                    {isAuthorized ? "Dashboard" : "Log In"}
                  </Link>
                </Button>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      <ShoppingCartIcon className="h-5 w-5" />
                      {totalItems > 0 && (
                        <span className="ml-2"> {items.length}</span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto custom-scrollbar">
                    <SheetHeader>
                      <SheetTitle>Shopping Cart</SheetTitle>
                      {totalItems > 0 ? (
                        <SheetDescription>
                          {items.map((item) => (
                            <div key={item.product._id} className="flex items-center justify-between p-2 border-b">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={50}
                                height={50}
                                className="object-cover"
                              />
                              <div className="flex-1 ml-4">
                                <p className="font-semibold">{item.product.name}</p>
                                <p className="text-gray-500">${item.product.price}</p>
                                <div className="flex items-center mt-2">
                                  <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                </div>
                              </div>
                              <button onClick={() => removeItem(item.product._id)} className="text-red-500">Remove</button>
                            </div>
                          ))}
                          <div className="flex justify-between p-4">
                            <span className="font-bold">Total:</span>
                            <span className="font-bold">₹{totalPrice}</span>
                          </div>
                          <Button onClick={clearCart} className="w-full mt-4">Clear Cart</Button>
                        </SheetDescription>
                      ) : (
                        <p>Your cart is empty</p>
                      )}
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="border-border fixed bottom-0 left-0 right-0 z-50 border-t bg-white backdrop-blur-lg dark:bg-black lg:hidden">
        <div className="flex h-16 items-center justify-around">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "flex flex-col items-center p-2 text-primary"
                : "flex flex-col items-center p-2"
            }
          >
            <Home className="h-6 w-6" />
            <span className="mt-1 text-xs">Home</span>
          </Link>
          <Link
            href="/projects"
            className={
              pathname === "/projects"
                ? "flex flex-col items-center p-2 text-primary"
                : "flex flex-col items-center p-2"
            }
          >
            <Package className="h-6 w-6" />
            <span className="mt-1 text-xs">Projects</span>
          </Link>
          <Link
            href="/cart"
            className={
              pathname === "/cart"
                ? "flex flex-col items-center p-2 text-primary"
                : "flex flex-col items-center p-2"
            }
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="mt-1 text-xs">Cart</span>
          </Link>
          <Link
            href="/account"
            className={
              pathname === "/account"
                ? "flex flex-col items-center p-2 text-primary"
                : "flex flex-col items-center p-2"
            }
          >
            <User className="h-6 w-6" />
            <span className="mt-1 text-xs">Account</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
