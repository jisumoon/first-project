import React, { useState, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useQuery } from "react-query";
import { openModal, closeModal } from "../store/modalReducer";
import Modal from "../contents/Portfolio/Modal";
import PortfolioSection from "../contents/Portfolio/Portfoliosection";
import TeamProject from "../contents/Portfolio/TeamProject";

const Contain = styled.div`
  margin-bottom: 100px;
`;

const Section = styled.section``;

const Portfolio = ({ id }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const projectMatch = useMatch(`/portfoliodetail/:itemId`);
  const [modalData, setModalData] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // React Query를 사용하여 포트폴리오 데이터 가져오기
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery(["portfolioData"], async () => {
    const response = await fetch(
      "https://jisumoon.github.io/PortfolioServer/db.json"
    );
    if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
    const result = await response.json();
    return result.projects;
  });

  // URL 매칭 시 모달 데이터 설정
  useEffect(() => {
    if (!isLoading && projectMatch) {
      const itemId = projectMatch.params.itemId;
      const matchedItem = projects.find(
        (project) => project.id.toString() === itemId
      );

      if (matchedItem) {
        setModalData(matchedItem);
      } else {
        // 데이터가 없으면 3초 후 홈으로 리다이렉션
        setTimeout(() => navigate("/"), 3000);
      }
    }
  }, [projectMatch, projects, isLoading, navigate]);

  // Modal 열기/닫기 핸들러
  const openModalHandler = (item) => {
    setModalData(item);
    dispatch(openModal());
    window.history.pushState(null, "", `/portfoliodetail/${item.id}`); // URL 업데이트
  };

  const closeModalHandler = () => {
    dispatch(closeModal());
    setModalData(null);
    window.history.back();
  };

  // 필터링된 프로젝트 목록
  const filteredProjects = projects.filter(
    (project) =>
      (filter === "ALL" || project.category === filter) &&
      (project.title_kr.toLowerCase().includes(searchQuery) ||
        project.description.toLowerCase().includes(searchQuery))
  );

  const teamProjects = projects.filter(
    (project) => project.category === "Team"
  );

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <Contain id={id}>
      <Section>
        <TeamProject item={teamProjects} onOpenModal={openModalHandler} />
        <PortfolioSection
          projects={filteredProjects}
          onOpenModal={openModalHandler}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      </Section>
      {isModalOpen && (
        <Modal
          slides={filteredProjects.map((project) => project.img)}
          modalData={modalData}
          closeModal={closeModalHandler}
          currentIndex={0}
        />
      )}
    </Contain>
  );
};

export default Portfolio;
