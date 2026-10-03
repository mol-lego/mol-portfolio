import React, { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  BRICK,
  brickOnRender,
  floorLeftOf,
  getRender,
  renderSize,
  renderSrc,
  renderSrcSet,
} from "../renderImages";
import { getWorkBySlug, type Work } from "../works.js";
import { Brick } from "./Brick";

/** 作品名　年 / 寸法（「同じ縮尺で」と「実物大」の各図の下に置く1行） */
export const ScaleCaption = ({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) => (
  <>
    <span className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-800 tracking-[0.08em]">
      {title}
    </span>
    {meta && (
      <span className="ml-3 font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em]">
        {meta}
      </span>
    )}
  </>
);

// 大型作品4点（大きい順。slug は renders.js のキーと同じ）
const ROWS = ["qe", "yasaka", "venice", "hawaii"].map(getWorkBySlug);

// いちばん大きい客船を本文の幅いっぱいにし、ほかは同じ縮尺で縮める
const BASE = getRender("qe");

/* ---------- 客船の段の演出（ブロック → 客船） ---------- */

const SHRINK_MS = 1400;
// 客船は縮小の時間の 40% から 80% のあいだに現れる
const QE_FROM = 0.4;
const QE_TO = 0.8;
// 画像の読み込みを待つ上限。間に合わなければ演出をやめて終わりの状態にする
const READY_TIMEOUT = 1500;

/*
 * 始まりの状態の位置と幅（theme.css の [data-scale-intro="pending"] が使う）。
 * ブロックの画素の幅を画面幅の 25% にし、客船の箱の中央に置く。
 * 画面が広くても、ブロックの高さは客船の箱の高さの 80% まで。
 */
const INTRO_VARS = (() => {
  const objectRatio = (BRICK.object_cm.right - BRICK.object_cm.left) / BRICK.w_cm;
  const brickAspect = BRICK.files[0].h / BRICK.files[0].w;
  const frameAspect = BASE.files[0].h / BASE.files[0].w;
  const vw = 25 / objectRatio;
  // 幅の上限（箱の幅に対する %）: 高さ = 幅 × brickAspect ≤ 箱の高さ × 0.8
  const capPct = ((0.8 * frameAspect) / brickAspect) * 100;
  const fmt = (n: number) => n.toFixed(3);
  return {
    "--intro-w": `min(${fmt(vw)}vw, ${fmt(capPct)}%)`,
    "--intro-left": `calc(50% - min(${fmt(vw / 2)}vw, ${fmt(capPct / 2)}%))`,
    // top の % は箱の高さに対する値。上限のときの半分の高さは箱の高さの 40%
    "--intro-top": `calc(50% - min(${fmt((vw * brickAspect) / 2)}vw, 40%))`,
  } as React.CSSProperties;
})();

const imageReady = (img: HTMLImageElement) =>
  img.complete && img.naturalWidth > 0
    ? Promise.resolve()
    : new Promise<void>((resolve, reject) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => reject(new Error("image")), { once: true });
      });

/**
 * 終わりの状態（実縮尺のブロックと客船）は要素の style と class だけで決まる。
 * 演出を始められるときだけ、段に data-scale-intro="pending" を付けて始まりの状態
 * （大きなブロック、客船は透明）にし、段が画面に入ったら属性を外して終わりの状態へ
 * Web Animations で動かす。動かせないとき・失敗したときは属性を外すだけ（終わりの状態）。
 */
const useBrickIntro = (
  rowRef: React.RefObject<HTMLElement | null>,
  frameRef: React.RefObject<HTMLElement | null>,
  brickRef: React.RefObject<HTMLImageElement | null>,
  qeRef: React.RefObject<HTMLImageElement | null>,
) => {
  const inView = useInView(frameRef, {
    once: true,
    amount: 0.6,
    margin: "0px 0px -15% 0px",
  });

  // 描く前に始まりの状態にする（JS が動かなければ、何もしないので終わりの状態のまま）
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (
      reduce ||
      typeof row.animate !== "function" ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }
    row.dataset.scaleIntro = "pending";
    return () => {
      delete row.dataset.scaleIntro;
    };
  }, [rowRef]);

  useEffect(() => {
    if (!inView) return;
    const row = rowRef.current;
    const brick = brickRef.current;
    const qe = qeRef.current;
    if (!row || row.dataset.scaleIntro !== "pending") return;

    const animations: Animation[] = [];
    let cancelled = false;
    let failsafe = 0;

    const finish = () => {
      window.clearTimeout(failsafe);
      animations.forEach((animation) => animation.cancel());
      delete row.dataset.scaleIntro;
    };

    const play = () => {
      if (cancelled || !brick || !qe) return finish();
      const frame = frameRef.current!.getBoundingClientRect();
      const from = brick.getBoundingClientRect();
      // 終わりの位置は要素の style（箱に対する %）のまま
      const to = {
        left: brick.style.left,
        top: brick.style.top,
        width: brick.style.width,
      };
      delete row.dataset.scaleIntro;
      if (!(from.width > 0) || !(frame.width > 0)) return finish();

      animations.push(
        brick.animate(
          [
            {
              left: `${from.left - frame.left}px`,
              top: `${from.top - frame.top}px`,
              width: `${from.width}px`,
            },
            to,
          ],
          { duration: SHRINK_MS, easing: "cubic-bezier(0.55, 0, 0.15, 1)" },
        ),
        qe.animate(
          [
            { opacity: 0, offset: 0 },
            { opacity: 0, offset: QE_FROM, easing: "ease-in-out" },
            { opacity: 1, offset: QE_TO },
            { opacity: 1, offset: 1 },
          ],
          { duration: SHRINK_MS },
        ),
      );
      // 何があっても、少し過ぎたら終わりの状態にする
      failsafe = window.setTimeout(finish, SHRINK_MS + 1000);
    };

    if (!brick || !qe) {
      finish();
      return;
    }

    let timeout = 0;
    Promise.race([
      Promise.all([imageReady(brick), imageReady(qe)]),
      new Promise<never>((_, reject) => {
        timeout = window.setTimeout(() => reject(new Error("timeout")), READY_TIMEOUT);
      }),
    ])
      .then(() => {
        try {
          play();
        } catch {
          finish();
        }
      })
      .catch(finish)
      .finally(() => window.clearTimeout(timeout));

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      finish();
    };
  }, [inView, rowRef, frameRef, brickRef, qeRef]);
};

/** 1段: 作品のレンダリングと、左端の床の 2×4 ブロック、その下のキャプション */
const RowBody = ({
  work,
  frameRef,
  qeRef,
  brickRef,
}: {
  work: Work;
  frameRef?: React.Ref<HTMLDivElement>;
  qeRef?: React.Ref<HTMLImageElement>;
  brickRef?: React.Ref<HTMLImageElement>;
}) => {
  const render = getRender(work.slug);
  const ratio = render.w_cm / BASE.w_cm;
  const isIntro = Boolean(brickRef);

  return (
    <>
      <div ref={frameRef} className="relative" style={{ width: `${ratio * 100}%` }}>
        <img
          ref={qeRef}
          src={renderSrc(render)}
          srcSet={renderSrcSet(render)}
          sizes={`(min-width: 1400px) ${Math.round(1304 * ratio)}px, (min-width: 768px) calc((100vw - 96px) * ${ratio.toFixed(3)}), calc((100vw - 48px) * ${ratio.toFixed(3)})`}
          {...renderSize(render)}
          alt={`${work.title}（${work.titleEn}）を斜め上から見た図`}
          className={`block w-full h-auto${isIntro ? " scale-intro-qe" : ""}`}
          loading="lazy"
          decoding="async"
        />
        <Brick
          ref={brickRef}
          className={`absolute h-auto max-w-none${isIntro ? " scale-intro-brick" : ""}`}
          style={{
            ...brickOnRender(render, floorLeftOf(render)),
            ...(isIntro ? INTRO_VARS : {}),
          }}
          // 演出の始まりは画面幅の 3 割ほどで描くので、大きい画像を選ばせる
          sizes={isIntro ? "30vw" : "20px"}
          loading="lazy"
        />
      </div>
      <figcaption className="mt-4">
        <ScaleCaption title={work.title} meta={`${work.year} / ${work.size}`} />
      </figcaption>
    </>
  );
};

/**
 * 同じ縮尺で。大型作品のレンダリングを同じ 1cm あたりの px で、左に揃えて縦に積む。
 * 各段の左端の床に 2×4 ブロックを同じ縮尺で置く（作品の底面の左の隅から 2cm 左の床に、
 * ブロックの底面の中心を重ねる。同じカメラ・同じ床で描いているので、同じ床に並ぶ）。
 */
export const SameScale = () => {
  const rowRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const brickRef = useRef<HTMLImageElement>(null);
  const qeRef = useRef<HTMLImageElement>(null);
  useBrickIntro(rowRef, frameRef, brickRef, qeRef);

  return (
    <section className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-24 md:py-40 border-t border-stone-200">
      <div className="flex items-center gap-6 mb-6 md:mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-['Inter',_sans-serif] text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-900">
            Same Scale
          </h2>
          <p className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-widest">
            同じ縮尺で
          </p>
        </div>
        <div className="h-[1px] bg-stone-300 flex-1" />
      </div>

      <p className="font-['Noto_Serif_JP',_serif] text-xs md:text-sm text-stone-600 leading-relaxed tracking-[0.08em] font-light">
        大型作品4点と、各段の左端の 2×4 ブロックを同じ縮尺で描いています。
      </p>

      <div className="mt-12 md:mt-20 flex flex-col gap-12 md:gap-24">
        {ROWS.map((work, idx) =>
          idx === 0 ? (
            <figure key={work.id} ref={rowRef} className="w-full">
              <RowBody work={work} frameRef={frameRef} qeRef={qeRef} brickRef={brickRef} />
            </figure>
          ) : (
            <motion.figure
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <RowBody work={work} />
            </motion.figure>
          ),
        )}
      </div>
    </section>
  );
};
