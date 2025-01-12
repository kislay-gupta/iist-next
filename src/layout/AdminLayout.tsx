import { AdminNavbar, AdminSidebar } from "@/admin/components/shared";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <main className="bg-[#F3F6FF] custom-scrollbar">
      <div className="flex">
        <AdminSidebar />
        <section className="w-full   ">
          <AdminNavbar />
          <div className="custom-scrollbar   py-24 px-16 text-black">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLayout;
