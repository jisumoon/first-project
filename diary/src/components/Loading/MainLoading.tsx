import React from "react";
import styled, { keyframes } from "styled-components";

//애니메이션션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeBackground = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const WelcomeScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 100vh;
  background-size: 200% 200%;
  animation: ${fadeBackground} 6s infinite ease-in-out;
  color: #fff;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  font-size: 48px;
  text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 1.5s ease-in-out;
  letter-spacing: 1.2;
`;

const WelcomeSubtitle = styled.p`
  font-size: 20px;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 2.5s ease-in-out;
`;

const MainLoading: React.FC = () => {
  return (
    <WelcomeScreen>
      <WelcomeTitle>환영합니다!</WelcomeTitle>
      <WelcomeSubtitle>당신의 이야기가 곧 펼쳐집니다</WelcomeSubtitle>
    </WelcomeScreen>
  );
};

export default MainLoading;
