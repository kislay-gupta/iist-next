export interface Product {
  sno: number;
  _id: string;
  name: string;
  image: string;
  price: number;
  min_qty?: number;
  description?: string | null;

  DiscPrice?: number;
  total_sell?: number;
  product_category?: {
    _id: string;
    title: string;
  };
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationInfo {
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface ProductsResponse {
  status: number;
  message: string;
  data: {
    products: Product[];
    pagination: PaginationInfo;
  };
}
export interface ProductsData {
  products: Product[];
  pagination: PaginationInfo;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ProductDetails {
  name: string;
  slug: string;
  image: string;
  imageLink: string;
  pdf: string;
  pdfLink: string;
  videoLink: string;
  CatID: number;
  price: string;
  DiscPrice: string;
  Description: string;
  created: string;
}

interface CartItem {
  sno: number;
  userID: number;
  product_type: string;
  product_id: number;
  quantity: number;
  checkout: number;
  checkout_price: number | null;
  created_at: string;
  totalPrice: number;
  productDetails: ProductDetails;
}

export type { CartItem };
