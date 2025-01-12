import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  category?: string;
  items?: Array<{
    label: string;
    path: string;
  }>;
  currentPage?: string;
}

export const Breadcrumb = ({
  category,
  items,
  currentPage,
}: BreadcrumbProps) => {
  // If using the simple category prop
  if (category) {
    return (
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="transition-colors hover:text-green-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900 uppercase">{category}</span>
      </nav>
    );
  }

  // If using the items array for more complex breadcrumbs
  return (
    <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
      {items?.map((item) => (
        <div key={item.path} className="flex items-center gap-2">
          <Link
            href={item.path}
            className="transition-colors hover:text-green-600"
          >
            {item.label}
          </Link>
          <ChevronRight className="h-4 w-4" />
        </div>
      ))}
      {currentPage && (
        <span className="font-medium text-gray-900 uppercase">
          {currentPage}
        </span>
      )}
    </nav>
  );
};
