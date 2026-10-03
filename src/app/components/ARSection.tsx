import React from "react";
import { Link } from "react-router";
import { BRICK, FLOOR_GAP_CM, getRender, renderSize, renderSrc, renderSrcSet, type Render } from "../renderImages";
import { formatSize, formatYear, worksInGroup } from "../works.js";
import { SectionHeading, textLinkClass } from "./WorkCaption";
import { Brick } from "./Brick";

// 帯に置く作品。夢の家（投影の幅 50cm・高さ 25cm）は帯の高さを決めてしまい、ほかの作品の上が
// 大きく空くので外す。帯の高さはいちばん高い歩道橋とタクシー（約 15cm）で決まる
const BAND_WORKS = worksInGroup("small").filter((work) => work.render !== "house");

/**
 * 1つの作品の場所。幅は外接直方体を写した矩形の実寸（CSS の cm）、高さは床の基準点
 * （底面の中心）まで。帯の中で下端を揃えるので、全作品の基準点が同じ高さ＝同じ床に並ぶ。
 * 画像は左右の余白の分だけ外へ出し、手前側と影は下へはみ出す。キャプションはその下に置く。
 */
const ActualItem = ({
  render,
  caption,
  children,
}: {
  render: Render;
  caption: React.ReactNode;
  children: React.ReactNode;
}) => (
  <figure className="row-span-2 grid grid-rows-subgrid">
    <div
      className="relative self-end"
      style={{ width: `${render.proj_w_cm}cm`, height: `${render.ref_cm.y}cm` }}
    >
      {children}
    </div>
    <figcaption
      className="text-sm text-ink whitespace-nowrap"
      style={{ paddingTop: `${render.h_cm - render.ref_cm.y + 0.3}cm` }}
    >
      {caption}
    </figcaption>
  </figure>
);

/** 作品の画像を、余白の分だけ左へ出して実寸の幅で置く */
const actualImageStyle = (render: Render): React.CSSProperties => ({
  left: `${-render.margin_cm}cm`,
  width: `${render.w_cm}cm`,
});

/**
 * 実物大（改修前の AR の節の位置）。小さな作品（夢の家を除く3点）のレンダリングを
 * CSS の cm で実寸の幅に置く。
 * CSS の 1cm は 96dpi 換算の 37.8px なので、画面上ではほぼ実物の大きさになる。
 * 床（底面の中心）の高さを揃え、投影した矩形の間を 2cm にした 1 本の横スクロールの帯。
 * 先頭に 2×4 ブロックも同じく 1:1 で置く。
 */
export const ARSection = () => {
  return (
    <section
      aria-labelledby="actual-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-24 md:py-40 border-t border-rule"
    >
      <SectionHeading id="actual-heading">実物大</SectionHeading>
      <p className="mt-2 text-sm text-ink-2">
        画面上でほぼ実物の大きさです（96dpi 換算）。横にスクロールできます。
      </p>

      <div
        role="region"
        aria-label="実物大の作品（横にスクロールできます）"
        tabIndex={0}
        className="mt-8 md:mt-12 overflow-x-auto"
      >
        <div
          className="grid grid-flow-col auto-cols-max grid-rows-[auto_auto] w-max pl-[1cm] pr-[1cm] pb-6"
          style={{ columnGap: `${FLOOR_GAP_CM}cm` }}
        >
          <ActualItem render={BRICK} caption="2×4 ブロック">
            <Brick
              className="absolute top-0 h-auto max-w-none"
              style={actualImageStyle(BRICK)}
              sizes="150px"
              label="2×4 ブロック"
              loading="lazy"
            />
          </ActualItem>

          {BAND_WORKS.map((work) => {
            const render = getRender(work.render);
            return (
              <ActualItem
                key={work.id}
                render={render}
                caption={
                  <>
                    {work.title}
                    <span className="text-ink-2">
                      {"　"}{formatYear(work)}　{formatSize(work)}
                    </span>
                  </>
                }
              >
                <img
                  src={renderSrc(render)}
                  srcSet={renderSrcSet(render)}
                  sizes={`${render.w_cm.toFixed(2)}cm`}
                  {...renderSize(render)}
                  alt={`${work.title}（${work.titleEn}）を斜め上から見た図`}
                  className="absolute top-0 h-auto max-w-none"
                  style={actualImageStyle(render)}
                  loading="lazy"
                  decoding="async"
                />
              </ActualItem>
            );
          })}
        </div>
      </div>

      <p className="mt-8 md:mt-10 text-sm md:text-base">
        <Link to="/ar-viewer" className={`text-ink ${textLinkClass}`}>
          大型作品は AR で実物の大きさのまま見られます
        </Link>
      </p>
    </section>
  );
};
