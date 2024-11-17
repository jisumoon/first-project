import React, { useState } from "react";
import styled from "styled-components";
import careerData from "../../../public/data/education.json";

const CareerWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 0 80px;
  margin-top: 100px;

  @media (max-width: 1280px) {
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    margin-top: 80px;
  }

  @media (max-width: 400px) {
    width: 100%;
    padding-right: 40px;
  }
`;

const CareerSectionText = styled.h1`
  font-size: 46px;
  font-weight: bold;
  line-height: 1.2;
  text-align: right;

  @media (max-width: 1280px) {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 390px) {
    font-size: 24px;
  }
`;

const CareerContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 1240px) {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const CareerSectionContainer = styled.div`
  display: flex;
  gap: 70px;
  margin-top: 40px;
  flex-wrap: wrap;

  @media (max-width: 1280px) {
    gap: 50px;
  }

  @media (max-width: 1240px) {
    justify-content: space-around;
    align-items: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: end;
    gap: 30px;
    text-align: right;
  }
`;

const CareerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  gap: 10px;
  color: ${(props) => (props.$isHovered ? "#333" : "rgba(102, 102, 102, 0.6)")};
  transform-origin: top;
  transform: ${(props) => (props.$isHovered ? "scaleY(1.05)" : "scaleY(1)")};
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;

  @media (max-width: 1280px) {
    width: 240px;
  }

  @media (max-width: 768px) {
    width: 240px;
  }

  @media (max-width: 400px) {
  }
`;

const CareerInfoTitle = styled.h5`
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 390px) {
    font-size: 12px;
  }
`;

const CareerInfoDate = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 390px) {
    font-size: 10px;
  }
`;

const CareerImg = styled.img`
  width: 260px;
  height: ${(props) => (props.$isHovered ? "260px" : "240px")};
  object-fit: cover;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1280px) {
    width: 240px;
    height: ${(props) => (props.$isHovered ? "240px" : "220px")};
  }

  @media (max-width: 768px) {
    width: 200px;
    height: ${(props) => (props.$isHovered ? "200px" : "180px")};
  }

  @media (max-width: 400px) {
    width: 100%;

    height: ${(props) => (props.$isHovered ? "200px" : "180px")};
  }
`;

const CareerInfo = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: rgba(102, 102, 102, 1);
  display: ${(props) => (props.$isHovered ? "block" : "none")};
  opacity: ${(props) => (props.$isHovered ? "1" : "0")};
  transition: opacity 0.3s ease 0.2s, transform 0.3s ease 0.2s;
  pointer-events: none;
  height: auto;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 390px) {
    font-size: 10px;
  }
`;

const CareerSection = () => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  return (
    <CareerWrapper>
      <CareerSectionText>
        Forest of Growth:
        <br /> Career & Education
      </CareerSectionText>
      <CareerContainer>
        <CareerSectionContainer>
          {careerData.map((item) => (
            <CareerBox
              key={item.id}
              $isHovered={hoveredItemId === item.id}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
            >
              <CareerInfoDate>{item.date}</CareerInfoDate>
              <CareerInfoTitle>{item.title}</CareerInfoTitle>
              <CareerInfo $isHovered={hoveredItemId === item.id}>
                {item.info}
              </CareerInfo>
              <CareerImg
                $isHovered={hoveredItemId === item.id}
                src={item.img}
                alt={item.title}
              />
            </CareerBox>
          ))}
        </CareerSectionContainer>
      </CareerContainer>
    </CareerWrapper>
  );
};

export default CareerSection;
