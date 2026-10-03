import React from 'react';
import { Link } from 'react-router';

const linkClass =
  'text-sm text-ink underline underline-offset-[0.3em] decoration-1 decoration-ink-2/60 hover:decoration-ink';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-rule mt-12 relative z-10">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20 flex flex-col md:flex-row md:justify-between gap-10 md:gap-16">
        <div className="flex flex-col gap-5">
          <Link to="/" className="w-fit text-lg font-bold text-ink tracking-[0.04em]">
            mol
          </Link>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link to="/about" className={linkClass}>About</Link></li>
            <li><Link to="/process" className={linkClass}>Process</Link></li>
            <li><a href="https://x.com/mol_lego" target="_blank" rel="noopener noreferrer" className={linkClass}>X</a></li>
            <li><a href="https://www.instagram.com/mol_lego" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a></li>
            <li><a href="https://www.youtube.com/@mamorutanabe1136" target="_blank" rel="noopener noreferrer" className={linkClass}>YouTube</a></li>
            <li><a href="mailto:contact@mamorutanabe.com" className={linkClass}>Contact</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 md:items-end md:text-right text-xs text-ink-2">
          <p>© {new Date().getFullYear()} mol</p>
          <p>LEGO® はレゴ・グループの商標であり、本サイトはグループ公式のものではありません。</p>
        </div>
      </div>
    </footer>
  );
};
