import  Footer  from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Topbar } from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div>
      <>
        <Topbar />
        <Navbar />
        <Outlet />
        <Footer />
      </>
    </div>
  );
};
