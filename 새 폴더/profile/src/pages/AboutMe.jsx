import React, { useRef } from "react";
import styled from "styled-components";
import skillsData from "../data/skill.json";
import questionsData from "../data/interview.json";
import ScrollAni from "../styles/ScrollAni";
import useScrollAnimation from "../Hook/useScrollAnimation";

const Contain = styled.div`
  width: 100%;
`;

const AboutMeSection = styled.section`
  background: #fff;
`;

const Title = styled.h1`
  padding-top: 60px;
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
    margin-top: 60px;
    padding: 0 300px;
  }
`;

const Article = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 80px;
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
  font-weight: bold;
  line-height: 1.4;
  padding-bottom: 10px;

  span {
    &:nth-child(1) {
      color: #8b4513;
    }
    &:last-child {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;

const Info = styled.h3`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
  color: ${(props) => props.theme.colors.info};
`;

const SkillSection = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const SkillSectionTitle = styled.h2`
  padding-top: 40px;
  font-size: 26px;
  font-weight: bold;
`;

const Skill = styled.div`
  margin-top: 20px;
`;

const SkillTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  color: ${(props) => props.theme.colors.info};
`;

const SkillImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const InterviewSection = styled.div``;

const Interview = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 30px 20px;
`;

const InterviewSectionTitle = styled.h2`
  padding-top: 40px;
  margin-bottom: 40px;
  font-size: 28px;
  font-weight: bold;
`;

const InterviewTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
`;

const InterviewInfo = styled.h4`
  font-size: 16px;
  line-height: 1.6;
`;

const Highlight = styled.span`
  background: ${(props) => props.theme.colors.highlight};
  color: #fff;
  padding: 2px;
  border-radius: 8px;
  font-size: 16px;
`;

const AboutMe = () => {
  const moScrollRef = useRef(null);
  const { scrollRef, scrollEl } = useScrollAnimation();

  // 하이라이트 표시 함수
  const renderAnswerWithHighlights = (answer, highlights) => {
    const parts = answer.split(new RegExp(`(${highlights.join("|")})`, "g"));
    return parts.map((part, index) =>
      highlights.includes(part) ? (
        <Highlight key={index}>{part}</Highlight>
      ) : (
        part
      )
    );
  };

  return (
    <Contain ref={moScrollRef}>
      <AboutMeSection id="aboutMeSection">
        <Title>About Me,</Title>
        <ScrollAni
          ref={(el) => {
            scrollRef.current = el;
          }}
          $isVisible={scrollEl}
          className="scroll-animation"
        >
          <Section className="top">
            <Article>
              <Img src="/path/to/image.jpg" alt="Profile" />
              <InfoSection>
                <InfoTitle>
                  사람을 이해하는 <span>뿌리로</span>, <br />
                  숲을 가꾸는 <span>프론트엔드</span>
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
            <SkillSectionTitle>🌲Skill & Tools</SkillSectionTitle>
            <SkillSection>
              {skillsData.skills.map((category) => (
                <Skill key={category.category}>
                  <SkillTitle>{category.category}</SkillTitle>
                  {category.items.map((item) => (
                    <SkillImg key={item.name} src={item.svg} alt={item.name} />
                  ))}
                </Skill>
              ))}
            </SkillSection>
          </Section>

          <Section className="middle">
            <InterviewSectionTitle>🌲Interview</InterviewSectionTitle>
            <InterviewSection>
              {questionsData.interview.map((item, index) => (
                <Interview key={index}>
                  <InterviewTitle>Q. {item.question}</InterviewTitle>
                  <InterviewInfo>
                    {renderAnswerWithHighlights(item.answer, item.highlight)}
                  </InterviewInfo>
                </Interview>
              ))}
            </InterviewSection>
          </Section>
        </ScrollAni>
      </AboutMeSection>
    </Contain>
  );
};

export default AboutMe;
