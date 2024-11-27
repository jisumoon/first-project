import { faPagelines } from "@fortawesome/free-brands-svg-icons/faPagelines";
import { faClover } from "@fortawesome/free-solid-svg-icons/faClover";
import { faTree } from "@fortawesome/free-solid-svg-icons/faTree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  font-style: normal;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top: 100px;
  @media (max-width: 860px) {
    margin-top: 0px;
  }
`;

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
`;

const LoopContainer = styled.div`
  display: flex;
  white-space: nowrap;
  font-size: 58px;
  color: ${(props) => props.theme.colors.primary};
  padding: 30px 0;
  font-family: ${(props) => props.theme.fonts.four};
  letter-spacing: 2px;
  position: relative;
  gap: 5px;
  border-top: 4px solid ${(props) => props.theme.colors.primary};
  border-bottom: 4px solid ${(props) => props.theme.colors.primary};
  @media (max-width: 860px) {
    font-size: 50px;
  }
`;

const LoopItem = styled.div`
  display: inline-block;
  padding-right: 10px;
`;

const ImageSection = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  min-height: 75vh;
  margin-top: 60px;
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 200%;
  position: absolute;
`;

const ImageContainer = styled.div`
  border: 1px solid #f00;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 340px;
  min-width: 240px;
  height: 440px;
  min-height: 300px;
  @media (max-width: 860px) {
  }

  img {
    border: 1px solid #f00;
    object-fit: cover;
    min-width: 100%;
    min-height: 100%;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const OverlayTitle = styled.h3`
  color: white;
  font-size: 24px;
  margin-bottom: 1rem;
`;

const OverlayInfo = styled.p`
  color: white;
  font-size: 14px;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 15px;
`;

const OverlayButton = styled.button`
  padding: 10px 30px;
  border: none;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.5s color 0.5s;
  &:hover {
    background: #fff;
    color: ${(props) => props.theme.colors.primary};
  }
`;

// LoopingElement 클래스: 반복 애니메이션 구현
class LoopingElement {
  constructor(element, initialTranslation, speed) {
    this.element = element; // 대상 요소
    this.currentTranslation = initialTranslation; // 현재 위치
    this.speed = speed; // 속도
    this.direction = true; // 스크롤 방향 // 아래로
    this.metric = 104; // 이동 기준값 // 반복기준 //기준값

    this.lerp = {
      current: this.currentTranslation, //현재 위치
      target: this.currentTranslation, // 목표 위치
      ease: 0.2,
    };

    this.init(); // 초기화 실행 // 스크롤 방향에 따라서 lerpltarget 업데이트
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll()); // 스크롤 이벤트 추가
    this.animate(); // 애니메이션 실행
  }

  handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > this.scrollTop) {
      this.direction = true;
      this.lerp.target += this.speed * 5; // 아래로 스크롤 시 이동
    } else {
      this.direction = false;
      this.lerp.target -= this.speed * 5; // 위로 스크롤 시 이동
    }
    this.scrollTop = scrollTop <= 0 ? 0 : scrollTop; // 스크롤 위치 업데이트
  }
  // 부드러운 이동 계산
  //두 값 사이의 중간 값을 계산하여 부드럽게 전환
  lerpFunc(current, target, ease) {
    return current * (1 - ease) + target * ease;
  }

  animate() {
    // 애니메이션 반복
    // 방향에 따라 lerp.target 값을 증가 또는 감소
    // 이동이 metric 값 초과하면 반복 되도록
    //lerf : 현재 위치(lerp.current) & 목표위치(lerp.target) 차이 계산
    if (this.direction) {
      this.lerp.target += this.speed;
      if (this.lerp.target > this.metric) {
        this.lerp.current -= this.metric * 2;
        this.lerp.target -= this.metric * 2;
      }
    } else {
      this.lerp.target -= this.speed;
      if (this.lerp.target < -this.metric) {
        this.lerp.current += this.metric * 2;
        this.lerp.target += this.metric * 2;
      }
    }

    this.lerp.current = this.lerpFunc(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.element.style.transform = `translateX(${this.lerp.current}%)`; // 위치 이동

    requestAnimationFrame(() => this.animate()); // 다음 프레임 호출
  }
}

const TeamProject = ({ item, onOpenModal = () => {} }) => {
  useEffect(() => {
    const loopItems = document.querySelectorAll(".loop-item");
    const imageWrappers = document.querySelectorAll(".images-wrapper");

    new LoopingElement(loopItems[0], 0, 0.1);
    new LoopingElement(loopItems[1], -200, 0.1);
    new LoopingElement(imageWrappers[0], 0, 0.1);
  }, []);

  return (
    <MainContainer>
      <HeroSection>
        <LoopContainer>
          <LoopItem className="loop-item">
            <FontAwesomeIcon icon={faPagelines} /> Roots and Branches: Growing
            Through Life's Forest <FontAwesomeIcon icon={faPagelines} />
          </LoopItem>
          <LoopItem className="loop-item">
            Roots and Branches: Growing Through Life's Forest
            <FontAwesomeIcon icon={faPagelines} />
          </LoopItem>
        </LoopContainer>
      </HeroSection>
      <ImageSection>
        <ImagesWrapper className="images-wrapper">
          {[...item, ...item].map((project, index) => (
            <ImageContainer key={index}>
              <img src={project.img} alt={`Project ${index}`} />
              <Overlay>
                <OverlayTitle>{project.title_kr}</OverlayTitle>
                <OverlayInfo>{project.description}</OverlayInfo>
                <OverlayButton onClick={() => onOpenModal(project)}>
                  VIEW
                </OverlayButton>
              </Overlay>
            </ImageContainer>
          ))}
        </ImagesWrapper>
      </ImageSection>
    </MainContainer>
  );
};

export default TeamProject;
