import React, { useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPagelines } from "@fortawesome/free-brands-svg-icons/faPagelines";

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
    font-family: ${(props) => props.theme.fonts.four};
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

const Loading = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const introAnimation = () => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut", duration: 1 },
      });

      tl.to(".intro__title", {
        duration: 1.5,
        y: 0,
        autoAlpha: 1,
        delay: 0.5,
      })
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
        );

      return tl;
    };

    // 타임라인 실행
    const master = gsap.timeline({
      paused: false, // 자동 실행
      delay: 0.2, //0.2초대기
    });

    master.add(introAnimation()); // 애니메이션 추가
  }, []);

  useEffect(() => {
    // 스크롤 비활성화
    document.body.style.overflow = "hidden";
    document.body.style.overflowX = "hidden";

    // 컴포넌트 언마운트 시 스크롤 복구
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    };
  }, []);

  return (
    <AppWrapper>
      <IntroSection className="intro">
        <h2 className="intro__title">
          Planting My First Code <FontAwesomeIcon icon={faPagelines} />
        </h2>
        <div className="intro__background intro__background--left"></div>
        <div className="intro__background intro__background--right"></div>
      </IntroSection>
    </AppWrapper>
  );
};

export default Loading;
