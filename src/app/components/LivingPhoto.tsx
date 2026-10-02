import React, { useEffect, useId, useRef } from "react";

// 「静かな紙面に、作品だけが生きている」ための部品。
// 紙（文字・罫線・リンク）は動かさず、作品の写真や模型だけを動かす。

type WaterMaskMeta = {
  width: number;
  height: number;
  bbox: { x: number; y: number; width: number; height: number };
};

// 写真の水面だけが揺らぐ。建物や舟は止まったまま
export const WaterRipplePhoto = ({
  src,
  src2x,
  alt,
  mask,
  meta,
}: {
  src: string;
  src2x: string;
  alt: string;
  mask: string;
  meta: WaterMaskMeta;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { width, height, bbox } = meta;
  // SVG の image は srcset を持たないので、画素密度で出し分ける
  const href = window.devicePixelRatio > 1 ? src2x : src;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    svg.pauseAnimations();

    // 画面外では揺らぎを止めて負荷を抑える
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reducedMotion.matches) {
        svg.unpauseAnimations();
      } else {
        svg.pauseAnimations();
      }
    });
    observer.observe(svg);

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt}
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <filter
          id={`ripple-${id}`}
          filterUnits="userSpaceOnUse"
          x={bbox.x}
          y={bbox.y}
          width={bbox.width}
          height={bbox.height}
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.035"
            numOctaves="2"
            seed="4"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="10s"
              values="0.006 0.035;0.008 0.045;0.006 0.035"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <mask
          id={`water-${id}`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={width}
          height={height}
        >
          <image href={mask} width={width} height={height} />
        </mask>
      </defs>
      <image href={href} width={width} height={height} />
      <g mask={`url(#water-${id})`}>
        <image
          href={href}
          width={width}
          height={height}
          filter={`url(#ripple-${id})`}
        />
      </g>
    </svg>
  );
};

// 写真の枠からはみ出して、紙に影を落としながら浮かぶ模型
export const PopOutModel = ({
  src,
  src2x,
  className = "",
}: {
  src: string;
  src2x: string;
  className?: string;
}) => (
  <img
    src={src}
    srcSet={`${src} 1x, ${src2x} 2x`}
    alt=""
    aria-hidden="true"
    className={`living-float pointer-events-none absolute ${className}`}
    loading="lazy"
    decoding="async"
  />
);
