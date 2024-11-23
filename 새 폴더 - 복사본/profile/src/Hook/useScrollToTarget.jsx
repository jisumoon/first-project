import { useState, useEffect } from "react";

export function useScrollToTarget(targetName) {
  const [isTarget, setIsTarget] = useState(false);

  const scrollToTarget = () => {
    if (targetName) {
      document.querySelector(`#${targetName}`)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const target = document.querySelector(`#${targetName}`);
      if (target) {
        const targetRect = target.getBoundingClientRect();
        if (
          targetRect.top <= window.innerHeight / 3 &&
          targetRect.bottom >= 0
        ) {
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
  }, [targetName]);

  return { scrollToTarget, isTarget };
}
