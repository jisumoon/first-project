import { useState, useEffect } from "react";

const useRippleEffect = (containerRef) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if (!containerRef || !containerRef.current) return;

    const generateRipple = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const size = Math.random() * (100 - 30) + 30;
      const x = Math.random() * rect.width - size / 2; // 랜덤 위치
      const y = Math.random() * rect.height - size / 2; // 랜덤 위치

      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y, size }]);

      // 일정 시간 후 리플 제거
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 1200);
    };

    // 일정 간격으로 리플 생성
    const intervalId = setInterval(generateRipple, 500); // 0.5초마다 생성

    return () => {
      clearInterval(intervalId);
    };
  }, [containerRef]);

  return { ripples };
};

export default useRippleEffect;
