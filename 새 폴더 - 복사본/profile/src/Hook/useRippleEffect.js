import { useEffect, useRef, useState } from "react";

const useRippleEffect = () => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);
  const rippleTimeouts = useRef([]);

  const updateRipplePosition = () => {
    const containerWidth =
      containerRef.current?.offsetWidth || window.innerWidth;
    const containerHeight = window.innerHeight;

    const randomX = Math.random() * (containerWidth - 100);
    const randomY = Math.random() * (containerHeight - 40);

    return { x: randomX, y: randomY };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { x, y } = updateRipplePosition();
      const randomSize = Math.random() * 50 + 30;

      const newRipple = {
        id: Date.now(),
        x,
        y,
        size: randomSize,
      };

      setRipples((prev) => [...prev, newRipple]);

      const timeout = setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 4000);

      rippleTimeouts.current.push(timeout);
    }, 800); // 리플 생성 간격 (800ms)

    return () => {
      clearInterval(intervalId); // 리플 생성 중단
      rippleTimeouts.current.forEach(clearTimeout); // 기존 타임아웃 제거
    };
  }, []);

  return { ripples, containerRef };
};

export default useRippleEffect;
