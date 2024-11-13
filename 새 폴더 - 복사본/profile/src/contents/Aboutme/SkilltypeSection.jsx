import React from "react";
import styled from "styled-components";
import skillsData from "../../../public/data/skill.json";

const Container = styled.div`
  padding: 60px;
  margin-top: 80px;
`;

const SkillSectionTItle = styled.h1`
  font-size: 46px;
  font-weight: bold;
`;

const SkillWrapper = styled.section`
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 30px;
  align-items: center;
`;

const CardSection = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const SkillTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
  color: rgba(51, 51, 51, 0.9);
`;

const Line = styled.hr`
  margin-top: 13px;
  width: 90px;
  border: 1.5px solid ${(props) => props.theme.colors.primary};
`;

const SkillItem = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 40px;
`;

const SkillImg = styled.img`
  width: 40px;
  height: 40px;
`;

const SkillInfo = styled.div`
  margin-top: 18px;
  font-size: 16px;
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
          </SkillInfo>
        </CardSection>
      ))}
    </SkillWrapper>
  </Container>
);

export default SkilltypeSection;
