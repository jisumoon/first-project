import React from "react";
import styled from "styled-components";
import skillsData from "../../../public/data/skill.json";

const Container = styled.div`
  padding: 60px;
  margin-top: 120px;
  @media (max-width: 1280px) {
    margin-top: 60px;
  }

  @media (max-width: 1240px) {
    width: 100%;
    margin-top: 100px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SkillSectionTitle = styled.h1`
  font-size: 46px;
  font-weight: bold;
  line-height: 1.2;

  @media (max-width: 400px) {
    font-size: 35px;
  }
`;

const SkillWrapper = styled.section`
  display: flex;
  gap: 40px;
  padding-top: 40px;
  @media (max-width: 1280px) {
  }

  @media (max-width: 1240px) {
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const CardSection = styled.div`
  max-width: 280px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const SkillTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 10px;
`;

const Line = styled.hr`
  width: 60px;
  height: 3px;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  margin: 10px 0 20px;
`;

const SkillItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100px;
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
`;

const SkillInfo = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
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
