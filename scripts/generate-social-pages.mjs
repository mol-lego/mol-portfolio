import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(".");
const distDir = resolve(rootDir, "dist");
const distIndexPath = resolve(distDir, "index.html");
const cnamePath = resolve(rootDir, "public", "CNAME");
const siteDomain = readFileSync(cnamePath, "utf8").trim();
const siteUrl = `https://${siteDomain}`;

const defaultDescription =
  "molの建築・空間デザインのポートフォリオサイト。作品紹介、制作プロセス、ARビューを掲載。";

const works = [
  {
    id: "01",
    title: "クイーンエリザベス号",
    description:
      "世界有数の豪華客船「クイーンエリザベス号」を1/100スケールで再現した大型作品。",
    ogImageSource: "src/assets/optimized/workdetail/msqe1.jpg",
    ogImagePath: "/og/work-01.jpg",
    width: 1800,
    height: 1200,
  },
  {
    id: "02",
    title: "ヴェネツィア",
    description:
      "イタリア北部に浮かぶヴェネツィアをミニフィグスケールで再現した共同制作作品。",
    ogImageSource: "src/assets/optimized/workdetail/venice1.jpg",
    ogImagePath: "/og/work-02.jpg",
    width: 1800,
    height: 1200,
  },
  {
    id: "03",
    title: "八坂神社 西楼門",
    description:
      "京都・祇園の八坂神社 西楼門を52,000ピースで再現した大型作品。",
    ogImageSource: "src/assets/optimized/workdetail/yasaka1.jpg",
    ogImagePath: "/og/work-03.jpg",
    width: 1800,
    height: 1199,
  },
  {
    id: "04",
    title: "ハワイ火山国立公園",
    description:
      "世界遺産・ハワイ火山国立公園をレゴブロックで再現したジオラマ作品。",
    ogImageSource: "src/assets/optimized/workdetail/hawaii2.jpg",
    ogImagePath: "/og/work-04.jpg",
    width: 1800,
    height: 1200,
  },
];

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    throw new Error(`Pattern not found: ${pattern}`);
  }

  return html.replace(pattern, replacement);
};

const buildPageHtml = (template, work) => {
  const pageUrl = `${siteUrl}/work/${work.id}/`;
  const title = `mol - ${work.title}`;
  const description = work.description || defaultDescription;
  const imageUrl = `${siteUrl}${work.ogImagePath}`;

  let html = template;
  html = replaceTag(
    html,
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  );
  html = replaceTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${pageUrl}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${pageUrl}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${imageUrl}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image:width"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:width" content="${work.width}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image:height"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:height" content="${work.height}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:alt" content="${escapeHtml(work.title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${imageUrl}" />`,
  );

  return html;
};

const main = () => {
  const template = readFileSync(distIndexPath, "utf8");
  const ogDir = resolve(distDir, "og");

  mkdirSync(ogDir, { recursive: true });

  for (const work of works) {
    cpSync(resolve(rootDir, work.ogImageSource), resolve(distDir, work.ogImagePath.slice(1)));

    const pageDir = resolve(distDir, "work", work.id);
    mkdirSync(pageDir, { recursive: true });

    const pageHtml = buildPageHtml(template, work);
    writeFileSync(resolve(pageDir, "index.html"), pageHtml);
  }
};

main();
