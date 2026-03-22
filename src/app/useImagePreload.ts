import { useEffect, useState } from "react";

type ImagePreloadOptions = {
  srcSet?: string;
  sizes?: string;
};

export const useImagePreload = (
  src: string,
  options?: ImagePreloadOptions,
) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();

    const handleLoad = () => {
      setIsLoaded(true);
    };

    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleLoad);

    if (options?.srcSet) {
      image.srcset = options.srcSet;
    }

    if (options?.sizes) {
      image.sizes = options.sizes;
    }

    image.src = src;

    if (image.complete) {
      setIsLoaded(true);
    }

    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleLoad);
    };
  }, [options?.sizes, options?.srcSet, src]);

  return isLoaded;
};
