import { useEffect, useRef, useState } from "react";

function useScrollAnimation() {
  const scrollRef = useRef(null); // 스크롤 참조
  const [scrollEl, setScrollEl] = useState(false); // 상태 관리

  const yScrollEvent = () => {
    const scroll = scrollRef.current?.getBoundingClientRect();
    if (scroll) {
      const isTriggered = scroll.top <= 500; // `isTriggered` 선언
      setScrollEl(isTriggered);
      console.log("scroll.top:", scroll.top, "isTriggered:", isTriggered); // 디버깅용 로그
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
