import React from "react";
import styled from "styled-components";
import careerData from "../../../public/data/education.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClover } from "@fortawesome/free-solid-svg-icons";

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
  margin-top: 40px;
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
  bottom: -11%;
  z-index: -1;
`;

const CareerImg = styled.img`
  width: 240px;
  height: 140px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #f00;
`;

const CareerCricle = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.colors.primary};
`;

const CareerSection = () => {
  return (
    <CareerWrapper>
      <TimelineImg
        width="1600"
        height="5"
        viewBox="0 0 1016 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1600" height="1" fill="#6F4E37" />
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
                <CareerCricle>
                  <FontAwesomeIcon icon={faClover} />
                </CareerCricle>
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
