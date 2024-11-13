import React, { useState } from "react";
import styled from "styled-components";
import careerData from "../../../public/data/education.json";

const CareerWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 50vh;
  margin-top: 100px;
  padding: 0 80px;
`;

const CareerSectionText = styled.h1`
  font-size: 46px;
  font-weight: bold;
  line-height: 1.2;
  text-align: right;
`;

const CareerContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CareerSectionContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 70px;
  margin-top: 40px;
`;

const CareerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  gap: 10px;
  margin-top: 40px;
  color: ${(props) =>
    props.$isHovered ? "#333" : " rgba(102, 102, 102, 0.6)"};
  transition: color 0.3s ease;
`;

const CareerInfoTitle = styled.h5`
  font-size: 16px;
  font-weight: bold;
`;

const CareerInfoDate = styled.h3`
  padding-top: 10px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CareerSectionWrapper = styled.div``;

const CareerImg = styled.img`
  width: 260px;
  height: 260px;
  border-radius: 4px;
  border: 1px solid #f00;
  height: ${(props) => (props.$isHovered ? "300px" : "260px")};
  transition: height 0.3 ease;
  cursor: pointer;
`;

const CareerInfo = styled.p`
  display: ${(props) => (props.$isHovered ? "block" : "none")};
  transition: transform 0.3s ease;
`;

const CareerSection = () => {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  return (
    <CareerWrapper>
      <CareerSectionWrapper>
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Culpa, sit eaque minima dolore iste inventore est magnam
                </CareerInfo>
                <CareerImg $isHovered={hoveredItemId === item.id}></CareerImg>
              </CareerBox>
            ))}
          </CareerSectionContainer>
        </CareerContainer>
      </CareerSectionWrapper>
    </CareerWrapper>
  );
};

export default CareerSection;
