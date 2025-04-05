"use client";

import * as React from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";
import { Product } from "@/types/product";
import axios from "axios";
import Cookie from "universal-cookie";

interface AddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  onAddToCart?: () => void;
}

export function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  showIcon = true,
  onAddToCart,
  className,
  children,
  ...props
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = React.useState(false);
  const cookie = new Cookie();
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const user_id = cookie.get("user_id");
      const formdata = new FormData();
      formdata.append("product_id", product.sno.toString());
      formdata.append("req_data", "addCartitem");
      formdata.append("product_type", "project");

      formdata.append("userID", user_id);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}order_cart`,
        formdata,
      );
      console.log(res.data);
      //   addItem(product);
      toast.success(`${product.name} added to cart`);
      onAddToCart?.();
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      disabled={isAdding}
      className={className}
      {...props}
    >
      {showIcon && <ShoppingCart className="h-4 w-4" />}
      {children || "Add to Cart"}
    </Button>
  );
}
