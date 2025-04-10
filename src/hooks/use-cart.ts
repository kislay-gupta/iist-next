import { useRefreshCart } from "@/store/use-refresh-cart";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import Cookies from "universal-cookie";

export const useRemoveFromCart = () => {
  const { state, toggleState } = useRefreshCart();

  const [loading, setLoading] = useState(false);
  const removeFromCart = async (productId: number) => {
    const formData = new FormData();
    formData.append("req_data", "RemCartitem");
    formData.append("itemID", productId.toLocaleString());
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}order_cart`,
        formData
      );
      if (response.data.status) {
        toggleState(state);
        toast.success(response.data.text);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { removeFromCart, loading };
};

export const useClearCart = () => {
  const { state, toggleState } = useRefreshCart();

  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const user_id = cookie.get("user_id");
  const clearCart = async () => {
    const formData = new FormData();
    formData.append("req_data", "clearCart");
    formData.append("userID", user_id);
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}order_cart`,
        formData
      );
      if (response.data.status) {
        toggleState(state);
        toast.success(response.data.text);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { clearCart, loading };
};

export const useRemoveItemFromCart = () => {
  const { state, toggleState } = useRefreshCart();
  const [loading, setLoading] = useState(false);

  const removeItemFromCart = async (productId: number) => {
    const formData = new FormData();
    formData.append("req_data", "decCartitem");
    formData.append("itemID", productId.toString());
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}order_cart`,
        formData
      );
      if (response.data.status) {
        toggleState(state);
        toast.success(response.data.text);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { removeItemFromCart, loading };
};
