import type { Product } from '@/features/products/types';

import db from './products-mock.json';

export const getProducts = async (category?: string): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const allProducts = db.products as Product[];

  if (category) {
    return allProducts.filter((product) => product.category === category);
  }

  return allProducts;
};
