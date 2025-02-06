"use client";

import React, { useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import useLoader from "@/hooks/use-loader";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Define types for the menu data
type MenuItem = {
  id: string;
  name: string;
  parent_id: string | null;
  children?: MenuItem[];
  slug: string
};

type MenuItemProps = {
  item: MenuItem;
  depth?: number;
  onClose?: () => void;
};

const SkeletonMenuItem = () => {
  return (
    <div className="px-3 py-2 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-4"></div>
      </div>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ item, depth = 0, onClose }) => {
  const hasChildren = item.children && item.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else {
      onClose?.();
    }
  };

  return (
    <>
      {hasChildren ? (
        <div>
          <button
            onClick={handleClick}
            className={`w-full flex items-center justify-between px-3 py-2 hover:bg-indigo-50 ${depth > 0 ? "pl-6" : ""
              }`}
          >
            <span className="text-slate-700 hover:text-indigo-700 text-sm font-bold">
              {item.name}
            </span>
            <ChevronRight
              className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isExpanded ? "rotate-90" : ""
                }`}
            />
          </button>
          {isExpanded && (
            <div className="pl-4">
              {item.children?.map((child) => (
                <MenuItem
                  key={child.id}
                  item={child}
                  depth={depth + 1}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href={`/components/${item.slug}`}
          className={`block px-3 py-2 hover:bg-indigo-50 ${depth > 0 ? "pl-6" : ""
            } ${pathname === `/components/${item.slug}` ? "bg-indigo-50 text-indigo-700" : ""}`}
          onClick={() => onClose?.()}
        >
          <span className={`text-sm font-bold ${pathname === `/components/${item.slug}` ? "text-indigo-700" : "text-slate-700"
            } hover:text-indigo-700`}>
            {item.name}
          </span>
        </Link>
      )}
    </>
  );
};

const MobileSidebar = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoader();
  const [isOpen, setIsOpen] = useState(false);

  const getComponentsData = async () => {
    startLoading();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}componentData?req_data=getCompCat`
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
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className="md:hidden fixed bottom-4 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b border-zinc-200">
          <DrawerTitle>
            <Link
              href="/components"
              className="text-base font-bold text-zinc-900"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
          </DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto">
          {isLoading ? (
            <div className="divide-y divide-zinc-100">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <SkeletonMenuItem key={index} />
                ))}
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {menuData.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onClose={() => setIsOpen(false)}
                />
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;
