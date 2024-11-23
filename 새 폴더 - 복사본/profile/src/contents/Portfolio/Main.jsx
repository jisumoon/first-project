import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  font-weight: 300;
  font-style: normal;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const LoopContainer = styled.div`
  display: flex;
  white-space: nowrap;
  font-size: 60px;
  letter-spacing: 1px;
  position: relative;
  gap: 1vw;
`;

const LoopItem = styled.div`
  display: inline-block;
`;

const ImageSection = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  min-height: 75vh;
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 200%;
  position: absolute;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 300px;
  height: 440px;

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
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const OverlayInfo = styled.p`
  color: white;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const OverlayButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: #fff;
  color: #222;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #222;
    color: #fff;
  }
`;

// LoopingElement class
class LoopingElement {
  constructor(element, initialTranslation, speed) {
    this.element = element;
    this.currentTranslation = initialTranslation;
    this.speed = speed;
    this.direction = true;
    this.metric = 100;

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

// Main component
const Main = ({ item }) => {
  useEffect(() => {
    const loopItems = document.querySelectorAll(".loop-item");
    const imageWrappers = document.querySelectorAll(".images-wrapper");

    // Initialize LoopingElement for text items
    new LoopingElement(loopItems[0], 0, 0.1);
    new LoopingElement(loopItems[1], -200, 0.1);

    // Initialize LoopingElement for image wrapper
    new LoopingElement(imageWrappers[0], 0, 0.1);
  }, []);

  return (
    <MainContainer>
      <HeroSection>
        <LoopContainer>
          <LoopItem className="loop-item">
            * Roots and Branches: Growing Through Life's Forest *
          </LoopItem>
          <LoopItem className="loop-item">
            Roots and Branches: Growing Through Life's Forest *
          </LoopItem>
        </LoopContainer>
      </HeroSection>
      <ImageSection>
        <ImagesWrapper className="images-wrapper">
          {[...item, ...item].map((project, index) => (
            <ImageContainer key={index}>
              <img src={project.img} alt={`Project ${index}`} />
              <Overlay>
                <OverlayTitle>{project.title}</OverlayTitle>
                <OverlayInfo>{project.description}</OverlayInfo>
                <OverlayButton>Learn More</OverlayButton>
              </Overlay>
            </ImageContainer>
          ))}
        </ImagesWrapper>
      </ImageSection>
    </MainContainer>
  );
};

export default Main;
