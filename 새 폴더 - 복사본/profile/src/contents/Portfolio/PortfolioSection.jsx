import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PortfolioBox from "../Portfolio/PortfolioBox";

const PortSection = styled.section`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const PortInner = styled.div`
  padding: 16px;
  padding-top: 40px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PortTitle = styled.div`
  padding-left: 40px;
  font-size: 60px;
  font-weight: 900;
  line-height: 1.6;

  @media (max-width: 1024px) {
    font-size: 50px;
    padding-left: 30px;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 40px;
    padding-left: 0;
  }

  @media (max-width: 480px) {
    font-size: 32px;
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

  @media (max-width: 1024px) {
    padding: 0 20px;
  }

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

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 20px;
  }
`;

const SearchBarWrapper = styled.div`
  position: relative;
  min-width: 300px;

  @media (max-width: 1024px) {
    min-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 330px;
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

  @media (max-width: 480px) {
    padding: 8px 30px 8px 12px;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 30%;
  right: 4%;
  color: ${(props) => props.theme.colors.secondary};

  @media (max-width: 768px) {
    right: 10px;
  }

  @media (max-width: 480px) {
    right: 10px;
  }
`;

const PortWrap = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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

  @media (max-width: 1280px) {
    gap: 16px;
  }

  @media (max-width: 768px) {
    gap: 0px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const PortItem = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 65vh;
  padding: 2.5rem;

  @media (max-width: 1280px) {
    width: 600px;
  }

  @media (max-width: 1024px) {
    width: 400px;
    height: 60vh;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 67vh;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 65vh;
  }
`;

const NoResultsMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  min-height: 150px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const PortfolioSection = ({ projects, onOpenModal = () => {} }) => {
  const [filter, setFilter] = useState("ALL");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const portWrapRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    setActiveFilter(category);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const debouncedResize = debounce(handleResize, 200);
    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = filter === "ALL" || project.category === filter;
      const matchesSearchQuery = Object.values(project).some(
        (field) =>
          typeof field === "string" && field.toLowerCase().includes(searchQuery)
      );
      return matchesFilter && matchesSearchQuery;
    });
  }, [projects, filter, searchQuery]);

  const handleButtonClick = (project) => {
    if (isMobile) {
      window.location.href = project.deployment;
    } else {
      onOpenModal(project);
    }
  };

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
        <PortWrap ref={portWrapRef} isEmpty={filteredProjects.length === 0}>
          {filteredProjects.map((item) => (
            <PortItem key={item.id} className="port__item">
              <PortfolioBox
                item={item}
                onClick={() => handleButtonClick(item)}
              />
            </PortItem>
          ))}
        </PortWrap>
        {filteredProjects.length === 0 && (
          <NoResultsMessage>🌳 검색 결과가 없습니다 🌳</NoResultsMessage>
        )}
      </PortInner>
    </PortSection>
  );
};

export default PortfolioSection;
