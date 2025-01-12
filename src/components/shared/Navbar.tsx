"use client";

import { useState } from "react";
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

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (to: string) => {
    setIsSheetOpen(false);
    router.push(to);
  };

  return (
    <>
      <nav className="block sticky top-0 z-50 bg-white  border-b shadow-sm">
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

            <div className="col-span-2 col-start-11 md:hidden flex justify-end">
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
                  <div className="flex flex-col gap-4 mt-6">
                    {menuLink.map((data, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigate(data.route)}
                        className={
                          pathname === data.route
                            ? "text-primary font-semibold text-lg text-left"
                            : "text-gray-700 dark:text-gray-200 text-lg hover:text-primary transition-colors text-left"
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

            <div className="col-span-6 col-start-7 relative hidden md:block">
              <div className="flex justify-end items-center gap-4">
                {menuLink.map((data, index) => (
                  <Link
                    key={index}
                    href={data.route}
                    className={
                      pathname === data.route
                        ? "text-primary font-semibold hover:text-primary transition-colors"
                        : "text-gray-700  hover:text-primary transition-colors"
                    }
                  >
                    {data.label}
                  </Link>
                ))}
                <Separator className="bg-black/50 h-8" orientation="vertical" />
                <Button variant="secondary" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span className="ml-2">0</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Shopping Cart</SheetTitle>
                      <SheetDescription>
                        Here are the items in your cart.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <p>Your cart is empty</p>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-border backdrop-blur-lg">
        <div className="flex justify-around items-center h-16">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "flex flex-col items-center p-2 text-primary"
                : "flex flex-col items-center p-2"
            }
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
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
            <span className="text-xs mt-1">Projects</span>
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
            <span className="text-xs mt-1">Cart</span>
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
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
