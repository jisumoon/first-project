import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 300px;

  @media (max-width: 1280px) {
    padding-top: 100px;
    margin-bottom: 100px;
  }

  @media (max-width: 768px) {
    padding-top: 80px;
    margin-bottom: 80px;
  }

  @media (max-width: 400px) {
    padding-top: 40px;
    margin-bottom: 60px;
  }
`;

const TeamProjectSectionTite = styled.h1`
  padding-left: 40px;
  font-size: 46px;
  font-weight: bold;
  line-height: 1.3;
  color: #444;

  @media (max-width: 1280px) {
    font-size: 40px;
    padding-left: 30px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    text-align: center;
    padding-left: 0;
  }

  @media (max-width: 400px) {
    font-size: 24px;
  }
`;

const ButtonGroup = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40%;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  opacity: ${(props) => (props.isHovered ? 1 : 0.5)};
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    bottom: 30%;
  }
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  background: rgba(51, 51, 51, 0.7);
  font-size: 24px;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 20px;
  }

  @media (max-width: 400px) {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 600px;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;

  @media (max-width: 1280px) {
    height: 500px;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  max-width: 300px;
  position: absolute;
  left: 20%;
  z-index: 2;
  border: 1px solid #f00;

  @media (max-width: 1280px) {
    left: 34%;
  }

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 46px;
  font-weight: bold;
  color: #222;

  @media (max-width: 1280px) {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 400px) {
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 16px;
  line-height: 1.5;

  @media (max-width: 1280px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.3s background 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background: #fff;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const SlideImg = styled(motion.div)`
  width: 400px;
  height: 500px;
  border-radius: 4px;
  border: 1px solid #f00;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120px;
  color: #333;
  position: absolute;
  transition: transform 0.5s ease, opacity 0.5s ease;
  transform: ${({ $isActive }) => ($isActive ? "scale(1.05)" : "scale(1)")};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};

  &:hover {
    transform: ${({ $isActive }) => ($isActive ? "scale(1.1)" : "scale(1)")};
  }

  /* 각 슬라이드 위치 */
  &:nth-child(1) {
    left: -10%;
  }

  &:nth-child(2) {
    right: 20%;
  }

  &:nth-child(3) {
    right: -10%;
  }

  /* 반응형 스타일 */
  @media (max-width: 1280px) {
    width: 360px;
    height: 450px;
    font-size: 100px;

    &:nth-child(1) {
      left: -15%;
    }

    &:nth-child(2) {
      right: 15%;
    }

    &:nth-child(3) {
      right: -15%;
    }
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 400px;
    font-size: 80px;

    &:nth-child(1) {
      left: -30%;
    }

    &:nth-child(2) {
      right: -20%;
    }

    &:nth-child(3) {
      right: -30%;
    }
  }

  @media (max-width: 480px) {
    width: 240px;
    height: 300px;
    font-size: 60px;

    &:nth-child(1) {
      left: -40%;
    }

    &:nth-child(2) {
      right: -10%;
    }

    &:nth-child(3) {
      right: -40%;
    }
  }

  @media (max-width: 360px) {
    width: 200px;
    height: 260px;
    font-size: 50px;

    &:nth-child(1) {
      left: -50%;
    }

    &:nth-child(2) {
      right: 0;
    }

    &:nth-child(3) {
      right: -50%;
    }
  }
`;

const TeamProject = ({ openModalHandler }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: "Brand Story", description: "Description 1", label: "1" },
    { title: "Our Mission", description: "Description 2", label: "2" },
    { title: "Our Vision", description: "Description 3", label: "3" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <Wrapper>
      <TeamProjectSectionTite>
        <span>Roots</span> and <span>Branches</span>: <br />
        Growing Through Life's Forest
      </TeamProjectSectionTite>
      <Container>
        <TextWrapper>
          <Title>{slides[currentSlide].title}</Title>
          <Description>{slides[currentSlide].description}</Description>
          <Button>자세히 보기</Button>
        </TextWrapper>
        {slides.map((slide, index) => (
          <SlideImg key={index} $isActive={index === currentSlide}>
            {slide.label}
          </SlideImg>
        ))}

        <ButtonGroup>
          <ArrowButton onClick={prevSlide}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </ArrowButton>
          <ArrowButton onClick={nextSlide}>
            <FontAwesomeIcon icon={faAngleRight} />
          </ArrowButton>
        </ButtonGroup>
      </Container>
    </Wrapper>
  );
};

export default TeamProject;
