import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import profileImage from '../../assets/optimized/profile.jpg';
import profileImage2x from '../../assets/optimized/profile@2x.jpg';

export const AboutSection = () => {
  return (
    <section className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-32 md:py-48 border-t border-stone-200 flex flex-col items-center text-center">
      <Link to="/about" className="group flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-12 bg-stone-100 mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out"
        >
          <img
            src={profileImage}
            srcSet={`${profileImage} 1x, ${profileImage2x} 2x`}
            sizes="(min-width: 768px) 128px, 96px"
            alt="Artist Portrait"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <h2 className="font-['Inter',_sans-serif] text-sm md:text-base font-medium tracking-[0.1em] text-stone-900 mb-8 group-hover:text-stone-600 transition-colors">
          mol
        </h2>
      </Link>
      
      <p className="font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-600 leading-loose tracking-wide font-light max-w-2xl mx-auto mb-16">
        大型のものから手のひらサイズまで、LEGO<sup>&reg;</sup>ブロックで作品を制作しています。
      </p>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center border-t border-stone-200 pt-16 font-['Inter',_sans-serif] text-xs tracking-widest uppercase text-stone-500">
        <Link to="/about" className="hover:text-stone-900 transition-colors">About Me</Link>
        <a href="https://x.com/mol_lego" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors">Twitter (X)</a>
        <a href="https://www.instagram.com/mol_lego" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors">Instagram</a>
        <a href="mailto:contact@mamorutanabe.com" className="hover:text-stone-900 transition-colors">Contact</a>
      </div>
    </section>
  );
};
