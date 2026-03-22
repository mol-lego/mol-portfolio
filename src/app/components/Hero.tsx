import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import imgHero from "../../assets/optimized/msqe1-hero.jpg";
import imgHero2x from "../../assets/optimized/msqe1-hero@2x.jpg";
import { useImagePreload } from "../useImagePreload";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSizes = "(min-width: 768px) 1400px, 100vw";
  const isHeroReady = useImagePreload(imgHero, {
    srcSet: `${imgHero} 1x, ${imgHero2x} 2x`,
    sizes: heroSizes,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "25%"],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0],
  );

  return (
    <section ref={containerRef} className="w-full relative">
      {!isHeroReady && <div className="min-h-[82svh] md:min-h-[90vh]" />}

      {/* --- Mobile Editorial Layout --- */}
      <div className={`md:hidden w-full flex-col justify-between bg-transparent px-6 pt-28 pb-8 min-h-[82svh] ${isHeroReady ? "flex" : "hidden"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col"
        >
          <h1 className="font-['Inter',_sans-serif] text-[3.5rem] font-normal leading-none tracking-wide text-stone-900 ml-[-2px]">
            mol
          </h1>
          <p className="font-['Inter',_sans-serif] text-[10px] tracking-[0.2em] uppercase mt-4 text-stone-500 pl-1">
            LEGO<sup>&reg;</sup>作品集
          </p>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="w-full flex flex-col my-auto py-12"
        >
          <div className="w-full flex items-center justify-center overflow-hidden bg-stone-100/50">
              <img
                src={imgHero}
                srcSet={`${imgHero} 1x, ${imgHero2x} 2x`}
                sizes="100vw"
              alt="MS Queen Elizabeth - Exhibition"
              className="w-full h-auto block"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <figcaption className="mt-6 flex flex-col gap-2 pl-1 border-l border-stone-200 ml-1 py-1 px-3">
            <span className="font-['Noto_Serif_JP',_serif] text-sm font-medium text-stone-800 tracking-[0.1em]">
              クイーンエリザベス号
            </span>
            <span className="font-['Inter',_sans-serif] text-[10px] tracking-widest text-stone-400 uppercase">
              MS Queen Elizabeth — 2019
            </span>
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-full flex justify-center h-12"
        >
          <div className="w-[1px] h-full bg-stone-200 overflow-hidden relative">
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-full h-1/2 bg-stone-400 absolute top-0"
            />
          </div>
        </motion.div>
      </div>

      {/* --- Desktop Editorial Layout --- */}
      <div className={`hidden w-full max-w-[1400px] mx-auto flex-col px-12 pt-16 h-auto min-h-[90vh] pb-16 md:flex ${isHeroReady ? "" : "md:hidden"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col shrink-0 mb-16"
        >
          <h1 className="font-['Inter',_sans-serif] text-[7rem] lg:text-[9rem] font-medium leading-none tracking-[0.08em] text-stone-900 -ml-2">
            mol
          </h1>
          <p className="font-['Inter',_sans-serif] text-sm lg:text-base tracking-[0.2em] uppercase mt-6 text-stone-500 pl-2">
            LEGO<sup>&reg;</sup>作品集
          </p>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col"
        >
          <div className="w-full aspect-[21/9] lg:aspect-[16/7] overflow-hidden bg-stone-100 relative shadow-sm group">
            <motion.div
              style={{ y }}
              className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
              <img
                src={imgHero}
                srcSet={`${imgHero} 1x, ${imgHero2x} 2x`}
                sizes={heroSizes}
                alt="MS Queen Elizabeth - Exhibition"
                className="w-full h-full object-cover object-[center_40%] transition-transform duration-[2s] ease-out group-hover:scale-105"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
          </div>
          
          <figcaption className="mt-8 flex justify-between items-end shrink-0">
            <div className="flex flex-col gap-2 border-l border-stone-200 pl-4 py-1">
              <span className="font-['Noto_Serif_JP',_serif] text-base lg:text-lg font-medium text-stone-800 tracking-[0.1em]">
                クイーンエリザベス号
              </span>
              <span className="font-['Inter',_sans-serif] text-xs lg:text-sm tracking-widest text-stone-400 uppercase">
                MS Queen Elizabeth — 2019
              </span>
            </div>
            
            <div className="flex flex-col items-center gap-3 pr-2">
              <div className="w-[1px] h-12 bg-stone-200 overflow-hidden relative">
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-full h-1/2 bg-stone-400 absolute top-0"
                />
              </div>
              <span className="text-stone-400 font-['Inter',_sans-serif] text-[10px] uppercase tracking-[0.2em]">
                Scroll
              </span>
            </div>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};
