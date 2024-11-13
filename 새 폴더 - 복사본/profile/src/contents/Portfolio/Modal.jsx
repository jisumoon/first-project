import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faBook,
  faLink,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(34, 49, 34, 0.64);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled(motion.div)`
  width: 80vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 10px 20px;
  background: ${(props) => props.theme.colors.background};
`;

const ModalSection = styled.section`
  display: flex;
  flex-direction: column;

  &.top {
    align-items: center;
    gap: 10px;
    padding-bottom: 20px;
  }

  &.bottom {
    flex-direction: row;
    gap: 40px;
    @media (max-width: 1280px) {
      flex-direction: column;
    }
  }
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
  border-radius: 8px;
  min-height: 450px;

  &.right {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: ${(props) => props.theme.colors.background};
    flex: 1;
  }
  &.left {
    flex: 1;
  }
`;

const HoverButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 48%;
  left: 0;
  font-size: 30px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Modalimg = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  &:hover ${HoverButtons} {
    opacity: 1;
  }
`;

const ImgContant = styled.div`
  width: 100%;
  height: 100%;
`;

const Pager = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  bottom: 12%;
  left: 26%;
`;

const Dot = styled.div`
  width: ${(props) => (props.active ? "30px" : "10px")};
  height: 10px;
  background-color: ${(props) => (props.active ? "#2f4f4f" : "#ddd")};
  border-radius: ${(props) => (props.active ? "15px" : "50%")};
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ModalInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const ModalArticleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  padding: 14px 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const ModalArticleInfoUl = styled.ul`
  display: flex;
  gap: 10px;
  font-size: 12px;
  font-weight: bold;

  &.bottom {
    flex-direction: column;
    margin-bottom: 20px;
    color: #333;
    font-size: 14px;
    font-weight: 100;
    overflow: hidden;
    max-height: ${({ $isOpen }) => ($isOpen ? "100px" : "0")};
    transition: max-height 0.3s ease;
    padding: ${({ $isOpen }) => ($isOpen ? "0 10px" : "0")};
    line-height: 1.4;
  }
`;

const ModlaArticleInfoLi = styled.li`
  &.btn {
    padding: 4px 10px;
    border-radius: 4px;
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const BtnUl = styled.ul`
  position: absolute;
  top: 10%;
  right: 6%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Btnli = styled.li`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.background};
  cursor: pointer;
  transform: background 0.3s color 0.3s box-shadow 0.3s;
  &:hover {
    background: ${(props) => props.theme.colors.secondary};
    color: #fff;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(-10px);
    transform: translateX(-90px);
  }
`;

const Tooltip = styled.span`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(-10px);
  transform: translateX(-90px);
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

const Modal = (slides = [], closeModal, currentIndex) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  const handlePrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <ModalOverlay
      onClick={closeModal}
      $animate={{ opacity: 1 }}
      $exit={{ opacity: 0 }}
    >
      <BtnUl>
        <Btnli>
          <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
          <Tooltip className="tooltip">이전 화면으로 이동하기</Tooltip>
        </Btnli>
        <Btnli>
          <FontAwesomeIcon icon={faLink} />
          <Tooltip className="tooltip">배포사이트로 이동하기</Tooltip>
        </Btnli>
        <Btnli>
          <FontAwesomeIcon icon={faGithub} />
          <Tooltip className="tooltip">관련 깃허브로 이동하기</Tooltip>
        </Btnli>
        <Btnli>
          <FontAwesomeIcon icon={faBook} />
          <Tooltip className="tooltip">관련 노션으로 이동하기</Tooltip>
        </Btnli>
      </BtnUl>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalSection className="top">
          <ModalTitle>마음의 서재</ModalTitle>
          <ModalTitleInfo>
            자바스크립트를 활용해 슬라이드 및 판매량, 최신 등록, 가격 순으로
            정렬 가능한 필터 기능을 구현한 서적 탐색 웹 페이지입니다.
          </ModalTitleInfo>
          <ModalInfo>
            <ModalArticleInfoUl>
              <ModlaArticleInfoLi className="btn">#React</ModlaArticleInfoLi>
              <ModlaArticleInfoLi className="btn">#Firebase</ModlaArticleInfoLi>
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
            <Modalimg>
              <ImgContant>{slides[currentIndex]}</ImgContant>
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
            </Modalimg>

            <Pager>
              {Array.isArray(slides) &&
                slides.map((_, index) => (
                  <Dot key={index} active={index === currentIndex} />
                ))}
            </Pager>
          </ModalArticle>
          <ModalArticle className="right" onClick={toggleOpen}>
            <ModalInfo>
              <ModalArticleTitle>
                🔍주요기능 및 특징
                {isOpen ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </ModalArticleTitle>
              <ModalArticleInfoUl className="bottom" $isOpen={isOpen}>
                <ModlaArticleInfoLi>
                  Figma로 UI/UX를 설계하고, WBS를 통해 일정 관리 및 팀 협업으로
                  전체 흐름을 확정했습니다.
                </ModlaArticleInfoLi>
                <ModlaArticleInfoLi>
                  React와 Firebase로 로그인, 인증, 게시글 관리 및 지속적인
                  데이터 저장 기능을 구현하여 사용자 경험을 개선했습니다.
                </ModlaArticleInfoLi>
              </ModalArticleInfoUl>
            </ModalInfo>
            <ModalInfo>
              <ModalArticleTitle>
                👏개발 성과 및 결과
                {isOpen ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </ModalArticleTitle>
              <ModalArticleInfoUl className="bottom" $isOpen={isOpen}>
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
                {isOpen ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </ModalArticleTitle>

              <ModalArticleInfoUl className="bottom" $isOpen={isOpen}>
                <ModlaArticleInfoLi>
                  문제: FollowerButton 클릭 시 상위 요소(FollowerContain)의 클릭
                  이벤트가 실행되어 의도치 않게 프로필 페이지로 이동함.
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
      </ModalBox>
    </ModalOverlay>
  );
};

export default Modal;
