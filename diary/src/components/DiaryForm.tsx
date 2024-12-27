import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  padding: 20px 30px;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
`;

const Question = styled.h2`
  margin: 10px 0;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  font-family: "HakgyoansimNadeuriTTF-B", sans-serif;
`;

const AnswerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AnswerItem = styled.li`
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 2px;
    line-height: 1.6;
    letter-spacing: 0.8px;
    font-family: "HakgyoansimNadeuriTTF-B", sans-serif;

    &:nth-child(1) {
      font-weight: bold;
      font-size: 14px;
    }

    &:nth-child(2) {
      font-size: 16px;
    }
  }
`;

interface QAProps {
  question: string;
  answers: { date: string; answer: string }[];
}

const DiaryForm: React.FC<QAProps> = ({ question, answers }) => {
  return (
    <Card>
      <Question>Q: {question}</Question>
      <AnswerList>
        {answers.length > 0 ? (
          answers.map((item, index) => (
            <AnswerItem key={index}>
              <p>⭐ {item.date}</p>
              <p>{item.answer}</p>
            </AnswerItem>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "20px" }}>
            답변이 없습니다.
          </p>
        )}
      </AnswerList>
    </Card>
  );
};

export default DiaryForm;
