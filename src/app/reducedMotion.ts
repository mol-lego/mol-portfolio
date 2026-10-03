import { useEffect, useState } from "react";
import { MotionGlobalConfig } from "motion/react";

// 動きを減らす設定（prefers-reduced-motion: reduce）への対応。
// CSS の遷移は theme.css で止める。ここでは motion（JS）の動きと、スライダーの自動送りを止める。
// motion を使うページ（作品詳細・About・Process・AR ビューア）が読み込む。

const QUERY = "(prefers-reduced-motion: reduce)";

const getMediaQuery = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(QUERY)
    : null;

export const prefersReducedMotion = () => getMediaQuery()?.matches ?? false;

const mediaQuery = getMediaQuery();
if (mediaQuery) {
  MotionGlobalConfig.skipAnimations = mediaQuery.matches;
  mediaQuery.addEventListener("change", (event) => {
    MotionGlobalConfig.skipAnimations = event.matches;
  });
}

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const query = getMediaQuery();
    if (!query) return;
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
};
