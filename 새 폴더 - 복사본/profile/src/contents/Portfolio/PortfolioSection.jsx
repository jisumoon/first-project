import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PortfolioBox from "../Portfolio/PortfolioBox";

const Contain = styled.div`
  width: 100%;
  padding: 40px 20px;
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
  position: relative;
  z-index: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;

const SectionTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin-top: 40px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
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
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: ${(props) => props.theme.colors.secondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  min-height: 400px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const NoResultsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / -1;
  font-size: 18px;
  color: white;
`;

const PortfolioSection = ({ projects, onOpenModal }) => {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <Contain>
      <Section>
        <SectionTitle>Portfolio</SectionTitle>
        <Article>
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
          <Grid>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item) => (
                <PortfolioBox
                  key={item.id}
                  item={item}
                  onClick={() => onOpenModal(item)}
                />
              ))
            ) : (
              <NoResultsMessage>🌳 검색 결과가 없습니다 🌳</NoResultsMessage>
            )}
          </Grid>
        </Article>
      </Section>
    </Contain>
  );
};

export default PortfolioSection;
