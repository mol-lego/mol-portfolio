import React from 'react';
import { Link } from 'react-router';

const linkClass =
  'text-sm text-ink underline underline-offset-[0.3em] decoration-1 decoration-ink-2/60 hover:decoration-ink';

/**
 * フッター。改修前（fc16600）の末尾の大きな「mol」（Inter 300、36px / 60px）と配置
 * （モバイルは中央、PC は左に mol とリンク、右に著作権表示）を戻した。
 * SNS のリンクはここだけに置く。
 */
export const Footer = () => {
  return (
    <footer data-intro-part="text" className="w-full border-t border-rule mt-12 relative z-10">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 flex flex-col md:flex-row justify-between items-center md:items-end gap-16">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <Link
            to="/"
            className="font-wordmark text-4xl md:text-6xl font-light leading-none tracking-wider text-ink"
          >
            mol
          </Link>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            <li><Link to="/about" className={linkClass}>About</Link></li>
            <li><Link to="/process" className={linkClass}>Process</Link></li>
            <li><a href="https://x.com/mol_lego" target="_blank" rel="noopener noreferrer" className={linkClass}>X</a></li>
            <li><a href="https://www.instagram.com/mol_lego" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a></li>
            <li><a href="https://www.youtube.com/@mamorutanabe1136" target="_blank" rel="noopener noreferrer" className={linkClass}>YouTube</a></li>
            <li><a href="mailto:contact@mamorutanabe.com" className={linkClass}>Contact</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 items-center md:items-end text-center md:text-right text-xs text-ink-2">
          <p>© {new Date().getFullYear()} mol</p>
          <p>LEGO® はレゴ・グループの商標であり、本サイトはグループ公式のものではありません。</p>
        </div>
      </div>
    </footer>
  );
};
