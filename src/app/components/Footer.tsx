import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';

export const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/', {
      state: location.pathname === '/' ? { refreshHomeAt: Date.now() } : null,
    });
  };

  return (
    <footer className="w-full bg-stone-50 py-32 px-6 md:px-12 mt-12 border-t border-stone-200 flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-16"
      >
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <button
            type="button"
            onClick={handleGoHome}
            className="font-['Inter',_sans-serif] text-4xl md:text-6xl font-light text-stone-900 tracking-wider"
          >
            mol
          </button>
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <Link to="/about" className="group flex items-center gap-4 text-stone-500 hover:text-stone-900 transition-colors">
              <span className="font-['Inter',_sans-serif] text-xs font-medium tracking-[0.2em] uppercase">
                About me
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" strokeWidth={1.5} />
            </Link>
            <Link to="/process" className="group flex items-center gap-4 text-stone-500 hover:text-stone-900 transition-colors">
              <span className="font-['Inter',_sans-serif] text-xs font-medium tracking-[0.2em] uppercase">
                Creation Process
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 ease-out" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6 md:gap-2">
          <p className="font-['Inter',_sans-serif] text-[10px] text-stone-400 tracking-[0.2em]">
            © {new Date().getFullYear()} mol
          </p>
          <p className="font-['Inter',_sans-serif] text-[10px] text-stone-400 tracking-[0.1em]">
            LEGO<sup>&reg;</sup>はレゴ・グループの商標であり, 本サイトはグループ公式のものではありません.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};
