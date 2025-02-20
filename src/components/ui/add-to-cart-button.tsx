"use client";

import * as React from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types/product";

interface AddToCartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    product: Product;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
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
    const { addItem } = useCart();
    const [isAdding, setIsAdding] = React.useState(false);

    const handleAddToCart = async () => {
        try {
            setIsAdding(true);
            addItem(product);
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