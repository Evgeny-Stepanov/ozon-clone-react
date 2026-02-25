interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  shippingInformation: string;
  availabilityStatus: 'In Stock' | 'Out of Stock';
  reviews: ProductReview[];
  images: string[];
  thumbnail: string;
}

export interface ProductResponse {
  products: Product[];
  categories: string[];
  updatedAt: string;
}
