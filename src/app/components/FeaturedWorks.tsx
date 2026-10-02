import React from "react";
import { Link } from "react-router";
import imgQE2 from "../../assets/optimized/msqe2-card.jpg";
import imgQE22x from "../../assets/optimized/msqe2-card@2x.jpg";
import imgVenezia from "../../assets/optimized/venice1-card.jpg";
import imgVenezia2x from "../../assets/optimized/venice1-card@2x.jpg";
import imgQECutout from "../../assets/optimized/living/msqe-cutout.png";
import imgQECutout2x from "../../assets/optimized/living/msqe-cutout@2x.png";
import veniceWaterMask from "../../assets/optimized/living/venice1-card-water-mask.png";
import veniceWaterMeta from "../../assets/optimized/living/venice1-card-water-mask.json";
import { PopOutModel, WaterRipplePhoto } from "./LivingPhoto";

const FEATURED = [
  {
    id: "01",
    prefix: "豪華客船",
    title: "クイーンエリザベス号",
    subtitle: "MS Queen Elizabeth",
    year: "2019",
    pieces: "約35,000ピース",
    size: "全長3m",
    desc: "初めて制作した大型作品。設計・組み立てに1年を費やしました。灘校レゴ同好会時代の作品です。",
    image: imgQE2,
    image2x: imgQE22x,
    living: "pop-out",
    isRightAligned: false,
  },
  {
    id: "02",
    prefix: "水の都",
    title: "ヴェネツィア",
    subtitle: "Venice",
    year: "2025",
    pieces: "約50,000ピース",
    size: "1m四方",
    desc: "灘レゴOB・現東大レゴ部の4人での合作。緻密な街並みの表現にはこだわりがたくさん。東大での学祭を中心に各地で展示予定です。",
    image: imgVenezia,
    image2x: imgVenezia2x,
    living: "water",
    isRightAligned: true,
  },
];

export const FeaturedWorks = () => {
  return (
    <section className="px-6 md:px-12 w-full max-w-[1400px] mx-auto pt-20 pb-32 md:pt-16 md:pb-64">
      <div className="flex items-center gap-6 mb-6 md:mb-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-['Inter',_sans-serif] text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-900">
            Featured Works
          </h2>
          <p className="font-['Noto_Serif_JP',_serif] text-[10px] md:text-xs text-stone-500 tracking-widest">
            代表作
          </p>
        </div>
        <div className="h-[1px] bg-stone-300 flex-1" />
      </div>

      <div className="flex flex-col gap-40 md:gap-64">
        {FEATURED.map((work) => (
          <article
            key={work.id}
            className={`relative w-full flex flex-col lg:flex-row gap-6 lg:gap-32 items-center ${work.isRightAligned ? "lg:flex-row-reverse" : ""}`}
          >
            {/* 写真は印刷されたまま。生きているのは作品だけ */}
            <div className="relative w-full lg:flex-1 min-w-0">
              <Link
                to={`/work/${work.id}`}
                className="block aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden bg-stone-100 relative"
              >
                {work.living === "water" ? (
                  <WaterRipplePhoto
                    src={work.image}
                    src2x={work.image2x}
                    alt={work.title}
                    mask={veniceWaterMask}
                    meta={veniceWaterMeta}
                  />
                ) : (
                  <img
                    src={work.image}
                    srcSet={`${work.image} 1x, ${work.image2x} 2x`}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt={work.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </Link>
              {work.living === "pop-out" && (
                <PopOutModel
                  src={imgQECutout}
                  src2x={imgQECutout2x}
                  className="w-[48%] -right-[3%] -bottom-[16%] lg:-right-[8%] lg:-bottom-[18%]"
                />
              )}
            </div>

            <div className="w-full lg:w-max lg:shrink-0 flex flex-col pt-2 lg:pt-0">
              <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] mb-4 lg:mb-16 block border-b border-stone-200 pb-2 lg:pb-4">
                No. {work.id}
              </span>

              <div className="flex flex-col mb-6 lg:mb-12">
                <span className="font-['Noto_Serif_JP',_serif] text-sm lg:text-xl text-stone-800 tracking-[0.3em] font-medium pl-1">
                  {work.prefix}
                </span>
                <h3 className="font-['Noto_Serif_JP',_serif] text-[clamp(1.5rem,6vw,2.5rem)] lg:text-[clamp(1.75rem,7vw,2.5rem)] font-light text-stone-900 leading-tight tracking-[0.05em] whitespace-nowrap mt-1 lg:mt-2">
                  {work.title}
                </h3>
                <h4 className="font-['Inter',_sans-serif] text-xs lg:text-base text-stone-400 tracking-[0.2em] font-light mt-1 lg:mt-4 pl-1">
                  {work.subtitle}
                </h4>
              </div>

              <div className="w-full lg:w-[360px] xl:w-[400px]">
                {/* 美術館の作品キャプションと同じく、ラベルを付けず決まった順に並べる */}
                <p className="font-['Noto_Serif_JP',_serif] text-xs lg:text-sm text-stone-700 leading-[1.9] tracking-[0.04em]">
                  {work.year}年
                  <br />
                  LEGO<sup>&reg;</sup>ブロック、{work.pieces}
                  <br />
                  {work.size}
                </p>

                <p className="font-['Noto_Serif_JP',_serif] text-xs lg:text-base text-stone-600 mt-6 lg:mt-12 leading-relaxed lg:leading-loose tracking-[0.08em] font-light text-justify">
                  {work.desc}
                </p>

                <Link
                  to={`/work/${work.id}`}
                  className="mt-8 lg:mt-12 inline-block w-fit font-['Noto_Serif_JP',_serif] text-sm lg:text-base text-stone-900 tracking-[0.06em] underline decoration-stone-300 underline-offset-[6px] transition-colors hover:decoration-stone-900"
                >
                  作品ページへ →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
