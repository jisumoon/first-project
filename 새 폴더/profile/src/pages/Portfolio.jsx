import React, { useState, useEffect } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInternetExplorer,
} from "@fortawesome/free-brands-svg-icons";
import PortfolioBox from "../contents/Portfolio/PortfolioBox";
import { faBook } from "@fortawesome/free-solid-svg-icons";

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
  background: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled(motion.div)`
  width: 80vw;
  height: 90vh;
  border-radius: 8px;
  color: #fff;
`;

const ModalSection = styled.section`
  display: flex;
  flex-direction: column;

  &.top {
    align-items: center;
    gap: 10px;
    margin-bottom: 30px;
  }

  &.bottom {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }
`;

const MoadlTopTitle = styled.h3`
  font-size: 18px;
  color: ${(props) => props.theme.colors.secondary};
`;

const ModalTitle = styled.h2`
  font-size: 26px;
  font-weight: bold;
  padding-bottom: 4px;
`;

const ModalTitleInfo = styled.h3`
  font-size: 14px;
  font-weight: 100;
  width: 400px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  text-align: center;
`;

const ModalArticle = styled.article`
  background: #fff;
  color: #333;
  &.right {
    width: 400px;
    padding: 20px 10px;
  }
`;

const Modalimg = styled.div`
  width: 400px;
  height: 500px;
`;

const ModalInfo = styled.div``;

const ModalArticleTitle = styled.h1`
  font-size: 16px;

  padding: 10px 0;
  background: #ddd;
`;

const ModalArticleInfoUl = styled.ul`
  display: flex;
  gap: 10px;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};
  &.bottom {
    flex-direction: column;
    color: #333;
    font-size: 14px;
    font-weight: 100;
    background: #fff;
  }
`;

const ModlaArticleInfoLi = styled.li`
  &.btn {
    padding: 4px 10px;
    border-radius: 4px;
    background: ${(props) => props.theme.colors.background};
  }
`;

const BtnUl = styled.ul``;

const Btnli = styled.li``;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // 경로이동
  const movieMatch = useMatch(`/PortfolioDetail/:itemId`);

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

  const clickedPortfolio =
    movieMatch?.params.itemId &&
    projects.find((item) => item.id === movieMatch.params.itemId);

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
      <ModalOverlay
        onClick={closeModal}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalBox>
          <ModalSection className="top">
            <MoadlTopTitle>Portfolio,</MoadlTopTitle>
            <ModalTitle>마음의 서재</ModalTitle>
            <ModalTitleInfo>
              자바스크립트를 활용해 슬라이드 및 판매량, 최신 등록, 가격 순으로
              정렬 가능한 필터 기능을 구현한 서적 탐색 웹 페이지입니다.{" "}
            </ModalTitleInfo>
            <ModalInfo>
              <ModalArticleInfoUl>
                <ModlaArticleInfoLi className="btn">#React</ModlaArticleInfoLi>
                <ModlaArticleInfoLi className="btn">
                  #Firebase
                </ModlaArticleInfoLi>
                <ModlaArticleInfoLi className="btn">
                  #Styled-component
                </ModlaArticleInfoLi>
                <ModlaArticleInfoLi className="btn">#반응형</ModlaArticleInfoLi>
                <ModlaArticleInfoLi className="btn">#개인</ModlaArticleInfoLi>
              </ModalArticleInfoUl>
            </ModalInfo>
          </ModalSection>
          <ModalSection className="bottom">
            <ModalArticle className="left">
              <Modalimg></Modalimg>
            </ModalArticle>
            <ModalArticle className="right">
              <ModalInfo>
                <ModalArticleTitle>🔍주요기능 및 특징</ModalArticleTitle>
                <ModalArticleInfoUl className="bottom">
                  <ModlaArticleInfoLi>
                    기획 및 디자인: Figma로 UI/UX를 설계하고, WBS를 통해 일정
                    관리 및 팀 협업으로 전체 흐름을 확정했습니다.
                  </ModlaArticleInfoLi>
                  <ModlaArticleInfoLi>
                    개발: React와 Firebase로 로그인, 인증, 게시글 관리 및
                    지속적인 데이터 저장 기능을 구현하여 사용자 경험을
                    개선했습니다.
                  </ModlaArticleInfoLi>
                  <ModlaArticleInfoLi>
                    오류 수정 및 최적화: 기능 테스트와 코드 최적화를 통해 오류를
                    수정하고, 기능 완성도를 높였습니다.
                  </ModlaArticleInfoLi>
                </ModalArticleInfoUl>
              </ModalInfo>
              <ModalInfo>
                <ModalArticleTitle>👏개발 성과 및 결과</ModalArticleTitle>
                <ModalArticleInfoUl className="bottom">
                  <ModlaArticleInfoLi>
                    Figma 디자인을 React와 styled-components로 구현하여 반응형
                    UI/UX를 완성했습니다. Firebase를 이용한 실시간 검색과 데이터
                    연동으로 효율적인 탐색을 제공했으며, 음성 검색 기능을 추가해
                    모바일 사용자의 편의성을 높였습니다.
                  </ModlaArticleInfoLi>
                </ModalArticleInfoUl>
              </ModalInfo>
              <ModalInfo>
                <ModalArticleTitle>
                  🚨코드오류 분석 및 해결 과정
                </ModalArticleTitle>

                <ModalArticleInfoUl className="bottom">
                  <ModlaArticleInfoLi>
                    문제: FollowerButton 클릭 시 상위 요소(FollowerContain)의
                    클릭 이벤트가 실행되어 의도치 않게 프로필 페이지로 이동함.
                  </ModlaArticleInfoLi>
                  <ModlaArticleInfoLi>
                    해결: FollowerButton에 e.stopPropagation()을 추가하여 상위
                    요소로의 이벤트 전달을 차단, 팔로우 토글 기능만 정상
                    동작하도록 수정.
                  </ModlaArticleInfoLi>
                </ModalArticleInfoUl>
              </ModalInfo>
            </ModalArticle>
          </ModalSection>
          {/* <BtnUl>
             <Btnli>
              <FontAwesomeIcon icon={faCirclexmark} />
            </Btnli>
            <Btnli>
              <FontAwesomeIcon icon={falink} />
              배포링크
            </Btnli>
            <Btnli>
              <FontAwesomeIcon icon={faGithub} />
              GitHub
            </Btnli>
            <Btnli>
              <FontAwesomeIcon icon={faBook} />
              Notion
            </Btnli>
          </BtnUl> */}
        </ModalBox>
      </ModalOverlay>
    </Contain>
  );
};

export default Portfolio;
