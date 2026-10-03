import React from 'react';
import { Link } from 'react-router';
import { SectionHeading, textLinkClass } from './WorkCaption';

export const AboutSection = () => {
  return (
    <section
      aria-labelledby="about-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-32 md:py-48 border-t border-rule"
    >
      <SectionHeading id="about-heading">作者</SectionHeading>
      <p className="mt-6 md:mt-8 text-sm md:text-base text-ink max-w-[38em]">
        大型のものから手のひらサイズまで、ブロックで作品を制作しています。
      </p>
      <p className="mt-4 text-sm md:text-base">
        <Link to="/about" className={`text-ink ${textLinkClass}`}>
          About
        </Link>
      </p>
    </section>
  );
};
