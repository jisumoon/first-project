import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

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
  background: ${(props) => props.theme.colors.mainbackgtound};
`;

const Mainpage = () => {
  const [isAboutMeAbove, setIsAboutMeAbove] = useState(false);
  const [isPortfolioAbove, setIsPortfolioAbove] = useState(false);
  const [isContactAbove, setIsContactAbove] = useState(false);

  const homeRef = useRef(null);
  const aboutMeRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (homeRef.current && aboutMeRef.current && portfolioRef.current) {
        const homeBottom = homeRef.current.getBoundingClientRect().bottom;
        const aboutMeBottom = aboutMeRef.current.getBoundingClientRect().bottom;
        const portfolioBottom =
          portfolioRef.current.getBoundingClientRect().bottom;

        // Home 섹션이 사라지면 AboutMe가 sticky로 전환
        setIsAboutMeAbove(homeBottom <= 0);

        // AboutMe 섹션이 사라지면 Portfolio가 sticky로 전환
        setIsPortfolioAbove(aboutMeBottom <= 0);

        // Portfolio 섹션이 사라지면 Contact가 sticky로 전환
        setIsContactAbove(portfolioBottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper>
      <SectionContainer ref={homeRef} $isSticky={!isAboutMeAbove}>
        <Home />
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
        <Portfolio />
      </SectionContainer>

      <SectionContainer $isSticky={isContactAbove} $isAbove={isContactAbove}>
        <Contact />
      </SectionContainer>
    </Wrapper>
  );
};

export default Mainpage;
