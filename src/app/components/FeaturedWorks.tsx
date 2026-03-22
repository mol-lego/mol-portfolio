import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import imgQE2 from "../../assets/optimized/msqe2-card.jpg";
import imgQE22x from "../../assets/optimized/msqe2-card@2x.jpg";
import imgVenezia from "../../assets/optimized/venice1-card.jpg";
import imgVenezia2x from "../../assets/optimized/venice1-card@2x.jpg";

const FEATURED = [
  {
    id: "01",
    prefix: "豪華客船",
    title: "クイーンエリザベス号",
    subtitle: "MS Queen Elizabeth",
    year: "2019",
    scale: "全長3m / 約35,000ピース",
    desc: "初めて制作した大型作品。設計・組み立てに1年を費やしました。灘校レゴ同好会時代の作品です。",
    image: imgQE2,
    image2x: imgQE22x,
    linkText: "YouTube メイキング",
    isRightAligned: false,
  },
  {
    id: "02",
    prefix: "水の都",
    title: "ヴェネツィア",
    subtitle: "Venice",
    year: "2025",
    scale: "1m四方 / 約50,000ピース",
    desc: "灘レゴOB・現東大レゴ部の4人での合作。緻密な街並みの表現にはこだわりがたくさん。東大での学祭を中心に各地で展示予定です。",
    image: imgVenezia,
    image2x: imgVenezia2x,
    linkText: "制作記 note",
    isRightAligned: true,
  },
];

export const FeaturedWorks = () => {
  return (
    <section className="px-6 md:px-12 w-full max-w-[1400px] mx-auto pt-20 pb-32 md:pt-16 md:pb-64">
      <div className="flex items-center gap-6 mb-6 md:mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-['Inter',_sans-serif] text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-900">
            Featured Works
          </h2>
          <p className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-widest">
            代表作
          </p>
        </div>
        <div className="h-[1px] bg-stone-300 flex-1" />
      </div>

      <div className="flex flex-col gap-40 md:gap-64">
        {FEATURED.map((work) => {
          const ref = useRef<HTMLDivElement>(null);
          const { scrollYProgress } = useScroll({
            target: ref,
            offset: ["start end", "end start"],
          });
          const y = useTransform(
            scrollYProgress,
            [0, 1],
            ["-10%", "10%"],
          );

          return (
            <motion.article
              key={work.id}
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative w-full flex flex-col lg:flex-row gap-6 lg:gap-32 items-center ${work.isRightAligned ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Image Container with Parallax */}
              <div className="w-full lg:flex-1 min-w-0">
                <Link to={`/work/${work.id}`} className="block aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden bg-stone-100 group relative shadow-sm cursor-pointer">
                  <motion.div
                    style={{ y }}
                    className="absolute inset-0 w-full h-[120%] -top-[10%]"
                  >
                    <img
                      src={work.image}
                      srcSet={`${work.image} 1x, ${work.image2x} 2x`}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </motion.div>
                </Link>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-max lg:shrink-0 flex flex-col pt-2 lg:pt-0">
                <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] mb-4 lg:mb-16 block border-b border-stone-200 pb-2 lg:pb-4">
                  No. {work.id}
                </span>

                <div className="flex flex-col mb-6 lg:mb-16">
                  <span className="font-['Noto_Serif_JP',_serif] text-sm lg:text-xl text-stone-800 tracking-[0.3em] font-medium pl-1">
                    {work.prefix}
                  </span>
                  <h3 className="font-['Noto_Serif_JP',_serif] text-[clamp(1.5rem,6vw,2.5rem)] lg:text-[clamp(1.75rem,7vw,2.5rem)] font-light text-stone-900 leading-tight tracking-[0.05em] whitespace-nowrap mt-1 lg:mt-2">
                    {work.title}
                  </h3>
                  <h4 className="font-['Inter',_sans-serif] text-xs lg:text-base text-stone-400 tracking-[0.2em] font-light mt-1 lg:mt-4 pl-1">
                    {work.subtitle}
                  </h4>
                </div>

                <div className="w-full lg:w-[360px] xl:w-[400px]">
                  <div className="space-y-2 lg:space-y-4 font-['Inter',_sans-serif] text-xs md:text-sm">
                    <div className="flex justify-between border-b border-stone-100 pb-1.5 lg:pb-2">
                      <span className="text-stone-400 uppercase tracking-widest text-[10px]">
                        Year
                      </span>
                      <span className="text-stone-700">
                        {work.year}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-1.5 lg:pb-2">
                      <span className="text-stone-400 uppercase tracking-widest text-[10px]">
                        Scale
                      </span>
                      <span className="text-stone-700 text-right">
                        {work.scale}
                      </span>
                    </div>
                  </div>

                  <p className="font-['Noto_Serif_JP',_serif] text-xs lg:text-base text-stone-600 mt-6 lg:mt-16 leading-relaxed lg:leading-loose tracking-[0.08em] font-light text-justify">
                    {work.desc}
                  </p>

                  <Link
                    to={`/work/${work.id}`}
                    className="mt-8 lg:mt-16 group inline-flex items-center gap-4 w-fit"
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-stone-300 flex items-center justify-center transition-all duration-500 group-hover:border-stone-900 group-hover:bg-stone-900">
                      <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-stone-900 rounded-full transition-colors duration-500 group-hover:bg-white" />
                    </div>
                    <span className="font-['Noto_Serif_JP',_serif] text-sm lg:text-base tracking-widest text-stone-800 transition-colors duration-500 group-hover:text-stone-500 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-stone-500 after:transition-all after:duration-500 group-hover:after:w-full">
                      作品の詳細を見る
                    </span>
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
