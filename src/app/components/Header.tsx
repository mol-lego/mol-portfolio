import React, { useState, useEffect, useId, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

import { Link, useLocation } from 'react-router';
import { detailWorks } from '../works.js';

export const Header = () => {
  const { scrollY } = useScroll();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringWorks, setIsHoveringWorks] = useState(false);
  // クリック・タップ・キーボード（Enter・Space）で開いた状態。マウスを載せたときは isHoveringWorks で開く
  const [isWorksOpen, setIsWorksOpen] = useState(false);
  const isWorksShown = isHoveringWorks || isWorksOpen;
  const worksRef = useRef<HTMLDivElement>(null);
  const worksButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const location = useLocation();

  const closeWorks = () => {
    setIsWorksOpen(false);
    setIsHoveringWorks(false);
  };

  // ページを移ったら閉じる
  useEffect(() => {
    closeWorks();
  }, [location.key]);

  // Esc で閉じてボタンへフォーカスを戻す。メニューの外を押したら閉じる
  useEffect(() => {
    if (!isWorksShown) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeWorks();
        worksButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!worksRef.current?.contains(event.target as Node)) {
        closeWorks();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isWorksShown]);

  // キーボードでメニューの外へフォーカスが移ったら閉じる
  const handleWorksBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) {
      closeWorks();
    }
  };

  useEffect(() => {
    setIsVisible(window.scrollY > (typeof window !== "undefined" ? window.innerHeight * 0.8 : 500));
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide header until scrolled past the hero section
    const threshold = typeof window !== "undefined" ? window.innerHeight * 0.8 : 500;
    if (latest > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] text-gray-900 pointer-events-none flex justify-center"
    >
      {/* Background layer: separated to prevent CSS backdrop-filter nesting issues */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-b border-gray-100" />

      <div className="relative w-full max-w-[1400px] px-6 py-4 md:px-12 md:py-6 flex justify-between items-center mx-auto">
        {/* Left side: mol log and periphery is clickable */}
        <Link to="/" className="relative flex flex-col gap-1 pointer-events-auto transition-opacity duration-300 hover:opacity-100 opacity-80 before:absolute before:-inset-4 before:content-['']">
          <h2 className="font-['Inter',_sans-serif] text-sm md:text-base font-medium tracking-widest">
            mol
          </h2>
          <p className="font-['Inter',_sans-serif] text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-1 opacity-75">
            作品集
          </p>
        </Link>
        
        {/* Navigation */}
        <nav className="pointer-events-auto flex items-center gap-6">
          <div 
            ref={worksRef}
            className="relative flex items-center"
            // タッチの擬似的な mouseenter で開いたままにならないよう、マウスのときだけ
            onPointerEnter={(event) => event.pointerType === 'mouse' && setIsHoveringWorks(true)}
            onPointerLeave={(event) => event.pointerType === 'mouse' && setIsHoveringWorks(false)}
            onBlur={handleWorksBlur}
          >
            <button
              ref={worksButtonRef}
              type="button"
              aria-expanded={isWorksShown}
              aria-controls={menuId}
              // マウスを載せて開いているときの1回目のクリックは、閉じずに開いたままにする
              onClick={() => (isWorksOpen ? closeWorks() : setIsWorksOpen(true))}
              className="font-['Inter',_sans-serif] text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity py-4 block cursor-pointer"
            >
              Works
            </button>
            
            {/* Works Dropdown */}
            <motion.div
              id={menuId}
              initial={false}
              animate={
                isWorksShown
                  ? { opacity: 1, y: 0, pointerEvents: "auto", visibility: "visible" }
                  // 閉じたあとは visibility も外し、見えないリンクに Tab で入らないようにする
                  : { opacity: 0, y: 5, pointerEvents: "none", transitionEnd: { visibility: "hidden" } }
              }
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 w-[200px] md:w-[240px] shadow-sm border border-gray-100 rounded-sm overflow-hidden z-50 -mt-2"
            >
              <div className="absolute inset-0 bg-white/80 backdrop-blur-lg" />
              <ul className="relative flex flex-col py-2">
                {detailWorks.map(work => (
                  <li key={work.id}>
                    <Link 
                      to={`/work/${work.id}`} 
                      onClick={closeWorks}
                      className="block px-4 py-2.5 text-[10px] md:text-xs font-['Noto_Serif_JP',_serif] text-gray-900 opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                      <span className="font-['Inter',_sans-serif] text-[9px] md:text-[10px] text-gray-800 mr-2 tracking-widest">{work.id}</span>
                      {work.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <Link to="/process" className="font-['Inter',_sans-serif] text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity py-4 block">
            Process
          </Link>

          <Link to="/about" className="font-['Inter',_sans-serif] text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity py-4 block">
            About
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};