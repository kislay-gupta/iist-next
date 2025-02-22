import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
      <p className="text-gray-600 mb-8">
        The order you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Button asChild>
        <Link href="/orders">Return to Orders</Link>
      </Button>
    </div>
  );
}
