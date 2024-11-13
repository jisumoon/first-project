import React from "react";
import styled from "styled-components";
import skillsData from "../../../public/data/skill.json";

const Container = styled.div`
  padding: 60px;
  margin-top: 80px;
`;

const SkillSectionTItle = styled.h1`
  padding-left: 4px;
  font-size: 18px;
  font-weight: bold;
`;

const SkillWrapper = styled.section`
  margin-top: 40px;
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
  font-size: 36px;
  font-weight: bold;
  line-height: 1.2;
  color: rgba(51, 51, 51, 0.9);
`;

const Line = styled.hr`
  margin-top: 20px;
  width: 80px;
  border: 2px solid ${(props) => props.theme.colors.primary};
`;

const SkillItem = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
`;

const SkillImg = styled.img`
  width: 40px;
  height: 40px;
`;

const SkillInfo = styled.div`
  margin-top: 18px;
`;

const SkilltypeSection = () => (
  <Container>
    <SkillSectionTItle>Forest of Skills</SkillSectionTItle>
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
          <SkillInfo>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
            expedita in ad sed sequi fugit repellendus iusto necessitatibus
            soluta voluptatibus, ullam vitae saepe est commodi enim corporis ut
            blanditiis! Velit!
          </SkillInfo>
        </CardSection>
      ))}
    </SkillWrapper>
  </Container>
);

export default SkilltypeSection;
