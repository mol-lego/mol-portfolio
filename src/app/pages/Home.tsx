import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedWorks } from '../components/FeaturedWorks';
import { LargeWorks } from '../components/LargeWorks';
import { SmallWorks } from '../components/SmallWorks';
import { MakingNotes } from '../components/MakingNotes';
import { ARSection } from '../components/ARSection';
import { AboutSection } from '../components/AboutSection';
import { useDocumentTitle } from '../useDocumentTitle';

// 画像の読み込みを待たずに、最初から全セクションを描く（画像は各所で遅延読み込み）
export const Home = () => {
  useDocumentTitle("mol - 作品集");

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeaturedWorks />
      <LargeWorks />
      <SmallWorks />
      <MakingNotes />
      <ARSection />
      <AboutSection />
    </div>
  );
};
