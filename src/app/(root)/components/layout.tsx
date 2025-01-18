import Sidebar from "@/components/Sidebar";
import React from "react";
import MobileSidebar from "@/components/MobileSidebar";

const ComponentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ">
      <Sidebar />
      <MobileSidebar />

      <section className="w-full   ">
        <div className="custom-scrollbar   p-4  text-black">
          {children}
        </div>
      </section>
    </div>
  );
};

export default ComponentLayout;
