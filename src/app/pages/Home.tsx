import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedWorks } from '../components/FeaturedWorks';
import { LargeWorks } from '../components/LargeWorks';
import { SmallWorks } from '../components/SmallWorks';
import { SameScale } from '../components/SameScale';
import { ARSection } from '../components/ARSection';
import { MakingNotes } from '../components/MakingNotes';
import { AboutSection } from '../components/AboutSection';
import { useDocumentTitle } from '../useDocumentTitle';

// 画像の読み込みを待たずに、最初から全セクションを描く（画像は各所で遅延読み込み）。
// 冒頭の演出のあいだだけ、冒頭より後ろは data-intro-part="text" で透明にしておく（theme.css）
export const Home = () => {
  useDocumentTitle("mol - 作品集");

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <div data-intro-part="text" className="flex flex-col w-full">
        <FeaturedWorks />
        <LargeWorks />
        <SmallWorks />
        <SameScale />
        <ARSection />
        <MakingNotes />
        <AboutSection />
      </div>
    </div>
  );
};
