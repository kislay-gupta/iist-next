"use client";
import axios from "axios";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import useLoader from "@/hooks/use-loader";
// Define types for the menu data
type MenuItem = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  children?: MenuItem[];
};

type MenuItemProps = {
  item: MenuItem;
  depth?: number;
};

const SkeletonMenuItem = () => {
  return (
    <div className="animate-pulse px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="h-4 w-3/4 rounded bg-slate-200"></div>
        <div className="h-4 w-4 rounded bg-slate-200"></div>
      </div>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ item, depth = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group/item relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasChildren ? (
        <div
          className={`flex items-center justify-between px-3 py-2 hover:bg-indigo-50 ${depth > 0 ? "pl-6" : ""
            }`}
        >
          <span className="text-sm font-bold text-slate-700 group-hover/item:text-indigo-700">
            {item.name}
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover/item:text-indigo-600" />
        </div>
      ) : (
        <Link
          href={`/components/${item.slug}`}
          className={`flex items-center justify-between px-3 py-2 hover:bg-indigo-50 ${depth > 0 ? "pl-6" : ""
            }`}
        >
          <span className="text-sm font-bold text-slate-700 group-hover/item:text-indigo-700">
            {item.name}
          </span>
        </Link>
      )}
      {hasChildren && (
        <div
          className={`
            absolute left-full top-0
            w-64 bg-white shadow-xl 
            ${isHovered ? "visible opacity-100" : "invisible opacity-0"}
            z-50 border border-slate-200
            transition-all duration-200
            ${depth === 0 ? "max-h-[calc(100vh-4rem)]" : "max-h-[90vh]"}
            ${depth > 0 ? "overflow-y-auto" : ""}
          `}
          style={{
            top: depth > 0 ? "0" : "auto",
            maxHeight:
              depth > 0 ? "calc(100vh - var(--offset-top, 0px))" : undefined,
          }}
        >
          {item.children?.map((child) => (
            <MenuItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoader();
  const getComponentsData = async () => {
    startLoading();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}componentData?req_data=getCompCat`,
      );
      setMenuData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  React.useEffect(() => {
    getComponentsData();
  }, []);

  return (
    <aside className="w-64 border-r border-gray-200  bg-white max-sm:hidden">
      <div className="sticky top-0 z-10 bg-white">
        <div className="border-b border-gray-200 bg-[#1e2756] px-3 py-2">
          <Link
            href="/components"
            className="text-base font-bold text-gray-100"
          >
            Categories
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <>
            <SkeletonMenuItem />
            <SkeletonMenuItem />
            <SkeletonMenuItem />
            <SkeletonMenuItem />
            <SkeletonMenuItem />
          </>
        ) : (
          menuData.map((item) => <MenuItem key={item.id} item={item} />)
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
