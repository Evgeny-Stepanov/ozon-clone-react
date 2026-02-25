import { MainLayout } from '@/components/layout';
import { ProductList } from '@/features/products/components/product-list';

export const App = () => {
  return (
    <>
      <MainLayout>
        <ProductList></ProductList>
      </MainLayout>
    </>
  );
};
