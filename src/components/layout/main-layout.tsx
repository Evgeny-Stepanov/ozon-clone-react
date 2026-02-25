import type { ReactNode } from 'react';

import { Header } from '@/components/header';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      <div>
        <aside>Фильтры</aside>
        <main>{children}</main>
      </div>
    </div>
  );
};
