import { useEffect, useRef, useState, useCallback } from "react";

const useRippleEffect = () => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);
  const rippleTimeouts = useRef([]);

  const updateRipplePosition = useCallback(() => {
    const containerWidth =
      containerRef.current?.offsetWidth || window.innerWidth;
    const containerHeight =
      containerRef.current?.offsetHeight || window.innerHeight;

    const randomSize = Math.random() * 50 + 30;
    const maxX = containerWidth - randomSize;
    const maxY = containerHeight - randomSize;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    return { x: randomX, y: randomY, size: randomSize };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { x, y, size } = updateRipplePosition();

      const newRipple = {
        id: Date.now(),
        x,
        y,
        size,
      };

      // 배열 크기를 미리 제한하여 메모리 최적화
      setRipples((prev) => {
        const nextRipples = [...prev, newRipple];
        if (nextRipples.length > 10) nextRipples.shift(); // 배열 길이 제한
        return nextRipples;
      });

      const timeout = setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 4000);

      rippleTimeouts.current.push(timeout);
    }, 800);

    return () => {
      clearInterval(intervalId);
      rippleTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      rippleTimeouts.current = [];
    };
  }, [updateRipplePosition]);

  return { ripples, containerRef };
};

export default useRippleEffect;
