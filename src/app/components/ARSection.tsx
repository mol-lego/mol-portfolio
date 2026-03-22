import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import imgAR from "../../assets/ar.png";
import { Box } from "lucide-react";

export const ARSection = () => {
  return (
    <section className="px-6 md:px-12 w-full max-w-[1400px] mx-auto py-24 md:py-40">
      <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-center">
        <div className="w-full md:w-1/2 flex flex-col items-start order-2 md:order-1">
          <h2 className="font-['Inter',_sans-serif] text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-stone-900 mb-8 flex items-center gap-3">
            <Box className="w-4 h-4" />
            AR / 3D Viewer
          </h2>
          <h3 className="font-['Noto_Serif_JP',_serif] text-3xl md:text-5xl font-light text-stone-900 mb-6 leading-tight">
            実物大で！
          </h3>
          <p className="font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-500 leading-loose tracking-wide font-light max-w-md">
            実物を見ることが難しい大型作品も、AR - 拡張現実を用いて実物大で目の前に呼び出すことができます。圧倒的なスケール感をご体感ください。
          </p>

          <Link to="/ar-viewer" className="mt-12 md:mt-16 group inline-flex items-center gap-6 px-8 py-4 border border-stone-300 hover:border-stone-900 transition-colors">
            <span className="font-['Inter',_sans-serif] text-xs md:text-sm tracking-widest uppercase text-stone-800">
              Open 3D Viewer
            </span>
            <div className="w-6 h-[1px] bg-stone-400 group-hover:w-10 group-hover:bg-stone-900 transition-all duration-300" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full md:w-1/2 relative order-1 md:order-2 bg-stone-100 overflow-hidden group"
        >
          <img
            src={imgAR}
            alt="AR Viewer - MS Queen Elizabeth"
            className="w-full h-auto block transition-transform duration-[3s] group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 border border-stone-200 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};