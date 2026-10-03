import React from "react";
import { brickOnRender, floorLeftOf, getRender, renderSize, renderSrc, renderSrcSet } from "../renderImages";
import { formatSize, formatYear, getWork } from "../works.js";
import { SectionHeading } from "./WorkCaption";
import { Brick } from "./Brick";

// 大型作品4点（大きい順）。いちばん大きい客船を本文の幅いっぱいにし、ほかは同じ縮尺で縮める
const ROW_IDS = ["01", "03", "02", "04"];
const ROWS = ROW_IDS.map((id) => getWork(id)!);
const BASE = getRender(ROWS[0].render);

/**
 * 同じ縮尺で。冒頭と同じ 1cm あたりの px で、大型作品のレンダリングを左に揃えて縦に積む。
 * 各段の左端の床に 2×4 ブロックを同じ縮尺で置く。作品の底面の左の隅から 2cm 左の床に、
 * ブロックの底面の中心を重ねる（同じカメラ・同じ床で描いているので、これで同じ床に並ぶ）。
 */
export const SameScale = () => {
  return (
    <section
      aria-labelledby="scale-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-24 md:py-40 border-t border-rule"
    >
      <SectionHeading id="scale-heading">同じ縮尺で</SectionHeading>
      <p className="mt-2 text-sm text-ink-2">
        各段の左端の赤いブロックは 2×4 ブロックです。
      </p>

      <div className="mt-10 md:mt-16 flex flex-col gap-12 md:gap-20">
        {ROWS.map((work) => {
          const render = getRender(work.render);
          const ratio = render.w_cm / BASE.w_cm;
          return (
            <figure key={work.id} className="w-full">
              <div className="relative" style={{ width: `${ratio * 100}%` }}>
                <img
                  src={renderSrc(render)}
                  srcSet={renderSrcSet(render)}
                  sizes={`(min-width: 1400px) ${Math.round(1304 * ratio)}px, (min-width: 768px) calc((100vw - 96px) * ${ratio.toFixed(3)}), calc((100vw - 48px) * ${ratio.toFixed(3)})`}
                  {...renderSize(render)}
                  alt={`${work.title}（${work.titleEn}）を斜め上から見た図`}
                  className="block w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <Brick
                  className="absolute h-auto max-w-none"
                  style={brickOnRender(render, floorLeftOf(render))}
                  sizes="20px"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink">
                {work.title}
                <span className="text-ink-2">
                  {"　"}{formatYear(work)}　{formatSize(work)}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
};
