import React, { forwardRef } from "react";
import { BRICK, renderSize, renderSrc, renderSrcSet } from "../renderImages";

type BrickProps = {
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  /** 読み上げる名前。空なら飾りとして扱う（近くのキャプションで説明しているとき） */
  label?: string;
  loading?: "lazy" | "eager";
};

/**
 * 2×4 ブロック（刻印なし）の画像。大きさは呼ぶ側が width で決める（高さは縦横比から決まる）。
 * 縮尺は BRICK.w_cm（画像1枚が表す幅、cm）を基準に合わせる。
 */
export const Brick = forwardRef<HTMLImageElement, BrickProps>(
  ({ className = "", style, sizes = "200px", label = "", loading = "eager" }, ref) => (
    <img
      ref={ref}
      src={renderSrc(BRICK)}
      srcSet={renderSrcSet(BRICK)}
      sizes={sizes}
      {...renderSize(BRICK)}
      alt={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      draggable={false}
    />
  ),
);

Brick.displayName = "Brick";
