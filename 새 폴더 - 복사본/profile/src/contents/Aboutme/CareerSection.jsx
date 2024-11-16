import React, { useState } from "react";
import styled from "styled-components";
import careerData from "../../../public/data/education.json";

const CareerWrapper = styled.section`
  position: relative;
  width: 100%;
  padding: 0 80px;
  margin-top: 200px;
`;

const CareerSectionText = styled.h1`
  font-size: 46px;
  font-weight: bold;
  line-height: 1.2;
  text-align: right;
`;

const CareerContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CareerSectionContainer = styled.div`
  display: flex;
  gap: 70px;
  margin-top: 40px;
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
`;

const CareerInfoTitle = styled.h5`
  font-size: 16px;
  font-weight: bold;
`;

const CareerInfoDate = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CareerImg = styled.img`
  width: 260px;
  height: ${(props) => (props.$isHovered ? "300px" : "260px")};
  object-fit: cover;
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
