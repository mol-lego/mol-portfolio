import React from 'react';
import { motion } from 'motion/react';
import { Youtube, ExternalLink } from 'lucide-react';

const NOTES = [
  {
    type: 'note',
    title: 'ヴェネツィア制作記',
    desc: '「ヴェネツィア」制作における工夫や裏話を、全7編にわたって作者4人がそれぞれ解説しています。',
    date: '2026.01.03',
    href: 'https://note.com/mol_05/m/m51996852b35f',
  },
  {
    type: 'youtube',
    title: 'クイーンエリザベス号 - メイキング映像',
    desc: '3ヶ月にわたる13名がかりの組み立ての様子を1000倍速でご覧いただけます。',
    date: '2019.04.20',
    href: 'https://www.youtube.com/watch?v=H8JTmG40KX0',
  },
  {
    type: 'youtube',
    title: '八坂神社西楼門 - メイキング映像',
    desc: '5万ピースを使った和風建築の再現作品です。組み立ての様子を1000倍速にしました。',
    date: '2020.04.12',
    href: 'https://www.youtube.com/watch?v=EfCpyw82vzI',
  },
];

export const MakingNotes = () => {
  return (
    <section className="w-full bg-stone-100 py-24 md:py-40 border-y border-stone-200">
      <div className="px-6 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="w-full md:w-1/3 flex flex-col">
          <h2 className="font-['Inter',_sans-serif] text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-900 mb-8">
            Making & Notes
          </h2>
          <p className="font-['Noto_Serif_JP',_serif] text-sm text-stone-600 leading-loose tracking-wide font-light max-w-sm">
            組み立ての過程、設計の様子や題材の選定、チームでの制作風景などについて映像や文章で記録しています。
          </p>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-3 md:gap-6">
          {NOTES.map((note, idx) => (
            <motion.a 
              key={idx}
              href={note.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="group flex flex-row items-center justify-between gap-4 md:gap-6 p-5 md:p-8 bg-white border border-stone-200 hover:border-stone-400 transition-colors"
            >
              <div className="flex-1 min-w-0 pr-2 md:pr-0">
                <div className="flex items-center gap-2.5 md:gap-3 mb-2 md:mb-4">
                  {note.type === 'youtube' ? (
                    <Youtube className="w-3.5 h-3.5 md:w-4 md:h-4 text-stone-400" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-stone-400" />
                  )}
                  <span className="font-['Inter',_sans-serif] text-[9px] md:text-[10px] text-stone-400 tracking-widest uppercase">
                    {note.type} / {note.date}
                  </span>
                </div>
                <h3 className="font-['Noto_Serif_JP',_serif] text-sm md:text-lg font-light text-stone-900 tracking-wide md:mb-2 group-hover:text-stone-600 transition-colors">
                  {note.title}
                </h3>
                <p className="font-['Noto_Serif_JP',_serif] text-xs text-stone-500 leading-relaxed tracking-wider hidden md:block">
                  {note.desc}
                </p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:border-stone-900 transition-colors shrink-0">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-stone-400 group-hover:bg-white rounded-full transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
