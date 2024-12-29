import React, { useState } from "react";
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
  font-size: 20px;
  text-align: center;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputField = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 10px;
  resize: none;
  font-family: "Ownglyph_ParkDaHyun";
  &:hover {
    outline: none;
  }
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  font-family: "Ownglyph_ParkDaHyun";
  color: #fff;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
  }
`;

interface QAProps {
  question: string;
  answers: { date: string; answer: string }[];
  onSave: (newAnswer: { date: string; answer: string }) => void;
}

const DiaryForm: React.FC<QAProps> = ({ question, answers, onSave }) => {
  const [newAnswer, setNewAnswer] = useState("");

  const handleSave = () => {
    if (newAnswer.trim() === "") {
      alert("답변을 적어주세요");
      return;
    }

    const currentDate = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // 새 답변 저장
    onSave({ date: currentDate, answer: newAnswer });

    // 입력란 초기화
    setNewAnswer("");
  };

  return (
    <Card>
      <Question>Q {question}</Question>
      <AnswerList>
        {answers.length > 0 ? (
          answers.map((item, index) => (
            <AnswerItem key={index}>
              <p>⭐ {item.date}</p>
              <p>{item.answer}</p>
            </AnswerItem>
          ))
        ) : (
          <InputContainer>
            <InputField
              rows={4}
              placeholder="답변을 적어주세요"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <SaveButton onClick={handleSave}>저장</SaveButton>
          </InputContainer>
        )}
      </AnswerList>
    </Card>
  );
};

export default DiaryForm;
