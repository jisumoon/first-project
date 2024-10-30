import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { QuestionData } from "../assets/questiondata";

const Wrapper = styled.div`
  width: 100%;
  height: 98vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 30px;
  width: auto;
  text-align: center;
  margin-bottom: 30px;
  padding: 8px 16px;
  color: #fff;
  border-radius: 8px;

  @media screen and (max-width: 780px) {
    width: 260px;
    font-size: 22px;
    padding: 6px 12px;
  }

  @media screen and (max-width: 360px) {
    width: 200px;
    font-size: 18px;
    padding: 4px 8px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  gap: 10px;
  @media screen and (max-width: 780px) {
    flex-direction: column;
    width: 300px;
    font-size: 24px;
    padding: 6px 12px;
  }

  @media screen and (max-width: 360px) {
    flex-direction: column;
    width: 200px;
    font-size: 18px;
    padding: 4px 8px;
  }
`;

const PButton = styled.button`
  width: 400px;
  height: 200px;
  border: none;
  background: rgba(240, 116, 143, 0.8);
  color: #fff;
  transition: background 0.3s;
  &:hover {
    background: rgba(240, 116, 143, 1);
  }
`;

const BButton = styled.button`
  border: none;
  background: rgba(118, 160, 238, 0.8);
  color: #fff;
  transition: background 0.3s;
  &:hover {
    background: rgba(118, 160, 238, 1);
  }
  width: 400px;
  height: 200px;
`;

const Question = () => {
  const [questionNo, setQuestionNo] = useState(0);
  const [totalScore, setTotalScore] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);
  const navigate = useNavigate();

  const handleClickButton = (no, type) => {
    const newScore = totalScore.map((s) =>
      s.id === type ? { id: s.id, score: s.score + no } : s
    );

    setTotalScore(newScore);
    if (QuestionData.length !== questionNo + 1) {
      setQuestionNo(questionNo + 1);
    } else {
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        ""
      );
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({
          mbti: mbti,
        })}`,
      });
    }
  };

  return (
    <>
      <ProgressBar
        striped
        variant="danger"
        now={(questionNo / QuestionData.length) * 100}
      />
      <Wrapper>
        <Title>❣️{QuestionData[questionNo].title}</Title>
        <ButtonGroup>
          <PButton
            variant="danger"
            onClick={() => handleClickButton(1, QuestionData[questionNo].type)}
          >
            {QuestionData[questionNo].answera}
          </PButton>
          <BButton
            onClick={() => handleClickButton(0, QuestionData[questionNo].type)}
          >
            {QuestionData[questionNo].answerb}
          </BButton>
        </ButtonGroup>
      </Wrapper>
    </>
  );
};

export default Question;
