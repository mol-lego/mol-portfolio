import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { detailWorks } from '../works.js';

const navLinkClass =
  'text-sm text-ink underline-offset-[0.3em] decoration-1 hover:underline';

export const Header = () => {
  const [isWorksOpen, setIsWorksOpen] = useState(false);
  const worksRef = useRef<HTMLDivElement>(null);
  const worksButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const location = useLocation();

  // ページを移ったら閉じる
  useEffect(() => {
    setIsWorksOpen(false);
  }, [location.key]);

  // トップでは、冒頭の大きな mol（#hero-wordmark）が見えているあいだ、ヘッダーを地に溶かし
  // （背景と下線なし）、ロゴの mol を出さない（mol が2つ並ばないように）
  const isHome = location.pathname === '/';
  const [overHero, setOverHero] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }
    const update = () => {
      const wordmark = document.getElementById('hero-wordmark');
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      setOverHero(Boolean(wordmark) && wordmark!.getBoundingClientRect().bottom > headerHeight);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isHome, location.key]);

  useEffect(() => {
    if (!isWorksOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsWorksOpen(false);
        worksButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!worksRef.current?.contains(event.target as Node)) {
        setIsWorksOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isWorksOpen]);

  // キーボードでメニューの外へフォーカスが移ったら閉じる
  const handleWorksBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next)) {
      setIsWorksOpen(false);
    }
  };

  return (
    <header
      ref={headerRef}
      data-intro-part="text"
      className={`sticky top-0 z-40 w-full border-b ${overHero ? 'bg-transparent border-transparent' : 'bg-paper border-rule'}`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-14 md:h-16 flex justify-between items-center">
        {/* ロゴ。改修前の指定（Inter 500、字間 0.1em） */}
        <Link
          to="/"
          className={`font-wordmark text-sm md:text-base font-medium tracking-widest text-ink py-2 ${overHero ? 'invisible' : ''}`}
        >
          mol
        </Link>

        <nav aria-label="サイト" className="flex items-center gap-5 md:gap-8">
          <div ref={worksRef} className="relative" onBlur={handleWorksBlur}>
            <button
              ref={worksButtonRef}
              type="button"
              aria-expanded={isWorksOpen}
              aria-controls={menuId}
              onClick={() => setIsWorksOpen((open) => !open)}
              className={`${navLinkClass} py-2 ${isWorksOpen ? 'underline' : ''}`}
            >
              Works
            </button>

            <div
              id={menuId}
              hidden={!isWorksOpen}
              // モバイルではヘッダーの下に全幅で、PC では Works の下に出す
              className="fixed inset-x-0 top-14 border-b md:absolute md:inset-x-auto md:top-full md:left-1/2 md:-translate-x-1/2 md:mt-2 md:w-max md:min-w-[220px] md:border bg-paper border-rule animate-menu-in"
            >
              <ul className="flex flex-col py-2 px-1 md:px-0">
                {detailWorks.map((work) => (
                  <li key={work.id}>
                    <Link
                      to={`/work/${work.id}`}
                      onClick={() => setIsWorksOpen(false)}
                      className="block px-5 py-2.5 text-sm text-ink whitespace-nowrap underline-offset-[0.3em] decoration-1 hover:underline focus-visible:underline"
                    >
                      {work.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link to="/process" className={navLinkClass}>
            Process
          </Link>

          <Link to="/about" className={navLinkClass}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};
