"use client";

import * as React from "react";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "./button";
import axios from "axios";
import Cookie from "universal-cookie";
import { useRefreshCart } from "@/store/use-refresh-cart";
import { useLoginModal } from "@/store/use-login-popup-store";

interface AddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: {
    sno: number;
    name: string;
  };
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
  const { state, toggleState } = useRefreshCart();
  const { onOpen } = useLoginModal();
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
      toggleState(state);
      onAddToCart?.();
    } catch (error) {
      toast.error("Please login to add items to cart");
      onOpen();
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
