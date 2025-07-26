"use client";

import React, { useState, useCallback } from "react";
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

  // Validate slug for security
  const validateSlug = (slug: string): string | null => {
    if (!slug || typeof slug !== 'string') return null;
    const sanitizedSlug = slug.replace(/[^\w\-\/]/g, '');
    if (sanitizedSlug.includes('..')) return null;
    return sanitizedSlug;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else {
      // Validate slug before navigation
      if (!validateSlug(item.slug)) {
        e.preventDefault();
        console.error(`Invalid navigation slug: ${item.slug}`);
        return;
      }
      onClose?.();
    }
  };

  return (
    <>
      {hasChildren ? (
        <div>
          <button
            onClick={handleClick}
            className={`
              w-full flex items-center justify-between px-3 py-3 
              hover:bg-indigo-50 active:bg-indigo-100
              ${depth > 0 ? "pl-6" : ""}
            `}
            aria-expanded={isExpanded}
            aria-controls={`submenu-${item.id}`}
            data-testid={`mobile-menu-item-${item.id}`}
          >
            <span className="text-slate-700 hover:text-indigo-700 text-sm font-bold">
              {item.name}
            </span>
            <ChevronRight
              className={`
                h-4 w-4 text-slate-400 transition-transform duration-200
                ${isExpanded ? "rotate-90" : ""}
              `}
            />
          </button>
          {isExpanded && (
            <div
              className="pl-4"
              id={`submenu-${item.id}`}
              role="group"
              aria-label={`${item.name} submenu`}
            >
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
          href={`/components/${validateSlug(item.slug) || '#'}`}
          className={`
            block px-3 py-3 
            hover:bg-indigo-50 active:bg-indigo-100
            ${depth > 0 ? "pl-6" : ""}
            ${pathname === `/components/${item.slug}` ? "bg-indigo-50 text-indigo-700" : ""}
          `}
          onClick={(e) => {
            if (!validateSlug(item.slug)) {
              e.preventDefault();
              console.error(`Invalid navigation slug: ${item.slug}`);
              return;
            }
            onClose?.();
          }}
          data-testid={`mobile-menu-link-${item.id}`}
        >
          <span className={`
            text-sm font-bold 
            ${pathname === `/components/${item.slug}` ? "text-indigo-700" : "text-slate-700"}
            hover:text-indigo-700
          `}>
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
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds

  const getComponentsData = useCallback(async () => {
    startLoading();
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}componentData?req_data=getCompCat`
      );

      if (response.data && response.data.data) {
        setMenuData(response.data.data);
        // Reset retry count on successful fetch
        if (retryCount > 0) {
          setRetryCount(0);
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: unknown) {
      console.error("Failed to fetch component data:", err);

      // Improved error handling with more specific messages
      const error = err as { response?: { status?: number } };
      const status = error.response?.status;
      const errorMessage = status === 404
        ? "Menu data not found. Please check the API endpoint."
        : status && status >= 500
          ? "Server error. Please try again later."
          : "Failed to load menu data. Please check your connection and try again.";

      setError(errorMessage);

      // Enhanced retry logic with exponential backoff
      if (retryCount < maxRetries) {
        const exponentialDelay = retryDelay * Math.pow(2, retryCount);
        console.log(`Retrying in ${exponentialDelay / 1000} seconds... (Attempt ${retryCount + 1}/${maxRetries})`);

        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, exponentialDelay);
      }
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, retryCount, maxRetries, retryDelay, setMenuData, setError, setRetryCount]);

  // Separate effect for handling retries
  React.useEffect(() => {
    if (retryCount > 0) {
      getComponentsData();
    }
  }, [retryCount, getComponentsData]);

  React.useEffect(() => {
    getComponentsData();
  }, [getComponentsData]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          className="sm:hidden fixed bottom-4 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          aria-label="Open navigation menu"
          data-testid="mobile-menu-button"
        >
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
            <div className="divide-y divide-zinc-100" aria-busy="true" aria-live="polite">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <SkeletonMenuItem key={index} />
                ))}
            </div>
          ) : error ? (
            <div
              className="flex flex-col items-center justify-center p-4 text-center"
              role="alert"
              aria-live="assertive"
            >
              <p className="mb-3 text-sm text-red-600">{error}</p>
              <button
                onClick={() => {
                  setRetryCount(0);
                  getComponentsData();
                }}
                className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700 transition-colors duration-250"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100" role="menu" data-testid="mobile-menu-items">
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
