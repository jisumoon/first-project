import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import skillsData from "../../public/data/skill.json";
import questionsData from "../../public/data/interview.json";
import careerData from "../../public/data/education.json";
import ScrollAni from "../styles/ScrollAni";
import useScrollAnimation from "../Hook/useScrollAnimation";

//Ani
const infiniteAnimation1 = keyframes`
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(-100%);
  }
  50.1% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const infiniteAnimation2 = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-200%);
  }
`;

const Contain = styled.div`
  width: 100%;
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

  &.bottom {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 100px;
    padding-right: 0;
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
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const InterviewSection = styled.div``;

const Interview = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  margin-bottom: 40px;
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

const CareerTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const CareerTitle = styled.h2`
  padding-top: 20px;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.4;
`;

const CareerContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  margin-left: 100px;
`;

const CareerSection = styled.div`
  display: flex;
  justify-content: space-evenly;

  &.slideOriginal {
    animation: ${infiniteAnimation1} 100s linear infinite;
  }

  &.slideClone {
    animation: ${infiniteAnimation2} 100s linear infinite;
  }

  &.stop {
    animation-play-state: paused;
  }
`;

const CareerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  margin-left: 60px;
  min-width: 300px;
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  border-bottom: 5px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  &:hover {
    transform: scale(0.98);
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const Education = styled.div`
  display: flex;
  div {
    flex-direction: row;
  }
`;

const CareerInfoSvg = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  img {
    width: 100%;
  }
`;

const CareerInfoDate = styled.h3`
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #666666;
`;

const CareerInfoTitle = styled.h5`
  margin-bottom: 20px;
  font-size: 16px;
`;

const AboutMe = () => {
  const { scrollRef, scrollEl } = useScrollAnimation();
  const [animate, setAnimate] = useState(true); // 애니메이션 제어

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

  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  return (
    <Contain id="aboutMeSection">
      <Title>About Me</Title>
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

        <Section className="bottom">
          <CareerTitleSection>
            <CareerTitle>Career & Education</CareerTitle>
          </CareerTitleSection>
          <CareerContainer onMouseEnter={onStop} onMouseLeave={onRun}>
            <CareerSection
              className={"slideOriginal" + (animate ? "" : " stop")}
            >
              {careerData.map((item) => (
                <CareerBox key={item.id}>
                  <CareerInfoSvg>
                    <img src={item.svg} alt={item.title} />
                  </CareerInfoSvg>
                  {item.date && <CareerInfoDate>{item.date}</CareerInfoDate>}
                  {item.title && (
                    <CareerInfoTitle>{item.title}</CareerInfoTitle>
                  )}
                  {item.entries && (
                    <Education>
                      {item.entries.map((edu, index) => (
                        <div key={index}>
                          <CareerInfoDate>{edu.date}</CareerInfoDate>
                          <CareerInfoTitle>{edu.title}</CareerInfoTitle>
                        </div>
                      ))}
                    </Education>
                  )}
                </CareerBox>
              ))}
            </CareerSection>

            <CareerSection className={"slideClone" + (animate ? "" : " stop")}>
              {careerData.map((item) => (
                <CareerBox key={item.id}>
                  <CareerInfoSvg>
                    <img src={item.svg} alt={item.title} />
                  </CareerInfoSvg>
                  {item.date && <CareerInfoDate>{item.date}</CareerInfoDate>}
                  {item.title && (
                    <CareerInfoTitle>{item.title}</CareerInfoTitle>
                  )}
                  {item.entries && (
                    <Education>
                      {item.entries.map((edu, index) => (
                        <div key={index}>
                          <CareerInfoDate>{edu.date}</CareerInfoDate>
                          <CareerInfoTitle>{edu.title}</CareerInfoTitle>
                        </div>
                      ))}
                    </Education>
                  )}
                </CareerBox>
              ))}
            </CareerSection>
          </CareerContainer>
        </Section>
      </ScrollAni>
    </Contain>
  );
};

export default AboutMe;
