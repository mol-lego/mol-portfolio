import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BRICK, FLOOR_GAP_CM, getRender, renderSize, renderSrc, renderSrcSet, type Render } from '../renderImages';
import { cardSrcSet, formatScale, smallWorksSizeRange, worksInGroup } from '../works.js';
import { Brick } from './Brick';
import { ScaleCaption } from './SameScale';

// 写真の縦横比と、格子の中の幅・ずらし（slug ごと）
const LAYOUT: Record<string, { aspect: string; colSpan: string; offset?: string }> = {
  bed: { aspect: "aspect-square", colSpan: "md:col-span-5" },
  overpass: { aspect: "aspect-[3/4]", colSpan: "md:col-span-4", offset: "md:mt-24" },
  castle: { aspect: "aspect-square", colSpan: "md:col-span-4", offset: "md:-mt-12" },
  house: { aspect: "aspect-[4/3]", colSpan: "md:col-span-5", offset: "md:mt-40" },
};

const SMALL_WORKS = worksInGroup('small').map((work) => ({ ...work, ...LAYOUT[work.slug] }));

// 実物大の帯に置く作品（slug。renders.js のキーと同じ）。夢の家（投影の幅 50cm・高さ 25cm）は帯の高さを
// 決めてしまい、ほかの作品の上が大きく空くので外す。帯の高さは歩道橋とタクシー（約 15cm）で決まる
const BAND = ["bed", "overpass", "castle"];

/**
 * 実物大の帯の1つの場所。幅は外接直方体を写した矩形の実寸（CSS の cm）、高さは床の基準点
 * （底面の中心）まで。帯の中で下端を揃えるので、全作品の基準点が同じ高さ＝同じ床に並ぶ。
 * 画像は左右の余白の分だけ外へ出し、手前側と影は下へはみ出す。キャプションはその下に置く。
 */
const ActualItem = ({
  render,
  caption,
  children,
}: {
  render: Render;
  caption: React.ReactNode;
  children: React.ReactNode;
}) => (
  <figure className="row-span-2 grid grid-rows-subgrid">
    <div
      className="relative self-end"
      style={{ width: `${render.proj_w_cm}cm`, height: `${render.ref_cm.y}cm` }}
    >
      {children}
    </div>
    <figcaption
      className="whitespace-nowrap"
      style={{ paddingTop: `${render.h_cm - render.ref_cm.y + 0.3}cm` }}
    >
      {caption}
    </figcaption>
  </figure>
);

/** 作品の画像を、余白の分だけ左へ出して実寸の幅で置く */
const actualImageStyle = (render: Render): React.CSSProperties => ({
  left: `${-render.margin_cm}cm`,
  width: `${render.w_cm}cm`,
});

/**
 * 実物大。小さな作品（夢の家を除く3点）と 2×4 ブロックのレンダリングを CSS の cm で実寸の幅に置く。
 * CSS の 1cm は 96dpi 換算の 37.8px なので、画面上ではほぼ実物の大きさになる。
 * 床（底面の中心）の高さを揃え、投影した矩形の間を 2cm にした 1 本の横スクロールの帯。
 */
const ActualSizeBand = () => (
  <div className="mt-24 md:mt-40">
    <div className="flex items-center gap-6 mb-6 md:mb-8">
      <div className="flex flex-col gap-1">
        <h3 className="font-['Inter',_sans-serif] text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-900">
          Actual Size
        </h3>
        <p className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-widest">
          実物大
        </p>
      </div>
      <div className="h-[1px] bg-stone-300 flex-1" />
    </div>

    <p className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-600 leading-relaxed tracking-[0.08em] font-light">
      画面上でほぼ実物の大きさです（96dpi 換算）。横にスクロールできます。
    </p>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      role="region"
      aria-label="実物大の作品（横にスクロールできます）"
      tabIndex={0}
      className="mt-8 md:mt-12 overflow-x-auto"
    >
      <div
        className="grid grid-flow-col auto-cols-max grid-rows-[auto_auto] w-max pl-[1cm] pr-[1cm] pb-6"
        style={{ columnGap: `${FLOOR_GAP_CM}cm` }}
      >
        <ActualItem render={BRICK} caption={<ScaleCaption title="2×4 ブロック" />}>
          <Brick
            className="absolute top-0 h-auto max-w-none"
            style={actualImageStyle(BRICK)}
            sizes="150px"
            label="2×4 ブロック"
            loading="lazy"
          />
        </ActualItem>

        {BAND.map((slug) => {
          const work = SMALL_WORKS.find((item) => item.slug === slug)!;
          const render = getRender(slug);
          return (
            <ActualItem
              key={slug}
              render={render}
              caption={<ScaleCaption title={work.title} meta={`${work.year} / ${work.size}`} />}
            >
              <img
                src={renderSrc(render)}
                srcSet={renderSrcSet(render)}
                sizes={`${render.w_cm.toFixed(2)}cm`}
                {...renderSize(render)}
                alt={`${work.title}（${work.titleEn}）を斜め上から見た図`}
                className="absolute top-0 h-auto max-w-none"
                style={actualImageStyle(render)}
                loading="lazy"
                decoding="async"
              />
            </ActualItem>
          );
        })}
      </div>
    </motion.div>
  </div>
);

export const SmallWorks = () => {
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    src2x?: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (!expandedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedImage]);

  return (
    <>
      <section className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-24 md:py-40 border-t border-stone-200">
        <div className="flex items-center gap-6 mb-6 md:mb-8">
          <div className="flex flex-col gap-1">
            <h2 className="font-['Inter',_sans-serif] text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-900">
              Small Works
            </h2>
            <p className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-widest">
              {smallWorksSizeRange()}くらいの小さな作品
            </p>
          </div>
          <div className="h-[1px] bg-stone-300 flex-1" />
        </div>

        {/* Editorially staggered grid */}
        <div className="grid grid-cols-1 md:grid-cols-9 gap-y-16 md:gap-x-12 lg:gap-x-24">
          {SMALL_WORKS.map((work, idx) => (
            <motion.article 
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col group ${work.colSpan} ${work.offset || ''}`}
            >
              <button
                type="button"
                onClick={() => setExpandedImage({ src: work.card.src, src2x: work.card.src2x, alt: work.title })}
                className={`w-full overflow-hidden bg-stone-100 mb-6 ${work.aspect} relative text-left cursor-zoom-in`}
                aria-label={`${work.title} を拡大表示`}
              >
                <img
                  src={work.card.src}
                  srcSet={cardSrcSet(work.card)}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              
              <div className="flex flex-col gap-4 group-hover:opacity-90 transition-opacity">
                <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] mb-1 md:mb-2 block border-b border-stone-200 pb-2">
                  No. {work.id}
                </span>

                <div className="flex flex-col mb-3 md:mb-4">
                  <h3 className="font-['Noto_Serif_JP',_serif] text-lg md:text-xl font-light text-stone-900 leading-tight tracking-[0.05em] whitespace-nowrap mt-1 md:mt-2">
                    {work.title}
                  </h3>
                  <h4 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] font-light mt-1 md:mt-1.5 pl-1">
                    {work.titleEn}
                  </h4>
                </div>

                <div className="w-full">
                  <div className="space-y-1 md:space-y-2 font-['Inter',_sans-serif] text-[10px] md:text-xs">
                    <div className="flex justify-between border-b border-stone-100 pb-1 md:pb-1.5">
                      <span className="text-stone-400 uppercase tracking-widest text-[8px] md:text-[10px]">
                        Year
                      </span>
                      <span className="text-stone-700">
                        {work.year}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1 md:pb-1.5">
                      <span className="text-stone-400 uppercase tracking-widest text-[8px] md:text-[10px]">
                        Scale
                      </span>
                      <span className="text-stone-700 text-right">
                        {formatScale(work)}
                      </span>
                    </div>
                  </div>

                  <p className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-600 mt-4 md:mt-5 leading-relaxed tracking-[0.08em] font-light text-justify">
                    {work.summary}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <ActualSizeBand />
      </section>

      {expandedImage && (
        <div
          className="fixed inset-0 z-[120] bg-stone-950/60 backdrop-blur-[2px] px-6 py-10 md:px-12 md:py-16"
          onClick={() => setExpandedImage(null)}
        >
          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
            <figure className="flex max-w-[90vw] flex-col items-center gap-4">
            <img
              src={expandedImage.src}
              srcSet={cardSrcSet(expandedImage)}
              sizes="100vw"
              alt={expandedImage.alt}
              className="h-auto max-h-[72vh] max-w-[90vw] object-contain shadow-2xl md:max-h-[78vh] md:max-w-[80vw]"
              decoding="async"
            />
            <figcaption className="w-full font-['Noto_Serif_JP',_serif] text-left text-sm tracking-[0.08em] text-stone-200">
              {expandedImage.alt}
            </figcaption>
            </figure>
          </div>
        </div>
      )}
    </>
  );
};
