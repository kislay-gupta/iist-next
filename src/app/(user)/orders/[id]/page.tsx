import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  id: string;
  date: string;
  status: "completed" | "processing" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}
type PageParams = {
  params: Promise<{
    id: string;
  }>;
};
async function getOrderDetails(orderId: string): Promise<OrderDetails | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}orders?req_data=getOrderById&OrderId=${orderId}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch order: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

export default async function OrderDetailsPage({ params }: PageParams) {
  const { id } = await params;
  const orderDetails = await getOrderDetails(id);

  if (!orderDetails) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/orders" className="flex items-center text-gray-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">{orderDetails.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">
                  {new Date(orderDetails.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium capitalize">{orderDetails.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">
                  ₹{orderDetails.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <div className="relative h-20 w-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{orderDetails.shippingAddress.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">
                {orderDetails.shippingAddress.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">
                {orderDetails.shippingAddress.address}
                <br />
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.state}
                <br />
                {orderDetails.shippingAddress.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
