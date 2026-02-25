import db from '@/features/products/api/products-mock.json';

import { ProductCard } from './product-card';

export const ProductList = () => {
  return (
    <ul>
      {db.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};
