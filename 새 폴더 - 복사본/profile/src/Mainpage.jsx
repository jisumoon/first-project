import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import MainScroll from "./pages/MainScroll";
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
`;

const SectionContainer = styled.div.attrs((props) => ({
  style: {
    zIndex: props.$isAbove ? 10 : 0,
  },
}))`
  position: ${(props) => (props.$isSticky ? "sticky" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
  transition: z-index 0.3s ease;
`;

const Mainpage = () => {
  const [visibleSection, setVisibleSection] = useState("home");
  const sectionsRef = useRef({
    home: null,
    aboutMe: null,
    portfolio: null,
    contact: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setVisibleSection(visibleEntry.target.id);
        }
      },
      { threshold: 0.5 } // 50% 이상 보일 때만 감지
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <Wrapper>
      <SectionContainer
        ref={(el) => (sectionsRef.current.home = el)}
        id="home"
        $isSticky={visibleSection === "home"}
      >
        <MainScroll />
      </SectionContainer>

      <SectionContainer
        ref={(el) => (sectionsRef.current.aboutMe = el)}
        id="aboutMe"
        $isSticky={visibleSection === "aboutMe"}
      >
        <AboutMe />
      </SectionContainer>

      <SectionContainer
        ref={(el) => (sectionsRef.current.portfolio = el)}
        id="portfolio"
        $isSticky={visibleSection === "portfolio"}
      >
        <Portfolio />
      </SectionContainer>

      <SectionContainer
        ref={(el) => (sectionsRef.current.contact = el)}
        id="contact"
        $isSticky={visibleSection === "contact"}
      >
        <Contact />
      </SectionContainer>
    </Wrapper>
  );
};

export default Mainpage;

// import React, { useRef, useState, useEffect } from "react";
// import styled from "styled-components";
// import MainScroll from "./pages/MainScroll";
// import AboutMe from "./pages/AboutMe";
// import Portfolio from "./pages/Portfolio";
// import Contact from "./pages/Contact";

// const Wrapper = styled.div`
//   position: relative;
//   width: 100%;
//   overflow: visible; /* sticky 동작을 방해하지 않도록 설정 */
// `;

// const SectionContainer = styled.div.attrs((props) => ({
//   style: {
//     zIndex: props.$isSticky ? 10 : 0,
//   },
// }))`
//   position: ${(props) => (props.$isSticky ? "sticky" : "relative")};
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: auto;
//   background: ${(props) => props.background || "transparent"};
//   transition: z-index 0.3s ease;
// `;

// const Mainpage = () => {
//   const [visibleSection, setVisibleSection] = useState("home");
//   const sectionsRef = useRef({
//     home: null,
//     aboutMe: null,
//     portfolio: null,
//     contact: null,
//   });

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             console.log("Visible Section:", entry.target.id); // 디버깅용 로그
//             setVisibleSection(entry.target.id);
//           }
//         });
//       },
//       { threshold: 0.5 } // threshold 조정 가능
//     );

//     Object.values(sectionsRef.current).forEach((section) => {
//       if (section) observer.observe(section);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <Wrapper>
//       {/* MainScroll: 일반 스크롤 */}
//       <SectionContainer
//         ref={(el) => (sectionsRef.current.home = el)}
//         id="home"
//         $isSticky={false}
//         background="lightblue"
//       >
//         <MainScroll />
//       </SectionContainer>

//       {/* AboutMe: sticky 적용 */}
//       <SectionContainer
//         ref={(el) => (sectionsRef.current.aboutMe = el)}
//         id="aboutMe"
//         $isSticky={visibleSection === "aboutMe"}
//         background="lightgreen"
//       >
//         <AboutMe />
//       </SectionContainer>

//       {/* Portfolio: 일반 스크롤 */}
//       <SectionContainer
//         ref={(el) => (sectionsRef.current.portfolio = el)}
//         id="portfolio"
//         $isSticky={false}
//         background="lightcoral"
//       >
//         <Portfolio />
//       </SectionContainer>

//       {/* Contact: 일반 스크롤 */}
//       <SectionContainer
//         ref={(el) => (sectionsRef.current.contact = el)}
//         id="contact"
//         $isSticky={false}
//         background="lightyellow"
//       >
//         <Contact />
//       </SectionContainer>
//     </Wrapper>
//   );
// };

// export default Mainpage;
