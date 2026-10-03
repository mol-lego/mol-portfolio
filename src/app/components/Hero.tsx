import React, { useLayoutEffect, useRef, useState } from "react";
import {
  BRICK,
  BRICK_LENGTH_CM,
  brickOnRender,
  getRender,
  renderSize,
  renderSrc,
  renderSrcSet,
} from "../renderImages";
import { formatSize, formatYear, getWork } from "../works.js";
import { Brick } from "./Brick";

const heroWork = getWork("01")!;
const QE = getRender(heroWork.render);

/*
 * 2×4 ブロックの置き場所。客船と同じ縮尺で、船首の先端の真下・船の中心線上の床に置く
 * （ブロックの底面の中心をその床の点に重ねる）。位置と幅は客船の画像に対する割合なので、
 * 画面の幅が変わっても縮尺と床の位置は崩れない。
 */
const brickPlace = brickOnRender(QE, QE.hero_brick_cm ?? QE.floor_left_cm);
const brickVars = {
  "--brick-left": brickPlace.left,
  "--brick-top": brickPlace.top,
  "--brick-width": brickPlace.width,
} as React.CSSProperties;

const QE_SIZES =
  "(min-width: 1400px) 1304px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 48px)";

/* ---------- 冒頭の演出 ---------- */

// 時間（ms）。白い画面にブロックだけ → 縮みながら船首へ → 後半で客船 → 文字
const HOLD = 400;
const MOVE = 1400;
const QE_FADE = 600;
const TEXT_FADE = 400;
const MOVE_END = HOLD + MOVE;
const END = MOVE_END + TEXT_FADE;

const INTRO_KEY = "mol:hero-intro";

const normalizePath = (path: string) => path.replace(/\/index\.html$/, "/").replace(/\/+$/, "");

// アプリを開いて最初に描いたページがトップのときだけ再生する（ほかのページから戻ったときは再生しない）
const landedOnHome =
  typeof window !== "undefined" &&
  normalizePath(window.location.pathname) === normalizePath(import.meta.env.BASE_URL);
let introClaimed = false;

/** このトップの表示で演出を再生するか。1セッション1回、動きを減らす設定では再生しない */
const claimIntro = () => {
  if (introClaimed) return false;
  introClaimed = true;
  if (!landedOnHome) return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (window.sessionStorage.getItem(INTRO_KEY)) return false;
    window.sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    return false;
  }
  return true;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** CSS の cubic-bezier と同じ曲線 */
const cubicBezier = (x1: number, y1: number, x2: number, y2: number) => {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    let t = x;
    for (let i = 0; i < 40; i += 1) {
      const value = sampleX(t);
      if (Math.abs(value - x) < 1e-6) break;
      if (value < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sampleY(t);
  };
};

const easeMove = cubicBezier(0.7, 0, 0.2, 1);

/** 最初のブロックの幅（画面幅に対する割合）。1440px で 36%、390px で 60%、その間は直線で */
const startWidthRatio = (viewportWidth: number) =>
  Math.min(0.6, Math.max(0.36, 0.6 - ((viewportWidth - 390) * 0.24) / 1050));

const useHeroIntro = (
  frameRef: React.RefObject<HTMLDivElement>,
  brickRef: React.RefObject<HTMLImageElement>,
) => {
  const [playing] = useState(claimIntro);

  // 描く前に最初のコマにする（ちらつかせない）
  useLayoutEffect(() => {
    const frame = frameRef.current;
    const brick = brickRef.current;
    if (!playing || !frame || !brick) return;

    const root = document.documentElement;
    const brickStyle = brick.style;

    // 終わりの位置と大きさ（CSS の割合で決まる通常のレイアウト）を、演出の前に測る
    const frameRect = frame.getBoundingClientRect();
    const brickRect = brick.getBoundingClientRect();
    const end = {
      left: brickRect.left - frameRect.left,
      top: brickRect.top - frameRect.top,
      width: brickRect.width,
    };
    const aspect = brickRect.height / brickRect.width;

    // 始まり: 画面の中央、作品の画素の幅が画面幅の 36〜60%
    const viewportWidth = root.clientWidth;
    const viewportHeight = window.innerHeight;
    const objectRatio = (BRICK.object_cm.right - BRICK.object_cm.left) / BRICK.w_cm;
    const startWidth = (viewportWidth * startWidthRatio(viewportWidth)) / objectRatio;
    const start = {
      left: viewportWidth / 2 - startWidth / 2 - frameRect.left,
      top: viewportHeight / 2 - (startWidth * aspect) / 2 - frameRect.top,
      width: startWidth,
    };

    let raf = 0;
    let startTime: number | null = null;
    let finished = false;

    const setFrame = (elapsed: number) => {
      // 位置と幅を同じ進み具合で動かす。transform ではなく width を変えて、毎コマその大きさで描く
      const progress = easeMove(clamp01((elapsed - HOLD) / MOVE));
      const mix = (from: number, to: number) => from + (to - from) * progress;
      brickStyle.left = `${mix(start.left, end.left)}px`;
      brickStyle.top = `${mix(start.top, end.top)}px`;
      brickStyle.width = `${mix(start.width, end.width)}px`;
      root.style.setProperty("--intro-qe", String(clamp01((elapsed - (MOVE_END - QE_FADE)) / QE_FADE)));
      root.style.setProperty("--intro-text", String(clamp01((elapsed - MOVE_END) / TEXT_FADE)));
    };

    // 終わりの状態へ。transform を使わない通常のレイアウトに戻す
    const finish = () => {
      if (finished) return;
      finished = true;
      window.cancelAnimationFrame(raf);
      removeListeners();
      brickStyle.removeProperty("left");
      brickStyle.removeProperty("top");
      brickStyle.removeProperty("width");
      brickStyle.removeProperty("opacity");
      delete root.dataset.heroIntro;
      root.style.removeProperty("--intro-qe");
      root.style.removeProperty("--intro-text");
    };

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      if (elapsed >= END) {
        finish();
        return;
      }
      setFrame(elapsed);
      raf = window.requestAnimationFrame(tick);
    };

    // スクロール・クリック・キー入力・画面の大きさの変更で、すぐ終わりの状態へ
    const skipEvents = ["wheel", "touchstart", "pointerdown", "keydown", "resize"] as const;
    const onScroll = () => {
      if (window.scrollY > 0) finish();
    };
    const addListeners = () => {
      skipEvents.forEach((type) => window.addEventListener(type, finish, { passive: true }));
      window.addEventListener("scroll", onScroll, { passive: true });
    };
    const removeListeners = () => {
      skipEvents.forEach((type) => window.removeEventListener(type, finish));
      window.removeEventListener("scroll", onScroll);
    };

    root.dataset.heroIntro = "";
    setFrame(0);
    addListeners();

    // ブロックの画像が最初のコマに間に合わなければ（0.5 秒）、演出をやめて終わりの状態を出す。
    // 画像は index.html で先に読み込み始めている
    let cancelled = false;
    if (!brick.complete) {
      brickStyle.opacity = "0";
      const timeout = window.setTimeout(finish, 500);
      brick
        .decode()
        .then(() => {
          window.clearTimeout(timeout);
          if (cancelled || finished) return;
          brickStyle.removeProperty("opacity");
          raf = window.requestAnimationFrame(tick);
        })
        .catch(finish);
    } else {
      raf = window.requestAnimationFrame(tick);
    }

    return () => {
      cancelled = true;
      finish();
    };
  }, [playing, frameRef, brickRef]);
};

/* ---------- 冒頭 ---------- */

export const Hero = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const brickRef = useRef<HTMLImageElement>(null);
  useHeroIntro(frameRef, brickRef);

  return (
    // ヘッダーの下に潜らせて、ワードマークを改修前と同じ位置（上端から 112px / 64px）に置く
    <section aria-labelledby="hero-wordmark" className="relative w-full -mt-14 md:-mt-16">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-16 pb-8 md:pb-16 min-h-[82svh] md:min-h-[90vh] flex flex-col">
        <h1
          id="hero-wordmark"
          data-intro-part="text"
          className="font-wordmark text-[3.5rem] md:text-[7rem] lg:text-[9rem] font-normal md:font-medium leading-none tracking-wide md:tracking-[0.08em] text-ink -ml-[2px] md:-ml-2 shrink-0"
        >
          mol
        </h1>

        <figure className="w-full my-auto py-12 md:my-0 md:py-0 md:mt-16">
          <div ref={frameRef} className="relative w-full" style={brickVars}>
            <img
              src={renderSrc(QE)}
              srcSet={renderSrcSet(QE)}
              sizes={QE_SIZES}
              {...renderSize(QE)}
              alt={`${heroWork.title}（${heroWork.titleEn}）を斜め上から見た図`}
              data-intro-part="qe"
              className="block w-full h-auto"
              decoding="async"
              {...{ fetchpriority: "high" }}
            />
            <Brick ref={brickRef} className="hero-brick" sizes="(min-width: 768px) 600px, 260px" />
          </div>

          <figcaption data-intro-part="text" className="mt-6 md:mt-8">
            <p className="text-sm text-ink">
              {heroWork.title}
              <span className="text-ink-2">
                {"　"}{formatYear(heroWork)}　{formatSize(heroWork)}
              </span>
            </p>
            <p className="mt-1 text-xs text-ink-2">
              船首の赤いブロックは 2×4 ブロック（長さ {BRICK_LENGTH_CM}cm）。同じ縮尺で置いています。
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
