import React, { useState } from "react";
import styled from "styled-components";
import skillsData from "../../../public/data/skill.json";
import { faMouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  padding: 60px;
  margin: 100px 0;

  @media (max-width: 1280px) {
    margin-top: 80px;
    padding: 40px;
  }

  @media (max-width: 768px) {
    margin-top: 60px;
    margin-bottom: 0;
  }
`;

const SkillSectionTitle = styled.h1`
  font-size: 46px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 80px;
  @media (max-width: 768px) {
    font-size: 36px;
    text-align: left;
  }

  @media (max-width: 400px) {
    font-size: 30px;
  }
`;

const SkillWrapper = styled.section`
  flex: 1.5;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-rows: auto;
  }
`;

const SkillContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CardSection = styled.div`
  max-width: 280px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    max-width: 240px;
    padding: 15px;
  }

  @media (max-width: 400px) {
    max-width: 200px;
    padding: 10px;
  }
`;

const SkillTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 400px) {
    font-size: 16px;
  }
`;

const Line = styled.hr`
  width: 60px;
  height: 3px;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  margin: 10px 0 20px;

  @media (max-width: 768px) {
    width: 50px;
    height: 2px;
    margin: 8px 0 15px;
  }
`;

const SkillItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 100px;

  @media (max-width: 768px) {
    gap: 8px;
    min-height: 80px;
  }

  @media (max-width: 400px) {
    gap: 5px;
    min-height: 60px;
  }
`;

const SkillImg = styled.img`
  width: 50px;
  height: 50px;
  padding: 8px;
  transition: transform 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }

  @media (max-width: 400px) {
    width: 40px;
    height: 40px;
  }
`;

const InfoWrapper = styled.div`
  flex: 0.5;
  border: 4px solid ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  transition: all 0.5s;

  p {
    text-align: center;
    line-height: 1.4;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const InfoImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
`;

const InfoTitle = styled.h4`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  line-height: 1.4;
  font-size: 16px;
`;

const SkilltypeSection = () => {
  const [hoveredInfo, setHoveredInfo] = useState([]);
  const [hoveredTitle, setHoveredTitle] = useState("");
  const [hoveredImage, setHoveredImage] = useState("");

  return (
    <Container>
      <SkillSectionTitle>Forest of Skills</SkillSectionTitle>
      <SkillContainer>
        <SkillWrapper>
          {skillsData.skills.map((category) => (
            <CardSection key={category.category}>
              <SkillTitle>{category.category}</SkillTitle>
              <Line />
              <SkillItem>
                {category.items.map((item) => (
                  <SkillImg
                    key={item.name}
                    src={item.svg}
                    alt={item.name}
                    onMouseEnter={() => {
                      setHoveredInfo(item.info);
                      setHoveredTitle(item.name);
                      setHoveredImage(item.svg);
                    }}
                  />
                ))}
              </SkillItem>
            </CardSection>
          ))}
        </SkillWrapper>

        <InfoWrapper>
          {hoveredInfo.length > 0 ? (
            <>
              <InfoImage src={hoveredImage} alt={hoveredTitle} />
              <InfoTitle>{hoveredTitle}</InfoTitle>
              <InfoList>
                {hoveredInfo.map((info, index) => (
                  <li key={index}>· {info}</li>
                ))}
              </InfoList>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faMouse}
                style={{ fontSize: "30px", marginBottom: "20px" }}
              />
              <p>
                각 기술 스택 아이콘에 마우스를 올리면 해당 기술을 <br />
                어떻게 활용할 수 있는지 확인할 수 있습니다.
              </p>
            </>
          )}
        </InfoWrapper>
      </SkillContainer>
    </Container>
  );
};

export default SkilltypeSection;
