import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setCurrentSection } from "../store/sectionReducer";
import { useSelector } from "react-redux";
import useRippleEffect from "../Hook/useRippleEffect";
import RippleEffect from "../components/RippleEffect";

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
  overflow-x: hidden;
  touch-action: none;

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
  bottom: 3%;
  left: 36.2%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 10px 2px;
  font-size: 24px;
  z-index: 1000;
  animation: ${floatingAnimation} 2s ease-in-out infinite;
  @media (max-width: 1024px) {
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

    &.hidden {
      opacity: 0;
    }

    &.visible {
      opacity: 1;
    }
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

  @media (max-width: 390px) {
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
      padding: 0 8px;
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
      font-size: 24px;
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
  z-index: 1;
`;

const MainScroll = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const currentSection = useSelector((state) => state.section.currentSection);
  const [currentImage, setCurrentImage] = useState("/img/seed.jpg");
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const { ripples, containerRef } = useRippleEffect();

  const goToPortfolio = () => {
    dispatch(setCurrentSection("portfolio"));
  };

  const goToNotion = () => {
    window.open("https://www.notion.so/13336341b0a7800e9a55d63360689f79?pvs=4");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true); // 500ms 후 애니메이션 활성화
    }, 500);

    return () => clearTimeout(timer); // 타이머 클린업
  }, []);

  const updateCurrentImage = (direction) => {
    if (direction === "left" || direction === "up") {
      setCurrentImage("/img/profile.png");
    } else if (direction === "right" || direction === "down") {
      setCurrentImage("/img/seed.jpg");
    }
  };

  return (
    <Container id="main-scroll-container" ref={containerRef}>
      <RippleEffect ripples={ripples} />

      {animationComplete && (
        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 3 }}
        >
          <FontAwesomeIcon icon={faAnglesDown} />
        </ScrollIndicator>
      )}

      <SidebarLeft
        initial={{ opacity: 0 }}
        animate={animationComplete ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 3 }}
      >
        <h1>Planting My First Code in the Forest of Frontend.</h1>
        <p>
          Like a seed growing into a forest, my frontend journey is rooted in
          passion and nurtured with continuous learning.
        </p>
      </SidebarLeft>

      {animationComplete && (
        <Overlay
          $isHovered={isHovered}
          initial={{
            y: 50,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: "easeInOut",
          }}
        >
          <h2>{isHovered ? "Moon Ji Su" : "Frontend."}</h2>
          <p>
            {isHovered
              ? "Exploring My Journey"
              : "Growth, Like a Forest by Ji Su Moon."}
          </p>
        </Overlay>
      )}

      <MainContent
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {!animationComplete && (
          <ScrollIndicator
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 3 }}
            style={{ display: isMobile ? "none" : "flex" }}
          ></ScrollIndicator>
        )}
        <AnimatedBox
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />

        {animationComplete && (
          <motion.img
            src={isHovered ? "/img/profile.png" : "/img/seed.jpg"}
            alt={isHovered ? "profile" : "seed"}
            draggable={false}
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 1.5, delay: 0.5 },
            }}
            whileHover={!isMobile ? { transition: { duration: 0.3 } } : {}}
            transition={{
              duration: isHovered ? 0.8 : 2,
              delay: 1,
              ease: "easeInOut",
            }}
          />
        )}
      </MainContent>
      <SidebarRight
        initial={{ opacity: 0 }}
        animate={animationComplete ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 3 }}
      >
        <ul>
          <li>
            <Btn onClick={goToPortfolio}>
              <span>Explore Projects</span>
            </Btn>
            <p>작업한 프로젝트들을 한눈에 확인할 수 있는 공간입니다.</p>
          </li>
          <li>
            <Btn>
              <span onClick={goToNotion}>Notion</span>
            </Btn>
            <p>기술과 아이디어를 정리한 공간입니다.</p>
          </li>
          <li>
            <Btn>
              <span>About Me</span>
            </Btn>
            <p>인터뷰 형식으로 저를 소개합니다.</p>
          </li>
        </ul>
      </SidebarRight>
    </Container>
  );
};

export default MainScroll;
