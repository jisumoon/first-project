// // MainPage.js
// import React, { useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Home from "./Home";
// import AboutMe from "./AboutMe";
// import Portfolio from "./Portfolio";
// import Contact from "./Contact";

// const MainPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const homeRef = useRef(null);
//   const aboutMeRef = useRef(null);
//   const portfolioRef = useRef(null);
//   const contactRef = useRef(null);

//   const sections = [
//     { ref: homeRef, path: "/" },
//     { ref: aboutMeRef, path: "/aboutme" },
//     { ref: portfolioRef, path: "/portfolio" },
//     { ref: contactRef, path: "/contact" },
//   ];

//   useEffect(() => {
//     // URL에 따라 초기 스크롤 위치를 설정
//     const currentSection = sections.find(
//       (section) => section.path === location.pathname
//     );
//     if (currentSection && currentSection.ref.current) {
//       currentSection.ref.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//     // 스크롤 시 URL 업데이트
//     const handleScroll = () => {
//       const currentSection = sections.find(({ ref }) => {
//         const { top, bottom } = ref.current.getBoundingClientRect();
//         return (
//           top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2
//         );
//       });

//       if (currentSection) {
//         navigate(currentSection.path);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [navigate]);

//   return (
//     <div>
//       <section ref={homeRef}>
//         <Home />
//       </section>
//       <section ref={aboutMeRef}>
//         <AboutMe />
//       </section>
//       <section ref={portfolioRef}>
//         <Portfolio />
//       </section>
//       <section ref={contactRef}>
//         <Contact />
//       </section>
//     </div>
//   );
// };

// export default MainPage;
