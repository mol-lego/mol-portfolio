import React from "react";
import { Link } from "react-router";
import { imageSrcSet, worksInGroup } from "../works.js";
import { SectionHeading, WorkDetailLink, WorkFacts, WorkSummary, WorkTitle } from "./WorkCaption";

const FEATURED = worksInGroup("featured");

/**
 * 代表作。改修前（fc16600）の構図のまま、写真と文章を左右交互に置く（1024px 以上）。
 * 写真の比率・列の幅・間隔・余白は改修前の値。番号・小さな表・英題・丸いボタン・
 * フェード・パララックス・ホバーの拡大は外した。
 */
export const FeaturedWorks = () => {
  return (
    <section
      aria-labelledby="featured-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto pt-20 pb-32 md:pt-16 md:pb-64"
    >
      <SectionHeading id="featured-heading" className="mb-6 md:mb-8">
        代表作
      </SectionHeading>

      <div className="flex flex-col gap-40 md:gap-64">
        {FEATURED.map((work, index) => (
          <article
            key={work.id}
            className={`w-full flex flex-col lg:flex-row gap-6 lg:gap-32 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full lg:flex-1 min-w-0">
              <Link to={`/work/${work.id}`} tabIndex={-1} aria-hidden="true" className="block w-full">
                <img
                  src={work.image.src}
                  srcSet={imageSrcSet(work.image)}
                  sizes="(min-width: 1400px) 780px, (min-width: 1024px) calc(100vw - 620px), (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)"
                  alt={`${work.title}（${work.titleEn}）`}
                  width={work.image.width}
                  height={work.image.height}
                  className="block w-full h-auto aspect-[16/9] lg:aspect-[16/10] object-cover bg-ink/5"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            </div>

            <div className="w-full lg:w-max lg:shrink-0 flex flex-col pt-2 lg:pt-0">
              <WorkTitle work={work} size="featured" />
              <div className="w-full lg:w-[360px] xl:w-[400px]">
                <WorkFacts work={work} className="mt-3 lg:mt-5" />
                <WorkSummary work={work} className="mt-6 lg:mt-12 lg:leading-loose" />
                <WorkDetailLink work={work} className="mt-8 lg:mt-12" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
