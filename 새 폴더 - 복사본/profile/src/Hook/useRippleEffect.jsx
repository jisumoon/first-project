import { useEffect, useRef, useState, useCallback } from "react";

const useRippleEffect = () => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);
  const rippleTimeouts = useRef([]);

  const updateRipplePosition = useCallback(() => {
    const containerWidth =
      containerRef.current?.offsetWidth || window.innerWidth;
    const containerHeight = window.innerHeight;

    const randomX = Math.random() * (containerWidth - 100);
    const randomY = Math.random() * (containerHeight - 40);

    return { x: randomX, y: randomY };
  }, []);

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

      setRipples((prev) => {
        if (prev.length > 10) return [...prev.slice(1), newRipple];
        return [...prev, newRipple];
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
