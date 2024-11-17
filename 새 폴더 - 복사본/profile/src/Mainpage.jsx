import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import { throttle } from "lodash";
import MainScroll from "./pages/MainScroll";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentSection } from "./store/sectionReducer";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SectionContainer = styled.div`
  position: ${(props) => (props.$isSticky ? "sticky" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${(props) => (props.$isAbove ? 10 : 0)};
  transition: z-index 0.3s ease;
`;

const Mainpage = () => {
  const [isAboutMeAbove, setIsAboutMeAbove] = useState(false);
  const [isPortfolioAbove, setIsPortfolioAbove] = useState(false);
  const [isContactAbove, setIsContactAbove] = useState(false);

  const homeRef = useRef(null);
  const aboutMeRef = useRef(null);
  const portfolioRef = useRef(null);

  const currentSection = useSelector((state) => state.section.currentSection);
  const dispatch = useDispatch();

  const handleScroll = useCallback(
    throttle(() => {
      const homeBottom = homeRef.current?.getBoundingClientRect().bottom || 0;
      const aboutMeBottom =
        aboutMeRef.current?.getBoundingClientRect().bottom || 0;
      const portfolioBottom =
        portfolioRef.current?.getBoundingClientRect().bottom || 0;

      // 상태 업데이트 조건 추가
      if (homeBottom <= 0 && !isAboutMeAbove) {
        setIsAboutMeAbove(true);
      } else if (homeBottom > 0 && isAboutMeAbove) {
        setIsAboutMeAbove(false);
      }

      if (aboutMeBottom <= 0 && !isPortfolioAbove) {
        setIsPortfolioAbove(true);
      } else if (aboutMeBottom > 0 && isPortfolioAbove) {
        setIsPortfolioAbove(false);
      }

      if (portfolioBottom <= 0 && !isContactAbove) {
        setIsContactAbove(true);
      } else if (portfolioBottom > 0 && isContactAbove) {
        setIsContactAbove(false);
      }
    }, 200),
    [isAboutMeAbove, isPortfolioAbove, isContactAbove]
  );

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 섹션 이동
  useEffect(() => {
    if (currentSection === "portfolio" && portfolioRef.current) {
      portfolioRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (currentSection === "home" && homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (currentSection === "aboutMe" && aboutMeRef.current) {
      aboutMeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentSection]);

  useEffect(() => {
    if (currentSection) {
      dispatch(setCurrentSection("home"));
    }
  }, [dispatch, currentSection]);

  return (
    <Wrapper>
      <SectionContainer ref={homeRef} $isSticky={!isAboutMeAbove}>
        <MainScroll />
      </SectionContainer>

      <SectionContainer
        ref={aboutMeRef}
        $isSticky={isAboutMeAbove && !isPortfolioAbove}
        $isAbove={isAboutMeAbove}
      >
        <AboutMe />
      </SectionContainer>

      <SectionContainer
        ref={portfolioRef}
        $isSticky={isPortfolioAbove && !isContactAbove}
        $isAbove={isPortfolioAbove}
      >
        <Portfolio id="portfolio-section-id" />
      </SectionContainer>

      <SectionContainer $isSticky={isContactAbove} $isAbove={isContactAbove}>
        <Contact />
      </SectionContainer>
    </Wrapper>
  );
};

export default Mainpage;
