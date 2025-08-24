const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
console.log(BASE_URL);

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  // Add other cart item properties as needed
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    items: CartItem[];
    total: number;
    user_id: number;
    // Add other response properties as needed
  };
}

export const getCartByUser = async (userId: number): Promise<CartResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/order_cart.php?req_data=getCartbyUser&userID=${userId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }

    const data = await response.json();
    return data as CartResponse;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
