import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useSwipeable } from "react-swipeable";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 200px;
  overflow: hidden;

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

const TeamProjectSectionTitle = styled.h1`
  font-size: 46px;
  font-weight: bold;
  line-height: 1.3;
  color: #444;
  padding-left: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 400px) {
    padding-left: 10px;
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
    display: none;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 400px) {
    padding-top: 50px;
    justify-content: start;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  max-width: 300px;
  max-height: 300px;
  z-index: 2;
  position: absolute;
  left: 18%;

  @media (max-width: 1024px) {
    width: 200px;
    left: 22%;
  }

  @media (max-width: 768px) {
    position: static;
    text-align: center;
    margin-bottom: 20px;
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    font-size: 26px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  color: white;
  border: none;
  cursor: pointer;
  transition: backgroud 0.5s color 0.5;

  &:hover {
    background: #fff;
    color: ${(props) => props.theme.colors.primary};
    transform: translateY(-2px);
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    margin: 10px auto;
  }
`;

const SlideImg = styled.img`
  border: 1px solid #f00;
  width: 400px;
  height: 500px;
  object-fit: cover;
  border-radius: 4px;
  position: absolute;
  transition: transform 0.4s ease-in-out;

  &.left {
    left: -15%;
    transform: translateX(0);
  }

  &.center {
    left: 60%;
    transform: translateX(-50%);
  }

  &.right {
    right: -8%;
    transform: translateX(0);
  }

  @media (max-width: 1024px) {
    width: 300px;
    height: 400px;
    border-radius: 6px;

    &.left {
      left: -10%;
    }

    &.right {
      right: -5%;
    }
  }

  @media (max-width: 1000px) {
    width: 280px;
    border-radius: 6px;

    &.left {
      left: -10%;
    }

    &.right {
      right: -5%;
    }
  }

  @media (max-width: 940px) {
    width: 260px;
    border-radius: 6px;

    &.left {
      left: -10%;
    }

    &.right {
      right: -5%;
    }
  }

  @media (max-width: 860px) {
    width: 240px;
    border-radius: 6px;

    &.left {
      left: -10%;
    }

    &.right {
      right: -5%;
    }
  }

  @media (max-width: 768px) {
    width: 400px;

    &.left {
      left: -40%;
      transform: translateX(0);
    }

    &.center {
      left: 50%;
    }

    &.right {
      right: -40%;
      transform: translateX(0);
    }
  }

  @media (max-width: 480px) {
    width: 240px;

    &.left {
      left: -40%;
      transform: translateX(0);
    }

    &.center {
      left: 50%;
    }

    &.right {
      right: -40%;
      transform: translateX(0);
    }
  }
  @media (max-width: 400px) {
    width: 220px;

    &.left {
      left: -40%;
      transform: translateX(0);
    }

    &.center {
      left: 50%;
    }

    &.right {
      right: -40%;
      transform: translateX(0);
    }
  }
`;

const MotionWrapper = styled.div`
  border: 1px solid #f00;
`;

const TeamProject = ({ item = [], onClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % item.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + item.length) % item.length);
  };

  // 스와이프 핸들러
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("Swiped Left");
      nextSlide();
    },
    onSwipedRight: () => {
      console.log("Swiped Right");
      prevSlide();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  const clipAnimation = {
    initial: {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", // 아래로 가려짐
      opacity: 0,
    },
    animate: {
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", // 완전히 나타남
      opacity: 1,
    },
    exit: {
      clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)", // 위로 사라짐
      opacity: 0,
    },
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  };

  return (
    <Wrapper>
      <TeamProjectSectionTitle>
        Roots and Branches: <br />
        Growing Through Life's Forest
      </TeamProjectSectionTitle>
      <Container {...swipeHandlers}>
        {/* Left Image */}
        <SlideImg
          className="left"
          src={item[(currentSlide + item.length - 1) % item.length]?.img}
          alt="Left Image"
        />
        <AnimatePresence>
          <SlideImg
            className="center"
            key={item[currentSlide]?.id}
            src={item[currentSlide]?.img}
            alt="Center Image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <TextWrapper>
          {/* 타이틀 애니메이션 */}
          <motion.div
            key={item[currentSlide]?.title_kr}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={clipAnimation}
          >
            <Title>{item[currentSlide]?.title_kr}</Title>
          </motion.div>

          <motion.div
            key={item[currentSlide]?.description}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={clipAnimation}
          >
            <Description>{item[currentSlide]?.description}</Description>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={clipAnimation}
          >
            <Button
              onClick={() => {
                onClick(item[currentSlide]);
              }}
            >
              자세히 보기
            </Button>
          </motion.div>
        </TextWrapper>
        <SlideImg
          className="right"
          src={item[(currentSlide + 1) % item.length]?.img}
          alt="Right Image"
        />
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
