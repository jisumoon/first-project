import React from "react";
import styled from "styled-components";

const Contain = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  padding-left: 40px;
  margin-top: 40px;
  font-size: 64px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.primary};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding: 0 200px;
  margin: 0 auto;

  &.top {
    flex-direction: row;
    margin-top: 100px;
    gap: 20px;
  }

  &.middle {
    margin-top: 30px;
  }
`;

const Article = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 60px;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 1px solid #f00;
`;

const InfoSection = styled.div``;

const InfoTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  line-height: 1.2;
  padding-bottom: 10px;
`;

const Info = styled.h3`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
`;

const SkillSection = styled.div`
  display: flex;
`;

const SkillSectionTitle = styled.h2`
  padding-top: 40px;
  font-size: 26px;
  font-weight: bold;
`;

const Skill = styled.div`
  margin-top: 30px;
`;

const SkillTitle = styled.h3`
  font-size: 20px;
`;

const SkillImg = styled.svg``;

const AboutMe = () => {
  return (
    <Contain>
      <Title>About Me,</Title>
      <Section className="top">
        <Article>
          <Img />
          <InfoSection>
            <InfoTitle>
              사람을 이해하는 뿌리로, <br />
              숲을 가꾸는 프론트엔드
            </InfoTitle>
            <Info>
              치료사로서 환자의 제약을 이해하고 해결책을 찾던 경험이,
              <br />
              사용자 중심의 웹 환경을 설계하는 데 큰 밑거름이 되었습니다.
              <br /> 다양한 요구와 문제를 파악하여, 더 나은 사용자 경험을
              만들어가고 싶습니다.
            </Info>
          </InfoSection>
        </Article>
      </Section>
      <Section className="middle">
        <SkillSectionTitle>Skill & Tools</SkillSectionTitle>
        <SkillSection>
          <Skill>
            <SkillTitle>Front-End</SkillTitle>
            <SkillImg />
            <SkillImg />
            <SkillImg />
            <SkillImg />
          </Skill>
          <Skill>
            <SkillTitle>Back-End</SkillTitle>
            <SkillImg />
            <SkillImg />
            <SkillImg />
            <SkillImg />
          </Skill>
          <Skill>
            <SkillTitle>Style</SkillTitle>
            <SkillImg />
            <SkillImg />
            <SkillImg />
            <SkillImg />
          </Skill>
          <Skill>
            <SkillTitle>Cooperate</SkillTitle>
            <SkillImg />
            <SkillImg />
            <SkillImg />
            <SkillImg />
          </Skill>
        </SkillSection>
      </Section>
      <Section className="bottom"></Section>
    </Contain>
  );
};

export default AboutMe;
