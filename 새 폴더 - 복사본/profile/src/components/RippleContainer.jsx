import React from "react";
import useRippleEffect from "../Hook/useRippleEffect";
import RippleEffect from "./RippleEffect";

const RippleContainer = () => {
  const { ripples, containerRef } = useRippleEffect();

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute", // 포지셔닝 조정
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden", // 스크롤 방지
        pointerEvents: "none", // 사용자 이벤트 무시
      }}
    >
      <RippleEffect ripples={ripples} />
    </div>
  );
};

export default RippleContainer;
