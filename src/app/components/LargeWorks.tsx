import React from 'react';
import { Link } from 'react-router';
import { imageSrcSet, worksInGroup } from '../works.js';
import { SectionHeading, WorkCaption, WorkSummary } from './WorkCaption';

const LARGE_WORKS = worksInGroup("large");

export const LargeWorks = () => {
  return (
    <section
      aria-labelledby="large-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-16 md:py-24"
    >
      <SectionHeading id="large-heading">大型作品</SectionHeading>

      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16">
        {LARGE_WORKS.map((work) => (
          <article key={work.id}>
            <Link to={`/work/${work.id}`} tabIndex={-1} className="block w-full">
              <img
                src={work.image.src}
                srcSet={imageSrcSet(work.image)}
                sizes="(min-width: 1400px) 620px, (min-width: 768px) 46vw, calc(100vw - 48px)"
                alt={`${work.title}（${work.titleEn}）`}
                width={work.image.width}
                height={work.image.height}
                className="block w-full h-auto aspect-[4/3] object-cover bg-ink/5"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <div className="mt-4">
              <WorkCaption work={work} size="md" />
              <WorkSummary work={work} className="mt-3" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
