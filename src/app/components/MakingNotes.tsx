import React from 'react';
import { SectionHeading, textLinkClass } from './WorkCaption';

type Note = {
  medium: 'note' | 'YouTube';
  title: string;
  desc: string;
  date: string; // YYYY-MM-DD
  href: string;
};

const NOTES: Note[] = [
  {
    medium: 'note',
    title: 'ヴェネツィア制作記',
    desc: '「ヴェネツィア」制作における工夫や裏話を、全7編にわたって作者4人がそれぞれ解説しています。',
    date: '2026-01-03',
    href: 'https://note.com/mol_05/m/m51996852b35f',
  },
  {
    medium: 'YouTube',
    title: 'クイーンエリザベス号 メイキング映像',
    desc: '3ヶ月にわたる13名がかりの組み立ての様子を1000倍速でご覧いただけます。',
    date: '2019-04-20',
    href: 'https://www.youtube.com/watch?v=H8JTmG40KX0',
  },
  {
    medium: 'YouTube',
    title: '八坂神社 西楼門 メイキング映像',
    desc: '5万ピースを使った和風建築の再現作品です。組み立ての様子を1000倍速にしました。',
    date: '2020-04-12',
    href: 'https://www.youtube.com/watch?v=EfCpyw82vzI',
  },
];

// 新しい順
const SORTED_NOTES = [...NOTES].sort((a, b) => b.date.localeCompare(a.date));

const formatDate = (date: string) => date.replaceAll('-', '.');

export const MakingNotes = () => {
  return (
    <section
      aria-labelledby="notes-heading"
      className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-24 md:py-40 border-t border-rule"
    >
      <SectionHeading id="notes-heading">制作の記録</SectionHeading>
      <p className="mt-6 md:mt-8 text-sm md:text-base text-ink max-w-[38em]">
        組み立ての過程、設計の様子や題材の選定、チームでの制作風景などについて映像や文章で記録しています。
      </p>

      <ul className="mt-8 md:mt-12 flex flex-col gap-8 md:gap-10 max-w-[48em]">
        {SORTED_NOTES.map((note) => (
          <li key={note.href} className="flex flex-col gap-1">
            <p className="text-sm text-ink-2">
              <time dateTime={note.date}>{formatDate(note.date)}</time>
              <span>　{note.medium}</span>
            </p>
            <h3 className="text-lg text-ink leading-snug">
              <a href={note.href} target="_blank" rel="noopener noreferrer" className={textLinkClass}>
                {note.title}
              </a>
            </h3>
            <p className="text-sm md:text-base text-ink">{note.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
