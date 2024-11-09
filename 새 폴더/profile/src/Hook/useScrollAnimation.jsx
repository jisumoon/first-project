import { useEffect, useRef, useState } from "react";

const useScrollAnimation = () => {
  const scrollRef = useRef(null);
  const [scrollEl, setScrollEl] = useState(false);

  const yScrollEvent = () => {
    const scroll = scrollRef.current?.getBoundingClientRect();
    if (scroll) {
      setScrollEl(scroll.top <= 500);
    }
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      if (!inThrottle) {
        func.apply(this, arguments);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  useEffect(() => {
    if (!scrollRef.current) return;

    const throttledScrollEvent = throttle(yScrollEvent, 200);
    window.addEventListener("scroll", throttledScrollEvent);

    return () => {
      window.removeEventListener("scroll", throttledScrollEvent);
    };
  }, []);

  return { scrollRef, scrollEl };
};

export default useScrollAnimation;
