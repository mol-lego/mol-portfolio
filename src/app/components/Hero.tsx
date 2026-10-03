import React from "react";
import imgHero from "../../assets/optimized/msqe1-hero.jpg";
import imgHero2x from "../../assets/optimized/msqe1-hero@2x.jpg";
import { formatYear, getWork } from "../works.js";

const heroWork = getWork("01")!;

export const Hero = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-10 md:pt-14 pb-16 md:pb-24">
      {/* 仮の文。本人の言葉に置き換える */}
      <h1 className="text-xl md:text-[1.75rem] leading-[1.7] md:leading-[1.65] text-ink mb-8 md:mb-12">
        8cm の小品から全長 3m の客船まで、
        <br className="hidden md:inline" />
        LEGO® ブロックで作品をつくっています。
      </h1>

      <figure className="w-full">
        <img
          src={imgHero}
          srcSet={`${imgHero} 1400w, ${imgHero2x} 2800w`}
          sizes="(min-width: 1400px) 1304px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)"
          alt={`${heroWork.title}（${heroWork.titleEn}）の展示`}
          width={1400}
          height={933}
          className="block w-full h-auto bg-ink/5 md:aspect-[21/9] lg:aspect-[16/7] md:object-cover md:object-[center_40%]"
          decoding="async"
          {...{ fetchpriority: "high" }}
        />
        <figcaption className="mt-3 text-sm text-ink">
          {heroWork.title}
          <span className="text-ink-2">　{formatYear(heroWork)}</span>
        </figcaption>
      </figure>
    </section>
  );
};
