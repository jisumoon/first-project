import React from "react";
import styled from "styled-components";
import skillsData from "../../../public/data/skill.json";

const Container = styled.div`
  padding: 60px;
  margin-top: 120px;

  @media (max-width: 1280px) {
    margin-top: 80px;
    padding: 40px;
  }

  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

const SkillSectionTitle = styled.h1`
  font-size: 46px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 36px;
    text-align: left;
  }

  @media (max-width: 400px) {
    font-size: 30px;
  }
`;

const SkillWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const CardSection = styled.div`
  max-width: 280px;
  width: 100%;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;

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
  border-radius: 8px;
  padding: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 400px) {
    width: 40px;
    height: 40px;
  }
`;

const SkillInfo = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.4;
  }

  @media (max-width: 400px) {
    font-size: 14px;
    line-height: 1.3;
  }
`;

const SkilltypeSection = () => (
  <Container>
    <SkillSectionTitle>Forest of Skills</SkillSectionTitle>
    <SkillWrapper>
      {skillsData.skills.map((category) => (
        <CardSection key={category.category}>
          <SkillTitle>{category.category}</SkillTitle>
          <Line />
          <SkillItem>
            {category.items.map((item) => (
              <SkillImg key={item.name} src={item.svg} alt={item.name} />
            ))}
          </SkillItem>
          <SkillInfo>{category.info}</SkillInfo>
        </CardSection>
      ))}
    </SkillWrapper>
  </Container>
);

export default SkilltypeSection;
