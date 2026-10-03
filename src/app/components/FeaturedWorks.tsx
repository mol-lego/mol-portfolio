import React from "react";
import { Link } from "react-router";
import { imageSrcSet, worksInGroup } from "../works.js";
import { SectionHeading, WorkCaption, WorkSummary } from "./WorkCaption";

const FEATURED = worksInGroup("featured");

export const FeaturedWorks = () => {
  return (
    <section
      aria-labelledby="featured-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-16 md:py-24"
    >
      <SectionHeading id="featured-heading">代表作</SectionHeading>

      <div className="mt-8 md:mt-12 flex flex-col gap-20 md:gap-32">
        {FEATURED.map((work) => (
          <article key={work.id} className="w-full">
            <Link to={`/work/${work.id}`} tabIndex={-1} className="block w-full">
              <img
                src={work.image.src}
                srcSet={imageSrcSet(work.image)}
                sizes="(min-width: 1400px) 1304px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)"
                alt={`${work.title}（${work.titleEn}）`}
                width={work.image.width}
                height={work.image.height}
                className="block w-full h-auto aspect-[3/2] md:aspect-[16/9] object-cover bg-ink/5"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <div className="mt-4 md:mt-5">
              <WorkCaption work={work} size="lg" />
              <WorkSummary work={work} className="mt-3 md:mt-4" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
