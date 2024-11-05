import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const LoadingScreenWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LogoPath = styled(motion.path)`
  stroke: #fff;
  stroke-width: 2;
  fill: none;
`;

const LoadingText = styled(motion.div)`
  margin-top: 5px;
  font-size: 20px;
  color: #fff;
  font-family: ${(props) => props.theme.fonts.secondary};
`;

const drawVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
};

const fillVariants = {
  hidden: { fill: "rgba(255, 255, 255, 0)" },
  visible: {
    fill: "#fff",
    transition: {
      duration: 2,
      ease: "easeInOut",
      delay: 2,
    },
  },
};

const slideOutVariants = {
  hidden: { y: 0 },
  visible: {
    y: "110%",
    transition: { duration: 2, ease: [0.45, 0.05, 0.55, 0.95] },
  },
};

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      controls.start("visible");
    }, 7000);

    return () => clearTimeout(timer);
  }, [controls]);

  return (
    isVisible && (
      <LoadingScreenWrapper
        variants={slideOutVariants}
        initial="hidden"
        animate={isVisible ? "hidden" : "visible"}
      >
        <svg
          width="62"
          height="100"
          viewBox="0 0 62 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_114_298)">
            <LogoPath
              variants={drawVariants}
              initial="hidden"
              animate="visible"
              fill="none"
              d="M33.0218 0.975955C32.3967 0.351051 31.549 0 30.6651 0C29.7812 0 28.9335 0.351051 28.3084 0.975955L14.9751 14.3093C14.4697 14.8148 14.1402 15.4693 14.0352 16.1763C13.9301 16.8833 14.0551 17.6054 14.3918 18.236C15.2151 19.7793 16.5018 20.8193 17.7584 21.526L8.30844 30.976C7.68353 31.601 7.33248 32.4487 7.33248 33.3326C7.33248 34.2165 7.68353 35.0642 8.30844 35.6893C9.90177 37.2826 11.9151 38.256 13.7551 38.8626L4.9751 47.6426C4.57264 48.0455 4.2801 48.5448 4.12539 49.0928C3.97067 49.6408 3.95893 50.2194 4.0913 50.7732C4.22366 51.3271 4.49571 51.8378 4.88151 52.2567C5.2673 52.6755 5.75397 52.9886 6.2951 53.166C8.5951 53.9226 10.9718 54.4593 13.3451 54.9326C15.9451 55.456 19.1651 55.9726 22.8284 56.306L20.8351 62.2793C20.6682 62.7804 20.6228 63.314 20.7025 63.8361C20.7823 64.3582 20.985 64.8539 21.294 65.2823C21.6029 65.7107 22.0092 66.0596 22.4794 66.3001C22.9496 66.5407 23.4703 66.6661 23.9984 66.666H37.3318C37.8599 66.6661 38.3806 66.5407 38.8508 66.3001C39.321 66.0596 39.7273 65.7107 40.0362 65.2823C40.3452 64.8539 40.5479 64.3582 40.6277 63.8361C40.7074 63.314 40.662 62.7804 40.4951 62.2793L38.5018 56.306C42.1684 55.9726 45.3884 55.456 47.9851 54.936C50.3584 54.4593 52.7518 53.9226 55.0518 53.1626C55.591 52.983 56.0753 52.6686 56.4587 52.2491C56.8422 51.8297 57.112 51.3191 57.2426 50.766C57.3732 50.2129 57.3602 49.6356 57.2049 49.089C57.0496 48.5423 56.757 48.0444 56.3551 47.6426L47.5751 38.8626C49.4151 38.2593 51.4284 37.2826 53.0218 35.6893C53.6467 35.0642 53.9977 34.2165 53.9977 33.3326C53.9977 32.4487 53.6467 31.601 53.0218 30.976L43.5718 21.526C44.8284 20.8193 46.1151 19.7793 46.9384 18.236C47.2751 17.6054 47.4001 16.8833 47.295 16.1763C47.19 15.4693 46.8605 14.8148 46.3551 14.3093L33.0218 0.975955Z"
            />
          </g>
        </svg>
        <LoadingText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
        >
          숲속의 지수
        </LoadingText>
      </LoadingScreenWrapper>
    )
  );
};

export default LoadingScreen;
