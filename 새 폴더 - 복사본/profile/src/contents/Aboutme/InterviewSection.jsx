import React from "react";
import styled from "styled-components";
import questionsData from "../../../public/data/interview.json";

const Container = styled.div`
  width: 100%;
  padding: 0 40px;
  margin-top: 200px;
`;

const InterviewSectionTitle = styled.h1`
  font-size: 46px;
  font-weight: bold;
  line-height: 1.3;
  color: #444;
`;

const InterviewWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding-top: 120px;
  padding-left: 40px;
  padding-right: 28px;
`;

const InterviewTitle = styled.h3`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InterviewInfo = styled.h4`
  font-size: 15px;
  line-height: 1.6;
`;

const Highlight = styled.span`
  background: ${(props) => props.theme.colors.highlight};
  color: #fff;
  padding: 2px;
  border-radius: 8px;
  font-size: 15px;
`;

const InterviewImg = styled.img`
  width: 360px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const InterviewSectionCover = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-top: 40px;
`;

const Number = styled.div`
  font-size: 30px;
`;

const renderAnswerWithHighlights = (answer, highlights) => {
  const parts = answer.split(new RegExp(`(${highlights.join("|")})`, "g"));
  return parts.map((part, index) =>
    highlights.includes(part) ? <Highlight key={index}>{part}</Highlight> : part
  );
};

const InterviewSection = () => (
  <Container>
    <InterviewSectionTitle>
      <span>Roots</span> and <span>Branches</span>: <br />
      Growing Through Life's Forest
    </InterviewSectionTitle>
    <InterviewSectionCover>
      <InterviewImg src="/img/tree1.jpg" alt="Tree image" />
      <InterviewWrapper>
        {questionsData.interview.map((item, index) => (
          <div key={index}>
            <InterviewTitle>Q. {item.question}</InterviewTitle>
            <InterviewInfo>
              {renderAnswerWithHighlights(item.answer, item.highlight)}
            </InterviewInfo>
          </div>
        ))}
      </InterviewWrapper>
    </InterviewSectionCover>
  </Container>
);

export default InterviewSection;
