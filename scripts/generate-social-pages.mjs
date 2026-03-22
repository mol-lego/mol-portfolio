import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(".");
const distDir = resolve(rootDir, "dist");
const distIndexPath = resolve(distDir, "index.html");
const cnamePath = resolve(rootDir, "public", "CNAME");
const siteDomain = readFileSync(cnamePath, "utf8").trim();
const siteUrl = `https://${siteDomain}`;

const defaultDescription =
  "molのLEGO®︎作品をまとめています。写真や制作プロセスに加えて、ARを使って実物大で作品をご覧いただけます！";

const pages = [
  {
    path: "/about/",
    title: "mol - プロフィール",
    description:
      "molのプロフィール、制作歴、展示会での活動記録を紹介しています。",
    ogImageSource: "src/assets/card.png",
    ogImagePath: "/card.png",
    width: 1200,
    height: 630,
    imageType: "image/png",
    imageAlt: "mol profile card",
  },
  {
    path: "/process/",
    title: "mol - 制作プロセス",
    description:
      "設計、パーツ購入、組み立て、展示まで、作品制作のプロセスを紹介しています。",
    ogImageSource: "src/assets/card.png",
    ogImagePath: "/card.png",
    width: 1200,
    height: 630,
    imageType: "image/png",
    imageAlt: "mol process card",
  },
];

const works = [
  {
    id: "01",
    title: "クイーンエリザベス号",
    description:
      "世界有数の豪華客船「クイーンエリザベス号」を1/100スケールで再現した大型LEGO®︎作品。",
    ogImageSource: "src/assets/optimized/workdetail/msqe1.jpg",
    ogImagePath: "/og/work-01.jpg",
    width: 1800,
    height: 1200,
    imageType: "image/jpeg",
  },
  {
    id: "02",
    title: "ヴェネツィア",
    description:
      "イタリア北部に浮かぶヴェネツィアの街並みをLEGO®︎で再現したミニフィグスケールの共同制作作品。",
    ogImageSource: "src/assets/optimized/workdetail/venice1.jpg",
    ogImagePath: "/og/work-02.jpg",
    width: 1800,
    height: 1200,
    imageType: "image/jpeg",
  },
  {
    id: "03",
    title: "八坂神社 西楼門",
    description:
      "京都・祇園の八坂神社 西楼門を52,000ピースのLEGO®︎ブロックで再現した大型作品。",
    ogImageSource: "src/assets/optimized/workdetail/yasaka1.jpg",
    ogImagePath: "/og/work-03.jpg",
    width: 1800,
    height: 1199,
    imageType: "image/jpeg",
  },
  {
    id: "04",
    title: "ハワイ火山国立公園",
    description:
      "世界遺産・ハワイ火山国立公園をLEGO®︎ブロックで再現したジオラマ作品。",
    ogImageSource: "src/assets/optimized/workdetail/hawaii2.jpg",
    ogImagePath: "/og/work-04.jpg",
    width: 1800,
    height: 1200,
    imageType: "image/jpeg",
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

const buildPageHtml = (template, page) => {
  const pageUrl = `${siteUrl}${page.path}`;
  const title = page.title;
  const description = page.description || defaultDescription;
  const imageUrl = `${siteUrl}${page.ogImagePath}`;

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
    /<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:secure_url" content="${imageUrl}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:type" content="${page.imageType}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image:width"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:width" content="${page.width}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image:height"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:height" content="${page.height}" />`,
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}" />`,
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
  html = replaceTag(
    html,
    /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:image:alt" content="${escapeHtml(page.imageAlt)}" />`,
  );

  return html;
};

const main = () => {
  const template = readFileSync(distIndexPath, "utf8");
  const ogDir = resolve(distDir, "og");

  mkdirSync(ogDir, { recursive: true });

  for (const page of pages) {
    if (page.ogImageSource.startsWith("src/")) {
      cpSync(resolve(rootDir, page.ogImageSource), resolve(distDir, page.ogImagePath.slice(1)));
    }

    const pageDir = resolve(distDir, page.path.slice(1));
    mkdirSync(pageDir, { recursive: true });

    const pageHtml = buildPageHtml(template, page);
    writeFileSync(resolve(pageDir, "index.html"), pageHtml);
  }

  for (const work of works) {
    cpSync(resolve(rootDir, work.ogImageSource), resolve(distDir, work.ogImagePath.slice(1)));

    const page = {
      ...work,
      path: `/work/${work.id}/`,
      title: `mol - ${work.title}`,
      imageAlt: work.title,
    };
    const pageDir = resolve(distDir, "work", work.id);
    mkdirSync(pageDir, { recursive: true });

    const pageHtml = buildPageHtml(template, page);
    writeFileSync(resolve(pageDir, "index.html"), pageHtml);
  }
};

main();
