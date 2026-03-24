import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import imgBedroom from '../../assets/optimized/hospital-card.jpg';
import imgBedroom2x from '../../assets/optimized/hospital-card@2x.jpg';
import imgHighway from '../../assets/optimized/overpass-card.jpg';
import imgHighway2x from '../../assets/optimized/overpass-card@2x.jpg';
import imgCastle from '../../assets/optimized/castle-card.jpg';
import imgCastle2x from '../../assets/optimized/castle-card@2x.jpg';
import imgHouse from '../../assets/optimized/dreamhouse-card.jpg';
import imgHouse2x from '../../assets/optimized/dreamhouse-card@2x.jpg';

const SMALL_WORKS = [
  {
    id: "05",
    title: "病院のベッド",
    subtitle: "Hospital Bed",
    year: "2025",
    scale: "8cm / 127ピース",
    desc: "味気ない入院生活もレゴの世界なら楽しくなるかな？と思って作りました。5年ぶりに公開した復帰作です。",
    image: imgBedroom,
    image2x: imgBedroom2x,
    aspect: "aspect-square",
    colSpan: "md:col-span-5"
  },
  {
    id: "06",
    title: "歩道橋とタクシー",
    subtitle: "Overpass & Taxi",
    year: "2025",
    scale: "8cm / 255ピース",
    desc: "どこにでもありそうな何気ない風景です。見る人によって想像する時間帯が変わりそうです。",
    image: imgHighway,
    image2x: imgHighway2x,
    aspect: "aspect-[3/4]",
    colSpan: "md:col-span-4",
    offset: "md:mt-24"
  },
  {
    id: "07",
    title: "小さなお城",
    subtitle: "Mini Castle",
    year: "2021",
    scale: "8cm / 202ピース",
    desc: "特にモデルはありませんが、関西人なので姫路城と大阪城を無意識に思い出していたかもしれません。活動休止中の作品なのでこれまで未公開でした。大学4年間で唯一の作品です。",
    image: imgCastle,
    image2x: imgCastle2x,
    aspect: "aspect-square",
    colSpan: "md:col-span-4",
    offset: "md:-mt-12"
  },
  {
    id: "08",
    title: "夢の家",
    subtitle: "Dream House",
    year: "2025",
    scale: "40cm / 2,300ピース",
    desc: "お花に囲まれたお庭でアフターヌーンティをしたい……　という思いで作りました。",
    image: imgHouse,
    image2x: imgHouse2x,
    aspect: "aspect-[4/3]",
    colSpan: "md:col-span-5",
    offset: "md:mt-40"
  }
];

export const SmallWorks = () => {
  const [expandedImage, setExpandedImage] = useState<{
    src: string;
    src2x: string;
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
              10〜30cmくらいの小さな作品
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
                onClick={() => setExpandedImage({ src: work.image, src2x: work.image2x, alt: work.title })}
                className={`w-full overflow-hidden bg-stone-100 mb-6 ${work.aspect} relative text-left cursor-zoom-in`}
                aria-label={`${work.title} を拡大表示`}
              >
                <img
                  src={work.image}
                  srcSet={`${work.image} 1x, ${work.image2x} 2x`}
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
                    {work.subtitle}
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
                        {work.scale}
                      </span>
                    </div>
                  </div>

                  <p className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-600 mt-4 md:mt-5 leading-relaxed tracking-[0.08em] font-light text-justify">
                    {work.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
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
              srcSet={`${expandedImage.src} 1x, ${expandedImage.src2x} 2x`}
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
