import React from "react";
import { Ripple } from "../Home/HomeStyled";

const RippleEffect = ({ ripples }) => {
  return (
    <>
      {ripples.map((ripple) => (
        <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
      ))}
    </>
  );
};

export default RippleEffect;
