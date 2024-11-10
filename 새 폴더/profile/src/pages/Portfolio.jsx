import React, { useState, useEffect } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import PortfolioBox from "../contents/Portfolio/PortfolioBox";
import PortfolioModal from "../contents/Portfolio/PortfolioModal";

const Contain = styled.div`
  width: 100%;
  background: #fff;
`;

const Section = styled.section`
  display: flex;
  width: 100%;
  padding-left: 40px;
`;

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 150px;
  padding: 0 50px;
  gap: 40px;
`;

const ArticleTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-right: 40px;
`;

const ArticleBottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 100px;
`;

const SectionTitle = styled.h1`
  margin-top: 120px;
  font-size: 64px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.primary};
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
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
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
    navigate(`/PortfolioDetail/${item.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    navigate("/");
  };

  const filterProjects = (category) => {
    if (category === "ALL") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === category
      );
      setFilteredProjects(filtered);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/portfolio.json");
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        // console.error("파일이 안들어오고 있어요");
      }
    };
    fetchData();
  }, []);

  return (
    <Contain>
      <Section>
        <SectionTitle>Portfolio</SectionTitle>
        <Article>
          <ArticleTop>
            <BtnGroup>
              <Btn onClick={() => filterProjects("ALL")}>ALL</Btn>
              <Btn onClick={() => filterProjects("Team")}>Team</Btn>
              <Btn onClick={() => filterProjects("Single")}>Single</Btn>
            </BtnGroup>
            <SearchBar type="text" placeholder="검색어를 입력해주세요" />
          </ArticleTop>
          <ArticleBottom>
            {filteredProjects.map((item) => (
              <PortfolioBox key={item.id} item={item} onClick={openModal} />
            ))}
          </ArticleBottom>
        </Article>
      </Section>
      <ModalOverlay>
        {isModalOpen && (
          <PortfolioModal item={modalData} onClose={closeModal} />
        )}
      </ModalOverlay>
    </Contain>
  );
};

export default Portfolio;
