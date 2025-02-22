"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const [imageUrl, setImageUrl] = useState("/placeholder.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      // Here you would typically upload the image to your server
      // For example:
      // uploadImageToServer(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={handleImageClick}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
              <p className="text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue="+91 1234567890"
                  />
                </div>
              </div>
              <div>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
