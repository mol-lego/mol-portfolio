import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

import { Link } from 'react-router';

export const Header = () => {
  const { scrollY } = useScroll();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringWorks, setIsHoveringWorks] = useState(false);

  const worksList = [
    { id: "01", title: "クイーンエリザベス号" },
    { id: "02", title: "ヴェネツィア" },
    { id: "03", title: "八坂神社 西楼門" },
    { id: "04", title: "ハワイ火山国立公園" },
  ];

  useEffect(() => {
    setIsVisible(window.scrollY > (typeof window !== "undefined" ? window.innerHeight * 0.8 : 500));
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide header until scrolled past the hero section
    const threshold = typeof window !== "undefined" ? window.innerHeight * 0.8 : 500;
    if (latest > threshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] text-gray-900 pointer-events-none flex justify-center"
    >
      {/* Background layer: separated to prevent CSS backdrop-filter nesting issues */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-b border-gray-100" />

      <div className="relative w-full max-w-[1400px] px-6 py-4 md:px-12 md:py-6 flex justify-between items-center mx-auto">
        {/* Left side: mol log and periphery is clickable */}
        <Link to="/" className="relative flex flex-col gap-1 pointer-events-auto transition-opacity duration-300 hover:opacity-100 opacity-80 before:absolute before:-inset-4 before:content-['']">
          <h2 className="font-['Inter',_sans-serif] text-sm md:text-base font-medium tracking-widest">
            mol
          </h2>
          <p className="font-['Inter',_sans-serif] text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-1 opacity-70">
            LEGO<sup>&reg;</sup>作品集
          </p>
        </Link>
        
        {/* Navigation */}
        <nav className="pointer-events-auto flex items-center gap-6">
          <div 
            className="relative flex items-center"
            onMouseEnter={() => setIsHoveringWorks(true)}
            onMouseLeave={() => setIsHoveringWorks(false)}
          >
            <Link to="/" className="font-['Inter',_sans-serif] text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity py-4 block">
              Works
            </Link>
            
            {/* Works Dropdown */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: isHoveringWorks ? 1 : 0, 
                y: isHoveringWorks ? 0 : 5,
                pointerEvents: isHoveringWorks ? "auto" : "none"
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 w-[200px] md:w-[240px] shadow-sm border border-gray-100 rounded-sm overflow-hidden z-50 -mt-2"
            >
              <div className="absolute inset-0 bg-white/80 backdrop-blur-lg" />
              <ul className="relative flex flex-col py-2">
                {worksList.map(work => (
                  <li key={work.id}>
                    <Link 
                      to={`/work/${work.id}`} 
                      onClick={() => setIsHoveringWorks(false)}
                      className="block px-4 py-2.5 text-[10px] md:text-xs font-['Noto_Serif_JP',_serif] text-gray-900 opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                      <span className="font-['Inter',_sans-serif] text-[9px] md:text-[10px] text-gray-500 mr-2 tracking-widest">{work.id}</span>
                      {work.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <Link to="/process" className="font-['Inter',_sans-serif] text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity py-4 block">
            Process
          </Link>

          <Link to="/about" className="font-['Inter',_sans-serif] text-[10px] md:text-xs font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity py-4 block">
            About
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};