import { useCallback, useState } from "react";

/**
 * 写真の読み込みが終わったか（失敗したときも終わりとみなす）。
 * 写真のフェードインを読み込みのあとに始めるために使う。本文の表示はこれを待たない。
 * photoProps を img に渡す（同じ写真の img が複数あれば、どれかが終われば loaded になる）。
 */
export const usePhotoLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);
  // キャッシュから読まれて、描く前に読み込みが済んでいる場合
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) setLoaded(true);
  }, []);

  return { loaded, photoProps: { ref, onLoad: done, onError: done } };
};
