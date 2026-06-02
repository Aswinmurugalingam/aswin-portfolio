import { useEffect, useRef, useState } from "react";

export const useNearViewport = (rootMargin = "320px", once = true) => {
  const ref = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          if (once) observer.disconnect();
          return;
        }

        if (!once) setIsNear(false);
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return [ref, isNear];
};
