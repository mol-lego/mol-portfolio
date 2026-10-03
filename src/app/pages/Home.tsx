import React from 'react';
import { Hero } from '../components/Hero';
import { LargeWorks } from '../components/LargeWorks';
import { SmallWorks } from '../components/SmallWorks';
import { SameScale } from '../components/SameScale';
import { MakingNotes } from '../components/MakingNotes';
import { ARSection } from '../components/ARSection';
import { AboutSection } from '../components/AboutSection';
import { useDocumentTitle } from '../useDocumentTitle';

// 全節を最初から描く（画像の読み込みやタイマーを待たない）
export const Home = () => {
  useDocumentTitle("mol - 作品集");

  return (
    <div className="flex flex-col w-full bg-transparent overflow-hidden">
      <Hero />
      <LargeWorks />
      <SmallWorks />
      <SameScale />
      <MakingNotes />
      <ARSection />
      <AboutSection />
    </div>
  );
};
