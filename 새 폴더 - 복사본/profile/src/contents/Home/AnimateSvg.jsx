// import React from "react";
// import { AnimatedSvg } from "../Home/HomeStyled";
// import { lineVariants } from "./Animation";

// const AnimateSvg = () => (
//   <AnimatedSvg
//     width="2000"
//     height="40"
//     viewBox="0 0 2000 40"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     initial="hidden"
//     animate="visible"
//     variants={lineVariants}
//   >
//     <rect width="2000" height="10" fill="rgba(255, 255, 255, 0.2)" />
//   </AnimatedSvg>
// );

// export default AnimateSvg;

import React from "react";
import { AnimatedSvg } from "../Home/HomeStyled";
import { lineVariants } from "./Animation";

const AnimateSvg = ({
  width = "2000",
  height = "40",
  color = "rgba(255, 255, 255, 0.2)",
}) => (
  <AnimatedSvg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial="hidden"
    animate="visible"
    variants={lineVariants}
  >
    <rect width={width} height="10" fill={color} />
  </AnimatedSvg>
);

export default AnimateSvg;
