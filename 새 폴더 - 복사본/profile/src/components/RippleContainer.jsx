import React, { forwardRef } from "react";

const RippleEffect = forwardRef(({ ripples }, ref) => {
  return (
    <div ref={ref}>
      {ripples.map((ripple, index) => (
        <div key={index} style={{ ...ripple.style }}></div>
      ))}
    </div>
  );
});

export default RippleEffect;
