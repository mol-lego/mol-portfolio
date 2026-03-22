import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import profileImage from '../../assets/optimized/profile.jpg';
import profileImage2x from '../../assets/optimized/profile@2x.jpg';
import imgQE13 from '../../assets/optimized/msqe13-gallery.jpg';
import imgQE132x from '../../assets/optimized/msqe13-gallery@2x.jpg';
import about2 from '../../assets/about2.jpg';
import about3 from '../../assets/optimized/about3-gallery.jpg';
import about32x from '../../assets/optimized/about3-gallery@2x.jpg';
import about4 from '../../assets/optimized/about4-gallery.jpg';
import about42x from '../../assets/optimized/about4-gallery@2x.jpg';
import about5 from '../../assets/optimized/about5-gallery.jpg';
import about52x from '../../assets/optimized/about5-gallery@2x.jpg';
import about6 from '../../assets/optimized/about6-gallery.jpg';
import about62x from '../../assets/optimized/about6-gallery@2x.jpg';
import { useDocumentTitle } from '../useDocumentTitle';
import { useImagePreload } from '../useImagePreload';

// Aboutページ専用のフェードインコンポーネント
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className="w-full"
  >
    {children}
  </motion.div>
);

export const About = () => {
  useDocumentTitle("mol - プロフィール");
  const profileSizes = "(min-width: 1024px) 420px, (min-width: 640px) 160px, 128px";
  const isProfileReady = useImagePreload(profileImage, {
    srcSet: `${profileImage} 1x, ${profileImage2x} 2x`,
    sizes: profileSizes,
  });

  if (!isProfileReady) {
    return <main className="w-full min-h-screen bg-white" />;
  }

  return (
    <main className="w-full bg-white pb-32 pt-24 md:pt-32">
      {/* 1. 戻る導線 */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 group"
        >
          <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 group-hover:text-stone-900 tracking-widest uppercase transition-colors">
            ← Back to Home
          </span>
        </Link>
      </div>

      <article className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 w-full">
          {/* 左側：プロフィール画像＆基本情報 */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:gap-8 shrink-0 lg:sticky lg:top-32 h-fit">
            <div className="flex flex-row lg:flex-col gap-6 lg:gap-8 items-center lg:items-start w-full">
              <motion.figure
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-32 sm:w-40 lg:w-full shrink-0 aspect-square bg-stone-50 overflow-hidden relative"
              >
                <img
                  src={profileImage}
                  srcSet={`${profileImage} 1x, ${profileImage2x} 2x`}
                  sizes={profileSizes}
                  alt="mol portrait"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </motion.figure>

              <FadeIn delay={0.2}>
                <div className="flex flex-col gap-2">
                  <h1 className="font-['Inter',_sans-serif] text-3xl md:text-4xl font-light text-stone-900 tracking-wider">
                    mol
                  </h1>
                  <p className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mt-1">
                    ビルダー 
                  </p>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.3}>
              <div className="flex flex-col gap-4 pt-6 lg:pt-8 border-t border-stone-100 w-full">
                <h3 className="font-['Inter',_sans-serif] text-[10px] text-stone-400 tracking-[0.2em] uppercase">
                  Links & Social
                </h3>
                <div className="flex flex-col gap-3 font-['Inter',_sans-serif] text-xs md:text-sm tracking-widest text-stone-600">
                  <a href="https://x.com/mol_lego" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors w-fit">Twitter (X)</a>
                  <a href="https://www.instagram.com/mol_lego" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors w-fit">Instagram</a>
                  <a href="https://www.youtube.com/@mamorutanabe1136" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors w-fit">YouTube</a>
                  <a href="mailto:contact@mamorutanabe.com" className="hover:text-stone-900 transition-colors w-fit">Contact</a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 右側：バイオグラフィー・コンセプト */}
          <div className="w-full lg:w-2/3 flex flex-col gap-24 md:gap-32 mt-8 lg:mt-0 pt-8 lg:pt-0 border-t border-stone-200 lg:border-none">
            
            {/* Concept / Statement */}
            <section className="flex flex-col gap-8 w-full">
              <FadeIn>
                <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-4 border-b border-stone-200 pb-4">
                  Introduction
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="flex flex-col gap-6 md:gap-8 font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-700 leading-loose tracking-[0.08em] text-justify break-words">
                  <p>
                    3メートル級の大型のものから手のひらサイズのものまで、LEGO<sup>&reg;</sup>ブロックを使った作品を制作しています。
                  </p>
                  <p>
                    現在は東大レゴ部に所属し、個人制作に加えて共同制作も行っています。中高時代は灘校レゴ同好会に所属しており、クイーンエリザベス号（3.5万ピース）や八坂神社西楼門（5.2万ピース）などの大型作品を制作・展示してきました。
                  </p>
                  <p>
                    本サイトでは、作品それぞれの写真や制作記、メイキング映像などに加えて、作品の3Dモデルを実物大で呼び出せるAR（拡張現実）による展示を導入しています。新型コロナウイルスの影響で高校最後の文化祭がオンライン開催へと変更を余儀なくされたことをきっかけに開発したものです。
                  </p>
                  <p>
                    高校最後の展示機会の喪失をきっかけに制作活動から離れていましたが、2025年に作品制作を再開しました。展示や制作のご依頼も受け付けております。
                  </p>
                </div>
              </FadeIn>
            </section>

            {/* Profile / History */}
            <section className="flex flex-col gap-8 w-full">
              <FadeIn>
                <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-4 border-b border-stone-200 pb-4">
                  Profile & History
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="flex flex-col gap-0 w-full">
                  {[
                    { year: "2019（16歳）", text: "『クイーンエリザベス号』完成。" },
                    { year: "2020（17歳）", text: "『ハワイ火山国立公園』完成。「『レゴ®ブロック』で作った世界遺産展」に単独のビルダーとしては最年少？で作品提供。" },
                    { year: "2020（17歳）", text: "『八坂神社 西楼門』完成。オンライン文化祭にて作品のAR展示を実施。" },
                    { year: "2020（17歳）", text: "近鉄百貨店にて灘校レゴ同好会として個展を開催。以降、制作活動を休止。" },
                    { year: "2025（22歳）", text: "活動を再開。『病院のベッド』完成。" },
                    { year: "2025（22歳）", text: "初めての共同制作で『水の都 ヴェネツィア』完成。" }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col md:flex-row md:items-baseline py-6 border-b border-stone-100 gap-2 md:gap-8 w-full"
                    >
                      <span className="font-['Inter',_sans-serif] text-sm text-stone-400 tracking-wider shrink-0 w-30">
                        {item.year}
                      </span>
                      <span className="font-['Noto_Serif_JP',_serif] text-sm text-stone-800 tracking-wider leading-relaxed">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </section>

            {/* Gallery */}
            <section className="flex flex-col gap-8 w-full">
              <FadeIn>
                <h2 className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.2em] uppercase mb-4 border-b border-stone-200 pb-4">
                  Gallery
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 640: 2 }}>
                  <Masonry gutter="1.5rem">
                    {[
                      { src: imgQE13, src2x: imgQE132x, alt: "組み立ての様子"},
                      { src: about2, src2x: about2, alt: "アトリエ" },
                      { src: about3, src2x: about32x, alt: "レゴ棚" },
                      { src: about6, src2x: about62x, alt: "サグラダ・ファミリア" },
                      { src: about5, src2x: about52x, alt: "デザインした灘レゴTシャツ" },
                      { src: about4, src2x: about42x, alt: "展示会の様子" },
                    ].map((image, index) => (
                      <figure key={index} className="w-full bg-stone-100 overflow-hidden group">
                        <img
                          src={image.src}
                          srcSet={`${image.src} 1x, ${image.src2x} 2x`}
                          sizes="(min-width: 640px) 50vw, 100vw"
                          alt={image.alt}
                          className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </FadeIn>
            </section>

          </div>
        </div>
      </article>
    </main>
  );
};
