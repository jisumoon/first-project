import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../store/modalReducer";
import Modal from "../contents/Portfolio/Modal";
import PortfolioSection from "../contents/Portfolio/Portfoliosection";
import InterviewSection from "../contents/Portfolio/TeamProject";

const Contain = styled.div`
  background: ${(props) => props.theme.colors.mainbackgtound};
`;

const Section = styled.section``;

const Portfolio = ({ id }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const projectMatch = useMatch(`/PortfolioDetail/:itemId`);
  const [modalData, setModalData] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // React Query를 사용하여 포트폴리오 데이터 가져오기
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery(["portfolioData"], async () => {
    const response = await fetch(
      "https://jisumoon.github.io/PortfolioServer/db.json"
    );
    if (!response.ok) {
      throw new Error("데이터를 가져오는 데 실패했습니다.");
    }
    const result = await response.json();
    return result.projects;
  });

  useEffect(() => {
    if (projectMatch && projects.length > 0) {
      const itemId = projectMatch.params.itemId;
      const matchedItem = projects.find(
        (project) => project.id.toString() === itemId
      );
      if (matchedItem) {
        dispatch(openModal());
        setModalData(matchedItem);
      }
    }
  }, [projectMatch, projects, dispatch]);

  // Modal 열기/닫기 핸들러
  const openModalHandler = (item) => {
    setModalData(item);
    dispatch(openModal());
    window.history.pushState(null, "", `/PortfolioDetail/${item.id}`); // URL 업데이트
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
        <InterviewSection openModalHandler={openModalHandler} />
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
