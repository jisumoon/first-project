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
  position: ${(props) => (props.$isFixed ? "sticky" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${(props) => (props.$isAbove ? 10 : 0)};
  transition: z-index 0.3s ease;
`;

const Mainpage = () => {
  const [isAboutMeAbove, setIsAboutMeAbove] = useState(false);
  const homeRef = useRef(null);
  const aboutMeRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (homeRef.current && aboutMeRef.current) {
        const homeBottom = homeRef.current.getBoundingClientRect().bottom;

        // Home 섹션의 하단이 스크롤을 지나가면 AboutMe가 sticky로 전환되고 z-index를 올림
        setIsAboutMeAbove(homeBottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper>
      <SectionContainer ref={homeRef} $isFixed={!isAboutMeAbove}>
        <Home />
      </SectionContainer>
      <SectionContainer
        ref={aboutMeRef}
        $isFixed={isAboutMeAbove}
        $isAbove={isAboutMeAbove}
      >
        <AboutMe />
      </SectionContainer>
      <SectionContainer>
        <Portfolio />
      </SectionContainer>
      <SectionContainer>
        <Contact />
      </SectionContainer>
    </Wrapper>
  );
};

export default Mainpage;
