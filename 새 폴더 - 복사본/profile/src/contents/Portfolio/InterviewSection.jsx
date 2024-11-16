import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { nextSlide, prevSlide } from "../../store/interviewSlice";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 100px;
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ButtonGroup = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40%;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  visibility: ${(props) => (props.isHovered ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
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
  &:hover ${ButtonGroup} {
    opacity: 1;
    visibility: visible;
  }
`;

const InterviewSectionTitle = styled.h1`
  padding-left: 40px;
  font-size: 46px;
  font-weight: bold;
  line-height: 1.3;
  color: #444;
`;

const TextWrapper = styled.div`
  flex: 1;
  max-width: 400px;
  position: absolute;
  left: 20%;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 46px;
  font-weight: bold;
  color: #222;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: 16px;
  line-height: 1.5;
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
    transform: scale(1.1);
  }

  &:nth-child(1) {
    left: -10%;
    transform: ${({ isActive }) => (isActive ? "scale(1.1)" : "scale(1)")};
    opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  }

  &:nth-child(2) {
    right: 20%;
    transform: ${({ isActive }) => (isActive ? "scale(1.1)" : "scale(1)")};
    opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  }

  &:nth-child(3) {
    right: -10%;
    transform: ${({ isActive }) => (isActive ? "scale(1.1)" : "scale(1)")};
    opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 400px;
    font-size: 80px;
    &:nth-child(1) {
      left: -30%;
    }
    &:nth-child(2) {
      right: -80%;
    }
    &:nth-child(3) {
      right: -30%;
    }
  }
`;

const slides = [
  {
    title: "Brand Story",
    description:
      "프레드 피자는 고객님의 일상을 행복으로 채워, 가장 최고의 순간이 될 수 있도록 함께 합니다.",
    label: "1",
  },
  {
    title: "Our Mission",
    description:
      "우리는 최고의 재료를 사용하여 정성을 다해 피자를 만듭니다. 고객의 행복한 미소를 위한 프레드 피자입니다.",
    label: "2",
  },
  {
    title: "Our Vision",
    description: "프레드 피자는 고객과 함께 미래의 피자 문화를 선도합니다.",
    label: "3",
  },
];

const InterviewSection = ({ openModalHandler }) => {
  const dispatch = useDispatch();
  const currentSlide = useSelector(
    (state) => state.interview?.currentSlide ?? 0
  );
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Wrapper>
      <InterviewSectionTitle>
        <span>Roots</span> and <span>Branches</span>: <br />
        Growing Through Life's Forest
      </InterviewSectionTitle>
      <Container>
        <TextWrapper>
          <Title>{slides[currentSlide].title}</Title>
          <Description>{slides[currentSlide].description}</Description>
          <Button
            onClick={() =>
              openModalHandler({
                title: slides[currentSlide].title,
                description: slides[currentSlide].description,
              })
            }
          >
            자세히 보기
          </Button>
        </TextWrapper>

        <ImageContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {slides.map((slide, index) => (
            <SlideImg
              key={`slide-${index}`}
              $index={index}
              currentSlide={currentSlide}
            >
              {slide.label}
            </SlideImg>
          ))}
          <ButtonGroup isHovered={isHovered}>
            <ArrowButton onClick={() => dispatch(prevSlide())}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </ArrowButton>
            <ArrowButton onClick={() => dispatch(nextSlide())}>
              <FontAwesomeIcon icon={faAngleRight} />
            </ArrowButton>
          </ButtonGroup>
        </ImageContainer>
      </Container>
    </Wrapper>
  );
};
export default InterviewSection;
