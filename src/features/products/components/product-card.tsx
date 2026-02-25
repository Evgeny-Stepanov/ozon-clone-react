import type { Product } from '@/features/products/types';

type ProductCardProps = { product: Product };

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li>
      <img src={product.thumbnail} alt={product.title} />

      <div>
        <span>{product.price}</span>
        <span>{product.discountPercentage}</span>
        <span>{product.discountPercentage}</span>
      </div>

      <span>{product.stock}</span>

      <p>{product.title}</p>

      <div>
        <span>{product.rating}</span>
        <span>{product.reviews.length}</span>
      </div>

      <button type="button">{product.shippingInformation}</button>
    </li>
  );
};
