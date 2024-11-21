import { useEffect, useRef, useState } from "react";

function useScrollAnimation() {
  const scrollRef = useRef(null);
  const [scrollEl, setScrollEl] = useState(false);

  const yScrollEvent = () => {
    const scroll = scrollRef.current?.getBoundingClientRect();
    if (scroll) {
      setScrollEl(scroll.top <= 500); // 특정 지점에서 트리거
    }
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    window.addEventListener("scroll", yScrollEvent);
    return () => {
      window.removeEventListener("scroll", yScrollEvent);
    };
  }, []);

  return { scrollRef, scrollEl };
}

export default useScrollAnimation;
