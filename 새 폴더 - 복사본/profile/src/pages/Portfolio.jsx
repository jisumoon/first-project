import React, { useState, useEffect } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import Modal from "../contents/Portfolio/Modal";
import PortfolioBox from "../contents/Portfolio/PortfolioBox";

const Contain = styled.div`
  background: ${(props) => props.theme.colors.primary};
  @media (max-width: 1280px) {
    width: 100%;
  }

  @media (max-width: 820px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Section = styled.section`
  display: flex;
  padding-left: 40px;
  padding-top: 100px;
  gap: 40px;
  @media (max-width: 1280px) {
    flex-direction: column;
  }

  @media (max-width: 820px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    padding-left: 0;
  }
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
  margin-top: 20px;
  gap: 40px;
  @media (max-width: 1280px) {
    width: 100%;
    padding: 0 80px;
  }
  @media (max-width: 820px) {
  }
  @media (max-width: 768px) {
    margin-top: 60px;
    padding: 0 30px;
  }
`;

const SectionTitle = styled.h1`
  font-size: 64px;
  font-weight: 900;
  color: #fff;

  @media (max-width: 768px) {
    margin-top: 80px;
    padding-left: 30px;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  @media (max-width: 1280px) {
    width: 100%;
    justify-content: start;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 40px;
`;

const Btn = styled.button`
  width: 100px;
  padding: 10px 0;
  border: none;
  border-radius: 10px;
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
  border-radius: 10px;
  background: ${(props) => props.theme.colors.background};
  font-size: 16px;

  @media (max-width: 820px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [1, 2, 3, 4, 5];
  const projectMatch = useMatch(`/PortfolioDetail/:itemId`);

  // URL 매칭 시 모달 자동 열기
  useEffect(() => {
    if (projectMatch) {
      const itemId = projectMatch.params.itemId;
      const matchedItem = projects.find((project) => project.id === itemId);
      if (matchedItem) {
        openModal(matchedItem, false);
      }
    }
  }, [projectMatch, projects]);

  const openModal = (item, updateUrl = true) => {
    setModalData(item);
    setIsModalOpen(true);
    if (updateUrl) {
      window.history.pushState(null, "", `/PortfolioDetail/${item.id}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    window.history.pushState(null, "", "/");
  };

  const filterProjects = (category) => {
    setFilteredProjects(
      category === "ALL"
        ? projects
        : projects.filter((project) => project.category === category)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/portfolio.json");
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error("파일을 가져오는 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Contain>
      <Section>
        <SectionTitle>Portfolio</SectionTitle>
        <Article>
          <TopSection>
            <BtnGroup>
              <Btn onClick={() => filterProjects("ALL")}>ALL</Btn>
              <Btn onClick={() => filterProjects("Team")}>Team</Btn>
              <Btn onClick={() => filterProjects("Single")}>Single</Btn>
            </BtnGroup>
            <SearchBar type="text" placeholder="검색어를 입력해주세요" />
          </TopSection>
          <BottomSection>
            {filteredProjects.map((item) => (
              <PortfolioBox key={item.id} item={item} onClick={openModal} />
            ))}
          </BottomSection>
        </Article>
      </Section>
      {isModalOpen && (
        <Modal
          modalData={modalData}
          closeModal={closeModal}
          slides={slides}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </Contain>
  );
};

export default Portfolio;
