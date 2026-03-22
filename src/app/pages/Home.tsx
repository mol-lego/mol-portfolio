import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedWorks } from '../components/FeaturedWorks';
import { LargeWorks } from '../components/LargeWorks';
import { SmallWorks } from '../components/SmallWorks';
import { MakingNotes } from '../components/MakingNotes';
import { ARSection } from '../components/ARSection';
import { AboutSection } from '../components/AboutSection';
import { useDocumentTitle } from '../useDocumentTitle';
import { useImagePreload } from '../useImagePreload';
import imgHero from '../../assets/optimized/msqe1-hero.jpg';
import imgHero2x from '../../assets/optimized/msqe1-hero@2x.jpg';

export const Home = () => {
  useDocumentTitle("mol - ポートフォリオ");
  const isHeroReady = useImagePreload(imgHero, {
    srcSet: `${imgHero} 1x, ${imgHero2x} 2x`,
    sizes: "(min-width: 768px) 1400px, 100vw",
  });
  const [isContentReady, setIsContentReady] = React.useState(false);

  React.useEffect(() => {
    if (!isHeroReady) {
      setIsContentReady(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsContentReady(true);
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isHeroReady]);

  if (!isHeroReady) {
    return <div className="min-h-screen w-full bg-transparent" />;
  }

  return (
    <div className="flex flex-col w-full bg-transparent overflow-hidden">
      <Hero />
      {isContentReady && (
        <>
          <FeaturedWorks />
          <LargeWorks />
          <SmallWorks />
          <MakingNotes />
          <ARSection />
          <AboutSection />
        </>
      )}
    </div>
  );
};
