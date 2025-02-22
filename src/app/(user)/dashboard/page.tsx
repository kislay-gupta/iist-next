import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Package, ShoppingBag, User, FileText } from "lucide-react";

const DashboardCard = ({ title, icon, value, href }: { 
  title: string;
  icon: React.ReactNode;
  value: string | number;
  href: string;
}) => (
  <Link href={href}>
    <div className="rounded-lg border bg-card p-6 hover:border-primary transition-colors">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </Link>
);

const Page = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Link href="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Projects"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          value="12"
          href="/projects"
        />
        <DashboardCard
          title="Active Orders"
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
          value="3"
          href="/orders"
        />
        <DashboardCard
          title="Tutorials Progress"
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          value="67%"
          href="/tutorials"
        />
        <DashboardCard
          title="Downloads"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          value="24"
          href="/downloads"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <div className="rounded-xl border bg-card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Recent Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                Your recently viewed projects
              </p>
            </div>
            <div className="p-6 pt-0">
              {/* Add recent projects list here */}
              <div className="text-sm text-muted-foreground">
                No recent projects to display
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="rounded-xl border bg-card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Order History
              </h3>
              <p className="text-sm text-muted-foreground">
                Your recent orders
              </p>
            </div>
            <div className="p-6 pt-0">
              {/* Add order history here */}
              <div className="text-sm text-muted-foreground">
                No orders to display
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
