import { useEffect, useRef, useState } from "react";

const useScrollAnimation = () => {
  const scrollRef = useRef(null);

  // 특정 위치에 따른 상태 변화
  const [scrollEl, setScrollEl] = useState(false);
  const yScrollEvent = () => {
    const scroll = scrollRef.current?.getBoundingClientRect();
    if (scroll) {
      setScrollEl(scroll.top <= 500);
    }
  };

  // 연속적인 이벤트 막기
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
