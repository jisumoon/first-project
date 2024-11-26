import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import useRippleEffect from "../Hook/useRippleEffect";
import RippleContainer from "../components/RippleContainer";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { setPage } from "../store/sectionSliceReducer";

//Ani
const floatingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const AppWrapper = styled.div`
  width: 100%;
  text-rendering: optimizeLegibility;
  color: white;
  background: ${(props) => props.theme.colors.primary};
`;

const ScrollDownIcon = styled.div`
  position: absolute;
  bottom: 12%;
  left: 45%;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 10px 2px;
  font-size: 24px;
  z-index: 100;
  animation: ${floatingAnimation} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    display: none; /* 작은 화면에서는 숨기기 */
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopSection = styled.div`
  flex: 9;
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 100px;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainbackgtound};

  @media (max-width: 900px) {
    padding-left: 30px;
    gap: 50px;
  }

  @media (max-width: 768px) {
    padding-left: 20px; /* 작은 화면에서는 왼쪽 패딩 줄이기 */
    flex-direction: column; /* 세로로 배치 */
  }

  @media (max-width: 390px) {
    padding-left: 0;
  }

  @media (max-width: 400px) {
    padding-right: 10px;
    gap: 20px;
  }
`;

const MainTitle = styled.div`
  height: 100%;
  flex: 1;
  padding-top: 40px;
  font-family: ${(props) => props.theme.fonts.four};
  color: ${(props) => props.theme.colors.mainbackgtound};
  font-size: 70px;
  font-weight: bold;
  line-height: 1.2;

  @media (max-width: 890px) {
    font-size: 36px;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 40px;
    padding-top: 20px;
  }

  @media (max-width: 400px) {
    padding-top: 40px;
  }

  p {
    padding-top: 10px;
    font-size: 15px;
    font-weight: lighter;
    line-height: 1.6;
    opacity: 0.8;

    @media (max-width: 400px) {
      font-size: 12px;
    }
  }
`;

const HeroSection = styled.section`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.div`
  width: 520px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 900px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 400px) {
    flex: 2;
  }

  img {
    border: 4px solid ${(props) => props.theme.colors.mainbackgtound};
    width: 70%;
    height: auto;
  }

  @media (max-width: 860px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 768px) {
    width: 60%;
    justify-content: center;
  }

  @media (max-width: 400px) {
    width: 60%;
  }
`;

const BottomSection = styled.div`
  width: 100%;
  text-align: center;
  flex: 1;
  display: flex;
  padding: 0 80px;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

const Menu = styled.ul`
  flex: 1;
  border-left: 1px solid ${(props) => props.theme.colors.mainbackgtound};
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  gap: 20px;

  @media (max-width: 900px) {
    font-size: 14px;
  }

  li {
    cursor: pointer;
    font-weight: bold;
    letter-spacing: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column; /* 작은 화면에서는 세로로 배치 */
    border-left: none;
    gap: 10px;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  letter-spacing: 2px;

  @media (max-width: 900px) {
    font-size: 14px;
    justify-content: center;
  }
`;

const Home = () => {
  const { ripples, containerRef } = useRippleEffect();
  const [animationComplete, setAnimationComplete] = useState(false);
  const dispatch = useDispatch();

  // 포트폴리오로 이동
  const scrollToPortfolio = () => {
    dispatch(setPage(3));
  };

  // Notion으로 이동
  const goToNotion = () => {
    window.open("https://www.notion.so/13336341b0a7800e9a55d63360689f79?pvs=4");
  };

  return (
    <AppWrapper>
      <RippleContainer ref={containerRef} ripples={ripples} />
      <Wrapper>
        <Header />
        <TopSection>
          <MainTitle>
            FRONTEND
            <br /> DEVELOPER
            <p>
              Starting my journey as a frontend developer, I’m planting <br />
              lines of code like seeds in a forest, nurturing them to grow into
              <br />
              impactful solutions.
            </p>
          </MainTitle>
          <HeroSection>
            <Img>
              <img className="contact_img" src="/img/contact.jpg" alt="main" />
            </Img>
          </HeroSection>
        </TopSection>
        <BottomSection>
          <Info>&copy; 2024 Moon Ji Su Portfolio. </Info>
          <Menu>
            <li onClick={scrollToPortfolio}>PROJECT</li>
            <li onClick={goToNotion}>NOTION</li>
            <li>FIGMA</li>
          </Menu>
        </BottomSection>
      </Wrapper>
      {animationComplete && (
        <ScrollDownIcon>
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </ScrollDownIcon>
      )}
    </AppWrapper>
  );
};

export default Home;
