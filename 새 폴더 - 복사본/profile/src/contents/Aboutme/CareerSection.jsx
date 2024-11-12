import React from "react";
import styled from "styled-components";
import careerData from "../../../public/data/education.json";

const CareerWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 50vh;
  margin-top: 60px;
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
  gap: 40px;
  padding-top: 9px;
  margin-top: 20px;
`;

const CareerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10px;
  padding: 10px;
  gap: 10px;
`;

const CareerInfoTitle = styled.h5`
  margin-bottom: 8px;
  color: #3e4e42;
  font-size: 16px;
  font-weight: bold;
`;

const CareerInfoDate = styled.h3`
  padding-top: 10px;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CareerSectionWrapper = styled.div``;

const TimelineImg = styled.svg`
  position: absolute;
  right: 0;
  bottom: 7%;
`;

const CareerImg = styled.img`
  width: 220px;
  height: 120px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #f00;
`;

const CareerCricle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #333;
`;

const CareerSection = () => {
  return (
    <CareerWrapper>
      <TimelineImg
        width="1500"
        height="5"
        viewBox="0 0 1016 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1500" height="2" fill="rgba(51, 51, 51, 0.6)" />
      </TimelineImg>

      <CareerSectionWrapper>
        <CareerSectionText>
          Forest of Growth:
          <br /> Career & Education
        </CareerSectionText>

        <CareerContainer>
          <CareerSectionContainer>
            {careerData.map((item) => (
              <CareerBox key={item.id}>
                <CareerImg></CareerImg>
                <CareerCricle></CareerCricle>
                <CareerInfoDate>{item.date}</CareerInfoDate>
                <CareerInfoTitle>{item.title}</CareerInfoTitle>
              </CareerBox>
            ))}
          </CareerSectionContainer>
        </CareerContainer>
      </CareerSectionWrapper>
    </CareerWrapper>
  );
};

export default CareerSection;
