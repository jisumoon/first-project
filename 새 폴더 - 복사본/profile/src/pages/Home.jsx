import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";
import useRippleEffect from "../Hook/useRippleEffect";
import RippleContainer from "../components/RippleContainer";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import useScrollAnimation from "../Hook/useScrollAnimation";
import { faPagelines } from "@fortawesome/free-brands-svg-icons/faPagelines";
import Header from "../components/Header";

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
  bottom: 18%;
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const MainTitle = styled.p`
  font-size: 220px;
  color: ${(props) => props.theme.colors.mainbackgtound};
  font-family: ${(props) => props.theme.fonts.third};
`;

const Overlay = styled.div``;

const HeroSection = styled.section`
  position: absolute;
  z-index: 1;
  top: 28%;
  left: 38%;
  opacity: 0.6;
  img {
    width: 360px;
    height: 400px;
  }
`;

const BottomSection = styled.div`
  margin-top: 400px;

  text-align: center;

  p {
    width: 600px;
    font-size: 16px;
    line-height: 1.4;
    color: ${(props) => props.theme.colors.mainbackgtound};
  }
`;

// const SidebarLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   padding: 20px;
//   color: rgba(244, 241, 222, 0.4);

//   h1 {
//     font-size: 16px;
//     margin-bottom: 10px;

//     @media (max-width: 1024px) {
//       font-size: 14px;
//     }

//     @media (max-width: 768px) {
//       font-size: 14px;
//     }
//   }

//   p {
//     font-size: 14px;
//     line-height: 1.5;

//     @media (max-width: 1024px) {
//       font-size: 14px;
//     }

//     @media (max-width: 768px) {
//       font-size: 12px;
//     }
//     @media (max-width: 400px) {
//       width: 100%;
//     }
//   }
// `;

// const SidebarRight = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   color: #fff;

//   @media (max-width: 400px) {
//     justify-content: center;
//     align-items: center;
//   }
//   @media (max-width: 390px) {
//     width: 100%;
//   }

//   ul {
//     display: flex;
//     flex-direction: column;
//     gap: 20px;

//     @media (max-width: 1280px) {
//     }

//     @media (max-width: 1240px) {
//     }

//     @media (max-width: 768px) {
//       flex-direction: row;
//       justify-content: center;
//       align-items: center;
//       margin-bottom: 40px;
//     }

//     @media (max-width: 400px) {
//       width: 100%;
//       padding: 0 10px;
//       gap: 10px;
//     }
//   }

//   li {
//     p {
//       color: #ddd;
//       font-size: 14px;
//       font-weight: 300;

//       @media (max-width: 1024px) {
//         font-size: 12px;
//       }

//       @media (max-width: 768px) {
//         display: none;
//       }
//     }
//   }
// `;

// const Btn = styled.button`
//   width: 200px;
//   border: none;
//   margin-bottom: 6px;
//   background: none;
//   color: #fff;
//   font-size: 22px;
//   font-weight: 400;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
//   text-align: left;

//   span {
//     position: relative;
//     display: inline-block;
//     font-size: 20px;
//     font-weight: bold;
//     cursor: pointer;
//     background: linear-gradient(90deg, #e9dd8f 50%, #fff 50%);
//     background-clip: text;
//     -webkit-background-clip: text;
//     color: transparent;
//     background-size: 200% 100%;
//     background-position: 100% 0;
//     transition: background-position 0.4s ease;
//   }

//   &:hover span {
//     background-position: 0 0;
//   }

//   @media (max-width: 1024px) {
//     font-size: 18px;
//     width: 180px;

//     span {
//       font-size: 18px;
//     }
//   }
//   @media (max-width: 390px) {
//     width: 160px;
//   }

//   @media (max-width: 768px) {
//     width: 140px;
//     text-align: center;
//     span {
//       font-size: 16px;
//     }
//   }
//   @media (max-width: 400px) {
//     width: 120px;
//     text-align: center;
//     span {
//       font-size: 14px;
//     }
//   }
// `;

const Home = () => {
  const { ripples, containerRef } = useRippleEffect();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [disableScroll, setDisableScroll] = useState(true); // 초기 스크롤 비활성화
  const introSeen = useSelector((state) => state.section.introSeen);
  const currentSection = useSelector((state) => state.section.currentSection);
  const imgRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setDisableScroll(false), 5000);
    return () => clearTimeout(timer);
  }, []);

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
    <AppWrapper $disableScroll={disableScroll}>
      <IntroSection className="intro">
        <h2 className="intro__title">
          Planting My First Code <FontAwesomeIcon icon={faPagelines} />
        </h2>
        <div className="intro__background intro__background--left"></div>
        <div className="intro__background intro__background--right"></div>
      </IntroSection>
      <RippleContainer ref={containerRef} ripples={ripples} />

      <Wrapper>
        <Header />
        <MainTitle>PORTOFOLIO</MainTitle>
        <HeroSection>
          <img
            className="home_img"
            src="/img/seed.jpg"
            alt="seed"
            style={{ opacity: 1 }}
          />
        </HeroSection>
        <BottomSection>
          <p>
            Like a seed sprouting into a mighty tree, my passion for coding
            grows deeper with every line I write, nurtured by challenges,
            curiosity, and endless possibilities.
          </p>
        </BottomSection>

        {/* <Overlay className="Main_title">
          <h2>PORTFOLIO</h2>
          <p>Growth, Like a Forest by ji su Moon</p>
        </Overlay> */}

        {/* 
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
        </SidebarRight> */}
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
