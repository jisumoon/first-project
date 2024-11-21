import React, { useState, useEffect, memo } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useTransform, useScroll } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import useRippleEffect from "../Hook/useRippleEffect";
import RippleContainer from "../components/RippleContainer";
import { useDispatch } from "react-redux";

//ani
const floatingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 2.5fr 2fr;
  grid-gap: 100px;
  width: 100%;
  height: 100vh;
  padding: 30px 20px;
  background: ${(props) => props.theme.colors.primary};

  @media (max-width: 1280px) {
    width: 100%;
    grid-gap: 50px;
    padding: 50px 30px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    grid-gap: 30px;
    padding: 40px 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
    grid-gap: 0;
    padding: 0;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  bottom: 5%;
  left: 36%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 10px 2px;
  font-size: 24px;
  z-index: 1000;
  animation: ${floatingAnimation} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarLeft = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  color: rgba(244, 241, 222, 0.4);

  h1 {
    font-size: 16px;
    margin-bottom: 10px;

    @media (max-width: 1024px) {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  p {
    font-size: 14px;
    line-height: 1.5;

    @media (max-width: 1024px) {
      font-size: 14px;
    }

    @media (max-width: 768px) {
      font-size: 12px;
    }
    @media (max-width: 400px) {
      width: 100%;
    }
  }
`;

const MainContent = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 440px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    transition: transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease-in-out;
    cursor: pointer;
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 20%;
  z-index: 4;
  color: #fff;
  letter-spacing: 1.4px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 1280px) {
    top: 20%;
    left: 6%;
  }

  @media (max-width: 1024px) {
    top: 20%;
    left: 10%;
  }

  @media (max-width: 768px) {
    top: 62%;
    left: 4%;
  }

  h2 {
    font-size: ${(props) => (props.$isHovered ? "70px" : "80px")};
    font-weight: bold;
    margin-bottom: 20px;
    transition: font-size 0.5s ease;

    @media (max-width: 1024px) {
      font-size: ${(props) => (props.$isHovered ? "50px" : "60px")};
    }

    @media (max-width: 768px) {
      font-size: ${(props) => (props.$isHovered ? "40px" : "40px")};
    }
  }

  p {
    font-size: 18px;

    @media (max-width: 1024px) {
      font-size: 16px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const SidebarRight = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;

  @media (max-width: 400px) {
    justify-content: center;
    align-items: center;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 1280px) {
    }

    @media (max-width: 1240px) {
    }

    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }

    @media (max-width: 400px) {
      width: 100%;
      padding: 0 10px;
      gap: 10px;
    }
  }

  li {
    p {
      color: #ddd;
      font-size: 14px;
      font-weight: 300;

      @media (max-width: 1024px) {
        font-size: 12px;
      }

      @media (max-width: 768px) {
        display: none;
      }
    }
  }
`;

const Btn = styled.button`
  width: 200px;
  border: none;
  margin-bottom: 6px;
  background: none;
  color: #fff;
  font-size: 22px;
  font-weight: 400;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: left;

  span {
    position: relative;
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    background: linear-gradient(90deg, #e9dd8f 50%, #fff 50%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-size: 200% 100%;
    background-position: 100% 0;
    transition: background-position 0.4s ease;
  }

  &:hover span {
    background-position: 0 0;
  }

  @media (max-width: 1024px) {
    font-size: 18px;
    width: 180px;

    span {
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    width: 140px;
    text-align: center;
    span {
      font-size: 16px;
    }
  }
  @media (max-width: 400px) {
    width: 120px;
    text-align: center;
    span {
      font-size: 14px;
    }
  }
`;

const AnimatedBox = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.mainbackgtound};
`;

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { ripples, containerRef } = useRippleEffect();
  const dispatch = useDispatch();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  //버튼이동
  const scrollToPortfolio = () => {
    dispatch(setPage(2)); // Redux 상태 업데이트
  };

  const goToNotion = () => {
    window.open("https://www.notion.so/13336341b0a7800e9a55d63360689f79?pvs=4");
  };

  return (
    <Container
      id="main-scroll-container"
      ref={containerRef}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <RippleContainer />

      <ScrollIndicator
        style={{ opacity, y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: -10 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 2.5 }}
      >
        <FontAwesomeIcon icon={faAnglesDown} />
      </ScrollIndicator>

      <SidebarLeft
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
      >
        <h1>Planting My First Code in the Forest of Frontend.</h1>
        <p>
          Like a seed growing into a forest, my frontend journey is rooted in
          passion and nurtured with continuous learning.
        </p>
      </SidebarLeft>

      <Overlay
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <h2>{isHovered ? "Moon Ji Su" : "Frontend"}</h2>
        <p>
          {isHovered
            ? "Exploring My Journey"
            : "Growth, Like a Forest by Ji Su Moon."}
        </p>
      </Overlay>

      <MainContent>
        <AnimatedBox
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        <motion.img
          src="/img/seed.jpg"
          alt="seed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </MainContent>

      <SidebarRight
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
      >
        <ul>
          <li>
            <Btn aria-label="Explore Projects" onClick={scrollToPortfolio}>
              <span>Explore Projects</span>
            </Btn>
            <p>작업한 프로젝트들을 한눈에 확인할 수 있는 공간입니다.</p>
          </li>
          <li>
            <Btn aria-label="Notion">
              <span onClick={goToNotion}>Notion</span>
            </Btn>
            <p>기술과 아이디어를 정리한 공간입니다.</p>
          </li>
          <li>
            <Btn aria-label="About me">
              <span>Figma</span>
            </Btn>
            <p>디자인과 기획을 정리한 공간입니다.</p>
          </li>
        </ul>
      </SidebarRight>
    </Container>
  );
};

export default memo(Home);
