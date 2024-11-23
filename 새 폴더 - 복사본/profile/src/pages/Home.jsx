import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";
import useRippleEffect from "../Hook/useRippleEffect";
import RippleContainer from "../components/RippleContainer";
import { useDispatch, useSelector } from "react-redux";
import { positionActions } from "../store/positionSliceReducer";
import { useScrollToTarget } from "../Hook/useScrollToTarget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import useScrollAnimation from "../Hook/useScrollAnimation";

const floatingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const ScrollDownIcon = styled.div`
  position: absolute;
  bottom: 5%;
  left: 35%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 10px 2px;
  font-size: 24px;
  z-index: 100;
  animation: ${floatingAnimation} 2s ease-in-out infinite;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AppWrapper = styled.div`
  width: 100%;
  text-rendering: optimizeLegibility;
  color: white;
  background: ${(props) => props.theme.colors.primary};
`;

const IntroSection = styled.section`
  position: fixed;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.colors.primary};
  z-index: 5;

  .intro__title {
    color: white;

    font-size: 24px;
    font-weight: bold;
    letter-spacing: 1.2px;
    text-align: center;
    mix-blend-mode: difference;
    z-index: 2;
    transform: translateY(40px);
    opacity: 0;
    visibility: hidden;
  }

  .intro__background {
    position: absolute;
    top: 0;
    background: white;
    width: 50%;
    height: 100%;
    transform: scaleX(0);

    &--left {
      left: 0;
      transform-origin: left center;
    }

    &--right {
      left: 50%;
      transform-origin: right center;
    }
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
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

const Overlay = styled.div`
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

const HeroSection = styled.section`
  position: relative;
  display: flex;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 440px;
  }
  @media (max-width: 390px) {
    width: 390px;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    transition: transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease-in-out;
    cursor: pointer;
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 400px) {
      width: 100%;
    }

    @media (max-width: 390px) {
      width: 390px;
    }
  }
`;

const SidebarLeft = styled.div`
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

const SidebarRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;

  @media (max-width: 400px) {
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 390px) {
    width: 100%;
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
  @media (max-width: 390px) {
    width: 160px;
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

const Home = () => {
  const { ripples, containerRef } = useRippleEffect();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [disableScroll, setDisableScroll] = useState(true); // 초기 스크롤 비활성화
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const { scrollRef, scrollEl } = useScrollAnimation();
  const position = useSelector((state) => state.position.isPosition);

  useEffect(() => {
    const timer = setTimeout(() => setDisableScroll(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("scrollEl:", scrollEl);
    dispatch(positionActions.PositionStyle(scrollEl ? "sticky" : "relative"));
  }, [scrollEl, dispatch]);

  const isPosition = useSelector((state) => state.position.isPosition);
  useEffect(() => {
    console.log("Redux state isPosition:", isPosition);
  }, [isPosition]);

  useEffect(() => {
    document.body.style.overflow = disableScroll ? "hidden" : "auto";
    document.body.style.overflowX = "hidden"; // X 스크롤 항상 숨김
    return () => {
      document.body.style.overflow = "auto"; // Y 스크롤 활성화
      document.body.style.overflowX = "hidden"; // X 스크롤은 유지
    };
  }, [disableScroll]);

  const scrollToPortfolio = () => dispatch(setPage(2)); // Redux  페이지 이동 처리

  const goToNotion = () => {
    window.open("https://www.notion.so/13336341b0a7800e9a55d63360689f79?pvs=4");
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const animationOptions = { ease: "expo.inOut" };

    const introAnimation = () => {
      const tl = gsap.timeline({
        defaults: { ease: animationOptions.ease, duration: 1 },
      });

      tl.to(".intro__title", { duration: 1.5, y: 0, autoAlpha: 1, delay: 0.5 })
        .to(".intro__background--left, .intro__background--right", {
          scaleX: 1,
        })
        .to(".intro__background--left, .intro__background--right", {
          scaleY: 0,
          transformOrigin: "top center",
        })
        .to(
          ".intro__title",
          { duration: 1.5, y: isMobile ? -30 : -60, autoAlpha: 0 },
          "-=0.6"
        )
        .to(".intro", { y: "-100%" }, "-=0.5");

      return tl;
    };

    const mainAnimation = () => {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power3.out" },
      });

      tl.from(".SidebarLeft", { x: isMobile ? -100 : -200, opacity: 0 }, 0)
        .from(".SidebarRight", { x: isMobile ? 100 : 200, opacity: 0 }, 0)
        .from(
          [".seed_img", ".Main_title"],
          { opacity: 0, duration: 1 },
          "-=0.5"
        );

      return tl;
    };

    const master = gsap.timeline({
      paused: false,
      delay: 0.2,
      onComplete: () => setAnimationComplete(true),
    });

    master.add(introAnimation()).add(mainAnimation(), "-=0.5");
  }, []);

  return (
    <AppWrapper
      $position={position}
      $disableScroll={disableScroll}
      ref={scrollRef}
    >
      <IntroSection className="intro">
        <h2 className="intro__title">
          Planting My First Code in the Forest of Frontend.
        </h2>
        <div className="intro__background intro__background--left"></div>
        <div className="intro__background intro__background--right"></div>
      </IntroSection>
      <RippleContainer ref={containerRef} ripples={ripples} />

      <Wrapper>
        <SidebarLeft className="SidebarLeft">
          <h1>Planting My First Code in the Forest of Frontend.</h1>
          <p>
            Like a seed growing into a forest, my frontend journey is rooted in
            passion and nurtured with continuous learning.
          </p>
        </SidebarLeft>

        <Overlay className="Main_title">
          <h2>Moon Ji Su</h2>
          <p>Growth, Like a Forest</p>
        </Overlay>

        <HeroSection>
          <img
            className="seed_img"
            src="/img/seed.jpg"
            alt="seed"
            style={{ opacity: 1 }}
          />
        </HeroSection>

        <SidebarRight className="SidebarRight">
          <ul>
            <li>
              <Btn onClick={scrollToPortfolio}>
                <span>Explore Projects</span>
              </Btn>
              <p>작업한 프로젝트들을 한눈에 확인할 수 있는 공간입니다.</p>
            </li>
            <li>
              <Btn onClick={goToNotion}>
                <span>Notion</span>
              </Btn>
              <p>기술과 아이디어를 정리한 공간입니다.</p>
            </li>
            <li>
              <Btn>
                <span>Figma</span>
              </Btn>
              <p>디자인과 기획을 정리한 공간입니다.</p>
            </li>
          </ul>
        </SidebarRight>
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
