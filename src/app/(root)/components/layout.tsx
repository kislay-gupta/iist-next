import Sidebar from "@/components/Sidebar";
import React from "react";
import MobileSidebar from "@/components/MobileSidebar";

const ComponentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="flex-1">
        <Sidebar />
        <MobileSidebar />
      </div>

      <section className="   overflow-y-hidden overflow-x-hidden bg-gray-100">
        <div className="custom-scrollbar   w-screen  text-black">{children}</div>
      </section>
    </div>
  );
};

export default ComponentLayout;
