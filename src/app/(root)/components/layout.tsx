import Sidebar from "@/components/Sidebar";
import React from "react";
import MobileSidebar from "@/components/MobileSidebar";

const ComponentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Content */}
      <section className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        <div className="custom-scrollbar p-6 text-black">{children}</div>
      </section>
    </div>
  );
};

export default ComponentLayout;
