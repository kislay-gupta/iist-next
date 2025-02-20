import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
          Coming Soon
        </h1>
        <p className="text-white text-center text-lg mb-8">
          We&apos;re working hard to bring you something amazing. Stay tuned!
        </p>
        <Button variant="secondary" asChild>

          <Link href="/" className="text-white text-center text-lg mb-8"> Back to Home </Link>
        </Button>
      </div>
    </>
  );
};

export default Page;
