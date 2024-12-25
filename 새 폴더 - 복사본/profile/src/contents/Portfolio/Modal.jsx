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
  background: rgb(29, 83, 62);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled(motion.div)`
  width: 60vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  z-index: 1001;
  overflow-y: auto;
  background: ${(props) => props.theme.colors.background};

  @media (max-width: 1024px) {
    width: 80vw;
  }

  @media (max-width: 768px) {
    width: 90vw;
    max-height: 85vh;
    padding: 20px;
  }

  @media (max-width: 390px) {
    width: 100%;
    max-height: 80vh;
    padding: 10px;
  }
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

    @media (max-width: 768px) {
      gap: 8px;
    }

    @media (max-width: 390px) {
      padding-bottom: 10px;
    }
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

  @media (max-width: 1024px) {
    padding: 20px 80px;
  }

  @media (max-width: 768px) {
    padding: 15px 30px;
    height: auto;
  }

  @media (max-width: 390px) {
    padding: 10px 20px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 26px;
  font-weight: bold;
  padding-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 390px) {
    font-size: 18px;
  }
`;

const ModalTitleInfo = styled.h3`
  font-size: 15px;
  font-weight: 100;
  width: 540px;
  line-height: 1.4;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 300px;
  }

  @media (max-width: 390px) {
    font-size: 10px;
    width: 250px;
  }
`;

const Modalimg = styled(motion.div)`
  width: 100%;
  height: 300px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 390px) {
    height: 180px;
  }
`;

const ImgContant = styled.div`
  width: 100%;
  height: 100%;
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

  @media (max-width: 768px) {
    font-size: 24px;
  }

  @media (max-width: 390px) {
    font-size: 20px;
  }
`;

const Pager = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
`;

const Dot = styled.div`
  width: ${({ $active }) => ($active ? "20px" : "8px")};
  height: 8px;
  background-color: ${({ $active }) => ($active ? "rgb(29, 83, 62)" : "#ddd")};
  border-radius: ${({ $active }) => ($active ? "15px" : "50%")};
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 768px) {
    width: ${(props) => (props.active ? "15px" : "6px")};
    height: 6px;
  }

  @media (max-width: 390px) {
    width: ${(props) => (props.active ? "10px" : "4px")};
    height: 4px;
  }
`;

const BtnUl = styled.ul`
  position: absolute;
  top: 10%;
  right: 15%;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 1200px) {
    right: 3%;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    top: 2%;
    right: 50%;
    transform: translateX(50%);
    gap: 10px;
  }

  @media (max-width: 390px) {
    flex-wrap: wrap;
    gap: 8px;
  }
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
    background: ${(props) => props.theme.colors.primary};
    color: #fff;
    border: 2px solid ${(props) => props.theme.colors.mainkbackground};
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const ModalHashtag = styled.ul`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 390px) {
    gap: 6px;
  }
`;

const Hashtag = styled.li`
  padding: 2px 6px;
  border-radius: 20px;
  background: ${(props) => props.theme.colors.mainbackgtound};
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 390px) {
    font-size: 10px;
  }
`;

const Modal = ({ slides = [], closeModal, currentIndex, modalData }) => {
  const [currentSlideIndex, setCurrentIndex] = useState(currentIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % modalData.img.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? modalData.img.length - 1 : prev - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // 스크롤 잠금
  useEffect(() => {
    const scrollY = window.scrollY; // 현재 스크롤 위치 저장
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;

    return () => {
      const savedScrollY = parseInt(document.body.style.top || "0", 10) * -1;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, savedScrollY);
    };
  }, []);

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
            <ModalHashtag>
              <Hashtag>#{modalData.type}</Hashtag>
              {Array.isArray(modalData.feature) &&
                modalData.feature.map((feature, index) => (
                  <Hashtag key={index}>#{feature}</Hashtag>
                ))}
              <Hashtag>#{modalData.category}</Hashtag>
            </ModalHashtag>
            <ModalTitleInfo>
              {modalData.contribution || "설명 없음"}
            </ModalTitleInfo>
          </ModalSection>
          <ModalSection className="bottom">
            <Modalimg>
              <ImgContant>
                {modalData.img.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={modalData.title_kr || "이미지 없음"}
                    style={{
                      width: "100%",
                      display: index === currentSlideIndex ? "block" : "none",
                    }}
                  />
                ))}
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
                  {modalData.img.map((_, index) => (
                    <Dot
                      key={index}
                      $active={index === currentSlideIndex}
                      onClick={() => handleDotClick(index)}
                    />
                  ))}
                </Pager>
              </ImgContant>
            </Modalimg>

            <Accordion
              id="key_features"
              title="⚒️ 기술 스택"
              data={modalData.key_features.map((feature) => ({
                technology: feature,
              }))}
            />

            <Accordion
              id="development_outcomes"
              title="👏 개발 성과 및 결과"
              data={modalData.development_outcomes.map((outcome) => ({
                achievement: outcome,
              }))}
            />

            <Accordion
              id="limitations"
              title="⚡ 기술적 도전과 해결 방안"
              data={modalData.limitations_and_improvements}
            />

            <Accordion
              id="code_analysis"
              title="🚨 코드 오류 및 수정"
              data={[
                {
                  problem: modalData.code_analysis?.problem || "정보 없음",
                  solution: modalData.code_analysis?.solution || "정보 없음",
                },
              ]}
            />
          </ModalSection>
        </ModalContainer>
      </ModalBox>
    </ModalOverlay>
  );
};

export default Modal;
