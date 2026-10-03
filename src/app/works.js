// @ts-check
/**
 * 作品データ（全8作品）
 *
 * Header・トップの各章・作品詳細・AR ビューア・routes・OGP の生成
 * （scripts/generate-social-pages.mjs）は、作品の名前・年・寸法・ピース数・画像を
 * すべてこのファイルから読む。値を直すときはここだけを直す。
 *
 * 本人の確認が要る項目（いまの値は作品詳細ページの記載に合わせてある）
 * - ハワイ火山国立公園の完成年: 2020（以前のトップの表記は 2021）
 * - 八坂神社 西楼門の大きさとピース数: 全幅 2.3m・52,000ピース（以前のトップの表記は 2.5m・約50,000ピース）
 * - 病院のベッドのピース数: 127
 * - クイーンエリザベス号のピース数: 約35,000
 * - ハワイ火山国立公園のピース数: 約10,000
 * - ヴェネツィアのトップ用の一文: 評価語（「こだわりがたくさん」）を外した仮の文
 *
 * このファイルはブラウザ（Vite）と Node（ビルド後の OGP 生成）の両方から読むため、
 * TypeScript ではなくプレーンな JavaScript で書いている。
 * 画像は new URL("…", import.meta.url) で指す。Vite はビルド時に公開用の URL へ置き換え、
 * Node ではファイルの場所（file:// URL）になる。new URL の第1引数は文字列リテラルのまま書くこと
 * （変数にすると Vite が assets 以下の全ファイルを書き出してしまう）。
 */

/**
 * @typedef {object} WorkImage
 * @property {string} src     1x の画像
 * @property {string} [src2x] 2x の画像（幅は width の2倍）
 * @property {number} width   1x の画像の幅（px）
 * @property {number} height  1x の画像の高さ（px）
 * @property {string} [thumbPosition] 小さな作品の一覧の正方形サムネイルで、作品が切れないようにする object-position
 */

/**
 * @typedef {object} Work
 * @property {string} id        URL に使う番号（/work/01）。既存の URL を保つため番号のまま
 * @property {string} slug      作品を指す名前
 * @property {string} title     作品名
 * @property {string} titleEn   英題（画面には出さず、alt と OGP に使う）
 * @property {number} year      完成年
 * @property {{ measure?: "全長" | "全幅" | "直径" | "四方", value: string }} size 寸法
 * @property {{ count: number, approx: boolean }} pieces ピース数
 * @property {"featured" | "large" | "small"} group トップの章（代表作・大型作品・小さな作品）
 * @property {string} summary   トップ用の一文（本人の言葉）
 * @property {WorkImage} image  トップに出す写真
 * @property {WorkImage} [mainImage] 作品詳細の主画像。OGP の画像にも使う
 * @property {string} [ar]      AR の静的ページ（public/ 以下）
 * @property {boolean} detail   作品詳細ページがあるか。中身は pages/WorkDetail.tsx の WORK_DETAILS[slug]
 * @property {string} [ogDescription] 作品詳細ページの OGP の説明文
 */

/** @type {Work[]} */
export const works = [
  {
    id: "01",
    slug: "queen-elizabeth",
    title: "クイーンエリザベス号",
    titleEn: "MS Queen Elizabeth",
    year: 2019,
    size: { measure: "全長", value: "3m" },
    pieces: { count: 35000, approx: true },
    group: "featured",
    summary:
      "初めて制作した大型作品。設計・組み立てに1年を費やしました。灘校レゴ同好会時代の作品です。",
    image: {
      src: new URL("../assets/optimized/msqe2-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/msqe2-card@2x.jpg", import.meta.url).href,
      width: 900,
      height: 600,
    },
    mainImage: {
      src: new URL("../assets/optimized/workdetail/msqe1.jpg", import.meta.url).href,
      width: 1800,
      height: 1200,
    },
    ar: "/ar/qe/index.html",
    detail: true,
    ogDescription:
      "世界有数の豪華客船「クイーンエリザベス号」を1/100スケールで再現した大型LEGO®︎作品。",
  },
  {
    id: "02",
    slug: "venice",
    title: "ヴェネツィア",
    titleEn: "Venice",
    year: 2025,
    size: { measure: "四方", value: "1m" },
    pieces: { count: 50000, approx: true },
    group: "featured",
    summary:
      "灘レゴOB・現東大レゴ部の4人での合作。街並みの細部を作り込みました。東大での学祭を中心に各地で展示予定です。",
    image: {
      src: new URL("../assets/optimized/venice1-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/venice1-card@2x.jpg", import.meta.url).href,
      width: 900,
      height: 600,
    },
    mainImage: {
      src: new URL("../assets/optimized/workdetail/venice1.jpg", import.meta.url).href,
      width: 1800,
      height: 1200,
    },
    ar: "/ar/venice/index.html",
    detail: true,
    ogDescription:
      "イタリア北部に浮かぶヴェネツィアの街並みをLEGO®︎で再現したミニフィグスケールの共同制作作品。",
  },
  {
    id: "03",
    slug: "yasaka",
    title: "八坂神社 西楼門",
    titleEn: "Yasaka Shrine West Gate",
    year: 2020,
    size: { measure: "全幅", value: "2.3m" },
    pieces: { count: 52000, approx: false },
    group: "large",
    summary: "京都・祇園の象徴的な存在とも言える楼門。灘校レゴ同好会時代の作品。",
    image: {
      src: new URL("../assets/yasaka3.jpeg", import.meta.url).href,
      width: 1938,
      height: 1090,
    },
    mainImage: {
      src: new URL("../assets/optimized/workdetail/yasaka1.jpg", import.meta.url).href,
      width: 1800,
      height: 1199,
    },
    ar: "/ar/yasaka/index.html",
    detail: true,
    ogDescription:
      "京都・祇園の八坂神社 西楼門を52,000ピースのLEGO®︎ブロックで再現した大型作品。",
  },
  {
    id: "04",
    slug: "hawaii",
    title: "ハワイ火山国立公園",
    titleEn: "Hawaii Volcanoes National Park",
    year: 2020,
    size: { measure: "直径", value: "1m" },
    pieces: { count: 10000, approx: true },
    group: "large",
    summary:
      "ハワイ諸島の火山を再現した作品。初めてご依頼をいただいて制作した作品であり、電飾が施されています。「『レゴ®ブロック』で作った世界遺産展」に参加しました。",
    image: {
      src: new URL("../assets/optimized/hawaii1-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/hawaii1-card@2x.jpg", import.meta.url).href,
      width: 900,
      height: 600,
    },
    mainImage: {
      src: new URL("../assets/optimized/workdetail/hawaii2.jpg", import.meta.url).href,
      width: 1800,
      height: 1200,
    },
    ar: "/ar/hawaii/index.html",
    detail: true,
    ogDescription:
      "世界遺産・ハワイ火山国立公園をLEGO®︎ブロックで再現したジオラマ作品。",
  },
  {
    id: "05",
    slug: "hospital-bed",
    title: "病院のベッド",
    titleEn: "Hospital Bed",
    year: 2025,
    size: { value: "8cm" },
    pieces: { count: 127, approx: false },
    group: "small",
    summary:
      "味気ない入院生活もレゴの世界なら楽しくなるかな？と思って作りました。5年ぶりに公開した復帰作です。",
    image: {
      src: new URL("../assets/optimized/hospital-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/hospital-card@2x.jpg", import.meta.url).href,
      width: 900,
      height: 600,
      thumbPosition: "50% 50%",
    },
    detail: false,
  },
  {
    id: "06",
    slug: "overpass-taxi",
    title: "歩道橋とタクシー",
    titleEn: "Overpass & Taxi",
    year: 2025,
    size: { value: "8cm" },
    pieces: { count: 255, approx: false },
    group: "small",
    summary:
      "どこにでもありそうな何気ない風景です。見る人によって想像する時間帯が変わりそうです。",
    image: {
      src: new URL("../assets/optimized/overpass-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/overpass-card@2x.jpg", import.meta.url).href,
      width: 466,
      height: 700,
      thumbPosition: "50% 55%",
    },
    detail: false,
  },
  {
    id: "07",
    slug: "mini-castle",
    title: "小さなお城",
    titleEn: "Mini Castle",
    year: 2021,
    size: { value: "8cm" },
    pieces: { count: 202, approx: false },
    group: "small",
    summary:
      "特にモデルはありませんが、関西人なので姫路城と大阪城を無意識に思い出していたかもしれません。活動休止中の作品なのでこれまで未公開でした。大学4年間で唯一の作品です。",
    image: {
      src: new URL("../assets/optimized/castle-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/castle-card@2x.jpg", import.meta.url).href,
      width: 900,
      height: 600,
      thumbPosition: "50% 50%",
    },
    detail: false,
  },
  {
    id: "08",
    slug: "dream-house",
    title: "夢の家",
    titleEn: "Dream House",
    year: 2025,
    size: { value: "40cm" },
    pieces: { count: 2300, approx: false },
    group: "small",
    summary:
      "お花に囲まれたお庭でアフターヌーンティをしたい……　という思いで作りました。",
    image: {
      src: new URL("../assets/optimized/dreamhouse-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/dreamhouse-card@2x.jpg", import.meta.url).href,
      width: 900,
      height: 600,
      // 横に広い庭は正方形に収まらないため、家を残して右端の庭を切る
      thumbPosition: "30% 50%",
    },
    detail: false,
  },
];

/** @param {string | undefined} id */
export const getWork = (id) => works.find((work) => work.id === id);

/** @param {Work["group"]} group */
export const worksInGroup = (group) => works.filter((work) => work.group === group);

/** 作品詳細ページのある作品（Header のメニュー、作品詳細の前後の移動、routes、OGP） */
export const detailWorks = works.filter((work) => work.detail);

/** AR で見られる作品 */
export const arWorks = works.filter((work) => Boolean(work.ar));

/** 小さな作品の寸法の幅（例: "8cm〜40cm"）。cm 表記の作品から計算する */
export const smallWorksSizeRange = () => {
  const sizes = worksInGroup("small")
    .map((work) => Number.parseFloat(work.size.value))
    .filter((value) => Number.isFinite(value));
  return `${Math.min(...sizes)}cm〜${Math.max(...sizes)}cm`;
};

/** @param {Work} work 例: "2019年" */
export const formatYear = (work) => `${work.year}年`;

/** @param {Work} work 例: "全長 3m"、"1m四方"、"8cm" */
export const formatSize = (work) => {
  const { measure, value } = work.size;
  if (!measure) return value;
  if (measure === "四方") return `${value}四方`;
  return `${measure} ${value}`;
};

/** @param {number} count */
export const formatCount = (count) => count.toLocaleString("en-US");

/** @param {Work} work 例: "約35,000ピース" */
export const formatPieces = (work) =>
  `${work.pieces.approx ? "約" : ""}${formatCount(work.pieces.count)}ピース`;

/**
 * 写真の下の1行の、作品名に続く部分。例: "2019年　全長 3m・約35,000ピース"
 * @param {Work} work
 */
export const formatCaption = (work) =>
  `${formatYear(work)}　${formatSize(work)}・${formatPieces(work)}`;

/**
 * img の srcSet（幅の記述子つき）
 * @param {WorkImage} image
 */
export const imageSrcSet = (image) =>
  image.src2x
    ? `${image.src} ${image.width}w, ${image.src2x} ${image.width * 2}w`
    : `${image.src} ${image.width}w`;
