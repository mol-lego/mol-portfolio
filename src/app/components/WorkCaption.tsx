import React, { ReactNode } from "react";
import { Link } from "react-router";
import { formatCaption, type Work } from "../works.js";

/** 章の見出し（日本語だけ） */
export const SectionHeading = ({ id, children }: { id?: string; children: ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-[1.75rem] font-bold text-ink leading-snug">
    {children}
  </h2>
);

/** 文字のリンク（下線つき） */
export const textLinkClass =
  "underline decoration-1 underline-offset-[0.28em] decoration-ink-2/60 hover:decoration-ink";

const titleSizes = {
  lg: "text-xl md:text-2xl",
  md: "text-xl",
  sm: "text-base md:text-lg",
} as const;

/**
 * 写真の下の1行。「作品名　2019年　全長 3m・約35,000ピース」
 * 作品名は h3（作品詳細があれば下線つきのリンク）、年・寸法・ピース数は --ink-2。
 */
export const WorkCaption = ({
  work,
  size = "md",
}: {
  work: Work;
  size?: keyof typeof titleSizes;
}) => (
  <div className="flex flex-wrap items-baseline gap-x-[1em] gap-y-1">
    <h3 className={`${titleSizes[size]} text-ink leading-snug`}>
      {work.detail ? (
        <Link to={`/work/${work.id}`} className={textLinkClass}>
          {work.title}
        </Link>
      ) : (
        work.title
      )}
    </h3>
    <p className="text-sm text-ink-2">{formatCaption(work)}</p>
  </div>
);

/** 本人の一文（本文） */
export const WorkSummary = ({
  work,
  small = false,
  className = "",
}: {
  work: Work;
  small?: boolean;
  className?: string;
}) => (
  <p
    className={`${small ? "text-sm" : "text-sm md:text-base"} leading-[1.8] md:leading-[1.8] text-ink max-w-[38em] ${className}`}
  >
    {work.summary}
  </p>
);
