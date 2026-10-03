import React, { ReactNode } from "react";
import { Link } from "react-router";
import { formatCaption, type Work } from "../works.js";

/**
 * 章の見出し（日本語だけ）。改修前の章ラベル（小さく、字間を広く、墨）の位置と大きさを、
 * 英字と罫線を外して和文で置き直したもの。作品名（h3）より小さく、作品名を主役にする。
 */
export const SectionHeading = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => (
  <h2 id={id} className={`text-sm md:text-base font-bold tracking-[0.2em] text-ink ${className}`}>
    {children}
  </h2>
);

/** 文字のリンク（下線つき） */
export const textLinkClass =
  "underline decoration-1 underline-offset-[0.28em] decoration-ink-2/60 hover:decoration-ink";

/** 作品名の大きさ（改修前の値） */
const titleSizes = {
  featured: "text-[clamp(1.5rem,6vw,2.5rem)] lg:text-[clamp(1.75rem,7vw,2.5rem)]",
  large: "text-[clamp(1.5rem,5vw,2rem)]",
  small: "text-lg md:text-xl",
} as const;

/** 作品名（h3）。作品詳細があれば下線つきのリンク */
export const WorkTitle = ({ work, size }: { work: Work; size: keyof typeof titleSizes }) => (
  <h3
    className={`${titleSizes[size]} text-ink leading-tight tracking-[0.05em] whitespace-nowrap`}
  >
    {work.detail ? (
      <Link to={`/work/${work.id}`} className={textLinkClass}>
        {work.title}
      </Link>
    ) : (
      work.title
    )}
  </h3>
);

/** 作品名の下の1行。「2019年　全長 3m・約35,000ピース」 */
export const WorkFacts = ({ work, className = "" }: { work: Work; className?: string }) => (
  <p className={`text-sm text-ink-2 ${className}`}>{formatCaption(work)}</p>
);

/** 本人の一文（本文） */
export const WorkSummary = ({
  work,
  className = "",
}: {
  work: Work;
  className?: string;
}) => (
  <p className={`text-sm md:text-base leading-[1.9] tracking-[0.04em] text-ink max-w-[38em] ${className}`}>
    {work.summary}
  </p>
);

/** 「作品の詳細」のリンク */
export const WorkDetailLink = ({ work, className = "" }: { work: Work; className?: string }) =>
  work.detail ? (
    <p className={`text-sm md:text-base ${className}`}>
      <Link to={`/work/${work.id}`} className={`text-ink ${textLinkClass}`}>
        作品の詳細
      </Link>
    </p>
  ) : null;
