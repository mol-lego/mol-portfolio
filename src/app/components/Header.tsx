import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { detailWorks } from '../works.js';

const navLinkClass =
  'text-sm text-ink underline-offset-[0.3em] decoration-1 hover:underline';

export const Header = () => {
  const [isWorksOpen, setIsWorksOpen] = useState(false);
  const worksRef = useRef<HTMLDivElement>(null);
  const worksButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const location = useLocation();

  // ページを移ったら閉じる
  useEffect(() => {
    setIsWorksOpen(false);
  }, [location.key]);

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
    <header className="sticky top-0 z-40 w-full bg-paper border-b border-rule">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-14 md:h-16 flex justify-between items-center">
        <Link to="/" className="text-base md:text-lg font-bold text-ink tracking-[0.04em]">
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
