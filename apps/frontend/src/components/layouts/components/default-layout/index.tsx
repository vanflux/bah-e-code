import { ReactNode } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer } from '../footer';
import { Header } from '../header';

interface Props {
  children?: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="flex w-full max-h-[100svh] flex-1 flex-col items-center">
      <ScrollRestoration />
      <Header />
      <div className="flex w-full flex-1 flex-col items-center overflow-auto">
        <div className="flex w-full flex-1 flex-col">{children ?? <Outlet />}</div>
        <Footer />
      </div>
    </div>
  );
}
