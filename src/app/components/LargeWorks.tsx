import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import imgYasaka from '../../assets/yasaka3.jpeg';
import imgHawaii from '../../assets/optimized/hawaii1-card.jpg';
import imgHawaii2x from '../../assets/optimized/hawaii1-card@2x.jpg';

const LARGE_WORKS = [
  {
    id: "03",
    title: "八坂神社 西楼門",
    subtitle: "Yasaka Shrine",
    year: "2020",
    scale: "2.5m / 約50,000ピース",
    desc: "京都・祇園の象徴的な存在とも言える楼門。灘校レゴ同好会時代の作品。",
    image: imgYasaka,
    image2x: imgYasaka,
    linkText: "YouTube メイキング"
  },
  {
    id: "04",
    title: "ハワイ火山国立公園",
    subtitle: "Hawaii Volcanoes",
    year: "2021",
    scale: "直径1m / 約10,000ピース",
    desc: "ハワイ諸島の火山を再現した作品。初めてご依頼をいただいて制作した作品であり、電飾が施されています。「『レゴ®ブロック』で作った世界遺産展」に参加しました。",
    image: imgHawaii,
    image2x: imgHawaii2x,
    linkText: ""
  }
];

export const LargeWorks = () => {
  return (
    <section className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-16 md:py-32 border-t border-stone-200">
      <div className="flex items-center gap-6 mb-6 md:mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-['Inter',_sans-serif] text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-900">
            Large Works
          </h2>
          <p className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-widest">
            大型作品
          </p>
        </div>
        <div className="h-[1px] bg-stone-300 flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {LARGE_WORKS.map((work, idx) => (
          <motion.article 
            key={work.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group cursor-pointer"
          >
            <Link to={`/work/${work.id}`} className="block aspect-[4/3] w-full overflow-hidden bg-stone-100 mb-8 relative">
              <img
                src={work.image}
                srcSet={`${work.image} 1x, ${work.image2x} 2x`}
                sizes="(min-width: 768px) 50vw, 100vw"
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Paper overlay interaction */}
              <div className="absolute inset-0 bg-stone-900/0 transition-colors duration-500 group-hover:bg-stone-900/5" />
            </Link>

            <div className="flex flex-col gap-4">
              <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] mb-2 md:mb-3 block border-b border-stone-200 pb-2">
                No. {work.id}
              </span>

              <div className="flex flex-col mb-4 md:mb-5">
                <h3 className="font-['Noto_Serif_JP',_serif] text-[clamp(1.5rem,5vw,2rem)] font-light text-stone-900 leading-tight tracking-[0.05em] whitespace-nowrap mt-1 md:mt-2">
                  {work.title}
                </h3>
                <h4 className="font-['Inter',_sans-serif] text-xs md:text-sm text-stone-400 tracking-[0.2em] font-light mt-1 md:mt-2 pl-1">
                  {work.subtitle}
                </h4>
              </div>

              <div className="w-full">
                <div className="space-y-2 md:space-y-4 font-['Inter',_sans-serif] text-xs md:text-sm">
                  <div className="flex justify-between border-b border-stone-100 pb-1.5 md:pb-2">
                    <span className="text-stone-400 uppercase tracking-widest text-[10px]">
                      Year
                    </span>
                    <span className="text-stone-700">
                      {work.year}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-1.5 md:pb-2">
                    <span className="text-stone-400 uppercase tracking-widest text-[10px]">
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

                <Link
                  to={`/work/${work.id}`}
                  className="mt-4 md:mt-5 group inline-flex items-center gap-3 md:gap-4 w-fit hover:opacity-70 transition-opacity"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-stone-300 flex items-center justify-center transition-colors group-hover:border-stone-400">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-stone-900 rounded-full group-hover:scale-150 transition-transform duration-300" />
                  </div>
                  <span className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm tracking-wider text-stone-800">
                    作品の詳細を見る
                  </span>
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
