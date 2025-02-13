import React, { useState } from "react";
import styled from "styled-components";
import careerData from "../../../public/data/education.json";

const CareerWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 0 80px;

  @media (max-width: 1280px) {
    padding: 0 40px;
    margin-top: 80px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    margin-bottom: 60px;
  }

  @media (max-width: 400px) {
    padding: 0 20px;
    margin-top: 60px;
    margin-bottom: 20px;
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
    text-align: right;
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
    align-items: center;
  }

  @media (max-width: 768px) {
    padding-top: 40px;
  }
`;

const CareerSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  margin-top: 40px;
  justify-content: flex-end;

  @media (max-width: 1280px) {
    gap: 50px;
  }

  @media (max-width: 768px) {
    gap: 70px;
    padding-right: 40px;
  }
`;

const CareerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  gap: 10px;
  color: ${(props) => (props.$isHovered ? "#333" : "rgba(102, 102, 102, 0.6)")};
  transform-origin: top;
  transform: ${(props) => (props.$isHovered ? "scale(1.05)" : "scale(1)")};
  cursor: pointer;
  transition: color 0.3s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1280px) {
    width: 240px;
  }

  @media (max-width: 768px) {
    width: 220px;
  }

  @media (max-width: 390px) {
    width: 200px;
  }
`;

const CareerInfoTitle = styled.h5`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;

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
  transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1), scale 0.6s;

  @media (max-width: 1280px) {
    width: 240px;
    height: ${(props) => (props.$isHovered ? "240px" : "220px")};
  }

  @media (max-width: 768px) {
    width: 220px;
    height: ${(props) => (props.$isHovered ? "220px" : "200px")};
  }

  @media (max-width: 390px) {
    width: 200px;
    height: ${(props) => (props.$isHovered ? "200px" : "180px")};
  }
`;

const CareerInfo = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: rgba(102, 102, 102, 1);
  display: ${(props) => (props.$isHovered ? "block" : "none")};
  opacity: ${(props) => (props.$isHovered ? "1" : "0")};
  transform: ${(props) =>
    props.$isHovered ? "translateY(0)" : "translateY(-10px)"};
  transition: opacity 0.3s ease, transform 0.3s ease;

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
