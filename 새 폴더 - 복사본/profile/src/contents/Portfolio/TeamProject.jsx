import { faPagelines } from "@fortawesome/free-brands-svg-icons/faPagelines";
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
  transform: translateX(0%);
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
  transition: background 0.5s, color 0.5s;
  &:hover {
    background: #fff;
    color: ${(props) => props.theme.colors.primary};
  }
`;

class LoopingElement {
  constructor(element, initialTranslation, speed) {
    this.element = element;
    this.currentTranslation = initialTranslation || 0;
    this.speed = speed;
    this.direction = true;
    this.metric = 104;
    this.scrollTop = 0;
    this.lerp = {
      current: this.currentTranslation,
      target: this.currentTranslation,
      ease: 0.2,
    };

    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll());
    this.animate();
  }

  handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > this.scrollTop) {
      this.direction = true;
      this.lerp.target += this.speed * 5;
    } else {
      this.direction = false;
      this.lerp.target -= this.speed * 5;
    }
    this.scrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  lerpFunc(current, target, ease) {
    return current * (1 - ease) + target * ease;
  }

  animate() {
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
    this.element.style.transform = `translateX(${this.lerp.current}%)`;

    requestAnimationFrame(() => this.animate());
  }
}

const TeamProject = ({ item, onOpenModal = () => {} }) => {
  const loopRef = useRef([]);
  const wrapperRef = useRef();
  const isMobile = window.innerWidth <= 768;

  const handleButtonClick = (project) => {
    if (isMobile) {
      // 모바일 환경: URL로 이동
      window.location.href = project.deployment;
    } else {
      // 데스크톱 환경: 모달 열기
      onOpenModal(project);
    }
  };

  useEffect(() => {
    loopRef.current.forEach((ref, index) => {
      new LoopingElement(ref, index === 0 ? 0 : -200, 0.1);
    });

    if (wrapperRef.current) {
      new LoopingElement(wrapperRef.current, 0, 0.1);
    }
  }, []);

  return (
    <MainContainer>
      <HeroSection>
        <LoopContainer>
          <LoopItem
            ref={(el) => (loopRef.current[0] = el)}
            className="loop-item"
          >
            <FontAwesomeIcon icon={faPagelines} /> Roots and Branches: Growing
            Through Life's Forest <FontAwesomeIcon icon={faPagelines} />
          </LoopItem>
          <LoopItem
            ref={(el) => (loopRef.current[1] = el)}
            className="loop-item"
          >
            Roots and Branches: Growing Through Life's Forest
            <FontAwesomeIcon icon={faPagelines} />
          </LoopItem>
        </LoopContainer>
      </HeroSection>
      <ImageSection>
        <ImagesWrapper ref={wrapperRef} className="images-wrapper">
          {[...item, , ...item].map((project, index) => (
            <ImageContainer key={index}>
              <img src={project.img} alt={`Project ${index}`} />
              <Overlay>
                <OverlayTitle>{project.title_kr}</OverlayTitle>
                <OverlayInfo>{project.description}</OverlayInfo>
                <OverlayButton onClick={() => handleButtonClick(project)}>
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
