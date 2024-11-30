import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFolderOpen,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PortfolioBox from "../Portfolio/PortfolioBox";

gsap.registerPlugin(ScrollTrigger);

const PortSection = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const PortInner = styled.div`
  padding: 16px;

  @media (max-width: 768px) {
    text-align: left;
    padding-left: 5px;
  }
`;

const PortTitle = styled.div`
  padding-left: 40px;
  font-size: 70px;
  font-weight: 900;
  line-height: 1.6;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 40px;
    padding-left: 20px;
  }

  @media (max-width: 400px) {
    text-align: left;
    font-size: 40px;
    padding-left: 20px;
  }
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 0 40px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
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
  font-size: 15px;
  color: ${(props) => (props.$isActive ? "#fff" : props.theme.colors.primary)};
  background: ${(props) =>
    props.$isActive ? props.theme.colors.primary : "#fff"};
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.highlight};
    color: #fff;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 327px;
  }
`;

const SearchBar = styled.input`
  padding: 10px 40px 10px 16px;
  border: none;
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
  margin-top: 20px;
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
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
    padding-top: 20px;
    gap: 10px;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

const PortItem = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 70vh;
  padding: 2.5rem;
  flex-shrink: 0;
  scroll-snap-align: start;

  @media (max-width: 768px) {
    width: 280px;
    height: 50vh;
  }
`;

const NoResultsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  min-height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`;

const PortfolioSection = ({ projects, onOpenModal }) => {
  const [filter, setFilter] = useState("ALL");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const portWrapRef = useRef(null);

  const handleFilterChange = (category) => {
    setFilter(category);
    setActiveFilter(category);
    setSearchQuery("");
  };

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 버튼 필터링
      const matchesFilter = filter === "ALL" || project.category === filter;

      // 검색 필터링 (모든 필드 포함)
      const searchFields = [
        project.title_kr,
        project.title_en,
        project.description,
        project.type,
        project.features,
        project.contribution,
        project.problem_solving,
        project.achievement,
        ...(project.key_features || []),
        ...(project.development_outcomes || []),
        project.code_analysis?.problem,
        project.code_analysis?.solution,
        project.github,
        project.blog,
        project.deployment,
      ];

      const matchesSearchQuery = searchFields.some(
        (field) => field && field.toLowerCase().includes(searchQuery)
      );

      // 두 조건을 모두 만족해야 함
      return matchesFilter && matchesSearchQuery;
    });
  }, [projects, filter, searchQuery]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile && portWrapRef.current) {
      const horSection = portWrapRef.current;

      const sectionWidth = horSection.scrollWidth - window.innerWidth;
      // 섹션의 전체 가로 길이에서 화면 너비를 짼 값
      // 섹션의 수평 스크롤 길이

      const animation = gsap.to(horSection, {
        x: -sectionWidth, // 왼쪽 이동
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, //스크롤 트리거
          start: "top top", // 스크롤 시작, 섹션 상단과 화면 상단
          end: () => `+=${sectionWidth}`, //스크롤 종료
          scrub: 0.5, // 더 부드럽게 동작
          pin: true, // 섹션 화면에 고정
          anticipatePin: 1,
        },
      });

      return () => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill(); // 애니메이션 제거
      };
    }
  }, [projects]);

  return (
    <PortSection id="port" ref={sectionRef}>
      <PortInner>
        <PortTitle>PORTFOLIO</PortTitle>
        <Controls>
          <ButtonGroup>
            <Btn
              $isActive={activeFilter === "ALL"}
              onClick={() => handleFilterChange("ALL")}
            >
              ALL
            </Btn>
            <Btn
              $isActive={activeFilter === "Team"}
              onClick={() => handleFilterChange("Team")}
            >
              TEAM
            </Btn>
            <Btn
              $isActive={activeFilter === "Single"}
              onClick={() => handleFilterChange("Single")}
            >
              SINGLE
            </Btn>
          </ButtonGroup>
          <SearchBarWrapper>
            <SearchBar
              type="text"
              placeholder="검색어를 입력해주세요"
              onChange={handleSearch}
              value={searchQuery}
            />
            <SearchIcon icon={faSearch} />
          </SearchBarWrapper>
        </Controls>
        <>
          <PortWrap ref={portWrapRef}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item) => (
                <PortItem key={item.id} className="port__item">
                  <PortfolioBox item={item} onClick={() => onOpenModal(item)} />
                </PortItem>
              ))
            ) : (
              <div />
            )}
          </PortWrap>
          {filteredProjects.length === 0 && (
            <NoResultsMessage>🌳 검색 결과가 없습니다 🌳</NoResultsMessage>
          )}
        </>
      </PortInner>
    </PortSection>
  );
};

export default PortfolioSection;
