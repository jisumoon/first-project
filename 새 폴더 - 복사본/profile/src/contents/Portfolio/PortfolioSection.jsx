import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PortfolioBox from "../Portfolio/PortfolioBox";

gsap.registerPlugin(ScrollTrigger);

// Styled Components
const PortSection = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const MouseFollower = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s ease;
  z-index: 9999;

  &.click-effect {
    background: ${(props) => props.theme.colors.highlight};
    transform: translate(-50%, -50%) scale(3);
  }

  &.hover-effect {
    background: ${(props) => props.theme.colors.highlight};
    transform: translate(-50%, -50%) scale(1.5);
  }
`;

const PortInner = styled.div`
  padding: 16px;
`;

const PortTitle = styled.div`
  padding-left: 40px;
  font-size: 50px;
  font-weight: 900;
  line-height: 1.6;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 40px;
    padding-left: 0;
  }
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
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
  color: ${(props) => props.theme.colors.primary};
  background: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
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
  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    opacity: 0;
  }
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
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 20px;

  ${({ isEmpty }) =>
    isEmpty &&
    `display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `}

  @media (max-width: 768px) {
    padding: 10px 16px;
    scroll-behavior: smooth;
  }
`;

const PortItem = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 70vh;
  padding: 2.5rem;
  margin-right: 20px;
  flex-shrink: 0;
  scroll-snap-align: start;

  @media (max-width: 768px) {
    width: 280px;
    height: 50vh;
  }

  transition: transform 0.5s ease, box-shadow 0.5s ease;
  &:hover {
    transform: scale(1.1) translateY(-10px);
  }
`;

const NoResultsMessage = styled.div`
  width: 100%;
  font-size: 18px;
  text-align: center;
  min-height: 150px;
  margin-top: 40px;
`;

// Portfolio Section Component
const PortfolioSection = ({ projects, onOpenModal }) => {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const portWrapRef = useRef(null);
  const followerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleFilterChange = (category) => setFilter(category);

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const filteredProjects = projects.filter(
    (project) =>
      (filter === "ALL" || project.category === filter) &&
      (project.title_kr.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery))
  );

  const handleMouseMove = (e) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseClick = () => {
    followerRef.current.classList.add("click-effect");
    setTimeout(() => {
      followerRef.current.classList.remove("click-effect");
    }, 300);
  };

  const handleMouseOver = () => {
    followerRef.current.classList.add("hover-effect");
  };

  const handleMouseOut = () => {
    followerRef.current.classList.remove("hover-effect");
  };

  useEffect(() => {
    const moveFollower = () => {
      const { x, y } = mousePosition.current;
      followerRef.current.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(moveFollower);
    };

    requestAnimationFrame(moveFollower);

    const horSection = gsap.utils.toArray(".port__item");

    if (!horSection || horSection.length === 0) {
      console.warn("No horizontal items found.");
      return;
    }

    const sectionWidth = horSection.length * 400;

    gsap.to(horSection, {
      xPercent: -100 * (horSection.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current, // PortfolioSection 시작점
        start: "top top", // 화면 상단과 PortfolioSection 상단이 만나는 시점
        end: `+=${sectionWidth}`, // 섹션의 길이에 따라 끝나는 지점
        pin: true, // 필요할 경우 고정
        scrub: 1,
        markers: false, // 디버깅용 마커 비활성화
      },
    });

    return () => cancelAnimationFrame(moveFollower);
  }, [projects]);

  return (
    <PortSection
      id="port"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onClick={handleMouseClick}
    >
      <MouseFollower ref={followerRef} />
      <PortInner>
        <PortTitle>PORTFOLIO</PortTitle>
        <Controls>
          <ButtonGroup
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <Btn
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={() => handleFilterChange("ALL")}
            >
              ALL
            </Btn>
            <Btn
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={() => handleFilterChange("Team")}
            >
              Team
            </Btn>
            <Btn
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onClick={() => handleFilterChange("Single")}
            >
              Single
            </Btn>
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
        <PortWrap ref={portWrapRef} isEmpty={filteredProjects.length === 0}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((item) => (
              <PortItem
                key={item.id}
                className="port__item"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <PortfolioBox item={item} onClick={() => onOpenModal(item)} />
              </PortItem>
            ))
          ) : (
            <NoResultsMessage>🌳 검색 결과가 없습니다 🌳</NoResultsMessage>
          )}
        </PortWrap>
      </PortInner>
    </PortSection>
  );
};

export default PortfolioSection;
