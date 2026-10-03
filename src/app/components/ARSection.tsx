import React from "react";
import { Link } from "react-router";
import { arWorks } from "../works.js";
import { SectionHeading, textLinkClass } from "./WorkCaption";

export const ARSection = () => {
  return (
    <section
      aria-labelledby="ar-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-16 md:py-24"
    >
      <SectionHeading id="ar-heading">実物大</SectionHeading>
      <p className="mt-4 text-sm md:text-base text-ink max-w-[38em]">
        大型の{arWorks.length}作品は、AR で実物の大きさのまま目の前に置けます。
      </p>
      <p className="mt-4 text-sm md:text-base">
        <Link to="/ar-viewer" className={`text-ink ${textLinkClass}`}>
          3D ビューアを開く
        </Link>
      </p>
    </section>
  );
};
