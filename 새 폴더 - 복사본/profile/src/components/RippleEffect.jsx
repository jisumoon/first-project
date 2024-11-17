import React from "react";
import styled, { keyframes } from "styled-components";

const rippleAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.4;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  animation: ${rippleAnimation} 4s ease-in-out forwards;
  will-change: transform, opacity;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
`;

const RippleEffect = ({ ripples }) => (
  <>
    {ripples.map((ripple) => (
      <Ripple key={ripple.id} x={ripple.x} y={ripple.y} size={ripple.size} />
    ))}
  </>
);

export default RippleEffect;
