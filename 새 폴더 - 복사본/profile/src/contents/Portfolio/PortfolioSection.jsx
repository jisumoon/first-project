// import React, { useState } from "react";
// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import PortfolioBox from "../Portfolio/PortfolioBox";

// const Contain = styled.div`
//   width: 100%;
//   margin-top: 30vh;
//   overflow: hidden;
// `;

// const Section = styled.section`
//   padding: 16px;
//   border: 1px solid #f00;
//   position: relative;
//   z-index: 2;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Article = styled.article`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 100%;
//   max-width: 1200px;
// `;

// const SectionTitle = styled.h1`
//   font-size: 48px;
//   font-weight: bold;

//   margin-top: 40px;
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     font-size: 32px;
//   }
// `;

// const Controls = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 20px;
//   margin-bottom: 20px;
//   flex-wrap: wrap;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 20px;

//   @media (max-width: 768px) {
//     justify-content: center;
//     gap: 10px;
//   }
// `;

// const Btn = styled.button`
//   padding: 10px 30px;
//   border: none;
//   border-radius: 4px;
//   background: ${(props) => props.theme.colors.highlight};
//   color: white;
//   font-weight: bold;
//   cursor: pointer;
//   transition: background 0.3s, transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     background: ${(props) => props.theme.colors.secondary};
//     transform: translateY(-2px);
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//   }

//   &:active {
//     transform: translateY(0);
//     box-shadow: none;
//   }
// `;

// const SearchBarWrapper = styled.div`
//   position: relative;
//   width: 300px;

//   @media (max-width: 768px) {
//     width: 100%;
//     max-width: 300px;
//   }
// `;

// const SearchBar = styled.input`
//   padding: 10px 40px 10px 16px;
//   border: none;
//   border-radius: 4px;
//   width: 100%;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const SearchIcon = styled(FontAwesomeIcon)`
//   position: absolute;
//   top: 50%;
//   right: 12px;
//   transform: translateY(-50%);
//   color: ${(props) => props.theme.colors.secondary};
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 20px;
//   width: 100%;
//   min-height: 400px;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   }
// `;

// const NoResultsMessage = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   grid-column: 1 / -1;
//   font-size: 18px;
//   color: white;
// `;

// const PortfolioSection = ({ projects, onOpenModal }) => {
//   const [filter, setFilter] = useState("ALL");
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleFilterChange = (category) => {
//     setFilter(category);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   const filteredProjects = projects.filter(
//     (project) =>
//       (filter === "ALL" || project.category === filter) &&
//       (project.title_kr.toLowerCase().includes(searchQuery) ||
//         project.description.toLowerCase().includes(searchQuery))
//   );

//   return (
//     <Contain>
//       <Section>
//         <SectionTitle>Portfolio</SectionTitle>
//         <Article>
//           <Controls>
//             <ButtonGroup>
//               <Btn onClick={() => handleFilterChange("ALL")}>ALL</Btn>
//               <Btn onClick={() => handleFilterChange("Team")}>Team</Btn>
//               <Btn onClick={() => handleFilterChange("Single")}>Single</Btn>
//             </ButtonGroup>
//             <SearchBarWrapper>
//               <SearchBar
//                 type="text"
//                 placeholder="검색어를 입력해주세요"
//                 onChange={handleSearch}
//               />
//               <SearchIcon icon={faSearch} />
//             </SearchBarWrapper>
//           </Controls>
//           <Grid>
//             {filteredProjects.length > 0 ? (
//               filteredProjects.map((item) => (
//                 <PortfolioBox
//                   key={item.id}
//                   item={item}
//                   onClick={() => onOpenModal(item)}
//                 />
//               ))
//             ) : (
//               <NoResultsMessage>🌳 검색 결과가 없습니다 🌳</NoResultsMessage>
//             )}
//           </Grid>
//         </Article>
//       </Section>
//     </Contain>
//   );
// };

// export default PortfolioSection;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PortfolioBox from "../Portfolio/PortfolioBox";

gsap.registerPlugin(ScrollTrigger);

const PortSection = styled.section`
  border: 1px solid #f00;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const PortInner = styled.div`
  padding: 16px;
`;

const PortTitle = styled.div`
  padding-left: 40px;
  padding-bottom: 10px;
  width: 100%;
  height: 5vw;
  font-size: 4vw;
  font-weight: 900;
  line-height: 1.6;

  text-transform: uppercase;

  margin-bottom: 16px;
  text-indent: -0.26vw;

  em {
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 2;
  }
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 0 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;

const Btn = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.highlight};
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const SearchBar = styled.input`
  padding: 10px 40px 10px 16px;
  border: none;
  border-radius: 4px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 30%;
  right: 14px;
  color: ${(props) => props.theme.colors.secondary};
`;

const PortWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
`;

const PortItem = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 70vh;

  padding: 2.5rem;
  margin-right: 20px;
`;

const NoResultsMessage = styled.div`
  font-size: 18px;
`;

const PortfolioSection = ({ projects, onOpenModal }) => {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProjects = projects.filter(
    (project) =>
      (filter === "ALL" || project.category === filter) &&
      (project.title_kr.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery))
  );

  useEffect(() => {
    const horSection = gsap.utils.toArray(".port__item");

    if (!horSection || horSection.length === 0) {
      console.warn("No horizontal items found.");
      return;
    }

    const sectionWidth = horSection.length * 400; // 각 아이템 크기 * 갯수
    gsap.to(horSection, {
      xPercent: -100 * (horSection.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${sectionWidth}`, // 동적으로 계산된 길이
        pin: true,
        scrub: 1,
        markers: false,
      },
    });
  }, [projects]);

  return (
    <PortSection id="port" ref={sectionRef}>
      <PortInner>
        <PortTitle>portfolio</PortTitle>
        <Controls>
          <ButtonGroup>
            <Btn onClick={() => handleFilterChange("ALL")}>ALL</Btn>
            <Btn onClick={() => handleFilterChange("Team")}>Team</Btn>
            <Btn onClick={() => handleFilterChange("Single")}>Single</Btn>
          </ButtonGroup>
          <SearchBarWrapper>
            <SearchBar
              type="text"
              placeholder="검색어를 입력해주세요"
              onChange={handleSearch}
            />
            <SearchIcon icon={faSearch} />
          </SearchBarWrapper>
        </Controls>
        <PortWrap>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((item) => (
              <PortItem key={item.id} className="port__item">
                <PortfolioBox item={item} onClick={() => onOpenModal(item)} />
              </PortItem>
            ))
          ) : (
            <PortItem>
              <NoResultsMessage>🌳 검색 결과가 없습니다 🌳</NoResultsMessage>
            </PortItem>
          )}
        </PortWrap>
      </PortInner>
    </PortSection>
  );
};

export default PortfolioSection;
