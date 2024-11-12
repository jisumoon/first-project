import React from "react";
import styled from "styled-components";
import skillsData from "../../../public/data/skill.json";

const Container = styled.div`
  padding: 60px;
`;

const SkillSectionTItle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 1.4px;
`;

const SkillWrapper = styled.section`
  padding-top: 40px;
  display: flex;
  align-items: center;
  gap: 40px;
  align-items: center;
`;

const CardSection = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const SkillTitle = styled.h3`
  padding-left: 4px;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 400;
`;

const SkillItem = styled.div`
  display: flex;
  gap: 12px;
`;

const SkillImg = styled.img`
  width: 40px;
  height: 40px;
`;

const SkillSection = () => (
  <Container>
    <SkillSectionTItle>Forest of Skills</SkillSectionTItle>
    <SkillWrapper>
      {skillsData.skills.map((category) => (
        <CardSection key={category.category}>
          <SkillTitle>{category.category}</SkillTitle>
          <SkillItem>
            {category.items.map((item) => (
              <SkillImg key={item.name} src={item.svg} alt={item.name} />
            ))}
          </SkillItem>
        </CardSection>
      ))}
    </SkillWrapper>
  </Container>
);

export default SkillSection;
