import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useRippleEffect from "../Hook/useRippleEffect";
import RippleEffectComponent from "../components/RippleEffectContainer";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { setPage } from "../store/sectionSliceReducer";
import { motion, useScroll, useTransform } from "framer-motion";

const AppWrapper = styled.div`
  width: 100%;
  color: white;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.mainbackgtound};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const TopSection = styled.div`
  flex: 9;
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 100px;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainbackgtound};
  transition: all 0.3s ease; /* 부드러운 전환 추가 */

  @media (max-width: 900px) {
    padding-left: 30px;
    gap: 50px;
  }

  @media (max-width: 834px) {
    flex-direction: column; /* 834px 이하에서 레이아웃 변경 */
    padding: 20px;
    gap: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  @media (max-width: 390px) {
    padding-left: 0;
  }

  @media (max-width: 400px) {
    padding-right: 10px;
    gap: 20px;
  }
`;

const MainTitle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  margin-top: 40px;
  color: ${(props) => props.theme.colors.mainbackgtound};
  font-size: 70px;
  font-weight: bold;
  line-height: 1.2;
  transition: font-size 0.3s ease; /* 부드러운 폰트 크기 변경 */

  @media (max-width: 890px) {
    font-size: 36px;
    justify-content: center;
  }

  @media (max-width: 834px) {
    text-align: center;
    font-size: 50px;
    margin-top: 0;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 40px;
  }

  @media (max-width: 740px) {
    padding-top: 0;
  }

  p {
    padding-top: 14px;
    font-size: 15px;
    font-weight: lighter;
    line-height: 1.6;
    opacity: 0.8;
    color: rgba(255, 255, 255, 0.7);
    transition: font-size 0.3s ease; /* 부드러운 전환 */

    @media (max-width: 834px) {
      font-size: 14px;
    }

    @media (max-width: 400px) {
      font-size: 12px;
    }
  }
`;

const HeroSection = styled.section`
  flex: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled(motion.div)`
  width: 540px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;

  img {
    border: 4px solid ${(props) => props.theme.colors.mainbackgtound};
    width: 70%;
    height: auto;
  }

  @media (max-width: 860px) {
    width: 90%;
    justify-content: center;
  }

  @media (max-width: 768px) {
    width: 80%;
    justify-content: center;
  }

  @media (max-width: 400px) {
    width: 90%;
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
  cursor: pointer;
  transition: all 0.3s ease; /* 부드러운 전환 추가 */

  @media (max-width: 900px) {
    font-size: 14px;
  }

  @media (max-width: 834px) {
    display: flex;
    gap: 10px;
    font-size: 14px;
  }

  @media (max-width: 740px) {
    display: none;
  }

  li {
    position: relative;
    font-weight: bold;
    letter-spacing: 4px;
    cursor: pointer;

    &:after {
      content: "→";
      position: absolute;
      right: 0;
      opacity: 0;
      transition: opacity 0.3s ease, right 0.3s ease; /* 부드럽게 나타나도록 전환 효과 */
    }

    &:hover:after {
      opacity: 1;
      right: -24%;
    }
  }

  @media (max-width: 768px) {
    gap: 10px;
    font-size: 14px;
  }

  @media (max-width: 740px) {
    display: none;
  }
`;

const Preview = styled.div`
  position: absolute;
  width: 200px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  bottom: ${({ $bottom }) => $bottom || "auto"};
  top: ${({ $top }) => $top || "auto"};
  left: ${({ $left }) => $left || "auto"};
  right: ${({ $right }) => $right || "auto"};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.visible {
    opacity: 1;
    visibility: visible;
  }

  img {
    border: 4px solid ${(props) => props.theme.colors.mainkbackground};
    width: 100%;
    height: 100%;
    object-fit: cover;
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

//variants
const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
};

const imgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 0.5, ease: "easeInOut" },
  },
};

const Home = () => {
  const containerRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const dispatch = useDispatch();
  const [activePreview, setActivePreview] = useState(null); //preview
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Notion으로 이동
  const goToNotion = () => {
    window.open("https://www.notion.so/13336341b0a7800e9a55d63360689f79?pvs=4");
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <AppWrapper onMouseMove={handleMouseMove}>
      <RippleEffectComponent ref={containerRef} />

      <Wrapper>
        <Header />
        <TopSection>
          <MainTitle initial="hidden" animate="visible" variants={textVariants}>
            <span>FRONTEND</span>
            <span>DEVELOPER</span>
            <p>
              Starting my journey as a frontend developer, I’m planting <br />
              lines of code like seeds in a forest, nurturing them to grow into
              <br />
              impactful solutions.
            </p>
          </MainTitle>
          <HeroSection>
            <Img
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.8, delay: 0.5, ease: "easeInOut" },
                },
              }}
              style={{
                transform: `translate(${mousePosition.x / 50}px, ${
                  mousePosition.y / 50
                }px)`,
              }}
            >
              <img className="contact_img" src="/img/contact.jpg" alt="main" />
            </Img>
          </HeroSection>
        </TopSection>
        <BottomSection>
          <Info>&copy; 2024 Moon Ji Su Portfolio. </Info>
          <Menu>
            <li
              onMouseEnter={() => setActivePreview("github")}
              onMouseLeave={() => setActivePreview(null)}
            >
              GITHUB
              <Preview
                className={`preview ${
                  activePreview === "github" ? "visible" : ""
                }`}
                $bottom="220%"
                $left="-70%"
              >
                <img src="/img/github.gif" alt="GitHub Preview" />
              </Preview>
            </li>
            <li
              onMouseEnter={() => setActivePreview("notion")}
              onMouseLeave={() => setActivePreview(null)}
              onClick={goToNotion}
            >
              NOTION
              <Preview
                className={`preview ${
                  activePreview === "notion" ? "visible" : ""
                }`}
                $bottom="220%"
                $left="-70%"
              >
                <img src="/img/notion.gif" alt="Notion Preview" />
              </Preview>
            </li>
            <li
              onMouseEnter={() => setActivePreview("figma")}
              onMouseLeave={() => setActivePreview(null)}
            >
              FIGMA
              <Preview
                className={`preview ${
                  activePreview === "figma" ? "visible" : ""
                }`}
                $bottom="220%"
                $left="-90%"
              >
                <img src="/img/figma.gif" alt="Figma Preview" />
              </Preview>
            </li>
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
