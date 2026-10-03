import React from "react";
import { Link, useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { X, Box, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useDocumentTitle } from "../useDocumentTitle";
import { getARStaticUrl, getAppPath } from "../arPaths";

import imgQueenElizabeth from "../../assets/optimized/msqe1-hero.jpg";
import imgQueenElizabeth2x from "../../assets/optimized/msqe1-hero@2x.jpg";
import imgVenezia from "../../assets/optimized/venice1-card.jpg";
import imgVenezia2x from "../../assets/optimized/venice1-card@2x.jpg";
import imgYasaka from "../../assets/optimized/workdetail/yasaka1.jpg";
import imgHawaii from "../../assets/optimized/hawaii1-card.jpg";
import imgHawaii2x from "../../assets/optimized/hawaii1-card@2x.jpg";
import imgBedroom from "../../assets/optimized/hospital-card.jpg";
import imgBedroom2x from "../../assets/optimized/hospital-card@2x.jpg";

const AR_WORKS = [
  { id: "01", title: "クイーンエリザベス号", subtitle: "MS Queen Elizabeth", image: imgQueenElizabeth, image2x: imgQueenElizabeth2x },
  { id: "02", title: "ヴェネツィア", subtitle: "Venice", image: imgVenezia, image2x: imgVenezia2x },
  { id: "03", title: "八坂神社 西楼門", subtitle: "Yasaka Shrine", image: imgYasaka, image2x: imgYasaka },
  { id: "04", title: "ハワイ火山国立公園", subtitle: "Hawaii Volcanoes", image: imgHawaii, image2x: imgHawaii2x },
  { id: "05", title: "病院の一室", subtitle: "Hospital Room", image: imgBedroom, image2x: imgBedroom2x },
];

export const ARViewer = () => {
  const navigate = useNavigate();
  useDocumentTitle("mol - モデル選択");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "10%",
  };

  const sliderRef = React.useRef<Slider>(null);
  const isWheeling = React.useRef(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  const handleWheel = (e: React.WheelEvent) => {
    if (isWheeling.current) return;
    
    const threshold = 20; // 感度の閾値
    
    // 横スクロール（トラックパッド等のスワイプ）と縦スクロールの両方に対応
    if (Math.abs(e.deltaX) > threshold || Math.abs(e.deltaY) > threshold) {
      if (e.deltaX > threshold || e.deltaY > threshold) {
        sliderRef.current?.slickNext();
      } else if (e.deltaX < -threshold || e.deltaY < -threshold) {
        sliderRef.current?.slickPrev();
      }
      
      // 連続で発火しないようにロックをかける
      isWheeling.current = true;
      setTimeout(() => {
        isWheeling.current = false;
      }, 600); // スライドアニメーションの速度（500ms）より少し長めに設定
    }
  };

  const openAR = (id: string) => {
    const staticUrl = getARStaticUrl(id, getAppPath("/ar-viewer"));
    if (staticUrl) {
      window.location.href = staticUrl;
      return;
    }

    navigate(`/ar-experience/${id}?back=${encodeURIComponent(getAppPath("/ar-viewer"))}`);
  };

  return (
    <div 
      className="min-h-screen bg-ink text-paper flex flex-col relative overflow-hidden"
      onWheel={handleWheel}
    >
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-gradient-to-b from-ink/80 to-transparent">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-paper/80" />
          <span className="text-xs tracking-[0.2em] text-paper/80">AR VIEWER</span>
        </div>
        <Link to="/" className="w-10 h-10 rounded-full bg-paper/10 flex items-center justify-center hover:bg-paper/20 transition-colors">
          <X className="w-5 h-5" />
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center py-24 h-full relative">
        <div className="relative w-full max-w-4xl mx-auto h-[60vh] md:h-[70vh]">
          <Slider ref={sliderRef} {...settings} className="h-full ar-slider">
            {AR_WORKS.map((work) => (
              <div key={work.id} className="px-3 h-full outline-none">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openAR(work.id)}
                >
                  <img
                    src={work.image}
                    srcSet={`${work.image} 1x, ${work.image2x} 2x`}
                    sizes="(min-width: 768px) 80vw, 100vw"
                    alt={work.title}
                    className="w-full h-full object-cover"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent flex flex-col justify-end p-6 md:p-10">
                    <span className="text-paper/70 text-xs tracking-widest mb-2">No. {work.id}</span>
                    <h2 className="text-2xl md:text-4xl text-paper mb-1">{work.title}</h2>
                    <h3 className="text-sm md:text-base text-paper/70 mb-6 tracking-wider">{work.subtitle}</h3>
                    
                    <div className="inline-flex items-center gap-3 bg-paper/10 self-start px-6 py-3 rounded-full border border-paper/20 group-hover:bg-paper/20 transition-colors">
                      <Box className="w-4 h-4" />
                      <span className="text-xs tracking-widest">TAP TO VIEW IN AR</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2 md:px-4">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-paper/20 bg-ink/80 transition-colors hover:bg-ink active:bg-ink md:h-14 md:w-14"
              aria-label="前の作品"
            >
              <ChevronLeft className="h-6 w-6 text-paper/80" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-paper/20 bg-ink/80 transition-colors hover:bg-ink active:bg-ink md:h-14 md:w-14"
              aria-label="次の作品"
            >
              <ChevronRight className="h-6 w-6 text-paper/80" />
            </button>
          </div>
        </div>

        <p className="text-paper/70 text-xs tracking-[0.2em] uppercase mt-14 hidden md:block">
          Swipe to explore • Tap to view in AR
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .ar-slider .slick-track { display: flex; align-items: center; }
        .ar-slider .slick-slide { transition: all 0.3s ease; opacity: 0.5; transform: scale(0.9); }
        .ar-slider .slick-center { opacity: 1; transform: scale(1); }
        .ar-slider .slick-dots { bottom: -42px; }
        .ar-slider .slick-dots li button:before { color: var(--paper); font-size: 8px; }
        .ar-slider .slick-dots li.slick-active button:before { color: var(--paper); }
      `}} />
    </div>
  );
};
