import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faLink,
  faBook,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Accordion from "./Accordion";

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(34, 49, 34, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled(motion.div)`
  width: 60vw;
  max-height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  z-index: 1001;
  overflow-y: auto;
  background: ${(props) => props.theme.colors.background};
`;

const ModalSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;

  &.top {
    align-items: center;
    gap: 10px;
    padding-bottom: 20px;
    text-align: center;
  }

  &.bottom {
    @media (max-width: 1280px) {
      flex-direction: column;
    }
  }
`;

const ModalContainer = styled.section`
  padding: 40px 140px;
  width: 100%;
  height: 630px;
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

const Modalimg = styled(motion.div)`
  width: 100%;
  height: 300px;
  position: relative;
`;

const ImgContant = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #f00;
`;

const HoverButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  position: absolute;
  top: 50%;
  color: rgba(0, 0, 0, 0.6);
  font-size: 30px;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Pager = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  bottom: 3%;
  left: 40%;
`;

const Dot = styled.div`
  width: ${(props) => (props.active ? "20px" : "8px")};
  height: 8px;
  background-color: ${(props) =>
    props.active ? "rgba(47, 79, 79,0.6)" : "#ddd"};
  border-radius: ${(props) => (props.active ? "15px" : "50%")};
  transition: all 0.3s ease;
  cursor: pointer;
`;

const BtnUl = styled.ul`
  position: absolute;
  top: 10%;
  right: 15%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Btnli = styled.li`
  position: relative;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.background};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
    color: #fff;
  }

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
`;
const Tooltip = styled.span`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  left: 50%;
  transform: translateX(-124%);
  transition: opacity 0.4s ease, transform 0.4s ease;
  z-index: 10;
`;

const ModalHashtag = styled.ul`
  display: flex;
  gap: 10px;
`;

const Hashtag = styled.li`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`;

const Modal = ({ slides = [], closeModal, currentIndex, modalData }) => {
  const [currentSlideIndex, setCurrentIndex] = useState(currentIndex);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  const handlePrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (modalData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalData]);

  if (!modalData) {
    return <p>🌳데이터를 불러오는 중입니다🌳</p>;
  }

  return (
    <ModalOverlay
      onClick={closeModal}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <BtnUl>
          <Btnli onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
            <Tooltip className="tooltip">이전 화면으로 이동하기</Tooltip>
          </Btnli>
          {modalData.deployment && (
            <Btnli>
              <a href={modalData.deployment} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLink} />
                <Tooltip className="tooltip">
                  관련 배포사이트로 이동하기
                </Tooltip>
              </a>
            </Btnli>
          )}
          {modalData.github && (
            <Btnli>
              <a href={modalData.github} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} />
                <Tooltip className="tooltip">관련 깃허브로 이동하기</Tooltip>
              </a>
            </Btnli>
          )}
          {modalData.blog && (
            <Btnli>
              <a href={modalData.blog} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faBook} />
                <Tooltip className="tooltip">관련 노션으로 이동하기</Tooltip>
              </a>
            </Btnli>
          )}
        </BtnUl>
        <ModalContainer>
          <ModalSection className="top">
            <ModalTitle>{modalData.title_kr || "제목 없음"}</ModalTitle>
            <ModalTitleInfo>
              {modalData.description || "설명 없음"}
            </ModalTitleInfo>
            <ModalHashtag>
              <Hashtag>#{modalData.type}</Hashtag>
              {Array.isArray(modalData.skill) &&
                modalData.skill.map((skill, index) => (
                  <Hashtag key={index}>#{skill}</Hashtag>
                ))}
              <Hashtag>#{modalData.category}</Hashtag>
            </ModalHashtag>
          </ModalSection>
          <ModalSection className="bottom">
            <Modalimg>
              <ImgContant>
                <img
                  src={modalData.img || "/default-image.png"}
                  alt={modalData.title_kr || "이미지 없음"}
                  style={{ width: "100%" }}
                />
                <HoverButtons>
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    style={{ cursor: "pointer" }}
                    onClick={handlePrevious}
                  />
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{ cursor: "pointer" }}
                    onClick={handleNext}
                  />
                </HoverButtons>
                <Pager>
                  {Array.isArray(slides) &&
                    slides.map((_, index) => (
                      <Dot
                        key={index}
                        active={index === currentSlideIndex}
                        onClick={() => handleDotClick(index)} // 클릭 이벤트 추가
                      />
                    ))}
                </Pager>
              </ImgContant>
            </Modalimg>

            <Accordion
              id="key_features"
              title="🔍 주요기능 및 특징"
              data={modalData.key_features}
            />
            <Accordion
              id="development_outcomes"
              title="👏 개발 성과 및 결과"
              data={modalData.development_outcomes}
            />
            <Accordion
              id="code_analysis"
              title="🚨 코드 오류 발생 및 수정"
              data={[
                `코드 오류: ${modalData.code_analysis?.problem || "정보 없음"}`,
                `코드 수정: ${
                  modalData.code_analysis?.solution || "정보 없음"
                }`,
              ]}
            />
          </ModalSection>
        </ModalContainer>
      </ModalBox>
    </ModalOverlay>
  );
};

export default Modal;
