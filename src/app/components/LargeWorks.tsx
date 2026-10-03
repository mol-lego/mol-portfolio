import React from 'react';
import { Link } from 'react-router';
import { imageSrcSet, worksInGroup } from '../works.js';
import { SectionHeading, WorkDetailLink, WorkFacts, WorkSummary, WorkTitle } from './WorkCaption';

const LARGE_WORKS = worksInGroup("large");

/** 大型作品。改修前の 2 列（写真 4:3、列の間 96px、写真の下 32px）のまま */
export const LargeWorks = () => {
  return (
    <section
      aria-labelledby="large-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-16 md:py-32 border-t border-rule"
    >
      <SectionHeading id="large-heading" className="mb-6 md:mb-8">
        大型作品
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {LARGE_WORKS.map((work) => (
          <article key={work.id}>
            <Link
              to={`/work/${work.id}`}
              tabIndex={-1}
              aria-hidden="true"
              className="block aspect-[4/3] w-full overflow-hidden bg-ink/5 mb-8"
            >
              <img
                src={work.image.src}
                srcSet={imageSrcSet(work.image)}
                sizes="(min-width: 1400px) 604px, (min-width: 768px) calc(50vw - 96px), calc(100vw - 48px)"
                alt={`${work.title}（${work.titleEn}）`}
                width={work.image.width}
                height={work.image.height}
                className="block w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </Link>

            <WorkTitle work={work} size="large" />
            <WorkFacts work={work} className="mt-3 md:mt-4" />
            <WorkSummary work={work} className="mt-4 md:mt-5" />
            <WorkDetailLink work={work} className="mt-4 md:mt-5" />
          </article>
        ))}
      </div>
    </section>
  );
};
