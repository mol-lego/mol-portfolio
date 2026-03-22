import React, { ReactNode, useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const Layout = ({ children }: { children?: ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.key]);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#222222] selection:bg-stone-300 selection:text-stone-900 flex flex-col font-['Inter',_sans-serif] relative overflow-x-hidden">
      {/* Paper noise texture overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-multiply" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      <Header />
      <main className="flex-1 w-full relative z-10">
        {children ?? <Outlet key={location.key} />}
      </main>
      <Footer />
    </div>
  );
};
