import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import imgProcess1 from "../../assets/optimized/process/process1.jpg";
import imgProcess2 from "../../assets/optimized/process/process2.jpg";
import imgProcess3 from "../../assets/optimized/process/process3.jpg";
import imgProcess4 from "../../assets/optimized/process/process4.jpg";
import imgProcess5 from "../../assets/optimized/process/process5.jpg";
import imgYasaka10 from "../../assets/optimized/workdetail/yasaka10.jpg";
import imgProcess6 from "../../assets/optimized/process/process6.jpg";
import imgVenice1 from "../../assets/optimized/workdetail/venice1.jpg";
import imgVenice12 from "../../assets/optimized/process/venice12.jpg";
import imgQE4 from "../../assets/optimized/workdetail/msqe4.jpg";
import { useDocumentTitle } from "../useDocumentTitle";

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

export const Process = () => {
  useDocumentTitle("mol - 制作プロセス");

  const steps = [
    {
      id: "01",
      enTitle: "Design",
      jpTitle: "設計ソフトでの設計",
      desc: "まずは「studio」という専用の3D設計ソフトを使用して、パソコン上で設計を行います。画面の中で、どこにどのパーツを配置するか一つずつ決めていきます。大型の作品では数百時間を要する、根気のいる作業です。",
      images: [
        imgProcess1,
        imgProcess2
      ],
    },
    {
      id: "02",
      enTitle: "Export",
      jpTitle: "パーツリストの出力",
      desc: "設計が完了したら、作品に使用したすべてのパーツデータ（形状、色、数量）を出力します。作品によっては数千種類・数万ピースにおよぶ長いリストになります。",
      images: [imgProcess3],
    },
    {
      id: "03",
      enTitle: "Purchase",
      jpTitle: "パーツ購入",
      desc: "出力したパーツリストをBricklinkという民間のレゴ流通サイトに読み込ませ、必要なパーツの購入を手配します。サイトに登録している数あるセラーから、在庫や価格を考慮しながら最適な組み合わせを提案してくれます。",
      images: [imgProcess4],
    },
    {
      id: "04",
      enTitle: "Arrival",
      jpTitle: "海外のセラーからパーツが到着",
      desc: "一つのショップで全てのパーツが揃うことは稀で、複数のセラーから分割して購入します。大型の作品ではヨーロッパ・北米・アジアの十数か国から取り寄せることになる時もあります。数週間かけて世界中から続々と小包が届きます。",
      images: [imgProcess5],
    },
    {
      id: "05",
      enTitle: "Assembly",
      jpTitle: "組み立て",
      desc: "手元にパーツがすべて揃ったら、最初に作成したstudioの設計図を見ながら、実際のブロックを一つずつ手作業で組み立てていきます。想像するよりもはるかに長い時間がかかりますが、自分が設計したものが目の前に形となって現れていく喜びは、何物にも代えられません。",
      images: [imgYasaka10],
    },
    {
      id: "06",
      enTitle: "Completion",
      jpTitle: "完成",
      desc: "数百時間をかけた設計と数百時間をかけた組み立て作業を経て、ようやくひとつの作品が完成します。大型になればなるほど、期間が掛かればかかるほど、環sねいした時の達成感はひとしおです。",
      images: [imgProcess6],
    },
    {
      id: "07",
      enTitle: "Release",
      jpTitle: "公開",
      desc: "完成した作品は、写真撮影をしたのちにSNSを通じて公開します。メイキング映像やARでの公開、制作記の執筆など、完成してからもいろいろな工夫の余地があります。ヴェネツィアは撮影だけで30時間かかりました。",
      images: [imgVenice1,imgVenice12],
    },
    {
      id: "08",
      enTitle: "Exhibition",
      jpTitle: "展示",
      desc: "大学の学祭やレゴのイベント、オフ会などに持って行って展示します。実物を見ていただけるのはとても貴重な機会なので、できるだけたくさんの展示会に持っていきます。見せ方、説明、展示会場までの運搬など、こちらもたくさんの工夫の余地があって楽しいポイントです。",
      images: [imgQE4],
    }
  ];

  return (
    <main className="w-full bg-white pb-32 pt-24 min-h-screen">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 group"
        >
          <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 group-hover:text-stone-900 tracking-widest uppercase transition-colors">
            ← Back to Home
          </span>
        </Link>
      </div>

      <article className="w-full max-w-[1200px] mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col gap-6 mb-24 md:mb-32 max-w-[800px]">
            <h1 className="font-['Inter',_sans-serif] text-3xl md:text-4xl font-light text-stone-900 tracking-wider uppercase">
              Creation Process
            </h1>
            <p className="font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-600 tracking-[0.08em] leading-relaxed">
              展示会でよくご質問をいただく「どのようにして作品を作っているのか」という手順について解説します。<br className="hidden md:block"/>
              パソコンでの設計から、世界中からパーツを集めて組み立てるまでの過程をご覧ください。
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-24 md:gap-40">
          {steps.map((step, index) => (
            <section key={step.id} className="relative flex flex-col md:flex-row gap-8 md:gap-20 items-start">
              {/* Left Column: Text Content */}
              <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[40%] md:sticky md:top-32">
                <FadeIn delay={0.1}>
                  <div className="flex flex-col items-start gap-2 border-t border-stone-200 pt-6">
                    <div className="flex items-baseline gap-4">
                      <span className="font-['Inter',_sans-serif] text-4xl md:text-5xl font-light text-stone-300">
                        {step.id}
                      </span>
                      <span className="font-['Inter',_sans-serif] text-xs md:text-sm text-stone-400 tracking-[0.2em] uppercase">
                        {step.enTitle}
                      </span>
                    </div>
                    <h2 className="font-['Noto_Serif_JP',_serif] text-xl md:text-2xl text-stone-900 tracking-wider mt-4">
                      {step.jpTitle}
                    </h2>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-600 leading-loose tracking-[0.08em] text-justify">
                    {step.desc}
                  </p>
                </FadeIn>
              </div>

              {/* Right Column: Images */}
              <div className="w-full md:w-[60%]">
                <FadeIn delay={0.3}>
                  <div className={`grid gap-4 md:gap-6 w-full ${step.images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                    {step.images.map((img, i) => (
                      <figure key={i} className={`w-full ${step.images.length > 1 ? 'aspect-[4/3] md:aspect-[3/4]' : 'aspect-[4/3] md:aspect-[4/3]'} bg-stone-50 overflow-hidden relative group`}>
                        <img
                          src={img}
                          alt={`${step.jpTitle} - image ${i + 1}`}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
};
