// @ts-check
/**
 * 作品データ（全8作品）
 *
 * 作品の名前・英題・完成年・寸法・ピース数・トップの写真と説明・作品詳細の主画像・AR のページは
 * ここだけに書く。Header・トップの各節・作品詳細・About・AR ビューア・OGP の生成
 * （scripts/generate-social-pages.mjs）は、このファイルから読む。
 *
 * ブラウザ（Vite）と Node（ビルド後の OGP 生成）の両方から読むため、JSDoc の型を付けた
 * JavaScript で書く。画像は new URL("…", import.meta.url) で指す。Vite はビルド時に公開用の URL に
 * 置き換え、Node ではファイルの場所（file:// の URL）になる。new URL の第1引数は文字列のまま書く
 * （Vite が置き換えられるのは文字列のときだけ）。
 */

/**
 * @typedef {object} WorkImage
 * @property {string} src      等倍（1x）の画像
 * @property {string} [src2x]  高解像度（2x）の画像
 */

/**
 * @typedef {object} MainImage
 * @property {string} src
 * @property {number} width    px（OGP の og:image:width）
 * @property {number} height   px（OGP の og:image:height）
 */

/**
 * @typedef {object} Work
 * @property {string} id        URL の番号（/work/01）
 * @property {string} slug      作品を指す名前。renders.js のキーと同じ
 * @property {string} title     作品名
 * @property {string} titleEn   英題
 * @property {number} year      完成年
 * @property {string} size      寸法（例 "全長3m"、"1m四方"、"8cm"）
 * @property {number} pieces    ピース数
 * @property {boolean} piecesApprox トップでピース数に「約」を付けるか
 * @property {"large" | "small"} group トップの節（大型作品・小さな作品）
 * @property {string} summary   トップの説明
 * @property {WorkImage} card   トップの写真
 * @property {boolean} detail   作品詳細ページがあるか（中身は pages/WorkDetail.tsx）
 * @property {MainImage} [main] 作品詳細の主画像。OGP の画像にも使う
 * @property {string} [ar]      AR の静的ページ（public/ 以下）
 * @property {string} [ogDescription] 作品詳細ページの OGP の説明文
 */

/** @type {Work[]} */
export const works = [
  {
    id: "01",
    slug: "qe",
    title: "クイーンエリザベス号",
    titleEn: "MS Queen Elizabeth",
    year: 2019,
    size: "全長3m",
    pieces: 35000,
    piecesApprox: true,
    group: "large",
    summary:
      "初めて制作した大型作品。設計・組み立てに1年を費やしました。灘校レゴ同好会時代の作品です。",
    card: {
      src: new URL("../assets/optimized/msqe2-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/msqe2-card@2x.jpg", import.meta.url).href,
    },
    detail: true,
    main: {
      src: new URL("../assets/optimized/workdetail/msqe1.jpg", import.meta.url).href,
      width: 1800,
      height: 1200,
    },
    ar: "/ar/qe/index.html",
    ogDescription:
      "世界有数の豪華客船「クイーンエリザベス号」を1/100スケールで再現した大型のブロック作品。",
  },
  {
    id: "02",
    slug: "venice",
    title: "ヴェネツィア",
    titleEn: "Venice",
    year: 2025,
    size: "1m四方",
    pieces: 50000,
    piecesApprox: true,
    group: "large",
    summary:
      "灘レゴOB・現東大レゴ部の4人での合作。街並みの窓・扉だけで100種類を超えるデザインを使っています。東大の駒場祭をはじめ各地で展示しました。",
    card: {
      src: new URL("../assets/optimized/venice1-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/venice1-card@2x.jpg", import.meta.url).href,
    },
    detail: true,
    main: {
      src: new URL("../assets/optimized/workdetail/venice1.jpg", import.meta.url).href,
      width: 1800,
      height: 1200,
    },
    ar: "/ar/venice/index.html",
    ogDescription:
      "イタリア北部に浮かぶヴェネツィアの街並みをブロックで再現したミニフィグスケールの共同制作作品。",
  },
  {
    id: "03",
    slug: "yasaka",
    title: "八坂神社 西楼門",
    titleEn: "Yasaka Shrine West Gate", // 本人確認済み（2026-10-03）
    year: 2020,
    // 設計データ（Stud.io の「八坂 Full-2.io」）の部品の形状から実測した外接直方体（2026-10-03）:
    // 幅 233.6 × 奥行 85.1 × 高さ 65.4 cm（1 LDU = 0.4 mm）。全幅は門を正面から見た左右で、両脇の翼廊を含む
    size: "全幅2.3m",
    pieces: 52000, // 本人確認済み（2026-10-03）
    piecesApprox: false,
    group: "large",
    summary: "京都・祇園の象徴的な存在とも言える楼門。灘校レゴ同好会時代の作品。",
    card: {
      src: new URL("../assets/yasaka3.jpeg", import.meta.url).href,
    },
    detail: true,
    main: {
      src: new URL("../assets/optimized/workdetail/yasaka1.jpg", import.meta.url).href,
      width: 1800,
      height: 1199,
    },
    ar: "/ar/yasaka/index.html",
    ogDescription:
      "京都・祇園の八坂神社 西楼門を52,000ピースのブロックで再現した大型作品。",
  },
  {
    id: "04",
    slug: "hawaii",
    title: "ハワイ火山国立公園",
    titleEn: "Hawaii Volcanoes National Park", // 本人確認済み（2026-10-03）
    year: 2020, // 本人確認済み（2026-10-03）
    size: "直径1m",
    pieces: 10000,
    piecesApprox: true,
    group: "large",
    summary:
      "ハワイ諸島の火山を再現した作品。初めてご依頼をいただいて制作した作品であり、電飾が施されています。「『レゴ®ブロック』で作った世界遺産展」に参加しました。",
    card: {
      src: new URL("../assets/optimized/hawaii1-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/hawaii1-card@2x.jpg", import.meta.url).href,
    },
    detail: true,
    main: {
      src: new URL("../assets/optimized/workdetail/hawaii2.jpg", import.meta.url).href,
      width: 1800,
      height: 1200,
    },
    ar: "/ar/hawaii/index.html",
    ogDescription: "世界遺産・ハワイ火山国立公園をブロックで再現したジオラマ作品。",
  },
  {
    id: "05",
    slug: "bed",
    title: "病院のベッド",
    titleEn: "Hospital Bed",
    year: 2025,
    size: "8cm",
    pieces: 127,
    piecesApprox: false,
    group: "small",
    summary:
      "味気ない入院生活もブロックの世界なら楽しくなるかな？と思って作りました。5年ぶりに公開した復帰作です。",
    card: {
      src: new URL("../assets/optimized/hospital-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/hospital-card@2x.jpg", import.meta.url).href,
    },
    detail: false,
  },
  {
    id: "06",
    slug: "overpass",
    title: "歩道橋とタクシー",
    titleEn: "Overpass & Taxi",
    year: 2025,
    size: "8cm",
    pieces: 255,
    piecesApprox: false,
    group: "small",
    summary:
      "どこにでもありそうな何気ない風景です。見る人によって想像する時間帯が変わりそうです。",
    card: {
      src: new URL("../assets/optimized/overpass-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/overpass-card@2x.jpg", import.meta.url).href,
    },
    detail: false,
  },
  {
    id: "07",
    slug: "castle",
    title: "小さなお城",
    titleEn: "Mini Castle",
    year: 2021,
    size: "8cm",
    pieces: 202,
    piecesApprox: false,
    group: "small",
    summary:
      "特にモデルはありませんが、関西人なので姫路城と大阪城を無意識に思い出していたかもしれません。活動休止中の作品なのでこれまで未公開でした。大学4年間で唯一の作品です。",
    card: {
      src: new URL("../assets/optimized/castle-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/castle-card@2x.jpg", import.meta.url).href,
    },
    detail: false,
  },
  {
    id: "08",
    slug: "house",
    title: "夢の家",
    titleEn: "Dream House",
    year: 2025,
    size: "40cm",
    pieces: 2300,
    piecesApprox: false,
    group: "small",
    summary:
      "お花に囲まれたお庭でアフターヌーンティをしたい……　という思いで作りました。",
    card: {
      src: new URL("../assets/optimized/dreamhouse-card.jpg", import.meta.url).href,
      src2x: new URL("../assets/optimized/dreamhouse-card@2x.jpg", import.meta.url).href,
    },
    detail: false,
  },
];

/** @param {string | undefined} id */
export const getWork = (id) => works.find((work) => work.id === id);

/** @param {string} slug */
export const getWorkBySlug = (slug) => {
  const work = works.find((item) => item.slug === slug);
  if (!work) throw new Error(`works.js に ${slug} がありません`);
  return work;
};

/** @param {Work["group"]} group */
export const worksInGroup = (group) => works.filter((work) => work.group === group);

/** 作品詳細ページのある作品（Header の Works、作品詳細の前後、OGP） */
export const detailWorks = works.filter((work) => work.detail);

/** AR で見られる作品（AR ビューア） */
export const arWorks = works.filter((work) => Boolean(work.ar));

/** @param {number} count 例: 35000 → "35,000" */
export const formatCount = (count) => count.toLocaleString("en-US");

/** @param {Work} work トップの表記。例: "約35,000ピース"、"127ピース" */
export const formatPieces = (work) =>
  `${work.piecesApprox ? "約" : ""}${formatCount(work.pieces)}ピース`;

/** @param {Work} work 万を単位にした表記。例: 35000 → "3.5万ピース" */
export const formatPiecesInMan = (work) => `${work.pieces / 10000}万ピース`;

/** @param {Work} work トップの Scale の欄。例: "全長3m / 約35,000ピース" */
export const formatScale = (work) => `${work.size} / ${formatPieces(work)}`;

/** 小さな作品の寸法の範囲。cm で書いた寸法から求める。例: "8〜40cm" */
export const smallWorksSizeRange = () => {
  const sizes = worksInGroup("small")
    .map((work) => /^(\d+(?:\.\d+)?)cm$/.exec(work.size))
    .filter((match) => match !== null)
    .map((match) => Number(match[1]));
  return `${Math.min(...sizes)}〜${Math.max(...sizes)}cm`;
};

/** @param {WorkImage} image img の srcSet（1x・2x） */
export const cardSrcSet = (image) =>
  image.src2x ? `${image.src} 1x, ${image.src2x} 2x` : undefined;
