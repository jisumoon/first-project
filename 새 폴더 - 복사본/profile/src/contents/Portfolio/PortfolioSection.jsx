import React, { useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";
import PortfolioBox from "../Portfolio/PortfolioBox";

const Contain = styled.div`
  width: 100%;
  display: flex;
  background-image: url("img/tree1.jpg");
  background-size: cover;
  position: relative;
  z-index: 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(29, 83, 62, 0.78);
    z-index: 1;
  }
`;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  padding-top: 80px;
  padding-left: 40px;
  gap: 20px;
  overflow: hidden;
  z-index: 2;
`;

const Article = styled.article`
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 20px;
  padding: 0 10px;
`;

const SectionTitle = styled.h1`
  font-size: 64px;
  font-weight: 900;
  color: #fff;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BottomSection = styled.div`
  overflow: hidden;
  min-width: 1200px;
  margin-top: 40px;
  padding: 40px;
  display: flex;

  background: ${(props) => props.theme.colors.mainbackgtound};
  position: relative;
`;

const SlideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  gap: 60px;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.translate}px); /* 이동 거리 */
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: ${(props) => props.theme.colors.highlight};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

const Btn = styled.button`
  width: 100px;
  padding: 10px 0;
  border: none;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.background};
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondary};
  font-weight: bold;
  cursor: pointer;
  transition: color 0.6s, background 0.6s;

  &:hover {
    color: #fff;
    background: ${(props) => props.theme.colors.highlight};
  }
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 10px 0;
  padding-left: 20px;
  border: none;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.background};
  font-size: 16px;
`;

const NoResultsMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: ${(props) => props.theme.colors.secondary};
`;

const PortfolioSection = ({ projects, onOpenModal }) => {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFilterChange = (category) => {
    setFilter(category);
    setCurrentIndex(0); // 필터 변경 시 슬라이드 초기화
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentIndex(0); // 검색 시 슬라이드 초기화
  };

  const filteredProjects = projects.filter(
    (project) =>
      (filter === "ALL" || project.category === filter) &&
      (project.title_kr.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery))
  );

  const projectsPerSlide = 3; // 한 슬라이드에 표시될 프로젝트 개수
  const projectWidth = 300; // PortfolioBox의 너비
  const gapWidth = 84; // PortfolioBox 간의 간격
  const maxIndex = Math.ceil(filteredProjects.length / projectsPerSlide) - 1;

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // 슬라이드 이동 거리 계산
  const translate =
    -currentIndex * (projectsPerSlide * (projectWidth + gapWidth));

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  return (
    <Contain>
      <Section>
        <SectionTitle>Portfolio</SectionTitle>
        <Article>
          <TopSection>
            <BtnGroup>
              <Btn onClick={() => handleFilterChange("ALL")}>ALL</Btn>
              <Btn onClick={() => handleFilterChange("Team")}>Team</Btn>
              <Btn onClick={() => handleFilterChange("Single")}>Single</Btn>
            </BtnGroup>
            <SearchBar
              type="text"
              placeholder="검색어를 입력해주세요"
              onChange={handleSearch}
            />
          </TopSection>
          {filteredProjects.length > 0 ? (
            <BottomSection>
              <LeftArrow onClick={handlePrev} disabled={currentIndex === 0}>
                ◀
              </LeftArrow>
              <SlideWrapper translate={translate}>
                {filteredProjects.map((item) => (
                  <PortfolioBox
                    key={item.id}
                    item={item}
                    onClick={() => onOpenModal(item)}
                  />
                ))}
              </SlideWrapper>
              <RightArrow
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
              >
                ▶
              </RightArrow>
            </BottomSection>
          ) : (
            <NoResultsMessage>🌳검색 결과가 없습니다🌳</NoResultsMessage>
          )}
        </Article>
      </Section>
    </Contain>
  );
};
export default PortfolioSection;
