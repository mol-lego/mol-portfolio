import { RENDERS } from "./renders.js";

/**
 * 作品のレンダリング（scripts/make-renders.py が public/renders/ に書き出した透過 WebP）。
 * 寸法はすべて cm。画像の幅が w_cm にあたるので、表示幅 / w_cm が 1cm あたりの px になる。
 */
export type Render = {
  w_cm: number;
  h_cm: number;
  /** 外接直方体を写した矩形の幅（左右の余白 margin_cm を除く） */
  proj_w_cm: number;
  margin_cm: number;
  /** 床の基準点（外接直方体の底面の中心）。2枚を並べるときはこの点で床を合わせる */
  ref_cm: { x: number; y: number };
  /** 外接直方体の底面の、画面でいちばん左に写る隅（作品の左端の床） */
  floor_left_cm: { x: number; y: number };
  /** 作品の画素（床の影を除く）の外接矩形 */
  object_cm: { left: number; top: number; right: number; bottom: number };
  files: { src: string; w: number; h: number }[];
  /** qe だけ: 冒頭でブロックの底面の中心を置く床の点（船首の先端の真下・中心線上） */
  hero_brick_cm?: { x: number; y: number };
};

const renders = RENDERS as Record<string, Render | undefined>;

export const getRender = (key: string): Render => {
  const render = renders[key];
  if (!render) throw new Error(`renders.js に ${key} がありません`);
  return render;
};

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/** いちばん小さい書き出し（src に使う） */
export const renderSrc = (render: Render) => withBase(render.files[0].src);

export const renderSrcSet = (render: Render) =>
  render.files.map((file) => `${withBase(file.src)} ${file.w}w`).join(", ");

/** width・height 属性（縦横比を先に決めて、読み込みでレイアウトがずれないようにする） */
export const renderSize = (render: Render) => ({
  width: render.files[0].w,
  height: render.files[0].h,
});

/**
 * 2×4 ブロック（刻印なし）。作品と同じカメラ・同じ照明・同じ床で描いたもの。
 * 長い辺を正面に向けている。
 */
export const BRICK = getRender("brick");

/** ブロックの実物の長さ（2×4 の長辺、8mm × 4 スタッド） */
export const BRICK_LENGTH_CM = 3.2;

/** 2つのものを床に並べるときの間（投影した矩形どうしの間、cm） */
export const FLOOR_GAP_CM = 2;

/**
 * ブロックを、作品の画像の上で床の点 floor（作品の画像の左上からの cm）に置くときの、
 * ブロックの画像の位置と幅（作品の画像に対する %）
 */
export const brickOnRender = (render: Render, floor: { x: number; y: number }) => ({
  left: `${((floor.x - BRICK.ref_cm.x) / render.w_cm) * 100}%`,
  top: `${((floor.y - BRICK.ref_cm.y) / render.h_cm) * 100}%`,
  width: `${(BRICK.w_cm / render.w_cm) * 100}%`,
});

/** 作品の左端の床（底面の左の隅）から FLOOR_GAP_CM 左に、ブロックを置く床の点 */
export const floorLeftOf = (render: Render) => ({
  x: render.floor_left_cm.x - FLOOR_GAP_CM - BRICK.proj_w_cm / 2,
  y: render.floor_left_cm.y,
});
