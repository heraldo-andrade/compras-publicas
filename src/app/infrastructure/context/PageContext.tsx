'use client';

import { Icon } from '@uigovpe/components';
import Link from 'next/link';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react';

export type BreadcrumbProps = { 
  home?: {
    label?: string;
    url?: string;
    template?: React.ReactNode;
  };
  items: {
    label: string;
    url?: string;
  }[];
};

export type PageContextType = {
  breadcrumb: BreadcrumbProps;
  setBreadcrumb: (items: BreadcrumbProps) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

const defaultHome = {
  template: (
    <Link className="p-menuitem-link" href="/home">
      <Icon icon="home" className="p-menuitem-text" />
    </Link>
  ),
  label: 'Home',
  url: '/home'
};

export function PageProvider({ children }: { children: ReactNode }) {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProps>({
    home: defaultHome,
    items: [] // páginas vão preencher depois
  });

  // garante que sempre tenha um "home" válido
  useEffect(() => {
    const hasHomeContent = breadcrumb.home && (
      breadcrumb.home.label ||
      breadcrumb.home.url ||
      breadcrumb.home.template
    );
    if (!hasHomeContent) {
      setBreadcrumb(prev => ({
        ...prev,
        home: defaultHome
      }));
    }
  }, [breadcrumb.home]);

  return (
    <PageContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const context = useContext(PageContext);
  if (!context) throw new Error('usePage deve ser usado dentro de um PageProvider');
  return context;
}
