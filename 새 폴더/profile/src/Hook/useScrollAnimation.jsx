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

  useEffect(() => {
    if (!scrollRef.current) return;
    window.addEventListener("scroll", yScrollEvent);
    return () => {
      window.removeEventListener("scroll", yScrollEvent);
    };
  }, [scrollEl]);

  return { scrollRef, scrollEl };
};

export default useScrollAnimation;
