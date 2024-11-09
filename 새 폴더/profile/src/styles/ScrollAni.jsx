import React, { forwardRef } from "react";
import styled from "styled-components";

const ScrollAni = forwardRef(({ className, $isVisible, children }, ref) => (
  <div ref={ref} className={className}>
    {children}
  </div>
));

export default styled(ScrollAni).withConfig({
  shouldForwardProp: (prop) => prop !== "$isVisible",
})`
  transition: opacity 0.5s ease;

  &.scroll-animation {
    animation: ${(props) =>
      props.$isVisible ? "fadeIn 1s forwards" : "fadeOut 1s forwards"};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;
