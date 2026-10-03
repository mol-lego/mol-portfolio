import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { formatCaption, imageSrcSet, smallWorksSizeRange, worksInGroup, type Work } from '../works.js';
import { SectionHeading, WorkFacts, WorkSummary, WorkTitle } from './WorkCaption';

const SMALL_WORKS = worksInGroup("small");

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** 小さな作品の拡大表示（モーダルのダイアログ） */
const ExpandedImage = ({ work, onClose }: { work: Work; onClose: () => void }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      // フォーカスをダイアログの中に閉じ込める
      if (event.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (!dialogRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[120] bg-paper flex flex-col"
      onClick={(event) => {
        // 背景（写真と見出しの外）をクリックしたら閉じる
        if (!(event.target as HTMLElement).closest("[data-dialog-content]")) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 h-14 md:h-16 flex justify-end items-center shrink-0">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="text-sm text-ink underline decoration-1 underline-offset-[0.28em] decoration-ink-2/60 hover:decoration-ink py-2"
        >
          閉じる
        </button>
      </div>

      <div className="flex-1 min-h-0 w-full px-6 md:px-12 pb-8 md:pb-12 flex items-center justify-center">
        <figure data-dialog-content className="flex max-h-full max-w-full flex-col gap-3">
          <img
            src={work.image.src}
            srcSet={imageSrcSet(work.image)}
            sizes="90vw"
            alt={`${work.title}（${work.titleEn}）`}
            className="block h-auto w-auto max-w-full max-h-[calc(100svh-11rem)] object-contain"
            decoding="async"
          />
          <figcaption className="flex flex-wrap items-baseline gap-x-[1em] gap-y-1">
            <span id={titleId} className="text-base text-ink">
              {work.title}
            </span>
            <span className="text-sm text-ink-2">{formatCaption(work)}</span>
          </figcaption>
        </figure>
      </div>
    </div>,
    document.body,
  );
};

/**
 * 改修前（fc16600）の段違いの配置。9 列の格子に 5・4・4・5 列で置き、上下にずらす。
 * 写真の比率もそのまま（正方形・3:4・正方形・4:3）。キーは works.js の slug。
 */
const SMALL_LAYOUT: Record<string, { aspect: string; span: string; offset: string }> = {
  "hospital-bed": { aspect: "aspect-square", span: "md:col-span-5", offset: "" },
  "overpass-taxi": { aspect: "aspect-[3/4]", span: "md:col-span-4", offset: "md:mt-24" },
  "mini-castle": { aspect: "aspect-square", span: "md:col-span-4", offset: "md:-mt-12" },
  "dream-house": { aspect: "aspect-[4/3]", span: "md:col-span-5", offset: "md:mt-40" },
};

export const SmallWorks = () => {
  const [expandedWork, setExpandedWork] = useState<Work | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openExpanded = (work: Work, trigger: HTMLElement) => {
    returnFocusRef.current = trigger;
    setExpandedWork(work);
  };

  const closeExpanded = useCallback(() => {
    setExpandedWork(null);
    // 拡大表示を開いたボタンへフォーカスを戻す
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  return (
    <section
      aria-labelledby="small-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-24 md:py-40 border-t border-rule"
    >
      <SectionHeading id="small-heading">小さな作品</SectionHeading>
      <p className="mt-2 mb-6 md:mb-8 text-sm text-ink-2">大きさ {smallWorksSizeRange()}</p>

      <div className="grid grid-cols-1 md:grid-cols-9 gap-y-16 md:gap-x-12 lg:gap-x-24">
        {SMALL_WORKS.map((work) => {
          const layout = SMALL_LAYOUT[work.slug] ?? { aspect: "aspect-square", span: "md:col-span-4", offset: "" };
          return (
            <article key={work.id} className={`flex flex-col ${layout.span} ${layout.offset}`}>
              <button
                type="button"
                onClick={(event) => openExpanded(work, event.currentTarget)}
                aria-haspopup="dialog"
                aria-label={`${work.title}の写真を拡大表示`}
                className={`block w-full overflow-hidden bg-ink/5 mb-6 ${layout.aspect} cursor-zoom-in`}
              >
                <img
                  src={work.image.src}
                  srcSet={imageSrcSet(work.image)}
                  sizes="(min-width: 1400px) 620px, (min-width: 768px) 45vw, calc(100vw - 48px)"
                  alt={`${work.title}（${work.titleEn}）`}
                  width={work.image.width}
                  height={work.image.height}
                  className="block w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>

              <WorkTitle work={work} size="small" />
              <WorkFacts work={work} className="mt-2 md:mt-3" />
              <WorkSummary work={work} className="mt-4 md:mt-5" />
            </article>
          );
        })}
      </div>

      {expandedWork && <ExpandedImage work={expandedWork} onClose={closeExpanded} />}
    </section>
  );
};
