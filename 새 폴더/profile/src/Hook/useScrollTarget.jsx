import { useEffect, useRef, useState } from "react";

// 특정 요소로 부드럽게 이동
const useScrollToTarget = (targetName) => {
  const [isTarget, setIsTarget] = useState(false);
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    document.querySelector(`#${targetName}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        if (targetRect.top < window.innerHeight / 3 && targetRect.bottom >= 0) {
          setIsTarget(true);
        } else {
          setIsTarget(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { targetRef, scrollToTarget, isTarget, setIsTarget, targetName };
};

export default useScrollToTarget;
