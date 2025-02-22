import React from "react";
import { Package, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  status: "completed" | "processing" | "cancelled";
  total: number;
  items: number;
}

// Mock data - replace with actual API call
const orders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "completed",
    total: 2999,
    items: 2,
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "processing",
    total: 1499,
    items: 1,
  },
];

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "completed":
      return "text-green-600 bg-green-50";
    case "processing":
      return "text-blue-600 bg-blue-50";
    case "cancelled":
      return "text-red-600 bg-red-50";
  }
};

export default function OrdersPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="font-medium">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}