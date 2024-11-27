import React, { forwardRef } from "react";
import styled, { keyframes } from "styled-components";
import useRippleEffect from "../Hook/useRippleEffect";

const rippleAnimation = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.4);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  animation: ${rippleAnimation} 1.2s ease-out forwards;
  will-change: transform, opacity;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
`;

const RippleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
`;

const RippleEffectComponent = forwardRef((props, ref) => {
  const { ripples } = useRippleEffect(ref);

  return (
    <RippleContainer ref={ref}>
      {ripples.map((ripple) => (
        <Ripple key={ripple.id} x={ripple.x} y={ripple.y} size={ripple.size} />
      ))}
    </RippleContainer>
  );
});

export default RippleEffectComponent;
